import { supabase } from "@/lib/supabase";
import { NextResponse } from "next/server";

// ✅ GET all rows
export async function GET() {
  const { data, error } = await supabase
    .from("layers_section")
    .select("*")
    .order("id", { ascending: true });

  if (error) return NextResponse.json({ error: error.message }, { status: 400 });
  return NextResponse.json(data);
}

// ✅ CREATE with image uploads
export async function POST(req: Request) {
  const formData = await req.formData();
  const heading = formData.get("heading") as string;
  const tagline = formData.get("tagline") as string;
  const description = formData.get("description") as string;
  const list_items = formData.get("list_items") as string; // line-separated

  const imageTopFile = formData.get("image_top") as File | null;
  const imageBottomFile = formData.get("image_bottom") as File | null;

  let image_top = "";
  let image_bottom = "";

  if (imageTopFile) {
    const fileName = `layers-top/${Date.now()}-${imageTopFile.name}`;
    const { error: uploadError } = await supabase.storage
      .from("hero-images")
      .upload(fileName, imageTopFile, { upsert: true });
    if (uploadError) return NextResponse.json({ error: uploadError.message }, { status: 400 });
    const { data: publicUrlData } = supabase.storage.from("hero-images").getPublicUrl(fileName);
    image_top = publicUrlData.publicUrl;
  }

  if (imageBottomFile) {
    const fileName = `layers-bottom/${Date.now()}-${imageBottomFile.name}`;
    const { error: uploadError } = await supabase.storage
      .from("hero-images")
      .upload(fileName, imageBottomFile, { upsert: true });
    if (uploadError) return NextResponse.json({ error: uploadError.message }, { status: 400 });
    const { data: publicUrlData } = supabase.storage.from("hero-images").getPublicUrl(fileName);
    image_bottom = publicUrlData.publicUrl;
  }

  const { data, error } = await supabase
    .from("layers_section")
    .insert([{ heading, tagline, description, list_items, image_top, image_bottom }])
    .select();

  if (error) return NextResponse.json({ error: error.message }, { status: 400 });
  return NextResponse.json(data[0]);
}

// ✅ UPDATE with optional new images
export async function PUT(req: Request) {
  const formData = await req.formData();
  const id = Number(formData.get("id"));
  const heading = formData.get("heading") as string;
  const tagline = formData.get("tagline") as string;
  const description = formData.get("description") as string;
  const list_items = formData.get("list_items") as string;

  const imageTopFile = formData.get("image_top") as File | null;
  const imageBottomFile = formData.get("image_bottom") as File | null;

  let image_top = formData.get("image_top_url") as string;
  let image_bottom = formData.get("image_bottom_url") as string;

  if (imageTopFile) {
    const fileName = `layers-top/${Date.now()}-${imageTopFile.name}`;
    const { error: uploadError } = await supabase.storage
      .from("hero-images")
      .upload(fileName, imageTopFile, { upsert: true });
    if (uploadError) return NextResponse.json({ error: uploadError.message }, { status: 400 });
    const { data: publicUrlData } = supabase.storage.from("hero-images").getPublicUrl(fileName);
    image_top = publicUrlData.publicUrl;
  }

  if (imageBottomFile) {
    const fileName = `layers-bottom/${Date.now()}-${imageBottomFile.name}`;
    const { error: uploadError } = await supabase.storage
      .from("hero-images")
      .upload(fileName, imageBottomFile, { upsert: true });
    if (uploadError) return NextResponse.json({ error: uploadError.message }, { status: 400 });
    const { data: publicUrlData } = supabase.storage.from("hero-images").getPublicUrl(fileName);
    image_bottom = publicUrlData.publicUrl;
  }

  const { data, error } = await supabase
    .from("layers_section")
    .update({ heading, tagline, description, list_items, image_top, image_bottom })
    .eq("id", id)
    .select();

  if (error) return NextResponse.json({ error: error.message }, { status: 400 });
  return NextResponse.json(data[0]);
}

// ✅ DELETE by ID
export async function DELETE(req: Request) {
  const { id } = await req.json();
  const { error } = await supabase.from("layers_section").delete().eq("id", id);
  if (error) return NextResponse.json({ error: error.message }, { status: 400 });
  return NextResponse.json({ success: true });
}
