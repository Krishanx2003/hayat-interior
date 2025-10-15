"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

export default function AdminProjectsPage() {
  const router = useRouter();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [heading, setHeading] = useState("");
  const [list, setList] = useState("");
  const [location, setLocation] = useState("");
  const [images, setImages] = useState<File[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  // Handle file selection
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setImages(Array.from(e.target.files));
    }
  };

  // Remove a selected image
  const handleRemoveImage = (index: number) => {
    setImages((prev) => prev.filter((_, i) => i !== index));
  };

  // Handle form submit
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (images.length === 0) {
      setMessage("❌ Please select at least one image.");
      return;
    }

    setIsSubmitting(true);
    setMessage(null);

    try {
      const formData = new FormData();
      formData.append("title", title);
      formData.append("description", description);
      if (heading) formData.append("heading", heading);
      if (list) formData.append("list", list);
      formData.append("location", location);
      images.forEach((file) => formData.append("images", file));

      const res = await fetch("/api/projects", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.error || "Something went wrong");

      setMessage("✅ Project uploaded successfully!");
      setTitle("");
      setDescription("");
      setHeading("");
      setList("");
      setLocation("");
      setImages([]);

      // Refresh project list or page
      router.refresh();
    } catch (error: any) {
      console.error("❌ Error uploading project:", error);
      setMessage(error.message || "Upload failed");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto px-6 py-12">
      <h1 className="text-3xl font-semibold mb-8">
        🛠️ Admin Panel — Add Project
      </h1>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Title */}
        <div>
          <label className="block font-medium mb-1">Project Title *</label>
          <input
            type="text"
            className="w-full border border-gray-300 rounded-lg p-2"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>

        {/* Description */}
        <div>
          <label className="block font-medium mb-1">Description *</label>
          <textarea
            className="w-full border border-gray-300 rounded-lg p-2 h-28"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </div>

        {/* Heading */}
        <div>
          <label className="block font-medium mb-1">Heading (optional)</label>
          <input
            type="text"
            className="w-full border border-gray-300 rounded-lg p-2"
            value={heading}
            onChange={(e) => setHeading(e.target.value)}
          />
        </div>

        {/* List */}
        <div>
          <label className="block font-medium mb-1">
            List (bullet points, new line separated)
          </label>
          <textarea
            className="w-full border border-gray-300 rounded-lg p-2 h-28"
            value={list}
            onChange={(e) => setList(e.target.value)}
            placeholder={"• First Point\n• Second Point\n• Third Point"}
          />
        </div>

        {/* Location */}
        <div>
          <label className="block font-medium mb-1">Location *</label>
          <input
            type="text"
            className="w-full border border-gray-300 rounded-lg p-2"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            required
          />
        </div>

        {/* Images */}
        <div>
          <label className="block font-medium mb-1">
            Project Images (multiple) *
          </label>
          <input
            type="file"
            accept="image/*"
            multiple
            onChange={handleFileChange}
            className="w-full border border-gray-300 rounded-lg p-2"
            required
          />

          {images.length > 0 && (
            <div className="mt-3 flex flex-wrap gap-3">
              {images.map((file, idx) => (
                <div
                  key={idx}
                  className="relative w-24 h-24 border rounded overflow-hidden"
                >
                  <img
                    src={URL.createObjectURL(file)}
                    alt={`Preview ${idx + 1}`}
                    className="w-full h-full object-cover"
                  />
                  <button
                    type="button"
                    onClick={() => handleRemoveImage(idx)}
                    className="absolute top-1 right-1 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs"
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Submit */}
        <Button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-black text-white hover:bg-gray-800 transition"
        >
          {isSubmitting ? "Uploading..." : "Upload Project"}
        </Button>
      </form>

      {/* Message */}
      {message && (
        <div
          className={`mt-4 p-3 rounded ${
            message.startsWith("✅")
              ? "bg-green-100 text-green-700"
              : "bg-red-100 text-red-700"
          }`}
        >
          {message}
        </div>
      )}
    </div>
  );
}
