"use client";

import { useEffect, useState } from "react";
import Image from "next/image"; // ✅ Import Next.js Image
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardHeader, CardContent } from "@/components/ui/card";

type About = {
  id: number;
  heading: string;
  image_url: string;
  description_1: string;
  description_2: string;
};

export default function AboutSectionAdmin() {
  const [aboutList, setAboutList] = useState<About[]>([]);
  const [form, setForm] = useState<{
    id: number;
    heading: string;
    image_url: string;
    description_1: string;
    description_2: string;
    imageFile?: File | null;
  }>({ id: 0, heading: "", image_url: "", description_1: "", description_2: "", imageFile: null });
  const [isEditing, setIsEditing] = useState(false);
  const [preview, setPreview] = useState("");

  // Fetch all records
  const fetchAbout = async () => {
    const res = await fetch("/api/about-section");
    const data = await res.json();
    setAboutList(data);
  };

  useEffect(() => {
    fetchAbout();
  }, []);

  // Handle add/update
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("heading", form.heading);
    formData.append("description_1", form.description_1);
    formData.append("description_2", form.description_2);
    if (form.imageFile) formData.append("image", form.imageFile);
    if (isEditing) {
      formData.append("id", String(form.id));
      formData.append("image_url", form.image_url);
    }

    await fetch("/api/about-section", {
      method: isEditing ? "PUT" : "POST",
      body: formData,
    });

    setForm({ id: 0, heading: "", image_url: "", description_1: "", description_2: "", imageFile: null });
    setPreview("");
    setIsEditing(false);
    fetchAbout();
  };

  // Handle edit
  const handleEdit = (item: About) => {
    setForm({ ...item, imageFile: null });
    setPreview(item.image_url);
    setIsEditing(true);
  };

  // Handle delete
  const handleDelete = async (id: number) => {
    if (!confirm("Are you sure you want to delete this entry?")) return;
    await fetch("/api/about-section", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    });
    fetchAbout();
  };

  // Handle local file selection
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setForm({ ...form, imageFile: file });
    if (file) setPreview(URL.createObjectURL(file));
  };

  return (
    <div className="p-6 space-y-8">
      <Card className="p-4">
        <CardHeader>{isEditing ? "✏️ Edit About Section" : "➕ Add About Section"}</CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <Input placeholder="Heading" value={form.heading} onChange={(e) => setForm({ ...form, heading: e.target.value })} />
            <Textarea placeholder="Description 1" value={form.description_1} onChange={(e) => setForm({ ...form, description_1: e.target.value })} />
            <Textarea placeholder="Description 2" value={form.description_2} onChange={(e) => setForm({ ...form, description_2: e.target.value })} />
            <Input type="file" accept="image/*" onChange={handleFileChange} />
            {preview && (
              <div className="w-32 mt-2 relative h-32">
                <Image src={preview} alt="Preview" fill className="object-cover rounded-md" />
              </div>
            )}
            <Button type="submit">{isEditing ? "Update" : "Add"}</Button>
          </form>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>📋 About Section Entries</CardHeader>
        <CardContent className="space-y-3">
          {aboutList.map((item) => (
            <div key={item.id} className="border rounded-lg p-3 flex justify-between items-center">
              <div>
                <h3 className="font-semibold">{item.heading}</h3>
                <p className="text-sm text-gray-600">{item.description_1}</p>
                <p className="text-sm text-gray-600">{item.description_2}</p>
                {item.image_url && (
                  <div className="w-32 mt-2 relative h-32">
                    <Image src={item.image_url} alt={item.heading} fill className="object-cover rounded-md" />
                  </div>
                )}
              </div>
              <div className="space-x-2">
                <Button variant="outline" onClick={() => handleEdit(item)}>Edit</Button>
                <Button variant="destructive" onClick={() => handleDelete(item.id)}>Delete</Button>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
