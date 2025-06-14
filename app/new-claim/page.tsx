'use client';

import React, { useState } from 'react';
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
  Mail,
  CheckCircle,
  ArrowRight
} from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

export default function NewClaimPage() {
  const [selectedOption, setSelectedOption] = useState<'upload' | 'email' | null>(null);
  const router = useRouter();

  const handleContinue = () => {
    if (selectedOption === 'upload') {
      router.push('/upload-documents');
    } else if (selectedOption === 'email') {
      router.push('/email-claim');
    }
  };

  return (
    <div className="min-h-screen">
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
            href="/dashboard" 
            className="inline-flex items-center text-[#1D3443] hover:text-[#3DA9D1] transition-colors group"
          >
            <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
            Back to Claims Summary
          </Link>
        </div>

        {/* Page Header */}
        <div className="mb-12">
          <h2 className="text-4xl font-bold text-[#1D3443] mb-4">Start a New Claim</h2>
          <p className="text-[#1D3443]/70 text-lg">Select the type of claim you want to submit</p>
        </div>

        {/* Claim Options */}
        <div className="grid md:grid-cols-2 gap-8 mb-12">
          {/* Upload Option */}
          <Card 
            className={`bg-white shadow-lg cursor-pointer transition-all duration-300 hover:scale-105 hover:shadow-2xl ${
              selectedOption === 'upload' 
                ? 'border-[#3DA9D1] bg-[#3DA9D1]/5 shadow-[#3DA9D1]/20' 
                : 'border-[#D3B380]/50 hover:border-[#3DA9D1]'
            }`}
            onClick={() => setSelectedOption('upload')}
          >
            <CardHeader className="text-center pb-6">
              <div className="flex justify-center mb-6">
                <div className={`p-6 rounded-2xl transition-all duration-300 ${
                  selectedOption === 'upload' 
                    ? 'bg-[#3DA9D1]/10 shadow-lg' 
                    : 'bg-[#D3B380]/20'
                }`}>
                  <Upload className={`w-12 h-12 ${
                    selectedOption === 'upload' ? 'text-[#3DA9D1]' : 'text-[#1D3443]'
                  }`} />
                </div>
              </div>
              <CardTitle className="text-2xl font-bold text-[#1D3443] mb-3">
                Submit claim
              </CardTitle>
              <p className="text-[#1D3443]/70 text-base leading-relaxed">
                Upload statement from your account
              </p>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="space-y-4">
                <div className="flex items-center gap-3 text-[#1D3443]">
                  <CheckCircle className="w-5 h-5 text-[#3DA9D1] flex-shrink-0" />
                  <span className="text-sm">Upload medical aid statements directly</span>
                </div>
                <div className="flex items-center gap-3 text-[#1D3443]">
                  <CheckCircle className="w-5 h-5 text-[#3DA9D1] flex-shrink-0" />
                  <span className="text-sm">Automatic information extraction</span>
                </div>
                <div className="flex items-center gap-3 text-[#1D3443]">
                  <CheckCircle className="w-5 h-5 text-[#3DA9D1] flex-shrink-0" />
                  <span className="text-sm">Faster processing time</span>
                </div>
              </div>
              {selectedOption === 'upload' && (
                <div className="mt-6 p-4 bg-[#3DA9D1]/10 rounded-lg border border-[#3DA9D1]/30">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-5 h-5 text-[#3DA9D1]" />
                    <span className="text-[#1D3443] font-medium">Selected</span>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Email Option */}
          <Card 
            className={`bg-white shadow-lg cursor-pointer transition-all duration-300 hover:scale-105 hover:shadow-2xl ${
              selectedOption === 'email' 
                ? 'border-[#3DA9D1] bg-[#3DA9D1]/5 shadow-[#3DA9D1]/20' 
                : 'border-[#D3B380]/50 hover:border-[#3DA9D1]'
            }`}
            onClick={() => setSelectedOption('email')}
          >
            <CardHeader className="text-center pb-6">
              <div className="flex justify-center mb-6">
                <div className={`p-6 rounded-2xl transition-all duration-300 ${
                  selectedOption === 'email' 
                    ? 'bg-[#3DA9D1]/10 shadow-lg' 
                    : 'bg-[#D3B380]/20'
                }`}>
                  <Mail className={`w-12 h-12 ${
                    selectedOption === 'email' ? 'text-[#3DA9D1]' : 'text-[#1D3443]'
                  }`} />
                </div>
              </div>
              <CardTitle className="text-2xl font-bold text-[#1D3443] mb-3">
                Submit claim via Email
              </CardTitle>
              <p className="text-[#1D3443]/70 text-base leading-relaxed">
                Send your statement to Netcare
              </p>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="space-y-4">
                <div className="flex items-center gap-3 text-[#1D3443]">
                  <CheckCircle className="w-5 h-5 text-[#3DA9D1] flex-shrink-0" />
                  <span className="text-sm">Email your documents directly</span>
                </div>
                <div className="flex items-center gap-3 text-[#1D3443]">
                  <CheckCircle className="w-5 h-5 text-[#3DA9D1] flex-shrink-0" />
                  <span className="text-sm">Submit from any device</span>
                </div>
                <div className="flex items-center gap-3 text-[#1D3443]">
                  <CheckCircle className="w-5 h-5 text-[#3DA9D1] flex-shrink-0" />
                  <span className="text-sm">Convenient for mobile users</span>
                </div>
              </div>
              {selectedOption === 'email' && (
                <div className="mt-6 p-4 bg-[#3DA9D1]/10 rounded-lg border border-[#3DA9D1]/30">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-5 h-5 text-[#3DA9D1]" />
                    <span className="text-[#1D3443] font-medium">Selected</span>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Continue Button */}
        <div className="flex justify-center">
          <Button 
            onClick={handleContinue}
            disabled={!selectedOption}
            className={`px-12 py-4 text-lg font-semibold transition-all duration-300 ${
              selectedOption 
                ? 'bg-[#1D3443] text-white hover:bg-[#1D3443]/90 hover:shadow-2xl hover:scale-105' 
                : 'bg-gray-200 text-gray-400 cursor-not-allowed'
            }`}
          >
            Continue With Selected Option
            <ArrowRight className="w-5 h-5 ml-2" />
          </Button>
        </div>

        {/* Help Section */}
        <div className="mt-16">
          <Card className="bg-white shadow-lg border border-[#D3B380]/50">
            <CardContent className="p-8 text-center">
              <div className="flex justify-center mb-4">
                <div className="p-3 bg-[#D3B380]/20 rounded-xl">
                  <HelpCircle className="w-8 h-8 text-[#3DA9D1]" />
                </div>
              </div>
              <h3 className="text-xl font-bold text-[#1D3443] mb-3">Need Help?</h3>
              <p className="text-[#1D3443]/70 mb-6 max-w-2xl mx-auto">
                If you're unsure which option to choose or need assistance with your claim submission, 
                our support team is here to help.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button 
                  variant="outline" 
                  className="border-[#3DA9D1] text-[#3DA9D1] hover:bg-[#3DA9D1] hover:text-white"
                >
                  Contact Support
                </Button>
                <Button 
                  variant="outline" 
                  className="border-[#D3B380] text-[#1D3443] hover:bg-[#D3B380] hover:text-[#1D3443]"
                >
                  View FAQ
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