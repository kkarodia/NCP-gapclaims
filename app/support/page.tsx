'use client';

import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  ChevronDown,
  Phone,
  Mail,
  MessageSquare,
  User,
  LogOut,
  HelpCircle,
  Plus,
  FileText
} from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

interface FAQItem {
  question: string;
  answer: string;
  isOpen: boolean;
}

export default function SupportPage() {
  const [faqs, setFaqs] = useState<FAQItem[]>([
    {
      question: 'How do I submit a new claim?',
      answer: 'To submit a new claim, log into your account and click on the "New Claim" button in the navigation menu. Follow the step-by-step process to upload your documents and submit your claim.',
      isOpen: false
    },
    {
      question: 'What documents do I need to submit a claim?',
      answer: 'You will need to provide your medical aid statement and any relevant provider documents. Make sure all documents are clear and legible.',
      isOpen: false
    },
    {
      question: 'How long does it take to process a claim?',
      answer: 'Most claims are processed within 3-5 business days. Complex claims may take longer. You can always track the status of your claim on your dashboard.',
      isOpen: true
    },
    {
      question: 'What does "Requires Attention" status mean?',
      answer: 'This status indicates that we need additional information or documents from you to process your claim. Check the claim details for specific requirements.',
      isOpen: false
    },
    {
      question: 'Can I submit multiple claims at once?',
      answer: 'Yes, you can submit multiple claims. Each claim will be processed independently and you can track their status separately on your dashboard.',
      isOpen: false
    },
    {
      question: 'How do I check the status of my claim?',
      answer: 'You can check your claim status by logging into your account and viewing your claims dashboard. Each claim will show its current status and processing stage.',
      isOpen: false
    },
    {
      question: 'How do I update my personal information?',
      answer: 'You can update your personal information in your account settings. Click on your profile icon and select "Settings" to make any necessary changes.',
      isOpen: false
    }
  ]);

  const toggleFAQ = (index: number) => {
    setFaqs(faqs.map((faq, i) => ({
      ...faq,
      isOpen: i === index ? !faq.isOpen : faq.isOpen
    })));
  };

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
                <Link href="/support" className="flex items-center space-x-2 text-netcare-white hover:text-netcare-gold transition-all duration-300 font-medium group">
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
      <div className="max-w-4xl mx-auto px-6 py-12">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-[#1D3443] mb-4">Help & Support</h2>
          <p className="text-[#1D3443]/70 text-lg">
            Find answers to common questions or get in touch with our support team.
          </p>
        </div>

        {/* FAQ Section */}
        <div className="mb-16">
          <h3 className="text-2xl font-bold text-[#1D3443] mb-6">
            Frequently Asked Questions
          </h3>
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className="bg-white rounded-lg shadow-sm border border-[#D3B380]/30"
              >
                <button
                  className="w-full px-6 py-4 text-left flex items-center justify-between"
                  onClick={() => toggleFAQ(index)}
                >
                  <span className="font-semibold text-[#1D3443]">{faq.question}</span>
                  <ChevronDown
                    className={`w-5 h-5 text-[#1D3443]/60 transition-transform duration-200 ${
                      faq.isOpen ? 'transform rotate-180' : ''
                    }`}
                  />
                </button>
                {faq.isOpen && (
                  <div className="px-6 pb-4 text-[#1D3443]/70">
                    {faq.answer}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Contact Support Section */}
        <div className="mb-16">
          <h3 className="text-2xl font-bold text-[#1D3443] mb-6">
            Contact Support
          </h3>
          <div className="grid md:grid-cols-3 gap-6">
            <Card className="bg-white shadow-lg border border-[#D3B380]/30">
              <CardContent className="p-6 text-center">
                <div className="flex justify-center mb-4">
                  <div className="p-3 bg-[#1D3443]/10 rounded-xl">
                    <Phone className="w-6 h-6 text-[#1D3443]" />
                  </div>
                </div>
                <h4 className="font-bold text-[#1D3443] mb-2">Phone Support</h4>
                <p className="text-sm text-[#1D3443]/70 mb-2">Monday - Friday, 8am - 5pm</p>
                <p className="text-[#1D3443] font-medium">+27 31 543 6789</p>
              </CardContent>
            </Card>

            <Card className="bg-white shadow-lg border border-[#D3B380]/30">
              <CardContent className="p-6 text-center">
                <div className="flex justify-center mb-4">
                  <div className="p-3 bg-[#1D3443]/10 rounded-xl">
                    <Mail className="w-6 h-6 text-[#1D3443]" />
                  </div>
                </div>
                <h4 className="font-bold text-[#1D3443] mb-2">Email Support</h4>
                <p className="text-sm text-[#1D3443]/70 mb-2">We'll respond within 24 hours</p>
                <p className="text-[#1D3443] font-medium">support@netcare.com</p>
              </CardContent>
            </Card>

            <Card className="bg-white shadow-lg border border-[#D3B380]/30">
              <CardContent className="p-6 text-center">
                <div className="flex justify-center mb-4">
                  <div className="p-3 bg-[#1D3443]/10 rounded-xl">
                    <MessageSquare className="w-6 h-6 text-[#1D3443]" />
                  </div>
                </div>
                <h4 className="font-bold text-[#1D3443] mb-2">Live Chat</h4>
                <p className="text-sm text-[#1D3443]/70 mb-2">Available on weekdays from 9am - 4pm</p>
                <Button className="bg-[#1D3443] text-white hover:bg-[#1D3443]/90">
                  Start Chat
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Send Message Section */}
        <div>
          <h3 className="text-2xl font-bold text-[#1D3443] mb-6">
            Send Us a Message
          </h3>
          <Card className="bg-white shadow-lg border border-[#D3B380]/30">
            <CardContent className="p-8">
              <form className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-[#1D3443] mb-2">
                      Your Name
                    </label>
                    <Input
                      placeholder="Enter your name"
                      className="w-full bg-white border-[#1D3443]/20 text-[#1D3443] placeholder:text-[#1D3443]/50"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-[#1D3443] mb-2">
                      Email Address
                    </label>
                    <Input
                      type="email"
                      placeholder="Enter your email"
                      className="w-full bg-white border-[#1D3443]/20 text-[#1D3443] placeholder:text-[#1D3443]/50"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-[#1D3443] mb-2">
                    Subject
                  </label>
                  <Input
                    placeholder="Enter message subject"
                    className="w-full bg-white border-[#1D3443]/20 text-[#1D3443] placeholder:text-[#1D3443]/50"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-[#1D3443] mb-2">
                    Message
                  </label>
                  <Textarea
                    placeholder="Type your message here..."
                    className="w-full bg-white border-[#1D3443]/20 text-[#1D3443] placeholder:text-[#1D3443]/50 min-h-[150px]"
                  />
                </div>
                <div className="flex justify-end">
                  <Button className="bg-[#1D3443] text-white hover:bg-[#1D3443]/90 px-8">
                    Send Message
                  </Button>
                </div>
              </form>
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