"use client";

import React, { useEffect, useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Loader2 } from "lucide-react";

interface Inquiry {
  id: string;
  name: string;
  phone: string;
  email: string;
  address: string;
  project_type: string;
  property_type: string;
  total_area: string | null;
  num_rooms: string | null;
  budget: string | null;
  timeline: string | null;
  message: string | null;
  created_at: string;
}

export default function ContactAdminPage() {
  const [inquiries, setInquiries] = useState<Inquiry[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchInquiries() {
      try {
        const res = await fetch("/api/contact");
        const data = await res.json();

        if (res.ok) {
          setInquiries(data.inquiries || []);
        } else {
          console.error("Error fetching inquiries:", data.error);
        }
      } catch (err) {
        console.error("Fetch error:", err);
      } finally {
        setLoading(false);
      }
    }

    fetchInquiries();
  }, []);

  return (
    <div className="p-8">
      <Card className="shadow-lg rounded-2xl">
        <CardHeader>
          <CardTitle className="text-2xl font-semibold">📋 Contact Inquiries</CardTitle>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="flex justify-center items-center h-40">
              <Loader2 className="animate-spin w-8 h-8 text-gray-500" />
            </div>
          ) : inquiries.length === 0 ? (
            <p className="text-center text-gray-500 py-6">No inquiries found.</p>
          ) : (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Phone</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Project Type</TableHead>
                    <TableHead>Property Type</TableHead>
                    <TableHead>Budget</TableHead>
                    <TableHead>Timeline</TableHead>
                    <TableHead>Message</TableHead>
                    <TableHead>Date</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {inquiries.map((inq) => (
                    <TableRow key={inq.id}>
                      <TableCell className="font-medium">{inq.name}</TableCell>
                      <TableCell>{inq.phone}</TableCell>
                      <TableCell>{inq.email}</TableCell>
                      <TableCell>{inq.project_type}</TableCell>
                      <TableCell>{inq.property_type}</TableCell>
                      <TableCell>{inq.budget || "-"}</TableCell>
                      <TableCell>{inq.timeline || "-"}</TableCell>
                      <TableCell className="max-w-[250px] truncate">{inq.message || "-"}</TableCell>
                      <TableCell>
                        {new Date(inq.created_at).toLocaleString("en-IN", {
                          dateStyle: "medium",
                          timeStyle: "short",
                        })}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
