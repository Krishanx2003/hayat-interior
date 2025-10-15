import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

const PROJECT_BUCKET = "project-images";

/**
 * POST /api/projects
 * Creates a new project entry with uploaded images.
 */
export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const title = formData.get("title") as string | null;
    const description = formData.get("description") as string | null;
    const heading = formData.get("heading") as string | null;
    const list = formData.get("list") as string | null;
    const location = formData.get("location") as string | null;
    const imageFiles = formData.getAll("images") as File[];

    // Validate required fields
    if (!title || !description || !location || imageFiles.length === 0) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Upload images to Supabase Storage
    const imageUrls: string[] = [];
    for (const file of imageFiles) {
      const fileName = `${Date.now()}-${file.name}`;

      const { error: uploadError } = await supabase.storage
        .from(PROJECT_BUCKET)
        .upload(fileName, file, { upsert: true });

      if (uploadError) {
        console.error(`Failed to upload image ${file.name}:`, uploadError);
        continue;
      }

      const { data: publicUrlData } = supabase.storage
        .from(PROJECT_BUCKET)
        .getPublicUrl(fileName);

      if (publicUrlData?.publicUrl) imageUrls.push(publicUrlData.publicUrl);
    }

    if (imageUrls.length === 0) {
      return NextResponse.json(
        { error: "No images uploaded successfully" },
        { status: 400 }
      );
    }

    // Insert into Supabase
    const { data: project, error: insertError } = await supabase
      .from("projects")
      .insert([
        {
          title,
          description,
          heading,
          list,
          location,
          images: imageUrls, // text[]
        },
      ])
      .select("*")
      .single();

    if (insertError || !project) {
      console.error("Project insert error:", insertError);
      return NextResponse.json(
        { error: "Failed to create project" },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true, project }, { status: 200 });
  } catch (error) {
    console.error("API POST error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

/**
 * GET /api/projects
 * Fetches all projects sorted by creation date (newest first)
 */
export async function GET() {
  try {
    const { data: projects, error } = await supabase
      .from("projects")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Fetch projects error:", error);
      return NextResponse.json(
        { error: "Failed to fetch projects" },
        { status: 500 }
      );
    }

    return NextResponse.json({ projects: projects ?? [] }, { status: 200 });
  } catch (error) {
    console.error("API GET error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
