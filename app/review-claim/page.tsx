'use client';

import React, { useState } from 'react';
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
  File,
  Edit3,
  CheckCircle,
  Eye,
  Download
} from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ThemeToggle } from '@/components/ui/theme-toggle';
import Image from 'next/image';

interface DocumentInfo {
  policyNumber: string;
  patientName: string;
  medicalAidScheme: string;
  amountPaid: string;
  amountUnpaid: string;
  reasonsForNonPayment: string;
}

export default function ReviewClaimPage() {
  const router = useRouter();
  const [isEditing, setIsEditing] = useState(false);
  const [documentInfo, setDocumentInfo] = useState<DocumentInfo>({
    policyNumber: 'POL-12345',
    patientName: 'John Doe',
    medicalAidScheme: 'HealthCare Plus',
    amountPaid: '750',
    amountUnpaid: '250',
    reasonsForNonPayment: 'Exceeds annual limit'
  });

  const uploadedDocuments = [
    {
      id: '1',
      name: 'Mock_Claim_Statement.pdf',
      size: '2.2 KB',
      type: 'Medical Aid Statement'
    },
    {
      id: '2',
      name: 'Mock_Medical_Provider_Statement.pdf',
      size: '2.2 KB',
      type: 'Medical Provider Statement'
    }
  ];

  const handleInputChange = (field: keyof DocumentInfo, value: string) => {
    setDocumentInfo(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmitClaim = () => {
    console.log('Submitting claim with data:', documentInfo);
    // Navigate to success page or dashboard
    router.push('/claim-submitted');
  };

  const handleCancel = () => {
    router.push('/upload-documents');
  };

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
      <div className="max-w-6xl mx-auto px-6 py-10">
        {/* Back Navigation */}
        <div className="mb-8">
          <Link 
            href="/upload-documents" 
            className="inline-flex items-center text-[#1D3443] hover:text-[#3DA9D1] transition-colors group"
          >
            <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
            Back to Document Upload
          </Link>
        </div>

        {/* Page Header */}
        <div className="mb-12">
          <h2 className="text-4xl font-bold text-[#1D3443] mb-4">Review Claim Documents</h2>
          <p className="text-[#1D3443]/70 text-lg">
            Review the extracted information and make any necessary corrections before submitting your claim
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Left Column - Uploaded Documents */}
          <div className="space-y-8">
            <Card className="bg-white shadow-lg border border-[#D3B380]/30">
              <CardHeader>
                <CardTitle className="text-[#1D3443] text-xl">Uploaded Documents</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {uploadedDocuments.map((doc) => (
                  <div
                    key={doc.id}
                    className="flex items-center justify-between p-4 bg-[#F8FBFD] rounded-lg border border-[#D3B380]/20 hover:bg-[#F0F7FB] transition-colors"
                  >
                    <div className="flex items-center space-x-3">
                      <div className="p-2 bg-[#3DA9D1]/20 rounded-lg">
                        <File className="w-5 h-5 text-[#3DA9D1]" />
                      </div>
                      <div>
                        <p className="font-medium text-[#1D3443]">{doc.name}</p>
                        <p className="text-sm text-[#1D3443]/60">{doc.size} • {doc.type}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-[#1D3443]/60 hover:text-[#3DA9D1] hover:bg-[#3DA9D1]/10"
                      >
                        <Eye className="w-4 h-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-[#1D3443]/60 hover:text-[#3DA9D1] hover:bg-[#3DA9D1]/10"
                      >
                        <Download className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Document Preview */}
            <Card className="bg-white shadow-lg border border-[#D3B380]/30">
              <CardHeader>
                <CardTitle className="text-[#1D3443] text-xl">Document Preview</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="bg-[#F8FBFD] rounded-lg p-6">
                  <div className="border-l-4 border-[#3DA9D1] pl-4">
                    <h3 className="font-bold text-[#1D3443] text-lg mb-4">Medical Statement</h3>
                    
                    <div className="space-y-4 text-sm">
                      <div>
                        <h4 className="font-semibold text-[#1D3443] mb-2">Provider & Member Information</h4>
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <p><span className="font-medium text-[#1D3443]">Medical Aid Provider:</span> <span className="text-[#1D3443]/80">HealthCare Plus</span></p>
                            <p><span className="font-medium text-[#1D3443]">Member Name:</span> <span className="text-[#1D3443]/80">John Doe</span></p>
                            <p><span className="font-medium text-[#1D3443]">Membership Number:</span> <span className="text-[#1D3443]/80">POL-12345</span></p>
                          </div>
                          <div>
                            <p><span className="font-medium text-[#1D3443]">Plan Type:</span> <span className="text-[#1D3443]/80">Comprehensive Plus</span></p>
                            <p><span className="font-medium text-[#1D3443]">Statement Date:</span> <span className="text-[#1D3443]/80">27 May 2025</span></p>
                            <p><span className="font-medium text-[#1D3443]">Coverage Period:</span> <span className="text-[#1D3443]/80">01 May 2025 - 27 May 2025</span></p>
                          </div>
                        </div>
                      </div>

                      <div>
                        <h4 className="font-semibold text-[#1D3443] mb-2">Patient Details</h4>
                        <p><span className="font-medium text-[#1D3443]">Patient Name:</span> <span className="text-[#1D3443]/80">John Doe</span></p>
                        <p><span className="font-medium text-[#1D3443]">Dependent Code:</span> <span className="text-[#1D3443]/80">00 (Main Member)</span></p>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Column - Document Information */}
          <div className="space-y-8">
            <Card className="bg-white shadow-lg border border-[#D3B380]/30">
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle className="text-[#1D3443] text-xl">Document Information</CardTitle>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setIsEditing(!isEditing)}
                  className="text-[#3DA9D1] hover:text-[#3DA9D1]/80 hover:bg-[#3DA9D1]/10"
                >
                  <Edit3 className="w-4 h-4 mr-2" />
                  {isEditing ? 'Save' : 'Edit'}
                </Button>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid gap-6">
                  <div className="space-y-2">
                    <Label className="text-[#1D3443]">Policy Number</Label>
                    <Input
                      value={documentInfo.policyNumber}
                      onChange={(e) => handleInputChange('policyNumber', e.target.value)}
                      disabled={!isEditing}
                      className="bg-[#F8FBFD] border-[#D3B380]/30 text-[#1D3443]"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label className="text-[#1D3443]">Patient Name</Label>
                    <Input
                      value={documentInfo.patientName}
                      onChange={(e) => handleInputChange('patientName', e.target.value)}
                      disabled={!isEditing}
                      className="bg-[#F8FBFD] border-[#D3B380]/30 text-[#1D3443]"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label className="text-[#1D3443]">Medical Aid Scheme</Label>
                    <Input
                      value={documentInfo.medicalAidScheme}
                      onChange={(e) => handleInputChange('medicalAidScheme', e.target.value)}
                      disabled={!isEditing}
                      className="bg-[#F8FBFD] border-[#D3B380]/30 text-[#1D3443]"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label className="text-[#1D3443]">Amount Paid (R)</Label>
                      <Input
                        value={documentInfo.amountPaid}
                        onChange={(e) => handleInputChange('amountPaid', e.target.value)}
                        disabled={!isEditing}
                        className="bg-[#F8FBFD] border-[#D3B380]/30 text-[#1D3443]"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label className="text-[#1D3443]">Amount Unpaid (R)</Label>
                      <Input
                        value={documentInfo.amountUnpaid}
                        onChange={(e) => handleInputChange('amountUnpaid', e.target.value)}
                        disabled={!isEditing}
                        className="bg-[#F8FBFD] border-[#D3B380]/30 text-[#1D3443]"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label className="text-[#1D3443]">Reasons for Non-Payment</Label>
                    <Textarea
                      value={documentInfo.reasonsForNonPayment}
                      onChange={(e) => handleInputChange('reasonsForNonPayment', e.target.value)}
                      disabled={!isEditing}
                      className="bg-[#F8FBFD] border-[#D3B380]/30 text-[#1D3443] min-h-[100px]"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Action Buttons */}
            <div className="flex justify-end space-x-4">
              <Button
                variant="outline"
                onClick={handleCancel}
                className="border-[#D3B380] text-[#1D3443] hover:bg-[#D3B380]/10"
              >
                Cancel
              </Button>
              <Button
                onClick={handleSubmitClaim}
                className="bg-[#1D3443] text-white hover:bg-[#1D3443]/90"
              >
                Submit Claim
              </Button>
            </div>
          </div>
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