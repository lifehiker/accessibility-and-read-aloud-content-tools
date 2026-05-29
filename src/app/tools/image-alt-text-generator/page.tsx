"use client";

import { useState, useRef } from "react";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import Link from "next/link";
import { Upload, Copy, Loader2, ArrowRight } from "lucide-react";

interface AltTextResult {
  fileName: string;
  concise: string;
  descriptive: string;
  ecommerce: string;
}

export default function FreeAltTextToolPage() {
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [result, setResult] = useState<AltTextResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [isDemo, setIsDemo] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0];
    if (!f) return;
    if (!f.type.startsWith("image/")) {
      toast.error("Please select an image file");
      return;
    }
    setFile(f);
    setPreview(URL.createObjectURL(f));
    setResult(null);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const f = e.dataTransfer.files[0];
    if (!f?.type.startsWith("image/")) {
      toast.error("Please drop an image file");
      return;
    }
    setFile(f);
    setPreview(URL.createObjectURL(f));
    setResult(null);
  };

  const handleGenerate = async () => {
    if (!file) {
      toast.error("Please select an image first");
      return;
    }
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("images", file);

      const res = await fetch("/api/jobs/alt-text", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();

      if (!res.ok) {
        toast.error(data.error ?? "Failed to generate alt text");
        return;
      }

      setResult(data.results[0]);
      setIsDemo(data.demo === true);

      if (data.demo) {
        toast.info("Demo result shown. Sign up for real AI-powered alt text.");
      } else {
        toast.success("Alt text generated!");
      }
    } catch {
      toast.error("Failed to generate. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const copy = (text: string) => {
    navigator.clipboard.writeText(text);
    toast.success("Copied!");
  };

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 py-12">
          <div className="text-center mb-10">
            <Badge className="mb-3 bg-green-100 text-green-700 hover:bg-green-100">Free Tool</Badge>
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
              Free Image Alt Text Generator
            </h1>
            <p className="text-gray-600 max-w-xl mx-auto">
              Upload an image and get three ready-to-use alt text variants instantly. No signup required to try.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Upload */}
            <Card>
              <CardContent className="p-6">
                <div
                  onDrop={handleDrop}
                  onDragOver={(e) => e.preventDefault()}
                  onClick={() => fileInputRef.current?.click()}
                  className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center cursor-pointer hover:border-indigo-400 hover:bg-indigo-50/30 transition-colors"
                >
                  {preview ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={preview}
                      alt="Preview"
                      className="max-h-48 mx-auto object-contain rounded"
                    />
                  ) : (
                    <>
                      <Upload className="h-10 w-10 mx-auto mb-3 text-gray-400" />
                      <p className="font-medium text-gray-700">Drop an image here or click to browse</p>
                      <p className="text-sm text-gray-500 mt-1">JPG, PNG, WebP — up to 5MB</p>
                    </>
                  )}
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handleFileChange}
                  />
                </div>
                {file && (
                  <p className="text-sm text-gray-500 mt-2">{file.name}</p>
                )}
                <Button
                  onClick={handleGenerate}
                  disabled={!file || loading}
                  className="w-full mt-4"
                  size="lg"
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
              </CardContent>
            </Card>

            {/* Results */}
            <Card>
              <CardContent className="p-6">
                {result ? (
                  <div className="space-y-4">
                    {isDemo && (
                      <div className="bg-amber-50 border border-amber-200 rounded-lg p-3 text-sm text-amber-800">
                        Demo result shown. <Link href="/signup" className="underline font-medium">Sign up free</Link> for real AI-powered alt text.
                      </div>
                    )}
                    {(["concise", "descriptive", "ecommerce"] as const).map((field) => (
                      <div key={field}>
                        <div className="flex items-center justify-between mb-1">
                          <label className="text-xs font-bold uppercase tracking-wide text-gray-500">
                            {field === "ecommerce" ? "Ecommerce" : field.charAt(0).toUpperCase() + field.slice(1)}
                          </label>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => copy(result[field])}
                            className="h-6 text-xs"
                          >
                            <Copy className="h-3 w-3 mr-1" />
                            Copy
                          </Button>
                        </div>
                        <p className="text-sm text-gray-700 bg-gray-50 rounded p-3">
                          {result[field]}
                        </p>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="h-full flex flex-col items-center justify-center text-center py-8 text-gray-400">
                    <Upload className="h-10 w-10 mb-3 opacity-30" />
                    <p className="text-sm">Upload an image to see alt text results here</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Sign up CTA */}
          <Card className="mt-8 bg-indigo-50 border-indigo-200">
            <CardContent className="p-6 flex flex-col sm:flex-row items-start sm:items-center gap-4">
              <div className="flex-1">
                <h3 className="font-semibold text-gray-900 mb-1">
                  Want to process multiple images at once?
                </h3>
                <p className="text-sm text-gray-600">
                  Sign up free to get 10 alt text generations, batch upload, and CSV export. No credit card required.
                </p>
              </div>
              <Button asChild>
                <Link href="/signup">
                  Get Full Access <ArrowRight className="h-4 w-4 ml-2" />
                </Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </main>
      <Footer />
    </>
  );
}
