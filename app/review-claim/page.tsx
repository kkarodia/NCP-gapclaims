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
      <div className="max-w-6xl mx-auto px-6 py-10">
        {/* Back Navigation */}
        <div className="mb-8">
          <Link 
            href="/upload-documents" 
            className="inline-flex items-center text-netcare-white/70 hover:text-netcare-gold transition-colors group"
          >
            <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
            Back to Claim Types
          </Link>
        </div>

        {/* Page Header */}
        <div className="mb-12">
          <h2 className="text-4xl font-bold text-netcare-white mb-4">Review Claim Document</h2>
          <p className="text-netcare-white/70 text-lg">
            Review the extracted information and make any necessary corrections before submitting your claim
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Left Column - Uploaded Documents */}
          <div className="space-y-8">
            <Card className="netcare-card border-netcare-gold/30">
              <CardHeader>
                <CardTitle className="text-netcare-white text-xl">Uploaded Documents</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {uploadedDocuments.map((doc) => (
                  <div
                    key={doc.id}
                    className="flex items-center justify-between p-4 bg-white/10 rounded-lg border border-netcare-gold/20 hover:bg-white/15 transition-colors"
                  >
                    <div className="flex items-center space-x-3">
                      <div className="p-2 bg-cyan-400/20 rounded-lg">
                        <File className="w-5 h-5 text-cyan-400" />
                      </div>
                      <div>
                        <p className="font-medium text-netcare-white">{doc.name}</p>
                        <p className="text-sm text-netcare-white/60">{doc.size} • {doc.type}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-netcare-white/60 hover:text-cyan-400 hover:bg-cyan-400/10"
                      >
                        <Eye className="w-4 h-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-netcare-white/60 hover:text-cyan-400 hover:bg-cyan-400/10"
                      >
                        <Download className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Document Preview */}
            <Card className="netcare-card border-netcare-gold/30">
              <CardHeader>
                <CardTitle className="text-netcare-white text-xl">Document Preview</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="bg-white rounded-lg p-6 text-black">
                  <div className="border-l-4 border-gray-300 pl-4">
                    <h3 className="font-bold text-lg mb-4">Medical Statement</h3>
                    
                    <div className="space-y-4 text-sm">
                      <div>
                        <h4 className="font-semibold mb-2">Provider & Member Information</h4>
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <p><span className="font-medium">Medical Aid Provider:</span> HealthCare Plus</p>
                            <p><span className="font-medium">Member Name:</span> John Doe</p>
                            <p><span className="font-medium">Membership Number:</span> POL-12345</p>
                          </div>
                          <div>
                            <p><span className="font-medium">Plan Type:</span> Comprehensive Plus</p>
                            <p><span className="font-medium">Statement Date:</span> 27 May 2025</p>
                            <p><span className="font-medium">Coverage Period:</span> 01 May 2025 - 27 May 2025</p>
                          </div>
                        </div>
                      </div>

                      <div>
                        <h4 className="font-semibold mb-2">Patient Details</h4>
                        <p><span className="font-medium">Patient Name:</span> John Doe</p>
                        <p><span className="font-medium">Dependent Code:</span> 00 (Main Member)</p>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Column - Document Information */}
          <div className="space-y-8">
            <Card className="netcare-card border-netcare-gold/30">
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle className="text-netcare-white text-xl">Document Information</CardTitle>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setIsEditing(!isEditing)}
                  className="text-cyan-400 hover:text-cyan-300 hover:bg-cyan-400/10"
                >
                  <Edit3 className="w-4 h-4 mr-2" />
                  {isEditing ? 'Save' : 'Edit'}
                </Button>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="policyNumber" className="text-netcare-white/80 font-medium">
                      Policy Number
                    </Label>
                    {isEditing ? (
                      <Input
                        id="policyNumber"
                        value={documentInfo.policyNumber}
                        onChange={(e) => handleInputChange('policyNumber', e.target.value)}
                        className="netcare-input"
                      />
                    ) : (
                      <p className="text-netcare-white font-semibold text-lg">{documentInfo.policyNumber}</p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="patientName" className="text-netcare-white/80 font-medium">
                      Patient Name
                    </Label>
                    {isEditing ? (
                      <Input
                        id="patientName"
                        value={documentInfo.patientName}
                        onChange={(e) => handleInputChange('patientName', e.target.value)}
                        className="netcare-input"
                      />
                    ) : (
                      <p className="text-netcare-white font-semibold text-lg">{documentInfo.patientName}</p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="medicalAidScheme" className="text-netcare-white/80 font-medium">
                      Medical Aid Scheme
                    </Label>
                    {isEditing ? (
                      <Input
                        id="medicalAidScheme"
                        value={documentInfo.medicalAidScheme}
                        onChange={(e) => handleInputChange('medicalAidScheme', e.target.value)}
                        className="netcare-input"
                      />
                    ) : (
                      <p className="text-netcare-white font-semibold text-lg">{documentInfo.medicalAidScheme}</p>
                    )}
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="amountPaid" className="text-netcare-white/80 font-medium">
                        Amount Paid (R)
                      </Label>
                      {isEditing ? (
                        <Input
                          id="amountPaid"
                          value={documentInfo.amountPaid}
                          onChange={(e) => handleInputChange('amountPaid', e.target.value)}
                          className="netcare-input"
                        />
                      ) : (
                        <p className="text-cyan-400 font-bold text-xl">{documentInfo.amountPaid}</p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="amountUnpaid" className="text-netcare-white/80 font-medium">
                        Amount Unpaid (R)
                      </Label>
                      {isEditing ? (
                        <Input
                          id="amountUnpaid"
                          value={documentInfo.amountUnpaid}
                          onChange={(e) => handleInputChange('amountUnpaid', e.target.value)}
                          className="netcare-input"
                        />
                      ) : (
                        <p className="text-orange-400 font-bold text-xl">{documentInfo.amountUnpaid}</p>
                      )}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="reasonsForNonPayment" className="text-netcare-white/80 font-medium">
                      Reasons for Non-Payment
                    </Label>
                    {isEditing ? (
                      <Textarea
                        id="reasonsForNonPayment"
                        value={documentInfo.reasonsForNonPayment}
                        onChange={(e) => handleInputChange('reasonsForNonPayment', e.target.value)}
                        className="netcare-input min-h-[100px]"
                        placeholder="Enter reasons for non-payment..."
                      />
                    ) : (
                      <p className="text-netcare-white font-semibold text-lg">{documentInfo.reasonsForNonPayment}</p>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                onClick={handleCancel}
                variant="outline"
                className="flex-1 border-netcare-gold/50 text-netcare-white hover:bg-netcare-gold/10 hover:border-netcare-gold h-12 text-base font-semibold"
              >
                Cancel
              </Button>
              <Button
                onClick={handleSubmitClaim}
                className="flex-1 netcare-button h-12 text-base font-semibold hover:shadow-2xl hover:scale-105 transition-all duration-300"
              >
                <CheckCircle className="w-5 h-5 mr-2" />
                Submit Claim
              </Button>
            </div>
          </div>
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