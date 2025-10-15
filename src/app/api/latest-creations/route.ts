import { supabase } from "@/lib/supabase";
import { NextResponse } from "next/server";

// ✅ GET all rows
export async function GET() {
  const { data, error } = await supabase
    .from("latest_creations")
    .select("*")
    .order("sort_order", { ascending: true });

  if (error) return NextResponse.json({ error: error.message }, { status: 400 });
  return NextResponse.json(data);
}

// ✅ CREATE with image upload
export async function POST(req: Request) {
  const formData = await req.formData();
  const title = formData.get("title") as string;
  const comment = formData.get("comment") as string;
  const alt_text = formData.get("alt_text") as string;
  const sort_order = Number(formData.get("sort_order")) || 0;
  const imageFile = formData.get("image") as File | null;

  let image_url = "";

  if (imageFile) {
    const fileName = `latest-creations/${Date.now()}-${imageFile.name}`;
    const { error: uploadError } = await supabase.storage
      .from("hero-images") // ✅ changed bucket
      .upload(fileName, imageFile, { upsert: true });
    if (uploadError) return NextResponse.json({ error: uploadError.message }, { status: 400 });

    const { data: publicUrlData } = supabase.storage.from("hero-images").getPublicUrl(fileName);
    image_url = publicUrlData.publicUrl;
  }

  const { data, error } = await supabase
    .from("latest_creations")
    .insert([{ title, comment, image_url, alt_text, sort_order }])
    .select();

  if (error) return NextResponse.json({ error: error.message }, { status: 400 });
  return NextResponse.json(data[0]);
}

// ✅ UPDATE with optional new image
export async function PUT(req: Request) {
  const formData = await req.formData();
  const id = Number(formData.get("id"));
  const title = formData.get("title") as string;
  const comment = formData.get("comment") as string;
  const alt_text = formData.get("alt_text") as string;
  const sort_order = Number(formData.get("sort_order")) || 0;
  const imageFile = formData.get("image") as File | null;
  let image_url = formData.get("image_url") as string; // existing image fallback

  if (imageFile) {
    const fileName = `latest-creations/${Date.now()}-${imageFile.name}`;
    const { error: uploadError } = await supabase.storage
      .from("hero-images") // ✅ changed bucket
      .upload(fileName, imageFile, { upsert: true });
    if (uploadError) return NextResponse.json({ error: uploadError.message }, { status: 400 });

    const { data: publicUrlData } = supabase.storage.from("hero-images").getPublicUrl(fileName);
    image_url = publicUrlData.publicUrl;
  }

  const { data, error } = await supabase
    .from("latest_creations")
    .update({ title, comment, alt_text, sort_order, image_url })
    .eq("id", id)
    .select();

  if (error) return NextResponse.json({ error: error.message }, { status: 400 });
  return NextResponse.json(data[0]);
}

// ✅ DELETE by ID
export async function DELETE(req: Request) {
  const { id } = await req.json();
  const { error } = await supabase.from("latest_creations").delete().eq("id", id);
  if (error) return NextResponse.json({ error: error.message }, { status: 400 });
  return NextResponse.json({ success: true });
}
