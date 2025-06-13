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
import { ThemeToggle } from '@/components/ui/theme-toggle';

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
    <div className="min-h-screen">
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
          <div className="flex items-center gap-4 mb-4">
            <div className="p-3 bg-cyan-400/20 rounded-xl">
              <Mail className="w-8 h-8 text-cyan-400" />
            </div>
            <div>
              <h2 className="text-4xl font-bold text-netcare-white">Submit Claim via Email</h2>
              <p className="text-netcare-white/70 text-lg">
                Compose your email and attach your medical documents
              </p>
            </div>
          </div>
        </div>

        {/* Email Composition */}
        <div className="space-y-8">
          {/* Recipient Information */}
          <Card className="netcare-card border-cyan-400/30 bg-cyan-400/5">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-semibold text-netcare-white mb-2">Send your claim to:</h3>
                  <div className="flex items-center gap-3">
                    <Mail className="w-5 h-5 text-cyan-400" />
                    <span className="text-cyan-400 font-mono text-lg">{netcareEmail}</span>
                  </div>
                </div>
                <Button
                  onClick={copyEmailToClipboard}
                  variant="outline"
                  size="sm"
                  className="border-cyan-400 text-cyan-400 hover:bg-cyan-400 hover:text-slate-900"
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
          <Card className="netcare-card border-netcare-gold/30">
            <CardHeader>
              <CardTitle className="text-netcare-white text-xl">Compose Email</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Your Email */}
              <div className="space-y-2">
                <Label htmlFor="email" className="text-netcare-white/80 font-medium">
                  Your Email:
                </Label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your.email@example.com"
                  className="netcare-input h-12"
                  required
                />
              </div>

              {/* Subject */}
              <div className="space-y-2">
                <Label htmlFor="subject" className="text-netcare-white/80 font-medium">
                  Subject:
                </Label>
                <Input
                  id="subject"
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  placeholder="Medical Claim Submission - [Your Name]"
                  className="netcare-input h-12"
                  required
                />
              </div>

              {/* Body */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="body" className="text-netcare-white/80 font-medium">
                    Body:
                  </Label>
                  <Button
                    onClick={handleIncludeTemplate}
                    variant="ghost"
                    size="sm"
                    className="text-cyan-400 hover:text-cyan-300 hover:bg-cyan-400/10"
                  >
                    <FileText className="w-4 h-4 mr-2" />
                    Include Template
                  </Button>
                </div>
                <Textarea
                  id="body"
                  value={body}
                  onChange={(e) => setBody(e.target.value)}
                  placeholder="Enter your message here..."
                  className="netcare-input min-h-[200px] resize-none"
                  required
                />
                <p className="text-netcare-white/50 text-sm">
                  Example email body here
                </p>
              </div>

              {/* File Attachments */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <Label className="text-netcare-white/80 font-medium">
                    Attachments:
                  </Label>
                  <Button
                    onClick={() => fileInputRef.current?.click()}
                    variant="outline"
                    size="sm"
                    className="border-netcare-gold text-netcare-gold hover:bg-netcare-gold hover:text-netcare-navy"
                  >
                    <Paperclip className="w-4 h-4 mr-2" />
                    Attach Files
                  </Button>
                </div>

                <input
                  ref={fileInputRef}
                  type="file"
                  multiple
                  accept=".pdf,.jpg,.jpeg,.png"
                  onChange={(e) => handleFileUpload(e.target.files)}
                  className="hidden"
                />

                {/* Mock attached file */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-4 bg-white/10 rounded-lg border border-netcare-gold/20">
                    <div className="flex items-center space-x-3">
                      <div className="p-2 bg-red-500/20 rounded-lg">
                        <File className="w-5 h-5 text-red-400" />
                      </div>
                      <div>
                        <p className="font-medium text-netcare-white">Mock_Medical_Aid_Statement.pdf</p>
                        <p className="text-sm text-netcare-white/60">2 KB</p>
                      </div>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-netcare-white/60 hover:text-red-400 hover:bg-red-400/10"
                    >
                      <X className="w-4 h-4" />
                    </Button>
                  </div>

                  {/* Display uploaded files */}
                  {attachedFiles.map((file) => (
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
                        onClick={() => removeFile(file.id)}
                        className="text-netcare-white/60 hover:text-red-400 hover:bg-red-400/10"
                      >
                        <X className="w-4 h-4" />
                      </Button>
                    </div>
                  ))}
                </div>

                {attachedFiles.length === 0 && (
                  <div className="text-center py-8 border-2 border-dashed border-netcare-gold/30 rounded-lg">
                    <Paperclip className="w-8 h-8 text-netcare-white/40 mx-auto mb-3" />
                    <p className="text-netcare-white/60">No files attached yet</p>
                    <p className="text-netcare-white/40 text-sm">Click "Attach Files" to add your documents</p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-end">
            <Button
              onClick={() => router.push('/new-claim')}
              variant="outline"
              className="border-netcare-gold/50 text-netcare-white hover:bg-netcare-gold/10 hover:border-netcare-gold h-12 px-8 text-base font-semibold"
            >
              Cancel
            </Button>
            <Button
              onClick={handleSend}
              disabled={!canSend || isSending}
              className={`h-12 px-8 text-base font-semibold transition-all duration-300 ${
                canSend && !isSending
                  ? 'netcare-button hover:shadow-2xl hover:scale-105'
                  : 'bg-gray-600 text-gray-400 cursor-not-allowed'
              }`}
            >
              {isSending ? (
                <div className="flex items-center space-x-2">
                  <div className="w-4 h-4 border-2 border-netcare-navy border-t-transparent rounded-full animate-spin"></div>
                  <span>Sending...</span>
                </div>
              ) : (
                <>
                  <Send className="w-5 h-5 mr-2" />
                  Send
                </>
              )}
            </Button>
          </div>

          {/* Help Information */}
          <Card className="netcare-card border-cyan-400/30 bg-cyan-400/5">
            <CardContent className="p-6">
              <div className="flex items-start gap-4">
                <div className="p-2 bg-cyan-400/20 rounded-lg flex-shrink-0">
                  <Info className="w-5 h-5 text-cyan-400" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-cyan-300 mb-2">
                    Email Submission Tips
                  </h3>
                  <ul className="text-cyan-200/80 space-y-2 text-sm">
                    <li>• Include all relevant medical documents as attachments</li>
                    <li>• Use a clear subject line with your name or policy number</li>
                    <li>• Provide your contact information in the email body</li>
                    <li>• Supported file formats: PDF, JPG, PNG (max 5MB each)</li>
                    <li>• You'll receive a confirmation email once your claim is received</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
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