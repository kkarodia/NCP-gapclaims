'use client';

import React, { useState, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  ArrowLeft,
  FileText, 
  User, 
  LogOut, 
  HelpCircle,
  Plus,
  Upload,
  File,
  X,
  CheckCircle
} from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ThemeToggle } from '@/components/ui/theme-toggle';

interface UploadedFile {
  id: string;
  name: string;
  size: number;
  type: string;
}

export default function UploadDocumentsPage() {
  const [medicalAidFiles, setMedicalAidFiles] = useState<UploadedFile[]>([]);
  const [providerFiles, setProviderFiles] = useState<UploadedFile[]>([]);
  const [isDragging, setIsDragging] = useState<string | null>(null);
  const router = useRouter();
  
  const medicalAidInputRef = useRef<HTMLInputElement>(null);
  const providerInputRef = useRef<HTMLInputElement>(null);

  const handleFileUpload = (files: FileList | null, type: 'medical-aid' | 'provider') => {
    if (!files) return;

    const newFiles: UploadedFile[] = Array.from(files).map((file, index) => ({
      id: `${Date.now()}-${index}`,
      name: file.name,
      size: file.size,
      type: file.type
    }));

    if (type === 'medical-aid') {
      setMedicalAidFiles(prev => [...prev, ...newFiles]);
    } else {
      setProviderFiles(prev => [...prev, ...newFiles]);
    }
  };

  const removeFile = (fileId: string, type: 'medical-aid' | 'provider') => {
    if (type === 'medical-aid') {
      setMedicalAidFiles(prev => prev.filter(file => file.id !== fileId));
    } else {
      setProviderFiles(prev => prev.filter(file => file.id !== fileId));
    }
  };

  const handleDragOver = (e: React.DragEvent, type: string) => {
    e.preventDefault();
    setIsDragging(type);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(null);
  };

  const handleDrop = (e: React.DragEvent, type: 'medical-aid' | 'provider') => {
    e.preventDefault();
    setIsDragging(null);
    handleFileUpload(e.dataTransfer.files, type);
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const canSubmit = medicalAidFiles.length > 0 || providerFiles.length > 0;

  const handleSubmit = () => {
    if (canSubmit) {
      console.log('Submitting files:', { medicalAidFiles, providerFiles });
      router.push('/review-claim');
    }
  };

  const UploadZone = ({ 
    type, 
    title, 
    description, 
    files, 
    inputRef 
  }: { 
    type: 'medical-aid' | 'provider';
    title: string;
    description: string;
    files: UploadedFile[];
    inputRef: React.RefObject<HTMLInputElement>;
  }) => (
    <div className="space-y-6">
      <div>
        <h3 className="text-2xl font-bold text-netcare-white mb-2">{title}</h3>
        <p className="text-netcare-white/70">{description}</p>
      </div>

      <div className="space-y-4">
        <h4 className="text-lg font-semibold text-netcare-white">Upload Document</h4>
        
        <div
          className={`border-2 border-dashed rounded-xl p-8 text-center transition-all duration-300 cursor-pointer ${
            isDragging === type
              ? 'border-cyan-400 bg-cyan-400/10'
              : 'border-netcare-gold/40 hover:border-cyan-400/60 hover:bg-cyan-400/5'
          }`}
          onDragOver={(e) => handleDragOver(e, type)}
          onDragLeave={handleDragLeave}
          onDrop={(e) => handleDrop(e, type)}
          onClick={() => inputRef.current?.click()}
        >
          <div className="flex flex-col items-center space-y-4">
            <div className={`p-4 rounded-full transition-colors ${
              isDragging === type ? 'bg-cyan-400/20' : 'bg-netcare-gold/20'
            }`}>
              <Upload className={`w-8 h-8 ${
                isDragging === type ? 'text-cyan-400' : 'text-cyan-400'
              }`} />
            </div>
            <div>
              <p className="text-lg font-semibold text-netcare-white mb-2">
                Drag and drop your file here
              </p>
              <p className="text-netcare-white/60 mb-4">
                or Browse from your computer
              </p>
              <p className="text-sm text-netcare-white/50">
                PDF, JPG, or PNG up to 5MB
              </p>
            </div>
          </div>
        </div>

        <input
          ref={inputRef}
          type="file"
          multiple
          accept=".pdf,.jpg,.jpeg,.png"
          onChange={(e) => handleFileUpload(e.target.files, type)}
          className="hidden"
        />

        {/* Uploaded Files */}
        {files.length > 0 && (
          <div className="space-y-3">
            <h5 className="font-semibold text-netcare-white">Uploaded Files:</h5>
            {files.map((file) => (
              <div
                key={file.id}
                className="flex items-center justify-between p-4 bg-white/10 rounded-lg border border-netcare-gold/20"
              >
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-cyan-400/20 rounded-lg">
                    <File className="w-5 h-5 text-cyan-400" />
                  </div>
                  <div>
                    <p className="font-medium text-netcare-white">{file.name}</p>
                    <p className="text-sm text-netcare-white/60">{formatFileSize(file.size)}</p>
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => removeFile(file.id, type)}
                  className="text-netcare-white/60 hover:text-red-400 hover:bg-red-400/10"
                >
                  <X className="w-4 h-4" />
                </Button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-netcare-gradient">
      {/* Header */}
      <header className="bg-netcare-navy/95 backdrop-blur-md border-b border-netcare-gold/30 shadow-xl">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-8">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-gradient-to-br from-netcare-gold to-netcare-light-gold rounded-xl flex items-center justify-center shadow-lg">
                  <div className="w-7 h-7 bg-netcare-navy rounded-lg flex items-center justify-center">
                    <div className="w-3 h-3 bg-netcare-gold rounded-sm"></div>
                  </div>
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-netcare-white tracking-tight">NETCARE</h1>
                  <p className="text-sm text-netcare-gold font-medium">plus</p>
                </div>
              </div>
              
              <nav className="flex items-center space-x-8">
                <Link href="/dashboard" className="flex items-center space-x-2 text-netcare-white/80 hover:text-netcare-gold transition-all duration-300 font-medium group">
                  <FileText className="w-4 h-4 group-hover:scale-110 transition-transform" />
                  <span>My Claims</span>
                </Link>
                <Link href="/new-claim" className="flex items-center space-x-2 text-netcare-white hover:text-netcare-gold transition-all duration-300 font-medium group">
                  <Plus className="w-4 h-4 group-hover:scale-110 transition-transform" />
                  <span>New Claim</span>
                </Link>
                <Link href="#" className="flex items-center space-x-2 text-netcare-white/80 hover:text-netcare-gold transition-all duration-300 font-medium group">
                  <HelpCircle className="w-4 h-4 group-hover:scale-110 transition-transform" />
                  <span>Support</span>
                </Link>
              </nav>
            </div>

            <div className="flex items-center space-x-6">
              <div className="flex items-center space-x-3 bg-white/10 rounded-full px-4 py-2 backdrop-blur-sm">
                <div className="w-8 h-8 bg-netcare-gold rounded-full flex items-center justify-center">
                  <User className="w-4 h-4 text-netcare-navy" />
                </div>
                <span className="text-netcare-white font-semibold">SJagjivan</span>
              </div>
              <ThemeToggle />
              <Button variant="ghost" size="sm" className="text-netcare-white/80 hover:text-netcare-gold hover:bg-netcare-gold/10 transition-all duration-300">
                <LogOut className="w-4 h-4 mr-2" />
                Logout
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-6 py-10">
        {/* Back Navigation */}
        <div className="mb-8">
          <Link 
            href="/new-claim" 
            className="inline-flex items-center text-netcare-white/70 hover:text-netcare-gold transition-colors group"
          >
            <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
            Back to Claim Types
          </Link>
        </div>

        {/* Page Header */}
        <div className="mb-12">
          <h2 className="text-4xl font-bold text-netcare-white mb-4">Submit Required Statements</h2>
          <p className="text-netcare-white/70 text-lg">
            Upload your Medical Aid Statement and verify the extracted information
          </p>
        </div>

        {/* Upload Sections */}
        <div className="space-y-16">
          {/* Medical Aid Statement Upload */}
          <Card className="netcare-card border-netcare-gold/30">
            <CardContent className="p-8">
              <UploadZone
                type="medical-aid"
                title="Submit Medical Aid Statement"
                description="Upload your Medical Aid Statement and verify the extracted information"
                files={medicalAidFiles}
                inputRef={medicalAidInputRef}
              />
            </CardContent>
          </Card>

          {/* Medical Provider Statement Upload */}
          <Card className="netcare-card border-netcare-gold/30">
            <CardContent className="p-8">
              <UploadZone
                type="provider"
                title="Submit Medical Provider Statement"
                description="Upload your Medical Provider Statement and verify the extracted information"
                files={providerFiles}
                inputRef={providerInputRef}
              />
            </CardContent>
          </Card>
        </div>

        {/* Submit Button */}
        <div className="flex justify-center mt-12">
          <Button 
            onClick={handleSubmit}
            disabled={!canSubmit}
            className={`px-12 py-4 text-lg font-semibold transition-all duration-300 ${
              canSubmit 
                ? 'netcare-button hover:shadow-2xl hover:scale-105' 
                : 'bg-gray-600 text-gray-400 cursor-not-allowed'
            }`}
          >
            {canSubmit ? (
              <>
                <CheckCircle className="w-5 h-5 mr-2" />
                Submit
              </>
            ) : (
              'Submit'
            )}
          </Button>
        </div>

        {/* Help Text */}
        {!canSubmit && (
          <div className="text-center mt-6">
            <p className="text-netcare-white/60">
              Please upload at least one document to continue
            </p>
          </div>
        )}
      </div>

      {/* Footer */}
      <footer className="bg-netcare-navy/50 border-t border-netcare-gold/20 py-8 mt-16">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-netcare-white/60 text-sm">
              © 2025 ClaimsPro. All rights reserved.
            </p>
            <div className="flex flex-wrap gap-6 text-netcare-white/60">
              <Link href="#" className="hover:text-netcare-gold transition-colors text-sm">Support</Link>
              <Link href="#" className="hover:text-netcare-gold transition-colors text-sm">Privacy Policy</Link>
              <Link href="#" className="hover:text-netcare-gold transition-colors text-sm">Terms of Service</Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}