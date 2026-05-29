"use client";

import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { Upload, Copy, Download, Loader2, X, Image } from "lucide-react";
import { generateAltTextCsv } from "@/lib/export/csv";

interface AltTextResult {
  fileName: string;
  concise: string;
  descriptive: string;
  ecommerce: string;
  preview?: string;
}

export default function AltTextPage() {
  const [files, setFiles] = useState<File[]>([]);
  const [results, setResults] = useState<AltTextResult[]>([]);
  const [loading, setLoading] = useState(false);
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [editField, setEditField] = useState<"concise" | "descriptive" | "ecommerce">("concise");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const dropped = Array.from(e.dataTransfer.files).filter((f) =>
      f.type.startsWith("image/")
    );
    setFiles((prev) => [...prev, ...dropped]);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selected = Array.from(e.target.files ?? []).filter((f) =>
      f.type.startsWith("image/")
    );
    setFiles((prev) => [...prev, ...selected]);
  };

  const removeFile = (index: number) => {
    setFiles((prev) => prev.filter((_, i) => i !== index));
  };

  const handleGenerate = async () => {
    if (files.length === 0) {
      toast.error("Please select at least one image");
      return;
    }

    setLoading(true);
    try {
      const formData = new FormData();
      files.forEach((file) => formData.append("images", file));

      const res = await fetch("/api/jobs/alt-text", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();

      if (!res.ok) {
        toast.error(data.error ?? "Failed to generate alt text");
        return;
      }

      const resultsWithPreviews = data.results.map((r: AltTextResult, i: number) => ({
        ...r,
        preview: files[i] ? URL.createObjectURL(files[i]) : undefined,
      }));

      setResults(resultsWithPreviews);

      if (data.demo) {
        toast.info("Demo results shown. Sign up to generate real AI alt text for all your images.");
      } else {
        toast.success(`Generated alt text for ${data.results.length} image(s)`);
      }
    } catch {
      toast.error("Failed to generate alt text. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast.success("Copied to clipboard");
  };

  const exportCsv = () => {
    const csv = generateAltTextCsv(results);
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `alt-text-export-${Date.now()}.csv`;
    a.click();
    URL.revokeObjectURL(url);
    toast.success("CSV exported");
  };

  const updateResult = (index: number, field: keyof AltTextResult, value: string) => {
    setResults((prev) =>
      prev.map((r, i) => (i === index ? { ...r, [field]: value } : r))
    );
  };

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Alt Text Generator</h1>
        <p className="text-gray-500 mt-1">
          Upload images to generate concise, descriptive, and ecommerce-focused alt text.
        </p>
      </div>

      {/* Upload zone */}
      <Card className="mb-6">
        <CardContent className="p-6">
          <div
            onDrop={handleDrop}
            onDragOver={(e) => e.preventDefault()}
            onClick={() => fileInputRef.current?.click()}
            className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center cursor-pointer hover:border-indigo-400 hover:bg-indigo-50/30 transition-colors"
          >
            <Upload className="h-10 w-10 mx-auto mb-3 text-gray-400" />
            <p className="font-medium text-gray-700">
              Drop images here or click to browse
            </p>
            <p className="text-sm text-gray-500 mt-1">
              JPG, PNG, WebP — up to 5MB each
            </p>
            <input
              ref={fileInputRef}
              type="file"
              multiple
              accept="image/*"
              className="hidden"
              onChange={handleFileChange}
            />
          </div>

          {files.length > 0 && (
            <div className="mt-4">
              <p className="text-sm font-medium text-gray-700 mb-2">
                {files.length} file(s) selected:
              </p>
              <div className="flex flex-wrap gap-2">
                {files.map((file, i) => (
                  <div
                    key={i}
                    className="flex items-center gap-1 bg-gray-100 rounded-md px-3 py-1 text-sm"
                  >
                    <Image className="h-3 w-3 text-gray-500" />
                    <span className="text-gray-700">{file.name}</span>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        removeFile(i);
                      }}
                      className="ml-1 text-gray-400 hover:text-red-500"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="flex gap-3 mt-4">
            <Button
              onClick={handleGenerate}
              disabled={loading || files.length === 0}
              className="flex-1 sm:flex-none"
            >
              {loading ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin mr-2" />
                  Generating...
                </>
              ) : (
                "Generate Alt Text"
              )}
            </Button>

            {results.length > 0 && (
              <Button variant="outline" onClick={exportCsv}>
                <Download className="h-4 w-4 mr-2" />
                Export CSV
              </Button>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Results */}
      {results.length > 0 && (
        <div className="space-y-4">
          <h2 className="text-lg font-semibold text-gray-900">Results</h2>
          {results.map((result, index) => (
            <Card key={index}>
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    {result.preview && (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={result.preview}
                        alt={result.concise}
                        className="h-12 w-12 object-cover rounded border"
                      />
                    )}
                    <CardTitle className="text-base">{result.fileName}</CardTitle>
                  </div>
                  <Badge variant="success">Generated</Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {(["concise", "descriptive", "ecommerce"] as const).map((field) => (
                    <div key={field}>
                      <div className="flex items-center justify-between mb-1">
                        <label className="text-xs font-semibold uppercase tracking-wide text-gray-500">
                          {field === "ecommerce" ? "Ecommerce" : field.charAt(0).toUpperCase() + field.slice(1)}
                          {field === "concise" && " (under 125 chars)"}
                        </label>
                        <div className="flex gap-1">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => {
                              setEditingIndex(index);
                              setEditField(field);
                            }}
                            className="h-6 text-xs"
                          >
                            Edit
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => copyToClipboard(result[field])}
                            className="h-6 text-xs"
                          >
                            <Copy className="h-3 w-3" />
                          </Button>
                        </div>
                      </div>
                      {editingIndex === index && editField === field ? (
                        <div className="space-y-1">
                          <Textarea
                            value={result[field]}
                            onChange={(e) => updateResult(index, field, e.target.value)}
                            className="text-sm"
                            rows={3}
                          />
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => setEditingIndex(null)}
                            className="h-7 text-xs"
                          >
                            Done
                          </Button>
                        </div>
                      ) : (
                        <p className="text-sm text-gray-700 bg-gray-50 rounded p-3">
                          {result[field]}
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
