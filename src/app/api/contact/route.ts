import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

export async function POST(req: Request) {
  try {
    const {
      name,
      contact,
      email,
      address,
      projectType,
      propertyType,
      totalArea,
      numRooms,
      budget,
      timeline,
      message,
    } = await req.json();

    // Validate required fields
    if (
      !name ||
      !contact 
   
    ) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const { error } = await supabase.from("contact_inquiries").insert([
      {
        name,
        phone: contact,
        email,
        address,
        project_type: projectType,
        property_type: propertyType,
        total_area: totalArea || null,
        num_rooms: numRooms || null,
        budget: budget || null,
        timeline: timeline || null,
        message: message || null,
      },
    ]);

    if (error) {
      console.error("Supabase insert error:", error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (err) {
    console.error("API error:", err);
    return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
  }
}

export async function GET() {
  try {
    const { data, error } = await supabase
      .from("contact_inquiries")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Supabase fetch error:", error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ inquiries: data }, { status: 200 });
  } catch (err) {
    console.error("API error:", err);
    return NextResponse.json(
      { error: "Something went wrong while fetching contact inquiries" },
      { status: 500 }
    );
  }
}