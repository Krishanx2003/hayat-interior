"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardHeader, CardContent } from "@/components/ui/card";

type Emotion = {
  id: number;
  heading: string;
  subheading: string;
  description: string;
  image_left: string;
  image_right: string;
};

export default function EmotionSectionAdmin() {
  const [emotionList, setEmotionList] = useState<Emotion[]>([]);
  const [form, setForm] = useState<{
    id: number;
    heading: string;
    subheading: string;
    description: string;
    image_left: string;
    image_right: string;
    imageLeftFile?: File | null;
    imageRightFile?: File | null;
  }>({ id: 0, heading: "", subheading: "", description: "", image_left: "", image_right: "", imageLeftFile: null, imageRightFile: null });
  const [isEditing, setIsEditing] = useState(false);
  const [previewLeft, setPreviewLeft] = useState<string>("");
  const [previewRight, setPreviewRight] = useState<string>("");

  // 🔹 Fetch all records
  const fetchEmotion = async () => {
    const res = await fetch("/api/emotion-section");
    const data = await res.json();
    setEmotionList(data);
  };

  useEffect(() => {
    fetchEmotion();
  }, []);

  // 🔹 Handle add/update
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("heading", form.heading);
    formData.append("subheading", form.subheading);
    formData.append("description", form.description);
    if (form.imageLeftFile) formData.append("image_left", form.imageLeftFile);
    if (form.imageRightFile) formData.append("image_right", form.imageRightFile);
    if (isEditing) {
      formData.append("id", String(form.id));
      formData.append("image_left_url", form.image_left);
      formData.append("image_right_url", form.image_right);
    }

    await fetch("/api/emotion-section", {
      method: isEditing ? "PUT" : "POST",
      body: formData,
    });

    setForm({ id: 0, heading: "", subheading: "", description: "", image_left: "", image_right: "", imageLeftFile: null, imageRightFile: null });
    setPreviewLeft("");
    setPreviewRight("");
    setIsEditing(false);
    fetchEmotion();
  };

  // 🔹 Handle edit
  const handleEdit = (item: Emotion) => {
    setForm({ ...item, imageLeftFile: null, imageRightFile: null });
    setPreviewLeft(item.image_left);
    setPreviewRight(item.image_right);
    setIsEditing(true);
  };

  // 🔹 Handle delete
  const handleDelete = async (id: number) => {
    if (!confirm("Are you sure you want to delete this entry?")) return;
    await fetch("/api/emotion-section", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    });
    fetchEmotion();
  };

  // 🔹 Handle local file selection and preview
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, side: "left" | "right") => {
    const file = e.target.files?.[0] || null;
    if (side === "left") {
      setForm({ ...form, imageLeftFile: file });
      if (file) setPreviewLeft(URL.createObjectURL(file));
    } else {
      setForm({ ...form, imageRightFile: file });
      if (file) setPreviewRight(URL.createObjectURL(file));
    }
  };

  return (
    <div className="p-6 space-y-8">
      <Card className="p-4">
        <CardHeader>{isEditing ? "✏️ Edit Emotion Section" : "➕ Add Emotion Section"}</CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <Input placeholder="Heading" value={form.heading} onChange={(e) => setForm({ ...form, heading: e.target.value })} />
            <Input placeholder="Subheading" value={form.subheading} onChange={(e) => setForm({ ...form, subheading: e.target.value })} />
            <Textarea placeholder="Description" value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} />

            <div>
              <label>Left Image:</label>
              <Input type="file" accept="image/*" onChange={(e) => handleFileChange(e, "left")} />
              {previewLeft && <img src={previewLeft} alt="Preview Left" className="w-32 mt-2 rounded-md" />}
            </div>

            <div>
              <label>Right Image:</label>
              <Input type="file" accept="image/*" onChange={(e) => handleFileChange(e, "right")} />
              {previewRight && <img src={previewRight} alt="Preview Right" className="w-32 mt-2 rounded-md" />}
            </div>

            <Button type="submit">{isEditing ? "Update" : "Add"}</Button>
          </form>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>📋 Emotion Section Entries</CardHeader>
        <CardContent className="space-y-3">
          {emotionList.map((item) => (
            <div key={item.id} className="border rounded-lg p-3 flex justify-between items-center">
              <div>
                <h3 className="font-semibold">{item.heading}</h3>
                <h4 className="text-sm text-gray-500">{item.subheading}</h4>
                <p className="text-sm text-gray-600">{item.description}</p>
                <div className="flex gap-2 mt-2">
                  {item.image_left && <img src={item.image_left} alt="" className="w-24 rounded-md" />}
                  {item.image_right && <img src={item.image_right} alt="" className="w-24 rounded-md" />}
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
