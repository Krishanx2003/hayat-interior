import { supabase } from "@/lib/supabase";
import { NextResponse } from "next/server";

// ✅ GET all rows
export async function GET() {
  const { data, error } = await supabase
    .from("about_section")
    .select("*")
    .order("id", { ascending: true });

  if (error) return NextResponse.json({ error: error.message }, { status: 400 });
  return NextResponse.json(data);
}

// ✅ CREATE with image upload
export async function POST(req: Request) {
  const formData = await req.formData();
  const heading = formData.get("heading") as string;
  const description_1 = formData.get("description_1") as string;
  const description_2 = formData.get("description_2") as string;
  const imageFile = formData.get("image") as File | null;

  let image_url = "";

  if (imageFile) {
    const fileName = `about-section/${Date.now()}-${imageFile.name}`;
    const { error: uploadError } = await supabase.storage
      .from("hero-images")
      .upload(fileName, imageFile, { upsert: true });
    if (uploadError) return NextResponse.json({ error: uploadError.message }, { status: 400 });

    const { data: publicUrlData } = supabase.storage.from("hero-images").getPublicUrl(fileName);
    image_url = publicUrlData.publicUrl;
  }

  const { data, error } = await supabase
    .from("about_section")
    .insert([{ heading, description_1, description_2, image_url }])
    .select();

  if (error) return NextResponse.json({ error: error.message }, { status: 400 });
  return NextResponse.json(data[0]);
}

// ✅ UPDATE with optional new image
export async function PUT(req: Request) {
  const formData = await req.formData();
  const id = Number(formData.get("id"));
  const heading = formData.get("heading") as string;
  const description_1 = formData.get("description_1") as string;
  const description_2 = formData.get("description_2") as string;
  const imageFile = formData.get("image") as File | null;
  let image_url = formData.get("image_url") as string; // existing fallback

  if (imageFile) {
    const fileName = `about-section/${Date.now()}-${imageFile.name}`;
    const { error: uploadError } = await supabase.storage
      .from("hero-images")
      .upload(fileName, imageFile, { upsert: true });
    if (uploadError) return NextResponse.json({ error: uploadError.message }, { status: 400 });

    const { data: publicUrlData } = supabase.storage.from("hero-images").getPublicUrl(fileName);
    image_url = publicUrlData.publicUrl;
  }

  const { data, error } = await supabase
    .from("about_section")
    .update({ heading, description_1, description_2, image_url })
    .eq("id", id)
    .select();

  if (error) return NextResponse.json({ error: error.message }, { status: 400 });
  return NextResponse.json(data[0]);
}

// ✅ DELETE by ID
export async function DELETE(req: Request) {
  const { id } = await req.json();
  const { error } = await supabase.from("about_section").delete().eq("id", id);
  if (error) return NextResponse.json({ error: error.message }, { status: 400 });
  return NextResponse.json({ success: true });
}
