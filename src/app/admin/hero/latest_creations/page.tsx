"use client";

import { useEffect, useState } from "react";
import Image from "next/image"; // ✅ Import Next.js Image
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardHeader, CardContent } from "@/components/ui/card";

type Creation = {
  id: number;
  title: string;
  comment: string;
  image_url: string;
  alt_text: string;
  sort_order: number;
};

export default function LatestCreationsAdmin() {
  const [creationsList, setCreationsList] = useState<Creation[]>([]);
  const [form, setForm] = useState<{
    id: number;
    title: string;
    comment: string;
    image_url: string;
    alt_text: string;
    sort_order: number;
    imageFile?: File | null;
  }>({ id: 0, title: "", comment: "", image_url: "", alt_text: "", sort_order: 0, imageFile: null });
  const [isEditing, setIsEditing] = useState(false);
  const [preview, setPreview] = useState<string>("");

  // Fetch all records
  const fetchCreations = async () => {
    const res = await fetch("/api/latest-creations");
    const data = await res.json();
    setCreationsList(data);
  };

  useEffect(() => {
    fetchCreations();
  }, []);

  // Handle add/update
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("title", form.title);
    formData.append("comment", form.comment);
    formData.append("alt_text", form.alt_text);
    formData.append("sort_order", String(form.sort_order));
    if (form.imageFile) formData.append("image", form.imageFile);
    if (isEditing) {
      formData.append("id", String(form.id));
      formData.append("image_url", form.image_url);
    }

    await fetch("/api/latest-creations", {
      method: isEditing ? "PUT" : "POST",
      body: formData,
    });

    setForm({ id: 0, title: "", comment: "", image_url: "", alt_text: "", sort_order: 0, imageFile: null });
    setPreview("");
    setIsEditing(false);
    fetchCreations();
  };

  // Handle edit
  const handleEdit = (item: Creation) => {
    setForm({ ...item, imageFile: null });
    setPreview(item.image_url);
    setIsEditing(true);
  };

  // Handle delete
  const handleDelete = async (id: number) => {
    if (!confirm("Are you sure you want to delete this entry?")) return;
    await fetch("/api/latest-creations", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    });
    fetchCreations();
  };

  // Handle file selection
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setForm({ ...form, imageFile: file });
    if (file) setPreview(URL.createObjectURL(file));
  };

  return (
    <div className="p-6 space-y-8">
      <Card className="p-4">
        <CardHeader>{isEditing ? "✏️ Edit Creation" : "➕ Add Creation"}</CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <Input placeholder="Title" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} />
            <Textarea placeholder="Comment" value={form.comment} onChange={(e) => setForm({ ...form, comment: e.target.value })} />
            <Input placeholder="Alt Text" value={form.alt_text} onChange={(e) => setForm({ ...form, alt_text: e.target.value })} />
            <Input type="number" placeholder="Sort Order" value={form.sort_order} onChange={(e) => setForm({ ...form, sort_order: Number(e.target.value) })} />
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
        <CardHeader>📋 Latest Creations Entries</CardHeader>
        <CardContent className="space-y-3">
          {creationsList.map((item) => (
            <div key={item.id} className="border rounded-lg p-3 flex justify-between items-center">
              <div>
                <h3 className="font-semibold">{item.title}</h3>
                <p className="text-sm text-gray-600">{item.comment}</p>
                {item.image_url && (
                  <div className="w-32 mt-2 relative h-32">
                    <Image src={item.image_url} alt={item.alt_text} fill className="object-cover rounded-md" />
                  </div>
                )}
                <p className="text-xs text-gray-500">Sort Order: {item.sort_order}</p>
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
