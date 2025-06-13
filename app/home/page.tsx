'use client';

import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { 
  FileText, 
  Shield, 
  Clock, 
  Upload, 
  CheckCircle, 
  AlertCircle,
  TrendingUp,
  Users,
  DollarSign
} from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function HomePage() {
  const router = useRouter();

  const claimsSummary = {
    policyNumber: 'POL-12345',
    name: 'John Doe',
    amount: '$1,250.00',
    status: 'Completed'
  };

  const dashboardItems = [
    {
      title: 'Medical Aid Claim',
      status: 'Completed',
      statusColor: 'bg-green-500',
      textColor: 'text-green-600'
    },
    {
      title: 'Provider Document',
      status: 'Processing',
      statusColor: 'bg-blue-500',
      textColor: 'text-blue-600'
    },
    {
      title: 'Medical Aid Statement',
      status: 'Submitted',
      statusColor: 'bg-purple-500',
      textColor: 'text-purple-600'
    }
  ];

  const features = [
    {
      icon: <Upload className="w-6 h-6" />,
      title: 'Document Upload',
      description: 'Upload medical aid statements and provider documents directly through our secure portal.'
    },
    {
      icon: <Shield className="w-6 h-6" />,
      title: 'Secure Processing',
      description: 'All your documents and personal information are processed with bank-level security.'
    },
    {
      icon: <Clock className="w-6 h-6" />,
      title: 'Real-time Status Updates',
      description: 'Track the status of your claims in real-time, from submission to completion.'
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Header Section */}
      <div className="bg-netcare-navy/90 backdrop-blur-sm border-b border-netcare-gold/20">
        <div className="container mx-auto px-6 py-8">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
            <div>
              <h1 className="text-4xl lg:text-5xl font-bold text-netcare-white mb-4">
                Netcare Claims Portal
              </h1>
              <p className="text-lg text-netcare-white/80 max-w-2xl leading-relaxed">
                Submit and manage your medical claims quickly and easily. Our intelligent system extracts information from your documents, saving you time and frustration.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button 
                variant="outline" 
                size="lg"
                className="border-netcare-gold text-netcare-gold hover:bg-netcare-gold hover:text-netcare-navy px-8 py-3"
              >
                Learn More
              </Button>
              <Button 
                size="lg"
                className="netcare-button px-8 py-3"
                onClick={() => router.push('/dashboard')}
              >
                Go To Dashboard
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 py-12">
        {/* Main Content Section */}
        <div className="grid lg:grid-cols-2 gap-12 mb-16">
          {/* Left Column - Process Description */}
          <div className="space-y-8">
            <div>
              <h2 className="text-3xl font-bold text-netcare-white mb-6">
                A Simpler Way to Submit Medical Claims
              </h2>
              <p className="text-netcare-white/80 text-lg leading-relaxed">
                Our intelligent claims system extracts information from your documents automatically, making the submission process faster and more accurate.
              </p>
            </div>

            <div className="space-y-6">
              <h3 className="text-2xl font-semibold text-netcare-white mb-6">
                Submit Claims with Ease
              </h3>
              <p className="text-netcare-white/70 mb-8">
                Upload your medical aid statements and our system will automatically extract the important information, saving you time and reducing errors.
              </p>

              <div className="space-y-6">
                {features.map((feature, index) => (
                  <div key={index} className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-12 h-12 bg-netcare-gold rounded-full flex items-center justify-center text-netcare-navy">
                      {feature.icon}
                    </div>
                    <div>
                      <h4 className="text-lg font-semibold text-netcare-white mb-2">
                        {feature.title}
                      </h4>
                      <p className="text-netcare-white/70 leading-relaxed">
                        {feature.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column - Dashboard Preview */}
          <div className="space-y-6">
            {/* Medical Claim Summary Card */}
            <Card className="netcare-card">
              <CardHeader className="pb-4">
                <CardTitle className="text-netcare-white text-lg">
                  Medical Claim Summary
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-netcare-white/60 text-sm">Policy Number</p>
                    <p className="text-netcare-white font-semibold">{claimsSummary.policyNumber}</p>
                  </div>
                  <div>
                    <p className="text-netcare-white/60 text-sm">Name</p>
                    <p className="text-netcare-white font-semibold">{claimsSummary.name}</p>
                  </div>
                  <div>
                    <p className="text-netcare-white/60 text-sm">Amount</p>
                    <p className="text-netcare-gold font-bold text-lg">{claimsSummary.amount}</p>
                  </div>
                  <div>
                    <p className="text-netcare-white/60 text-sm">Status</p>
                    <Badge className="bg-green-500/20 text-green-400 border-green-500/30">
                      <CheckCircle className="w-3 h-3 mr-1" />
                      {claimsSummary.status}
                    </Badge>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Claims Dashboard */}
            <Card className="netcare-card">
              <CardHeader className="pb-4">
                <CardTitle className="text-netcare-white text-lg">
                  Claims Dashboard
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {dashboardItems.map((item, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-netcare-cyan/5 rounded-lg hover:bg-netcare-cyan/10 transition-colors duration-300">
                    <div className="flex items-center gap-3">
                      <div className="w-3 h-3 rounded-full bg-netcare-cyan"></div>
                      <span className="text-netcare-white font-medium">{item.title}</span>
                    </div>
                    <Badge variant="outline" className="text-netcare-cyan border-netcare-cyan/30">
                      {item.status}
                    </Badge>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Call to Action Section */}
        <Card className="netcare-card text-center p-12 mb-16">
          <CardHeader>
            <CardTitle className="text-3xl font-bold text-netcare-white mb-4">
              Ready to get started?
            </CardTitle>
            <CardDescription className="text-netcare-white/80 text-lg max-w-2xl mx-auto">
              Join thousands of members who are already enjoying a simpler claims process.
            </CardDescription>
          </CardHeader>
          <CardContent className="pt-6">
            <Button 
              size="lg" 
              className="netcare-button px-12 py-4 text-lg"
              onClick={() => router.push('/dashboard')}
            >
              Start
            </Button>
          </CardContent>
        </Card>

        {/* Stats Section */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          <Card className="netcare-card text-center p-6 group hover:scale-[1.02] transition-all duration-300">
            <CardContent className="pt-6">
              <div className="flex items-center justify-center mb-4">
                <div className="p-3 bg-netcare-cyan/15 rounded-full group-hover:bg-netcare-cyan/20 transition-colors duration-300">
                  <FileText className="w-8 h-8 text-netcare-cyan" />
                </div>
              </div>
              <h3 className="text-2xl font-bold text-netcare-white mb-2">50,000+</h3>
              <p className="text-netcare-white/80">Claims Processed</p>
            </CardContent>
          </Card>

          <Card className="netcare-card text-center p-6 group hover:scale-[1.02] transition-all duration-300">
            <CardContent className="pt-6">
              <div className="flex items-center justify-center mb-4">
                <div className="p-3 bg-netcare-cyan/15 rounded-full group-hover:bg-netcare-cyan/20 transition-colors duration-300">
                  <Users className="w-8 h-8 text-netcare-cyan" />
                </div>
              </div>
              <h3 className="text-2xl font-bold text-netcare-white mb-2">25,000+</h3>
              <p className="text-netcare-white/80">Active Members</p>
            </CardContent>
          </Card>

          <Card className="netcare-card text-center p-6 group hover:scale-[1.02] transition-all duration-300">
            <CardContent className="pt-6">
              <div className="flex items-center justify-center mb-4">
                <div className="p-3 bg-netcare-cyan/15 rounded-full group-hover:bg-netcare-cyan/20 transition-colors duration-300">
                  <TrendingUp className="w-8 h-8 text-netcare-cyan" />
                </div>
              </div>
              <h3 className="text-2xl font-bold text-netcare-white mb-2">98%</h3>
              <p className="text-netcare-white/80">Success Rate</p>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-netcare-navy/50 border-t border-netcare-gold/20 py-8">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex flex-wrap gap-6 text-netcare-white/60">
              <Link href="#" className="hover:text-netcare-cyan transition-colors duration-300">Support</Link>
              <Link href="#" className="hover:text-netcare-cyan transition-colors duration-300">Privacy Policy</Link>
              <Link href="#" className="hover:text-netcare-cyan transition-colors duration-300">Terms of Service</Link>
              <Link href="#" className="hover:text-netcare-cyan transition-colors duration-300">Contact Us</Link>
            </div>
            <p className="text-netcare-white/60 text-sm">
              © 2025 Netcare. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}