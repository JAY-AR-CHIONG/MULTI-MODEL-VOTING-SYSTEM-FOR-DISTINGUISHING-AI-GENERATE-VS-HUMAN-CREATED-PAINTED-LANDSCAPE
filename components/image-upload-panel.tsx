'use client';

import React from "react"

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Upload, Loader2 } from 'lucide-react';

interface ImageUploadPanelProps {
  onImageUpload: (imageData: string) => void;
  uploadedImage: string | null;
  isProcessing: boolean;
  onAnalysis: () => void;
}

export default function ImageUploadPanel({
  onImageUpload,
  uploadedImage,
  isProcessing,
  onAnalysis,
}: ImageUploadPanelProps) {
  const [dragActive, setDragActive] = useState(false);

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    const files = e.dataTransfer.files;
    if (files && files[0]) {
      handleFile(files[0]);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files[0]) {
      handleFile(files[0]);
    }
  };

  const handleFile = (file: File) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      if (typeof e.target?.result === 'string') {
        onImageUpload(e.target.result);
      }
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="w-full">
      <div
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
        className={`border-2 border-dashed rounded-2xl p-12 text-center transition-all ${
          dragActive
            ? 'border-primary bg-primary/5'
            : 'border-border bg-muted/30 hover:border-primary/50'
        }`}
      >
        <div className="flex flex-col items-center justify-center">
          <Upload className="w-16 h-16 text-primary/60 mb-4" />
          <h2 className="text-2xl font-semibold text-foreground mb-2">Upload Image</h2>
          <p className="text-muted-foreground mb-6">
            Upload an image to analyze whether it is AI-generated or Human-made.
          </p>
          <p className="text-sm text-muted-foreground mb-6">Supports JPG, PNG</p>

          <label className="cursor-pointer">
            <input
              type="file"
              accept="image/jpeg,image/png"
              onChange={handleChange}
              className="hidden"
            />
            <Button variant="default" size="lg" asChild>
              <span>Choose File</span>
            </Button>
          </label>
        </div>
      </div>

      {uploadedImage && (
        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h3 className="text-lg font-semibold text-foreground mb-4">Preview</h3>
            <div className="rounded-xl overflow-hidden border border-border shadow-sm">
              <img
                src={uploadedImage || "/placeholder.svg"}
                alt="Uploaded preview"
                className="w-full h-auto object-cover max-h-96"
              />
            </div>
          </div>

          <div className="flex flex-col justify-center space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-foreground mb-2">Analysis Status</h3>
              <p className="text-muted-foreground mb-6">
                Click the button below to run the multimodel analysis on your image.
              </p>

              {isProcessing && (
                <div className="space-y-2 mb-6 p-4 bg-primary/5 border border-primary/20 rounded-lg">
                  <div className="flex items-center gap-2 text-primary">
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span className="text-sm font-medium">Processing ResNet50…</span>
                  </div>
                  <div className="flex items-center gap-2 text-primary">
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span className="text-sm font-medium">Processing ViT…</span>
                  </div>
                  <div className="flex items-center gap-2 text-primary">
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span className="text-sm font-medium">Processing Random Forest…</span>
                  </div>
                </div>
              )}

              <Button
                onClick={onAnalysis}
                disabled={isProcessing}
                size="lg"
                className="w-full"
              >
                {isProcessing ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Running Analysis...
                  </>
                ) : (
                  'Run Multimodel Analysis'
                )}
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
