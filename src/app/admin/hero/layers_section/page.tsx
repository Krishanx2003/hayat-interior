"use client";

import { useEffect, useState } from "react";
import Image from "next/image"; // ✅ Import Next.js Image
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardHeader, CardContent } from "@/components/ui/card";

type Layer = {
  id: number;
  heading: string;
  tagline: string;
  description: string;
  image_top: string;
  image_bottom: string;
  list_items: string;
};

export default function LayersSectionAdmin() {
  const [layersList, setLayersList] = useState<Layer[]>([]);
  const [form, setForm] = useState<{
    id: number;
    heading: string;
    tagline: string;
    description: string;
    image_top: string;
    image_bottom: string;
    list_items: string;
    imageTopFile?: File | null;
    imageBottomFile?: File | null;
  }>({
    id: 0,
    heading: "",
    tagline: "",
    description: "",
    image_top: "",
    image_bottom: "",
    list_items: "",
    imageTopFile: null,
    imageBottomFile: null,
  });
  const [isEditing, setIsEditing] = useState(false);
  const [previewTop, setPreviewTop] = useState("");
  const [previewBottom, setPreviewBottom] = useState("");

  // Fetch all records
  const fetchLayers = async () => {
    const res = await fetch("/api/layers-section");
    const data = await res.json();
    setLayersList(data);
  };

  useEffect(() => {
    fetchLayers();
  }, []);

  // Handle add/update
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("heading", form.heading);
    formData.append("tagline", form.tagline);
    formData.append("description", form.description);
    formData.append("list_items", form.list_items);
    if (form.imageTopFile) formData.append("image_top", form.imageTopFile);
    if (form.imageBottomFile) formData.append("image_bottom", form.imageBottomFile);
    if (isEditing) {
      formData.append("id", String(form.id));
      formData.append("image_top_url", form.image_top);
      formData.append("image_bottom_url", form.image_bottom);
    }

    await fetch("/api/layers-section", {
      method: isEditing ? "PUT" : "POST",
      body: formData,
    });

    setForm({ id: 0, heading: "", tagline: "", description: "", image_top: "", image_bottom: "", list_items: "", imageTopFile: null, imageBottomFile: null });
    setPreviewTop("");
    setPreviewBottom("");
    setIsEditing(false);
    fetchLayers();
  };

  // Handle edit
  const handleEdit = (item: Layer) => {
    setForm({ ...item, imageTopFile: null, imageBottomFile: null });
    setPreviewTop(item.image_top);
    setPreviewBottom(item.image_bottom);
    setIsEditing(true);
  };

  // Handle delete
  const handleDelete = async (id: number) => {
    if (!confirm("Are you sure you want to delete this entry?")) return;
    await fetch("/api/layers-section", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    });
    fetchLayers();
  };

  // Handle file change
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, position: "top" | "bottom") => {
    const file = e.target.files?.[0] || null;
    if (position === "top") {
      setForm({ ...form, imageTopFile: file });
      if (file) setPreviewTop(URL.createObjectURL(file));
    } else {
      setForm({ ...form, imageBottomFile: file });
      if (file) setPreviewBottom(URL.createObjectURL(file));
    }
  };

  return (
    <div className="p-6 space-y-8">
      <Card className="p-4">
        <CardHeader>{isEditing ? "✏️ Edit Layers Section" : "➕ Add Layers Section"}</CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <Input placeholder="Heading" value={form.heading} onChange={(e) => setForm({ ...form, heading: e.target.value })} />
            <Input placeholder="Tagline" value={form.tagline} onChange={(e) => setForm({ ...form, tagline: e.target.value })} />
            <Textarea placeholder="Description" value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} />
            <Textarea placeholder="List items (line-separated)" value={form.list_items} onChange={(e) => setForm({ ...form, list_items: e.target.value })} />

            <div>
              <label>Top Image:</label>
              <Input type="file" accept="image/*" onChange={(e) => handleFileChange(e, "top")} />
              {previewTop && (
                <div className="w-32 mt-2 relative h-32">
                  <Image src={previewTop} alt="Preview Top" fill className="object-cover rounded-md" />
                </div>
              )}
            </div>

            <div>
              <label>Bottom Image:</label>
              <Input type="file" accept="image/*" onChange={(e) => handleFileChange(e, "bottom")} />
              {previewBottom && (
                <div className="w-32 mt-2 relative h-32">
                  <Image src={previewBottom} alt="Preview Bottom" fill className="object-cover rounded-md" />
                </div>
              )}
            </div>

            <Button type="submit">{isEditing ? "Update" : "Add"}</Button>
          </form>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>📋 Layers Section Entries</CardHeader>
        <CardContent className="space-y-3">
          {layersList.map((item) => (
            <div key={item.id} className="border rounded-lg p-3 flex justify-between items-start">
              <div>
                <h3 className="font-semibold">{item.heading}</h3>
                <h4 className="text-sm text-gray-500">{item.tagline}</h4>
                <p className="text-sm text-gray-600">{item.description}</p>
                {item.list_items && (
                  <ul className="list-disc ml-5 mt-1 text-gray-700">
                    {item.list_items.split("\n").map((li, idx) => (
                      <li key={idx}>{li}</li>
                    ))}
                  </ul>
                )}
                <div className="flex gap-2 mt-2">
                  {item.image_top && (
                    <div className="w-24 relative h-24">
                      <Image src={item.image_top} alt="Top Image" fill className="object-cover rounded-md" />
                    </div>
                  )}
                  {item.image_bottom && (
                    <div className="w-24 relative h-24">
                      <Image src={item.image_bottom} alt="Bottom Image" fill className="object-cover rounded-md" />
                    </div>
                  )}
                </div>
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
