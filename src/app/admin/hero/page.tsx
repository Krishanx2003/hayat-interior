"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { Loader2, Upload, RefreshCcw } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function HeroAdminPage() {
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);
  const [loadingImage, setLoadingImage] = useState(false);
  const [heroUrl, setHeroUrl] = useState<string | null>(null);

  // 🔹 Fetch the latest hero image on mount
  const fetchHeroImage = async () => {
    setLoadingImage(true);
    try {
      const res = await fetch("/api/hero/image", { method: "GET" });
      const data = await res.json();
      if (res.ok) {
        setHeroUrl(data.imageUrl);
      } else {
        console.error("Failed to fetch hero image:", data.error);
      }
    } catch (error) {
      console.error("Error fetching hero image:", error);
    } finally {
      setLoadingImage(false);
    }
  };

  useEffect(() => {
    fetchHeroImage();
  }, []);

  // 🔹 Handle file input
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selected = e.target.files?.[0];
    if (selected) {
      setFile(selected);
      setPreview(URL.createObjectURL(selected));
    }
  };

  // 🔹 Handle upload to /api/hero
  const handleUpload = async () => {
    if (!file) return alert("Please select an image first.");
    setUploading(true);

    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await fetch("/api/hero/image", {
        method: "POST",
        body: formData,
      });
      const data = await res.json();

      if (res.ok) {
        alert("✅ Hero image uploaded successfully!");
        setHeroUrl(data.url);
        setFile(null);
        setPreview(null);
      } else {
        alert(`❌ Upload failed: ${data.error}`);
      }
    } catch (error) {
      console.error(error);
      alert("Something went wrong while uploading.");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="p-8">
      <Card className="shadow-lg rounded-2xl">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-2xl font-semibold">
            🖼 Manage Hero Image
          </CardTitle>
          <Button
            variant="outline"
            size="sm"
            onClick={fetchHeroImage}
            disabled={loadingImage}
          >
            <RefreshCcw className={`w-4 h-4 mr-1 ${loadingImage ? "animate-spin" : ""}`} />
            Refresh
          </Button>
        </CardHeader>

        <CardContent>
          <div className="space-y-6">
            {/* File Input */}
            <Input type="file" accept="image/*" onChange={handleFileChange} />

            {/* Preview before upload */}
            {preview && (
              <div className="mt-4">
                <p className="text-gray-500 mb-2">Preview:</p>
                <Image
                  src={preview}
                  alt="Preview"
                  width={600}
                  height={400}
                  className="rounded-lg shadow-md border"
                />
              </div>
            )}

            {/* Upload button */}
            <Button
              onClick={handleUpload}
              disabled={!file || uploading}
              className="flex items-center gap-2"
            >
              {uploading ? (
                <>
                  <Loader2 className="animate-spin w-4 h-4" /> Uploading...
                </>
              ) : (
                <>
                  <Upload className="w-4 h-4" /> Upload Image
                </>
              )}
            </Button>

            {/* Current hero image */}
            <div className="mt-6">
              <p className="text-gray-600 mb-2 font-medium">🖼 Current Hero Image:</p>
              {loadingImage ? (
                <div className="flex items-center text-gray-500">
                  <Loader2 className="animate-spin w-4 h-4 mr-2" /> Loading image...
                </div>
              ) : heroUrl ? (
                <Image
                  src={heroUrl}
                  alt="Current Hero"
                  width={600}
                  height={400}
                  className="rounded-lg border shadow"
                />
              ) : (
                <p className="text-gray-400 italic">No hero image found.</p>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
