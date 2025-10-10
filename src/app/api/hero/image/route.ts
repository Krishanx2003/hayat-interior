import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

const BUCKET_NAME = "hero-images";

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const file = formData.get("file") as File | null;

    if (!file) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 });
    }

    const fileName = `${Date.now()}-${file.name}`;

    // Upload to Supabase Storage
    const { error: uploadError } = await supabase.storage
      .from(BUCKET_NAME)
      .upload(fileName, file, { upsert: true });

    if (uploadError) {
      console.error("❌ Upload error:", uploadError);
      return NextResponse.json({ error: uploadError.message }, { status: 500 });
    }

    // Get public URL
    const { data: publicUrlData } = supabase.storage
      .from(BUCKET_NAME)
      .getPublicUrl(fileName);

    const imageUrl = publicUrlData.publicUrl;

    // Insert new hero image record
    const { error: insertError } = await supabase
      .from("hero_settings")
      .insert({ image_url: imageUrl });

    if (insertError) {
      console.error("❌ Database insert error:", insertError);
      return NextResponse.json({ error: insertError.message }, { status: 500 });
    }

    return NextResponse.json({ success: true, url: imageUrl }, { status: 200 });
  } catch (error) {
    console.error("❌ Error uploading hero image:", error);
    return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
  }
}

export async function GET() {
  try {
    // Fetch the latest hero image
    const { data, error } = await supabase
      .from("hero_settings")
      .select("image_url")
      .order("created_at", { ascending: false })
      .limit(1)
      .single();

    if (error) {
      console.error("❌ Error fetching hero image:", error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ imageUrl: data?.image_url || null }, { status: 200 });
  } catch (err) {
    console.error("❌ API error:", err);
    return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
  }
}
