"use client";

import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";
import {
  Upload,
  Play,
  Pause,
  Square,
  Loader2,
  Volume2,
  FileText,
  Image,
  Type,
} from "lucide-react";

export default function ReadAloudPage() {
  const [extractedText, setExtractedText] = useState("");
  const [loading, setLoading] = useState(false);
  const [pastedText, setPastedText] = useState("");
  const [isPlaying, setIsPlaying] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [speed, setSpeed] = useState("1");
  const [selectedVoice, setSelectedVoice] = useState("");
  const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([]);
  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const screenshotInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const loadVoices = () => {
      const availableVoices = window.speechSynthesis.getVoices();
      setVoices(availableVoices);
      if (availableVoices.length > 0 && !selectedVoice) {
        // Prefer English voices
        const englishVoice = availableVoices.find((v) => v.lang.startsWith("en"));
        setSelectedVoice(englishVoice?.name ?? availableVoices[0].name);
      }
    };

    loadVoices();
    window.speechSynthesis.onvoiceschanged = loadVoices;

    return () => {
      window.speechSynthesis.cancel();
    };
  }, [selectedVoice]);

  const uploadFile = async (file: File) => {
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("file", file);

      const res = await fetch("/api/jobs/extract-text", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();

      if (!res.ok) {
        toast.error(data.error ?? "Failed to extract text");
        return;
      }

      setExtractedText(data.text);
      toast.success("Text extracted successfully. Press Play to listen.");
    } catch {
      toast.error("Failed to process file");
    } finally {
      setLoading(false);
    }
  };

  const submitPastedText = async () => {
    if (!pastedText.trim()) {
      toast.error("Please enter some text");
      return;
    }

    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("text", pastedText);

      const res = await fetch("/api/jobs/extract-text", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();

      if (!res.ok) {
        toast.error(data.error ?? "Failed to process text");
        return;
      }

      setExtractedText(data.text);
      toast.success("Ready to read aloud. Press Play to start.");
    } catch {
      toast.error("Failed to process text");
    } finally {
      setLoading(false);
    }
  };

  const play = () => {
    if (!extractedText.trim()) {
      toast.error("No text to read. Upload a file or paste text first.");
      return;
    }

    if (isPaused && utteranceRef.current) {
      window.speechSynthesis.resume();
      setIsPlaying(true);
      setIsPaused(false);
      return;
    }

    window.speechSynthesis.cancel();

    const utterance = new SpeechSynthesisUtterance(extractedText);
    utterance.rate = parseFloat(speed);

    if (selectedVoice) {
      const voice = voices.find((v) => v.name === selectedVoice);
      if (voice) utterance.voice = voice;
    }

    utterance.onstart = () => {
      setIsPlaying(true);
      setIsPaused(false);
    };

    utterance.onend = () => {
      setIsPlaying(false);
      setIsPaused(false);
    };

    utterance.onerror = () => {
      setIsPlaying(false);
      setIsPaused(false);
      toast.error("Speech synthesis failed");
    };

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
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Read Aloud</h1>
        <p className="text-gray-500 mt-1">
          Upload a PDF, screenshot, or paste text to listen using your browser&apos;s text-to-speech.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Input */}
        <div>
          <Tabs defaultValue="pdf">
            <TabsList className="w-full">
              <TabsTrigger value="pdf" className="flex-1">
                <FileText className="h-4 w-4 mr-2" />
                PDF
              </TabsTrigger>
              <TabsTrigger value="screenshot" className="flex-1">
                <Image className="h-4 w-4 mr-2" />
                Screenshot
              </TabsTrigger>
              <TabsTrigger value="text" className="flex-1">
                <Type className="h-4 w-4 mr-2" />
                Paste Text
              </TabsTrigger>
            </TabsList>

            <TabsContent value="pdf">
              <Card>
                <CardContent className="p-6">
                  <div
                    onClick={() => fileInputRef.current?.click()}
                    className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center cursor-pointer hover:border-indigo-400 hover:bg-indigo-50/30 transition-colors"
                  >
                    <Upload className="h-10 w-10 mx-auto mb-3 text-gray-400" />
                    <p className="font-medium text-gray-700">Upload PDF</p>
                    <p className="text-sm text-gray-500 mt-1">Max 10MB</p>
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept=".pdf,application/pdf"
                      className="hidden"
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) uploadFile(file);
                      }}
                    />
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="screenshot">
              <Card>
                <CardContent className="p-6">
                  <div
                    onClick={() => screenshotInputRef.current?.click()}
                    className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center cursor-pointer hover:border-indigo-400 hover:bg-indigo-50/30 transition-colors"
                  >
                    <Upload className="h-10 w-10 mx-auto mb-3 text-gray-400" />
                    <p className="font-medium text-gray-700">Upload Screenshot or Image</p>
                    <p className="text-sm text-gray-500 mt-1">
                      Text will be extracted via OCR
                    </p>
                    <input
                      ref={screenshotInputRef}
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) uploadFile(file);
                      }}
                    />
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="text">
              <Card>
                <CardContent className="p-6 space-y-3">
                  <Textarea
                    placeholder="Paste your text here..."
                    value={pastedText}
                    onChange={(e) => setPastedText(e.target.value)}
                    rows={8}
                  />
                  <Button
                    onClick={submitPastedText}
                    disabled={loading || !pastedText.trim()}
                    className="w-full"
                  >
                    {loading ? (
                      <>
                        <Loader2 className="h-4 w-4 animate-spin mr-2" />
                        Processing...
                      </>
                    ) : (
                      "Prepare Text"
                    )}
                  </Button>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>

        {/* Player & preview */}
        <div className="space-y-4">
          {/* Audio player */}
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-gray-900 flex items-center gap-2">
                  <Volume2 className="h-4 w-4 text-indigo-600" />
                  Player
                </h3>
                {loading && (
                  <div className="flex items-center gap-2 text-sm text-gray-500">
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Extracting text...
                  </div>
                )}
              </div>

              <div className="flex items-center gap-3 mb-4">
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

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs text-gray-500 block mb-1">Speed</label>
                  <Select value={speed} onValueChange={setSpeed}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="0.5">0.5x</SelectItem>
                      <SelectItem value="0.75">0.75x</SelectItem>
                      <SelectItem value="1">1x</SelectItem>
                      <SelectItem value="1.25">1.25x</SelectItem>
                      <SelectItem value="1.5">1.5x</SelectItem>
                      <SelectItem value="2">2x</SelectItem>
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
                      {voices.map((voice) => (
                        <SelectItem key={voice.name} value={voice.name}>
                          {voice.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Text preview */}
          <Card>
            <CardContent className="p-6">
              <h3 className="font-semibold text-gray-900 mb-3">Extracted Text</h3>
              {extractedText ? (
                <div className="max-h-64 overflow-y-auto text-sm text-gray-700 leading-relaxed whitespace-pre-wrap bg-gray-50 rounded p-3">
                  {extractedText}
                </div>
              ) : (
                <div className="text-center text-gray-400 py-8">
                  <FileText className="h-8 w-8 mx-auto mb-2 opacity-30" />
                  <p className="text-sm">Upload a file or paste text to see it here</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
