'use client';

import React, { useState, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { 
  ArrowLeft,
  FileText, 
  User, 
  LogOut, 
  HelpCircle,
  Plus,
  Mail,
  File,
  X,
  Paperclip,
  Send,
  Copy,
  CheckCircle,
  Info
} from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

interface AttachedFile {
  id: string;
  name: string;
  size: number;
  type: string;
}

export default function EmailClaimPage() {
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('Medical Claim Submission - ');
  const [body, setBody] = useState('');
  const [attachedFiles, setAttachedFiles] = useState<AttachedFile[]>([]);
  const [isSending, setIsSending] = useState(false);
  const [emailCopied, setEmailCopied] = useState(false);
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const netcareEmail = 'claims@netcare.co.za';

  const handleFileUpload = (files: FileList | null) => {
    if (!files) return;

    const newFiles: AttachedFile[] = Array.from(files).map((file, index) => ({
      id: `${Date.now()}-${index}`,
      name: file.name,
      size: file.size,
      type: file.type
    }));

    setAttachedFiles(prev => [...prev, ...newFiles]);
  };

  const removeFile = (fileId: string) => {
    setAttachedFiles(prev => prev.filter(file => file.id !== fileId));
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const copyEmailToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(netcareEmail);
      setEmailCopied(true);
      setTimeout(() => setEmailCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy email:', err);
    }
  };

  const handleSend = async () => {
    setIsSending(true);
    
    // Simulate sending email
    setTimeout(() => {
      setIsSending(false);
      console.log('Email sent with data:', {
        to: netcareEmail,
        from: email,
        subject,
        body,
        attachments: attachedFiles
      });
      router.push('/claim-submitted');
    }, 2000);
  };

  const handleIncludeTemplate = () => {
    const template = `Dear Netcare Claims Team,

I am submitting a medical claim for processing. Please find the attached documents for review.

Patient Details:
- Name: [Your Name]
- Policy Number: [Your Policy Number]
- Contact Number: [Your Phone Number]

Claim Details:
- Service Date: [Date of Service]
- Provider: [Medical Provider Name]
- Amount Claimed: [Amount]

Please let me know if you require any additional information.

Thank you for your assistance.

Best regards,
[Your Name]`;

    setBody(template);
  };

  const canSend = email && subject && body && attachedFiles.length > 0;

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#D0E9F3] to-[#B0D3E0]">
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
            Back to Claim Types
          </Link>
        </div>

        {/* Page Header */}
        <div className="mb-12">
          <div className="flex items-center gap-4 mb-4">
            <div className="p-3 bg-[#3DA9D1]/20 rounded-xl">
              <Mail className="w-8 h-8 text-[#3DA9D1]" />
            </div>
            <div>
              <h2 className="text-4xl font-bold text-[#1D3443]">Submit Claim via Email</h2>
              <p className="text-[#1D3443]/70 text-lg">
                Compose your email and attach your medical documents
              </p>
            </div>
          </div>
        </div>

        {/* Email Composition */}
        <div className="space-y-8">
          {/* Recipient Information */}
          <Card className="bg-white border-[#D3B380]/30 shadow-lg">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-semibold text-[#1D3443] mb-2">Send your claim to:</h3>
                  <div className="flex items-center gap-3">
                    <Mail className="w-5 h-5 text-[#3DA9D1]" />
                    <span className="text-[#3DA9D1] font-mono text-lg">{netcareEmail}</span>
                  </div>
                </div>
                <Button
                  onClick={copyEmailToClipboard}
                  variant="outline"
                  size="sm"
                  className="border-[#D3B380] text-[#1D3443] hover:bg-[#D3B380]/10 hover:border-[#D3B380]"
                >
                  {emailCopied ? (
                    <>
                      <CheckCircle className="w-4 h-4 mr-2" />
                      Copied!
                    </>
                  ) : (
                    <>
                      <Copy className="w-4 h-4 mr-2" />
                      Copy Email
                    </>
                  )}
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Email Form */}
          <Card className="bg-white border-[#D3B380]/30 shadow-lg">
            <CardHeader>
              <CardTitle className="text-[#1D3443] text-xl">Compose Email</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Your Email */}
              <div className="space-y-2">
                <Label htmlFor="email" className="text-[#1D3443] font-medium">
                  Your Email
                </Label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email address"
                  className="bg-[#F8FBFD] border-[#D3B380]/30 text-[#1D3443] placeholder:text-[#1D3443]/40"
                />
              </div>

              {/* Subject */}
              <div className="space-y-2">
                <Label htmlFor="subject" className="text-[#1D3443] font-medium">
                  Subject
                </Label>
                <Input
                  id="subject"
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  placeholder="Enter email subject"
                  className="bg-[#F8FBFD] border-[#D3B380]/30 text-[#1D3443] placeholder:text-[#1D3443]/40"
                />
              </div>

              {/* Message Body */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="body" className="text-[#1D3443] font-medium">
                    Message
                  </Label>
                  <Button
                    onClick={handleIncludeTemplate}
                    variant="outline"
                    size="sm"
                    className="border-[#D3B380] text-[#1D3443] hover:bg-[#D3B380]/10 hover:border-[#D3B380]"
                  >
                    Include Template
                  </Button>
                </div>
                <Textarea
                  id="body"
                  value={body}
                  onChange={(e) => setBody(e.target.value)}
                  placeholder="Compose your message"
                  className="min-h-[200px] bg-[#F8FBFD] border-[#D3B380]/30 text-[#1D3443] placeholder:text-[#1D3443]/40"
                />
              </div>

              {/* File Attachments */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <Label className="text-[#1D3443] font-medium">
                    Attachments
                  </Label>
                  <p className="text-[#1D3443]/60 text-sm">
                    {attachedFiles.length} file(s) attached
                  </p>
                </div>

                {/* Drag & Drop Zone */}
                <div
                  onClick={() => fileInputRef.current?.click()}
                  className="border-2 border-dashed border-[#D3B380]/50 rounded-lg p-8 text-center hover:border-[#D3B380] hover:bg-[#D3B380]/5 transition-colors cursor-pointer"
                >
                  <input
                    ref={fileInputRef}
                    type="file"
                    multiple
                    onChange={(e) => handleFileUpload(e.target.files)}
                    className="hidden"
                  />
                  <Paperclip className="w-8 h-8 text-[#3DA9D1] mx-auto mb-4" />
                  <p className="text-[#1D3443] font-medium mb-2">
                    Click to upload or drag and drop
                  </p>
                  <p className="text-[#1D3443]/60 text-sm">
                    PDF, JPG, PNG (max. 10MB each)
                  </p>
                </div>

                {/* Attached Files List */}
                {attachedFiles.length > 0 && (
                  <div className="space-y-3">
                    {attachedFiles.map((file) => (
                      <div
                        key={file.id}
                        className="flex items-center justify-between p-3 bg-[#F8FBFD] rounded-lg border border-[#D3B380]/30"
                      >
                        <div className="flex items-center gap-3">
                          <div className="p-2 bg-[#3DA9D1]/20 rounded-lg">
                            <File className="w-4 h-4 text-[#3DA9D1]" />
                          </div>
                          <div>
                            <p className="text-[#1D3443] font-medium">{file.name}</p>
                            <p className="text-[#1D3443]/60 text-sm">
                              {formatFileSize(file.size)}
                            </p>
                          </div>
                        </div>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => removeFile(file.id)}
                          className="text-[#1D3443]/60 hover:text-[#1D3443] hover:bg-[#1D3443]/10"
                        >
                          <X className="w-4 h-4" />
                        </Button>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Send Button */}
              <div className="flex items-center justify-between pt-4">
                <div className="flex items-center gap-2 text-[#1D3443]/60">
                  <Info className="w-4 h-4" />
                  <p className="text-sm">All fields are required</p>
                </div>
                <Button
                  onClick={handleSend}
                  disabled={!canSend || isSending}
                  className="bg-[#1D3443] text-white hover:bg-[#1D3443]/90 min-w-[120px]"
                >
                  {isSending ? (
                    'Sending...'
                  ) : (
                    <>
                      <Send className="w-4 h-4 mr-2" />
                      Send
                    </>
                  )}
                </Button>
              </div>
            </CardContent>
          </Card>
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