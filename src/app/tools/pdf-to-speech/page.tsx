"use client";

import { useState, useRef, useEffect } from "react";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";
import Link from "next/link";
import { Upload, Play, Pause, Square, Loader2, ArrowRight, FileText } from "lucide-react";

export default function FreePdfToSpeechPage() {
  const [text, setText] = useState("");
  const [isPlaying, setIsPlaying] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [speed, setSpeed] = useState("1");
  const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([]);
  const [selectedVoice, setSelectedVoice] = useState("");
  const [loading, setLoading] = useState(false);
  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const loadVoices = () => {
      const v = window.speechSynthesis.getVoices();
      setVoices(v);
      if (v.length > 0 && !selectedVoice) {
        const eng = v.find((x) => x.lang.startsWith("en"));
        setSelectedVoice(eng?.name ?? v[0].name);
      }
    };
    loadVoices();
    window.speechSynthesis.onvoiceschanged = loadVoices;
    return () => { window.speechSynthesis.cancel(); };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleFileUpload = async (file: File) => {
    if (file.size > 5 * 1024 * 1024) {
      toast.error("File too large (max 5MB for free tool)");
      return;
    }

    if (file.type !== "application/pdf") {
      toast.error("Please upload a PDF file");
      return;
    }

    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("file", file);

      const res = await fetch("/api/jobs/extract-text", {
        method: "POST",
        body: formData,
      });

      if (res.status === 401) {
        toast.error("Please sign up to extract text from PDFs.");
        return;
      }

      const data = await res.json();
      if (!res.ok) {
        toast.error(data.error ?? "Failed to extract text");
        return;
      }

      setText(data.text);
      toast.success("Text extracted! Press Play to listen.");
    } catch {
      toast.error("Failed to process PDF");
    } finally {
      setLoading(false);
    }
  };

  const play = () => {
    if (!text.trim()) {
      toast.error("No text to read. Upload a PDF or paste text first.");
      return;
    }

    if (isPaused) {
      window.speechSynthesis.resume();
      setIsPlaying(true);
      setIsPaused(false);
      return;
    }

    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = parseFloat(speed);
    const voice = voices.find((v) => v.name === selectedVoice);
    if (voice) utterance.voice = voice;

    utterance.onstart = () => { setIsPlaying(true); setIsPaused(false); };
    utterance.onend = () => { setIsPlaying(false); setIsPaused(false); };
    utterance.onerror = () => { setIsPlaying(false); setIsPaused(false); };

    utteranceRef.current = utterance;
    window.speechSynthesis.speak(utterance);
  };

  const pause = () => {
    window.speechSynthesis.pause();
    setIsPlaying(false);
    setIsPaused(true);
  };

  const stop = () => {
    window.speechSynthesis.cancel();
    setIsPlaying(false);
    setIsPaused(false);
  };

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 py-12">
          <div className="text-center mb-10">
            <Badge className="mb-3 bg-green-100 text-green-700 hover:bg-green-100">Free Tool</Badge>
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
              Free PDF to Speech Reader
            </h1>
            <p className="text-gray-600 max-w-xl mx-auto">
              Upload a PDF or paste text below. Choose your voice and speed, then press Play.
              No subscription required.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Input */}
            <div className="space-y-4">
              <Card>
                <CardContent className="p-6">
                  <p className="text-sm font-medium text-gray-700 mb-3">Upload PDF</p>
                  <div
                    onClick={() => fileInputRef.current?.click()}
                    className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center cursor-pointer hover:border-indigo-400 hover:bg-indigo-50/30 transition-colors"
                  >
                    <Upload className="h-8 w-8 mx-auto mb-2 text-gray-400" />
                    <p className="text-sm text-gray-600">Click to upload PDF (max 5MB)</p>
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept=".pdf,application/pdf"
                      className="hidden"
                      onChange={(e) => {
                        const f = e.target.files?.[0];
                        if (f) handleFileUpload(f);
                      }}
                    />
                  </div>
                  {loading && (
                    <div className="flex items-center gap-2 mt-3 text-sm text-gray-500">
                      <Loader2 className="h-4 w-4 animate-spin" />
                      Extracting text...
                    </div>
                  )}
                </CardContent>
              </Card>

              <div className="text-center text-sm text-gray-400">— or paste text directly —</div>

              <Textarea
                placeholder="Paste any text here to have it read aloud..."
                value={text}
                onChange={(e) => setText(e.target.value)}
                rows={8}
              />
            </div>

            {/* Player */}
            <div className="space-y-4">
              <Card>
                <CardContent className="p-6">
                  <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
                    <FileText className="h-4 w-4 text-indigo-600" />
                    Player Controls
                  </h3>

                  <div className="flex gap-3 mb-4">
                    {!isPlaying ? (
                      <Button onClick={play} size="lg" className="flex-1">
                        <Play className="h-5 w-5 mr-2" />
                        {isPaused ? "Resume" : "Play"}
                      </Button>
                    ) : (
                      <Button onClick={pause} size="lg" variant="secondary" className="flex-1">
                        <Pause className="h-5 w-5 mr-2" />
                        Pause
                      </Button>
                    )}
                    <Button onClick={stop} variant="outline" size="lg">
                      <Square className="h-4 w-4" />
                    </Button>
                  </div>

                  <div className="space-y-3">
                    <div>
                      <label className="text-xs text-gray-500 block mb-1">Speed</label>
                      <Select value={speed} onValueChange={setSpeed}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="0.5">0.5x — Slow</SelectItem>
                          <SelectItem value="0.75">0.75x</SelectItem>
                          <SelectItem value="1">1x — Normal</SelectItem>
                          <SelectItem value="1.25">1.25x</SelectItem>
                          <SelectItem value="1.5">1.5x — Fast</SelectItem>
                          <SelectItem value="2">2x — Very Fast</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <label className="text-xs text-gray-500 block mb-1">Voice</label>
                      <Select value={selectedVoice} onValueChange={setSelectedVoice}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select voice" />
                        </SelectTrigger>
                        <SelectContent>
                          {voices.map((v) => (
                            <SelectItem key={v.name} value={v.name}>
                              {v.name} ({v.lang})
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {text && (
                <Card>
                  <CardContent className="p-4">
                    <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">
                      Text Preview
                    </p>
                    <div className="max-h-48 overflow-y-auto text-sm text-gray-700 leading-relaxed">
                      {text.slice(0, 500)}{text.length > 500 && "..."}
                    </div>
                    <p className="text-xs text-gray-400 mt-2">{text.length} characters</p>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>

          <Card className="mt-8 bg-indigo-50 border-indigo-200">
            <CardContent className="p-6 flex flex-col sm:flex-row items-start sm:items-center gap-4">
              <div className="flex-1">
                <h3 className="font-semibold text-gray-900 mb-1">Need more sessions?</h3>
                <p className="text-sm text-gray-600">
                  Sign up free to get 3 read-aloud sessions per month plus alt text generation. Pro at $19/mo gives 50 sessions/month.
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
