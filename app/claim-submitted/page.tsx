'use client';

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  ArrowLeft,
  FileText, 
  User, 
  LogOut, 
  HelpCircle,
  Plus,
  CheckCircle,
  Clock,
  Eye,
  Download,
  Home,
  Calendar,
  DollarSign,
  Building,
  Info
} from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ThemeToggle } from '@/components/ui/theme-toggle';

export default function ClaimSubmittedPage() {
  const router = useRouter();

  // Mock data for the submitted claim
  const claimData = {
    id: 'claim-472',
    title: 'Claim claim-472',
    type: 'Medical Aid Statement',
    status: 'Submitted',
    submittedDate: 'May 28, 2025',
    submittedTime: '1:07 PM',
    summary: {
      policyNumber: 'POL-12345',
      patientName: 'John Doe',
      medicalAidScheme: 'HealthCare Plus',
      amountPaid: 'R750.00',
      amountUnpaid: 'R250.00',
      reasonForNonPayment: 'Exceeds annual limit'
    }
  };

  const handleViewClaim = () => {
    router.push(`/claim/${claimData.id}`);
  };

  const handleNewClaim = () => {
    router.push('/new-claim');
  };

  const handleBackToDashboard = () => {
    router.push('/dashboard');
  };

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
                <Link href="/dashboard" className="flex items-center space-x-2 text-netcare-white hover:text-netcare-gold transition-all duration-300 font-medium group">
                  <FileText className="w-4 h-4 group-hover:scale-110 transition-transform" />
                  <span>My Claims</span>
                </Link>
                <Link href="/new-claim" className="flex items-center space-x-2 text-netcare-white/80 hover:text-netcare-gold transition-all duration-300 font-medium group">
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
            href="/dashboard" 
            className="inline-flex items-center text-netcare-white/70 hover:text-netcare-gold transition-colors group"
          >
            <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
            Back to Claims Summary
          </Link>
        </div>

        {/* Success Message */}
        <div className="text-center mb-12">
          <div className="flex justify-center mb-6">
            <div className="w-20 h-20 bg-green-500/20 rounded-full flex items-center justify-center">
              <CheckCircle className="w-12 h-12 text-green-400" />
            </div>
          </div>
          <h2 className="text-4xl font-bold text-netcare-white mb-4">Claim Successfully Submitted!</h2>
          <p className="text-netcare-white/70 text-lg max-w-2xl mx-auto">
            Your claim has been submitted and is now being processed. You'll receive updates on the status of your claim.
          </p>
        </div>

        {/* Claim Details */}
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Column - Claim Summary */}
          <div className="lg:col-span-2 space-y-8">
            {/* Claim Header */}
            <Card className="netcare-card border-netcare-gold/30">
              <CardContent className="p-8">
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
                  <div className="flex items-center gap-4">
                    <div className="p-3 bg-cyan-400/20 rounded-xl">
                      <FileText className="w-8 h-8 text-cyan-400" />
                    </div>
                    <div>
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-3xl font-bold text-netcare-white">{claimData.title}</h3>
                        <Badge className="bg-cyan-500/20 text-cyan-300 border-cyan-400/40 shadow-cyan-500/20 font-medium px-3 py-1">
                          <Clock className="w-4 h-4 mr-2" />
                          {claimData.status}
                        </Badge>
                      </div>
                      <p className="text-netcare-white/70 text-lg">
                        {claimData.type} • Submitted on {claimData.submittedDate}
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex gap-3">
                    <Button 
                      variant="outline" 
                      className="border-netcare-gold/50 text-netcare-white hover:bg-netcare-gold/10 hover:border-netcare-gold"
                      onClick={handleViewClaim}
                    >
                      <Eye className="w-4 h-4 mr-2" />
                      View
                    </Button>
                    <Button className="netcare-button">
                      <Download className="w-4 h-4 mr-2" />
                      Download
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Claim Summary Details */}
            <Card className="netcare-card border-netcare-gold/30">
              <CardHeader>
                <CardTitle className="text-netcare-white text-xl">Claim Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <Building className="w-4 h-4 text-netcare-white/60" />
                        <p className="text-netcare-white/60 text-sm font-medium">Policy Number</p>
                      </div>
                      <p className="text-netcare-white font-semibold text-lg">{claimData.summary.policyNumber}</p>
                    </div>
                    
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <Building className="w-4 h-4 text-netcare-white/60" />
                        <p className="text-netcare-white/60 text-sm font-medium">Medical Aid Scheme</p>
                      </div>
                      <p className="text-netcare-white font-semibold text-lg">{claimData.summary.medicalAidScheme}</p>
                    </div>
                    
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <Info className="w-4 h-4 text-netcare-white/60" />
                        <p className="text-netcare-white/60 text-sm font-medium">Reasons for Non-Payment</p>
                      </div>
                      <p className="text-netcare-white font-semibold text-lg">{claimData.summary.reasonForNonPayment}</p>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <User className="w-4 h-4 text-netcare-white/60" />
                        <p className="text-netcare-white/60 text-sm font-medium">Patient Name</p>
                      </div>
                      <p className="text-netcare-white font-semibold text-lg">{claimData.summary.patientName}</p>
                    </div>
                    
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <DollarSign className="w-4 h-4 text-netcare-white/60" />
                        <p className="text-netcare-white/60 text-sm font-medium">Amount Paid</p>
                      </div>
                      <p className="text-cyan-400 font-bold text-xl">{claimData.summary.amountPaid}</p>
                    </div>
                    
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <DollarSign className="w-4 h-4 text-netcare-white/60" />
                        <p className="text-netcare-white/60 text-sm font-medium">Amount Unpaid</p>
                      </div>
                      <p className="text-orange-400 font-bold text-xl">{claimData.summary.amountUnpaid}</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Column - Claim History & Actions */}
          <div className="space-y-8">
            <Card className="netcare-card border-netcare-gold/30">
              <CardHeader>
                <CardTitle className="text-netcare-white text-xl">Claim History</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="flex items-start gap-4">
                    <div className="p-3 rounded-full bg-slate-800/50 text-cyan-400 flex-shrink-0">
                      <Clock className="w-4 h-4" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <div className="w-3 h-3 rounded-full bg-cyan-400"></div>
                        <p className="font-semibold text-cyan-400">Submitted</p>
                      </div>
                      <p className="text-netcare-white/60 text-sm">
                        {claimData.submittedDate} {claimData.submittedTime}
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Action Buttons */}
            <Card className="netcare-card border-netcare-gold/30">
              <CardHeader>
                <CardTitle className="text-netcare-white text-xl">What's Next?</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-netcare-white/70 text-sm mb-6">
                  Your claim is now being processed. You can track its progress or submit a new claim.
                </p>
                
                <div className="space-y-3">
                  <Button 
                    onClick={handleBackToDashboard}
                    className="w-full netcare-button h-12 text-base font-semibold"
                  >
                    <Home className="w-5 h-5 mr-2" />
                    Back to Dashboard
                  </Button>
                  
                  <Button 
                    onClick={handleNewClaim}
                    variant="outline"
                    className="w-full border-cyan-400 text-cyan-400 hover:bg-cyan-400 hover:text-slate-900 h-12 text-base font-semibold"
                  >
                    <Plus className="w-5 h-5 mr-2" />
                    Submit New Claim
                  </Button>
                  
                  <Button 
                    onClick={handleViewClaim}
                    variant="outline"
                    className="w-full border-netcare-gold text-netcare-gold hover:bg-netcare-gold hover:text-netcare-navy h-12 text-base font-semibold"
                  >
                    <Eye className="w-5 h-5 mr-2" />
                    View Claim Details
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Help Section */}
            <Card className="netcare-card border-netcare-gold/30">
              <CardContent className="p-6 text-center">
                <div className="flex justify-center mb-4">
                  <div className="p-3 bg-netcare-gold/20 rounded-xl">
                    <HelpCircle className="w-6 h-6 text-cyan-400" />
                  </div>
                </div>
                <h3 className="text-lg font-bold text-netcare-white mb-3">Need Help?</h3>
                <p className="text-netcare-white/70 text-sm mb-4">
                  If you have questions about your claim or need assistance, our support team is here to help.
                </p>
                <Button 
                  variant="outline" 
                  size="sm"
                  className="border-cyan-400 text-cyan-400 hover:bg-cyan-400 hover:text-slate-900"
                >
                  Contact Support
                </Button>
              </CardContent>
            </Card>
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