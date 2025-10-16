"use client";

import { useState } from "react";

export default function AdminServicePage() {
  const [type, setType] = useState<"service" | "renovation">("service");
  const [file, setFile] = useState<File | null>(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [alt, setAlt] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{ text: string; type: "success" | "error" } | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setMessage(null);

    if (!file || !title || !description) {
      setMessage({ text: "Please fill all required fields.", type: "error" });
      return;
    }

    const formData = new FormData();
    formData.append("type", type);
    formData.append("file", file);
    formData.append("title", title);
    formData.append("description", description);
    if (type === "service") {
      formData.append("alt", alt);
    }

    try {
      setLoading(true);
      const res = await fetch("/api/services", {
        method: "POST",
        body: formData,
      });

      const data: { error?: string } = await res.json();
      if (!res.ok) throw new Error(data.error || "Upload failed");

      setMessage({ text: `${type} uploaded successfully ✅`, type: "success" });
      setFile(null);
      setTitle("");
      setDescription("");
      setAlt("");
    } catch (err) {
      if (err instanceof Error) {
        setMessage({ text: err.message, type: "error" });
      } else {
        setMessage({ text: "An unknown error occurred.", type: "error" });
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">🛠 Admin Panel — Upload</h1>

      {/* Type Switch */}
      <div className="mb-6 flex gap-4">
        <button
          type="button"
          onClick={() => setType("service")}
          className={`px-4 py-2 rounded-lg border ${
            type === "service" ? "bg-blue-600 text-white" : "bg-white text-gray-700"
          }`}
        >
          Service
        </button>
        <button
          type="button"
          onClick={() => setType("renovation")}
          className={`px-4 py-2 rounded-lg border ${
            type === "renovation" ? "bg-blue-600 text-white" : "bg-white text-gray-700"
          }`}
        >
          Renovation
        </button>
      </div>

      {/* Upload Form */}
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Image Upload */}
        <div>
          <label className="block text-sm font-medium mb-1">Image *</label>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setFile(e.target.files?.[0] || null)}
            className="w-full border rounded-lg p-2"
          />
          {file && <p className="text-sm text-gray-500 mt-1">{file.name}</p>}
        </div>

        {/* Title */}
        <div>
          <label className="block text-sm font-medium mb-1">Title *</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full border rounded-lg p-2"
            placeholder="Enter title"
          />
        </div>

        {/* Description */}
        <div>
          <label className="block text-sm font-medium mb-1">Description *</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full border rounded-lg p-2"
            placeholder="Enter description"
            rows={3}
          />
        </div>

        {/* Alt text for service only */}
        {type === "service" && (
          <div>
            <label className="block text-sm font-medium mb-1">Alt Text</label>
            <input
              type="text"
              value={alt}
              onChange={(e) => setAlt(e.target.value)}
              className="w-full border rounded-lg p-2"
              placeholder="Image alt text"
            />
          </div>
        )}

        {/* Submit Button */}
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 disabled:opacity-50"
        >
          {loading ? "Uploading..." : `Upload ${type}`}
        </button>
      </form>

      {/* Message */}
      {message && (
        <div
          className={`mt-4 p-3 rounded-lg text-center ${
            message.type === "success"
              ? "bg-green-100 text-green-700"
              : "bg-red-100 text-red-700"
          }`}
        >
          {message.text}
        </div>
      )}
    </div>
  );
}
