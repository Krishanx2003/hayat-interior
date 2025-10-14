import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

const SERVICE_BUCKET = "service-images";
const RENOVATION_BUCKET = "renovation-images";

/**
 * POST - Upload a service or renovation item
 * Body:
 *  - type: "service" | "renovation"
 *  - file: File (image)
 *  - alt (for service only)
 *  - title
 *  - description
 */
export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const type = formData.get("type") as string;
    const file = formData.get("file") as File | null;
    const alt = formData.get("alt") as string | null;
    const title = formData.get("title") as string;
    const description = formData.get("description") as string;

    if (!type || !file || !title || !description) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const bucket = type === "service" ? SERVICE_BUCKET : RENOVATION_BUCKET;
    const fileName = `${Date.now()}-${file.name}`;

    // Upload to storage
    const { error: uploadError } = await supabase.storage
      .from(bucket)
      .upload(fileName, file, { upsert: true });

    if (uploadError) {
      console.error("❌ Upload error:", uploadError);
      return NextResponse.json({ error: uploadError.message }, { status: 500 });
    }

    const { data: publicUrlData } = supabase.storage
      .from(bucket)
      .getPublicUrl(fileName);

    const imageUrl = publicUrlData.publicUrl;

    if (type === "service") {
      const { error: insertError } = await supabase.from("services").insert({
        image_url: imageUrl,
        alt,
        title,
        description,
      });

      if (insertError) {
        console.error("❌ DB insert error (service):", insertError);
        return NextResponse.json({ error: insertError.message }, { status: 500 });
      }
    } else if (type === "renovation") {
      const { error: insertError } = await supabase.from("renovations").insert({
        image_url: imageUrl,
        title,
        description,
      });

      if (insertError) {
        console.error("❌ DB insert error (renovation):", insertError);
        return NextResponse.json({ error: insertError.message }, { status: 500 });
      }
    } else {
      return NextResponse.json({ error: "Invalid type" }, { status: 400 });
    }

    return NextResponse.json({ success: true, imageUrl }, { status: 200 });
  } catch (error) {
    console.error("❌ API POST error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

/**
 * GET - Fetch both services and renovations
 */
export async function GET() {
  try {
    const { data: services, error: serviceError } = await supabase
      .from("services")
      .select("*")
      .order("created_at", { ascending: true });

    if (serviceError) throw serviceError;

    const { data: renovations, error: renovationError } = await supabase
      .from("renovations")
      .select("*")
      .order("created_at", { ascending: true });

    if (renovationError) throw renovationError;

    return NextResponse.json({ services, renovations }, { status: 200 });
  } catch (error) {
    console.error("❌ API GET error:", error);
    return NextResponse.json({ error: "Failed to fetch content" }, { status: 500 });
  }
}
