// File 2: app/claim/[id]/client.tsx (Client Component)
'use client';
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { 
  ArrowLeft,
  FileText, 
  User, 
  LogOut, 
  HelpCircle,
  Plus,
  Download,
  Eye,
  AlertTriangle,
  Clock,
  RotateCcw,
  Calendar,
  CreditCard,
  Building,
  DollarSign,
  Info,
  ExternalLink,
  CheckCircle,
  XCircle
} from 'lucide-react';
import Link from 'next/link';
import { ThemeToggle } from '@/components/ui/theme-toggle';

interface ClaimDetailsClientProps {
  params: {
    id: string;
  };
}

export default function ClaimDetailsClient({ params }: ClaimDetailsClientProps) {
  // Enhanced mock data with more realistic scenarios
  const getClaimData = (id: string) => {
    const baseData = {
      'claim-1': {
        title: 'Medical Consultation - Dr. Smith',
        type: 'GP Consultation',
        status: 'Approved',
        submittedDate: 'June 10, 2025',
        submittedTime: '9:15 AM',
        summary: {
          policyNumber: 'POL-100001',
          patientName: 'Sarah Johnson',
          medicalAidScheme: 'Discovery Health',
          amountPaid: 'R450.00',
          amountUnpaid: 'R0.00',
          reasonForNonPayment: 'N/A'
        },
        alertMessage: null
      },
      'claim-2': {
        title: 'Dental Procedure - Crown Replacement',
        type: 'Dental Treatment',
        status: 'Processing',
        submittedDate: 'June 8, 2025',
        submittedTime: '2:30 PM',
        summary: {
          policyNumber: 'POL-100002',
          patientName: 'Michael Chen',
          medicalAidScheme: 'Momentum Health',
          amountPaid: 'R0.00',
          amountUnpaid: 'R2,450.00',
          reasonForNonPayment: 'Pending review'
        },
        alertMessage: null
      },
      'claim-3': {
        title: 'Emergency Room Visit',
        type: 'Emergency Treatment',
        status: 'Requires Attention',
        submittedDate: 'May 21, 2025',
        submittedTime: '1:51 PM',
        summary: {
          policyNumber: 'POL-100003',
          patientName: 'John Doe',
          medicalAidScheme: 'HealthCare Plus',
          amountPaid: 'R750.00',
          amountUnpaid: 'R250.00',
          reasonForNonPayment: 'Exceeds annual limit'
        },
        alertMessage: {
          title: 'This claim requires your attention',
          description: 'Additional documentation needed. Please upload your discharge summary.'
        }
      }
    };

    return baseData[id as keyof typeof baseData] || baseData['claim-3'];
  };

  const claimData = getClaimData(params.id);

  // Generate appropriate history based on status
  const getClaimHistory = (status: string, submittedDate: string, submittedTime: string) => {
    const baseHistory = [
      {
        status: 'Submitted',
        date: submittedDate,
        time: submittedTime,
        icon: <Clock className="w-4 h-4" />,
        color: 'text-blue-400',
        bgColor: 'bg-blue-400'
      }
    ];

    if (status === 'Processing') {
      return [
        ...baseHistory,
        {
          status: 'Processing',
          date: 'June 9, 2025',
          time: '10:20 AM',
          icon: <RotateCcw className="w-4 h-4" />,
          color: 'text-indigo-400',
          bgColor: 'bg-indigo-400',
          description: 'Under review by medical aid scheme'
        }
      ];
    } else if (status === 'Approved') {
      return [
        ...baseHistory,
        {
          status: 'Processing',
          date: 'June 11, 2025',
          time: '8:45 AM',
          icon: <RotateCcw className="w-4 h-4" />,
          color: 'text-indigo-400',
          bgColor: 'bg-indigo-400'
        },
        {
          status: 'Approved',
          date: 'June 12, 2025',
          time: '2:15 PM',
          icon: <CheckCircle className="w-4 h-4" />,
          color: 'text-green-400',
          bgColor: 'bg-green-400',
          description: 'Payment processed successfully'
        }
      ];
    } else if (status === 'Requires Attention') {
      return [
        ...baseHistory,
        {
          status: 'Processing',
          date: 'May 22, 2025',
          time: '1:51 PM',
          icon: <RotateCcw className="w-4 h-4" />,
          color: 'text-indigo-400',
          bgColor: 'bg-indigo-400'
        },
        {
          status: 'Requires Attention',
          date: 'May 23, 2025',
          time: '1:51 PM',
          icon: <AlertTriangle className="w-4 h-4" />,
          color: 'text-orange-400',
          bgColor: 'bg-orange-400',
          description: 'Missing discharge summary document'
        }
      ];
    }

    return baseHistory;
  };

  const history = getClaimHistory(claimData.status, claimData.submittedDate, claimData.submittedTime);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Approved':
        return 'bg-green-500/20 text-green-300 border-green-400/40';
      case 'Processing':
        return 'bg-indigo-500/20 text-indigo-300 border-indigo-400/40';
      case 'Requires Attention':
        return 'bg-orange-500/20 text-orange-300 border-orange-400/40';
      case 'Rejected':
        return 'bg-red-500/20 text-red-300 border-red-400/40';
      default:
        return 'bg-gray-500/20 text-gray-300 border-gray-400/40';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'Approved':
        return <CheckCircle className="w-4 h-4 mr-2" />;
      case 'Processing':
        return <RotateCcw className="w-4 h-4 mr-2" />;
      case 'Requires Attention':
        return <AlertTriangle className="w-4 h-4 mr-2" />;
      case 'Rejected':
        return <XCircle className="w-4 h-4 mr-2" />;
      default:
        return <Clock className="w-4 h-4 mr-2" />;
    }
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
      <div className="max-w-7xl mx-auto px-6 py-10">
        {/* Breadcrumb Navigation */}
        <div className="mb-8">
          <nav className="flex items-center space-x-2 text-sm">
            <Link 
              href="/dashboard" 
              className="text-netcare-white/70 hover:text-netcare-gold transition-colors"
            >
              Claims
            </Link>
            <span className="text-netcare-white/40">/</span>
            <span className="text-netcare-gold font-medium">{params.id}</span>
          </nav>
          <Link 
            href="/dashboard" 
            className="inline-flex items-center text-netcare-white/70 hover:text-netcare-gold transition-colors group mt-2"
          >
            <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
            Back to Claims Dashboard
          </Link>
        </div>

        {/* Page Header */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between mb-10 gap-6">
          <div className="flex items-start gap-4">
            <div className="p-3 bg-netcare-gold/20 rounded-xl">
              <FileText className="w-8 h-8 text-cyan-400" />
            </div>
            <div>
              <div className="flex items-center gap-3 mb-2">
                <h2 className="text-3xl font-bold text-netcare-white">{claimData.title}</h2>
                <Badge className={`${getStatusColor(claimData.status)} shadow-lg font-medium px-3 py-1`}>
                  {getStatusIcon(claimData.status)}
                  {claimData.status}
                </Badge>
              </div>
              <p className="text-netcare-white/70 text-lg">
                {claimData.type} • Submitted {claimData.submittedDate} at {claimData.submittedTime}
              </p>
            </div>
          </div>
          
          <div className="flex gap-3">
            <Button 
              variant="outline" 
              className="border-netcare-gold/50 text-netcare-white hover:bg-netcare-gold/10 hover:border-netcare-gold"
            >
              <Eye className="w-4 h-4 mr-2" />
              View Documents
            </Button>
            <Button className="netcare-button">
              <Download className="w-4 h-4 mr-2" />
              Download PDF
            </Button>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Column - Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Alert Message - Only show if exists */}
            {claimData.alertMessage && (
              <Card className="border-orange-500/30 bg-orange-500/10 backdrop-blur-sm">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="p-2 bg-orange-500/20 rounded-lg flex-shrink-0">
                      <AlertTriangle className="w-5 h-5 text-orange-400" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-orange-300 mb-2">
                        {claimData.alertMessage.title}
                      </h3>
                      <p className="text-orange-200/80 mb-4">
                        {claimData.alertMessage.description}
                      </p>
                      <Button 
                        size="sm" 
                        className="bg-orange-500 hover:bg-orange-600 text-white"
                      >
                        <Plus className="w-4 h-4 mr-2" />
                        Upload Document
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Claim Summary */}
            <Card className="netcare-card border-netcare-gold/30">
              <CardHeader>
                <CardTitle className="text-netcare-white text-xl flex items-center gap-2">
                  <Info className="w-5 h-5" />
                  Claim Details
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid md:grid-cols-2 gap-8">
                  <div className="space-y-6">
                    <div className="p-4 bg-slate-800/30 rounded-lg">
                      <div className="flex items-center gap-2 mb-3">
                        <User className="w-4 h-4 text-netcare-gold" />
                        <p className="text-netcare-gold text-sm font-medium uppercase tracking-wide">Patient Information</p>
                      </div>
                      <p className="text-netcare-white font-semibold text-lg">{claimData.summary.patientName}</p>
                    </div>
                    
                    <div className="p-4 bg-slate-800/30 rounded-lg">
                      <div className="flex items-center gap-2 mb-3">
                        <CreditCard className="w-4 h-4 text-netcare-gold" />
                        <p className="text-netcare-gold text-sm font-medium uppercase tracking-wide">Policy Number</p>
                      </div>
                      <p className="text-netcare-white font-semibold text-lg">{claimData.summary.policyNumber}</p>
                    </div>
                    
                    <div className="p-4 bg-slate-800/30 rounded-lg">
                      <div className="flex items-center gap-2 mb-3">
                        <Building className="w-4 h-4 text-netcare-gold" />
                        <p className="text-netcare-gold text-sm font-medium uppercase tracking-wide">Medical Aid</p>
                      </div>
                      <p className="text-netcare-white font-semibold text-lg">{claimData.summary.medicalAidScheme}</p>
                    </div>
                  </div>
                  
                  <div className="space-y-6">
                    <div className="p-4 bg-green-500/10 border border-green-500/30 rounded-lg">
                      <div className="flex items-center gap-2 mb-3">
                        <DollarSign className="w-4 h-4 text-green-400" />
                        <p className="text-green-400 text-sm font-medium uppercase tracking-wide">Amount Paid</p>
                      </div>
                      <p className="text-green-400 font-bold text-2xl">{claimData.summary.amountPaid}</p>
                    </div>
                    
                    <div className="p-4 bg-orange-500/10 border border-orange-500/30 rounded-lg">
                      <div className="flex items-center gap-2 mb-3">
                        <DollarSign className="w-4 h-4 text-orange-400" />
                        <p className="text-orange-400 text-sm font-medium uppercase tracking-wide">Amount Outstanding</p>
                      </div>
                      <p className="text-orange-400 font-bold text-2xl">{claimData.summary.amountUnpaid}</p>
                    </div>
                    
                    {claimData.summary.reasonForNonPayment !== 'N/A' && (
                      <div className="p-4 bg-slate-800/30 rounded-lg">
                        <div className="flex items-center gap-2 mb-3">
                          <Info className="w-4 h-4 text-netcare-gold" />
                          <p className="text-netcare-gold text-sm font-medium uppercase tracking-wide">Notes</p>
                        </div>
                        <p className="text-netcare-white font-semibold text-lg">{claimData.summary.reasonForNonPayment}</p>
                      </div>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Column - Status & History */}
          <div className="space-y-8">
            {/* Quick Actions */}
            <Card className="netcare-card border-netcare-gold/30">
              <CardHeader>
                <CardTitle className="text-netcare-white text-xl">Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button className="w-full justify-start bg-slate-800/50 hover:bg-slate-700/50 text-netcare-white border border-slate-600">
                  <ExternalLink className="w-4 h-4 mr-2" />
                  Contact Support
                </Button>
                <Button className="w-full justify-start bg-slate-800/50 hover:bg-slate-700/50 text-netcare-white border border-slate-600">
                  <Download className="w-4 h-4 mr-2" />
                  Download Statement
                </Button>
                <Button className="w-full justify-start bg-slate-800/50 hover:bg-slate-700/50 text-netcare-white border border-slate-600">
                  <Plus className="w-4 h-4 mr-2" />
                  Add Documents
                </Button>
              </CardContent>
            </Card>

            {/* Claim History */}
            <Card className="netcare-card border-netcare-gold/30">
              <CardHeader>
                <CardTitle className="text-netcare-white text-xl flex items-center gap-2">
                  <Clock className="w-5 h-5" />
                  Claim History
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  {history.map((item, index) => (
                    <div key={index} className="relative">
                      {index < history.length - 1 && (
                        <div className="absolute left-6 top-12 w-0.5 h-16 bg-netcare-gold/20"></div>
                      )}
                      <div className="flex items-start gap-4">
                        <div className={`p-3 rounded-full bg-slate-800/50 ${item.color} flex-shrink-0 border-2 border-slate-700`}>
                          {item.icon}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-1">
                            <div className={`w-3 h-3 rounded-full ${item.bgColor}`}></div>
                            <p className={`font-semibold ${item.color}`}>{item.status}</p>
                          </div>
                          <p className="text-netcare-white/60 text-sm mb-1">
                            {item.date} at {item.time}
                          </p>
                          {item.description && (
                            <p className="text-netcare-white/80 text-sm bg-slate-800/30 p-2 rounded">
                              {item.description}
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
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
              © 2025 Netcare. All rights reserved.
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