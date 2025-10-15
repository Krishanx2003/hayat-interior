import { supabase } from "@/lib/supabase";
import { NextResponse } from "next/server";

// ✅ GET all rows
export async function GET() {
  const { data, error } = await supabase
    .from("emotion_section")
    .select("*")
    .order("id", { ascending: true });

  if (error) return NextResponse.json({ error: error.message }, { status: 400 });
  return NextResponse.json(data);
}

// ✅ CREATE with image uploads
export async function POST(req: Request) {
  const formData = await req.formData();
  const heading = formData.get("heading") as string;
  const subheading = formData.get("subheading") as string;
  const description = formData.get("description") as string;
  const imageLeftFile = formData.get("image_left") as File | null;
  const imageRightFile = formData.get("image_right") as File | null;

  let image_left = "";
  let image_right = "";

  // Upload left image
  if (imageLeftFile) {
    const fileName = `emotion-left/${Date.now()}-${imageLeftFile.name}`;
    const { error: uploadError } = await supabase.storage
      .from("hero-images")
      .upload(fileName, imageLeftFile, { upsert: true });
    if (uploadError) return NextResponse.json({ error: uploadError.message }, { status: 400 });
    const { data: publicUrlData } = supabase.storage.from("hero-images").getPublicUrl(fileName);
    image_left = publicUrlData.publicUrl;
  }

  // Upload right image
  if (imageRightFile) {
    const fileName = `emotion-right/${Date.now()}-${imageRightFile.name}`;
    const { error: uploadError } = await supabase.storage
      .from("hero-images")
      .upload(fileName, imageRightFile, { upsert: true });
    if (uploadError) return NextResponse.json({ error: uploadError.message }, { status: 400 });
    const { data: publicUrlData } = supabase.storage.from("hero-images").getPublicUrl(fileName);
    image_right = publicUrlData.publicUrl;
  }

  const { data, error } = await supabase
    .from("emotion_section")
    .insert([{ heading, subheading, description, image_left, image_right }])
    .select();

  if (error) return NextResponse.json({ error: error.message }, { status: 400 });
  return NextResponse.json(data[0]);
}

// ✅ UPDATE with optional new images
export async function PUT(req: Request) {
  const formData = await req.formData();
  const id = Number(formData.get("id"));
  const heading = formData.get("heading") as string;
  const subheading = formData.get("subheading") as string;
  const description = formData.get("description") as string;
  const imageLeftFile = formData.get("image_left") as File | null;
  const imageRightFile = formData.get("image_right") as File | null;
  let image_left = formData.get("image_left_url") as string; // existing URL fallback
  let image_right = formData.get("image_right_url") as string;

  if (imageLeftFile) {
    const fileName = `emotion-left/${Date.now()}-${imageLeftFile.name}`;
    const { error: uploadError } = await supabase.storage
      .from("hero-images")
      .upload(fileName, imageLeftFile, { upsert: true });
    if (uploadError) return NextResponse.json({ error: uploadError.message }, { status: 400 });
    const { data: publicUrlData } = supabase.storage.from("hero-images").getPublicUrl(fileName);
    image_left = publicUrlData.publicUrl;
  }

  if (imageRightFile) {
    const fileName = `emotion-right/${Date.now()}-${imageRightFile.name}`;
    const { error: uploadError } = await supabase.storage
      .from("hero-images")
      .upload(fileName, imageRightFile, { upsert: true });
    if (uploadError) return NextResponse.json({ error: uploadError.message }, { status: 400 });
    const { data: publicUrlData } = supabase.storage.from("hero-images").getPublicUrl(fileName);
    image_right = publicUrlData.publicUrl;
  }

  const { data, error } = await supabase
    .from("emotion_section")
    .update({ heading, subheading, description, image_left, image_right })
    .eq("id", id)
    .select();

  if (error) return NextResponse.json({ error: error.message }, { status: 400 });
  return NextResponse.json(data[0]);
}

// ✅ DELETE by ID
export async function DELETE(req: Request) {
  const { id } = await req.json();
  const { error } = await supabase.from("emotion_section").delete().eq("id", id);
  if (error) return NextResponse.json({ error: error.message }, { status: 400 });
  return NextResponse.json({ success: true });
}
