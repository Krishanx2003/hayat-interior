"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardHeader, CardContent } from "@/components/ui/card";

type Intro = {
  id: number;
  heading: string;
  image_url: string;
  description: string;
};

export default function IntroSectionAdmin() {
  const [introList, setIntroList] = useState<Intro[]>([]);
  const [form, setForm] = useState<{
    id: number;
    heading: string;
    image_url: string;
    description: string;
    imageFile?: File | null;
  }>({ id: 0, heading: "", image_url: "", description: "", imageFile: null });
  const [isEditing, setIsEditing] = useState(false);
  const [preview, setPreview] = useState<string>("");

  // 🔹 Fetch all records
  const fetchIntro = async () => {
    const res = await fetch("/api/intro-section");
    const data = await res.json();
    setIntroList(data);
  };

  useEffect(() => {
    fetchIntro();
  }, []);

  // 🔹 Handle add/update
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("heading", form.heading);
    formData.append("description", form.description);
    if (form.imageFile) formData.append("image", form.imageFile);
    if (isEditing) {
      formData.append("id", String(form.id));
      formData.append("image_url", form.image_url);
    }

    await fetch("/api/intro-section", {
      method: isEditing ? "PUT" : "POST",
      body: formData,
    });

    setForm({ id: 0, heading: "", image_url: "", description: "", imageFile: null });
    setPreview("");
    setIsEditing(false);
    fetchIntro();
  };

  // 🔹 Handle edit
  const handleEdit = (item: Intro) => {
    setForm({ ...item, imageFile: null });
    setPreview(item.image_url);
    setIsEditing(true);
  };

  // 🔹 Handle delete
  const handleDelete = async (id: number) => {
    await fetch("/api/intro-section", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    });
    fetchIntro();
  };

  // 🔹 Handle local file selection and preview
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setForm({ ...form, imageFile: file });
    if (file) setPreview(URL.createObjectURL(file));
  };

  return (
    <div className="p-6 space-y-8">
      <Card className="p-4">
        <CardHeader>{isEditing ? "✏️ Edit Intro Section" : "➕ Add Intro Section"}</CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              placeholder="Heading"
              value={form.heading}
              onChange={(e) => setForm({ ...form, heading: e.target.value })}
            />
            <Textarea
              placeholder="Description"
              value={form.description}
              onChange={(e) => setForm({ ...form, description: e.target.value })}
            />
            <Input type="file" accept="image/*" onChange={handleFileChange} />
            {preview && <img src={preview} alt="Preview" className="w-32 mt-2 rounded-md" />}
            <Button type="submit">{isEditing ? "Update" : "Add"}</Button>
          </form>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>📋 Intro Section Entries</CardHeader>
        <CardContent className="space-y-3">
          {introList.map((item) => (
            <div key={item.id} className="border rounded-lg p-3 flex justify-between items-center">
              <div>
                <h3 className="font-semibold">{item.heading}</h3>
                <p className="text-sm text-gray-600">{item.description}</p>
                {item.image_url && <img src={item.image_url} alt="" className="w-32 mt-2 rounded-md" />}
              </div>
              <div className="space-x-2">
                <Button variant="outline" onClick={() => handleEdit(item)}>
                  Edit
                </Button>
                <Button variant="destructive" onClick={() => handleDelete(item.id)}>
                  Delete
                </Button>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
