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
import Image from 'next/image';

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
        <h3 className="text-2xl font-bold text-[#1D3443] mb-2">{title}</h3>
        <p className="text-[#1D3443]/70">{description}</p>
      </div>

      <div className="space-y-4">
        <h4 className="text-lg font-semibold text-[#1D3443]">Upload Document</h4>
        
        <div
          className={`border-2 border-dashed rounded-xl p-8 text-center transition-all duration-300 cursor-pointer bg-white ${
            isDragging === type
              ? 'border-[#3DA9D1] bg-[#3DA9D1]/5'
              : 'border-[#D3B380]/50 hover:border-[#3DA9D1] hover:bg-[#3DA9D1]/5'
          }`}
          onDragOver={(e) => handleDragOver(e, type)}
          onDragLeave={handleDragLeave}
          onDrop={(e) => handleDrop(e, type)}
          onClick={() => inputRef.current?.click()}
        >
          <div className="flex flex-col items-center space-y-4">
            <div className={`p-4 rounded-full transition-colors ${
              isDragging === type ? 'bg-[#3DA9D1]/20' : 'bg-[#D3B380]/20'
            }`}>
              <Upload className={`w-8 h-8 ${
                isDragging === type ? 'text-[#3DA9D1]' : 'text-[#1D3443]'
              }`} />
            </div>
            <div>
              <p className="text-lg font-semibold text-[#1D3443] mb-2">
                Drag and drop your file here
              </p>
              <p className="text-[#1D3443]/70 mb-4">
                or Browse from your computer
              </p>
              <p className="text-sm text-[#1D3443]/50">
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
            <h5 className="font-semibold text-[#1D3443]">Uploaded Files:</h5>
            {files.map((file) => (
              <div
                key={file.id}
                className="flex items-center justify-between p-4 bg-white rounded-lg border border-[#D3B380]/30 shadow-sm"
              >
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-[#3DA9D1]/20 rounded-lg">
                    <File className="w-5 h-5 text-[#3DA9D1]" />
                  </div>
                  <div>
                    <p className="font-medium text-[#1D3443]">{file.name}</p>
                    <p className="text-sm text-[#1D3443]/60">{formatFileSize(file.size)}</p>
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => removeFile(file.id, type)}
                  className="text-[#1D3443]/60 hover:text-red-600 hover:bg-red-50"
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
    <div className="min-h-screen bg-[#D0E9F3]">
      {/* Header */}
      <header className="bg-netcare-navy/95 backdrop-blur-md border-b border-netcare-gold/30 shadow-xl">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-8">
              <div className="flex items-center space-x-3">
                <Image
                  src="/assets/images/netcarelogo.png"
                  alt="Netcare Logo"
                  width={64}
                  height={64}
                  className="object-contain"
                />
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
                <Link href="/new-claim" className="flex items-center space-x-2 text-netcare-white/80 hover:text-netcare-gold transition-all duration-300 font-medium group">
                  <Plus className="w-4 h-4 group-hover:scale-110 transition-transform" />
                  <span>New Claim</span>
                </Link>
                <Link href="/support" className="flex items-center space-x-2 text-netcare-white/80 hover:text-netcare-gold transition-all duration-300 font-medium group">
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
            className="inline-flex items-center text-[#1D3443] hover:text-[#3DA9D1] transition-colors group"
          >
            <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
            Back to Claim Options
          </Link>
        </div>

        {/* Page Header */}
        <div className="mb-12">
          <h2 className="text-4xl font-bold text-[#1D3443] mb-4">Upload Documents</h2>
          <p className="text-[#1D3443]/70 text-lg">
            Please upload your medical aid statements and provider documents
          </p>
        </div>

        {/* Upload Sections */}
        <div className="space-y-12">
          <Card className="bg-white shadow-lg border border-[#D3B380]/30">
            <CardContent className="p-8">
              <UploadZone
                type="medical-aid"
                title="Medical Aid Statement"
                description="Upload your medical aid statement showing the claim details and amounts"
                files={medicalAidFiles}
                inputRef={medicalAidInputRef}
              />
            </CardContent>
          </Card>

          <Card className="bg-white shadow-lg border border-[#D3B380]/30">
            <CardContent className="p-8">
              <UploadZone
                type="provider"
                title="Provider Documents"
                description="Upload any supporting documents from your healthcare provider"
                files={providerFiles}
                inputRef={providerInputRef}
              />
            </CardContent>
          </Card>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-end mt-8 space-x-4">
          <Button
            variant="outline"
            onClick={() => router.back()}
            className="border-[#D3B380] text-[#1D3443] hover:bg-[#D3B380]/10"
          >
            Cancel
          </Button>
          <Button
            onClick={handleSubmit}
            disabled={!canSubmit}
            className={`px-8 py-2 text-base font-semibold transition-all duration-300 ${
              canSubmit
                ? 'bg-[#1D3443] text-white hover:bg-[#1D3443]/90'
                : 'bg-gray-200 text-gray-400 cursor-not-allowed'
            }`}
          >
            Continue to Review
          </Button>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-netcare-navy/95 backdrop-blur-md border-t border-netcare-gold/30 shadow-xl py-8 mt-16">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-netcare-white/60 text-sm">
              © 2025 ClaimsPro. All rights reserved.
            </p>
            <div className="flex flex-wrap gap-6 text-netcare-white/60">
              <Link href="/support" className="hover:text-netcare-gold transition-colors text-sm">Support</Link>
              <Link href="#" className="hover:text-netcare-gold transition-colors text-sm">Privacy Policy</Link>
              <Link href="#" className="hover:text-netcare-gold transition-colors text-sm">Terms of Service</Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}