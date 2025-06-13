'use client';

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { 
  FileText, 
  Plus, 
  Filter, 
  User, 
  LogOut, 
  HelpCircle,
  ChevronRight,
  AlertTriangle,
  CheckCircle,
  Clock,
  XCircle,
  FileCheck,
  Search,
  TrendingUp,
  Calendar,
  DollarSign,
  Activity
} from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ThemeToggle } from '@/components/ui/theme-toggle';

interface Claim {
  id: string;
  type: 'Medical Aid Statement' | 'Provider Document';
  status: 'Submitted' | 'Processing' | 'Processed' | 'Completed' | 'Rejected' | 'Requires Attention';
  submittedDate: string;
  policyNumber?: string;
  provider?: string;
  serviceDate?: string;
  amountPaid: string;
  amountUnpaid: string;
  shortfall?: string;
}

export default function DashboardPage() {
  const [filterStatus, setFilterStatus] = useState('All Claims');
  const [searchQuery, setSearchQuery] = useState('');
  const router = useRouter();

  const claims: Claim[] = [
    {
      id: 'claim-1',
      type: 'Medical Aid Statement',
      status: 'Submitted',
      submittedDate: 'May 28, 2025',
      policyNumber: 'POL-100000',
      amountPaid: 'R750.00',
      amountUnpaid: 'R250.00'
    },
    {
      id: 'claim-2',
      type: 'Provider Document',
      status: 'Processing',
      submittedDate: 'May 25, 2025',
      provider: 'Dr. Smith Medical Practice',
      serviceDate: 'May 18, 2025',
      shortfall: 'R500.00',
      amountPaid: 'R0.00',
      amountUnpaid: 'R500.00'
    },
    {
      id: 'claim-3',
      type: 'Medical Aid Statement',
      status: 'Requires Attention',
      submittedDate: 'May 22, 2025',
      policyNumber: 'POL-100002',
      amountPaid: 'R750.00',
      amountUnpaid: 'R250.00'
    },
    {
      id: 'claim-4',
      type: 'Provider Document',
      status: 'Processed',
      submittedDate: 'May 19, 2025',
      provider: 'Dr. Smith Medical Practice',
      serviceDate: 'May 12, 2025',
      shortfall: 'R500.00',
      amountPaid: 'R0.00',
      amountUnpaid: 'R500.00'
    },
    {
      id: 'claim-5',
      type: 'Medical Aid Statement',
      status: 'Completed',
      submittedDate: 'May 16, 2025',
      policyNumber: 'POL-100004',
      amountPaid: 'R750.00',
      amountUnpaid: 'R250.00'
    },
    {
      id: 'claim-6',
      type: 'Provider Document',
      status: 'Rejected',
      submittedDate: 'May 13, 2025',
      provider: 'Dr. Smith Medical Practice',
      serviceDate: 'May 6, 2025',
      shortfall: 'R500.00',
      amountPaid: 'R0.00',
      amountUnpaid: 'R500.00'
    }
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'Submitted':
        return <Clock className="w-4 h-4" />;
      case 'Processing':
        return <Activity className="w-4 h-4" />;
      case 'Processed':
        return <CheckCircle className="w-4 h-4" />;
      case 'Completed':
        return <CheckCircle className="w-4 h-4" />;
      case 'Rejected':
        return <XCircle className="w-4 h-4" />;
      case 'Requires Attention':
        return <AlertTriangle className="w-4 h-4" />;
      default:
        return <FileText className="w-4 h-4" />;
    }
  };

  const getStatusColor = (status: string) => {
    // Unified elegant color scheme using teal/cyan variations for consistency
    switch (status) {
      case 'Submitted':
        return 'bg-netcare-cyan/15 text-netcare-cyan border border-netcare-cyan/25';
      case 'Processing':
        return 'bg-netcare-light-cyan/15 text-netcare-light-cyan border border-netcare-light-cyan/25';
      case 'Processed':
        return 'bg-netcare-cyan/15 text-netcare-cyan border border-netcare-cyan/25';
      case 'Completed':
        return 'bg-netcare-light-cyan/15 text-netcare-light-cyan border border-netcare-light-cyan/25';
      case 'Rejected':
        return 'bg-netcare-silver/15 text-netcare-silver border border-netcare-silver/25';
      case 'Requires Attention':
        return 'bg-netcare-pale-cyan/15 text-netcare-pale-cyan border border-netcare-pale-cyan/25';
      default:
        return 'bg-netcare-silver/15 text-netcare-silver border border-netcare-silver/25';
    }
  };

  const getDocumentIcon = (type: string) => {
    return type === 'Medical Aid Statement' ?
      <FileText className="w-5 h-5 text-netcare-cyan" /> :
      <FileCheck className="w-5 h-5 text-netcare-cyan" />;
  };

  const filteredClaims = claims.filter(claim => {
    const matchesFilter = filterStatus === 'All Claims' || claim.status === filterStatus;
    const matchesSearch = searchQuery === '' || 
      claim.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      claim.type.toLowerCase().includes(searchQuery.toLowerCase()) ||
      claim.provider?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      claim.policyNumber?.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  // Calculate summary stats
  const totalClaims = claims.length;
  const completedClaims = claims.filter(c => c.status === 'Completed').length;
  const pendingClaims = claims.filter(c => ['Submitted', 'Processing'].includes(c.status)).length;
  const totalPaid = claims.reduce((sum, claim) => {
    const amount = parseFloat(claim.amountPaid.replace('R', '').replace(',', ''));
    return sum + (isNaN(amount) ? 0 : amount);
  }, 0);

  const handleClaimClick = (claimId: string) => {
    router.push(`/claim/${claimId}`);
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
                <Link href="#" className="flex items-center space-x-2 text-netcare-white hover:text-netcare-gold transition-all duration-300 font-medium group">
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
        {/* Page Header */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between mb-10 gap-6">
          <div>
            <h2 className="text-4xl font-bold text-netcare-white mb-2">Your Claims</h2>
            <p className="text-netcare-white/70 text-lg">Manage and track your medical claims</p>
          </div>
          <Link href="/new-claim">
            <Button className="netcare-button text-lg px-8 py-4 shadow-xl hover:shadow-2xl transition-all duration-300">
              <Plus className="w-5 h-5 mr-2" />
              Start a New Claim
            </Button>
          </Link>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
          <Card className="netcare-card group transition-all duration-500">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-netcare-white/80 text-sm font-medium">Total Claims</p>
                  <p className="text-3xl font-bold text-netcare-white">{totalClaims}</p>
                </div>
                <div className="p-3 bg-netcare-cyan/15 rounded-xl group-hover:bg-netcare-cyan/20 transition-colors duration-300">
                  <FileText className="w-6 h-6 text-netcare-cyan" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="netcare-card group transition-all duration-500">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-netcare-white/80 text-sm font-medium">Completed</p>
                  <p className="text-3xl font-bold text-netcare-white">{completedClaims}</p>
                </div>
                <div className="p-3 bg-netcare-cyan/15 rounded-xl group-hover:bg-netcare-cyan/20 transition-colors duration-300">
                  <CheckCircle className="w-6 h-6 text-netcare-cyan" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="netcare-card group transition-all duration-500">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-netcare-white/80 text-sm font-medium">Pending</p>
                  <p className="text-3xl font-bold text-netcare-white">{pendingClaims}</p>
                </div>
                <div className="p-3 bg-netcare-cyan/15 rounded-xl group-hover:bg-netcare-cyan/20 transition-colors duration-300">
                  <Clock className="w-6 h-6 text-netcare-cyan" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="netcare-card group transition-all duration-500">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-netcare-white/80 text-sm font-medium">Total Paid</p>
                  <p className="text-3xl font-bold text-netcare-white">R{totalPaid.toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ',')}</p>
                </div>
                <div className="p-3 bg-netcare-cyan/15 rounded-xl group-hover:bg-netcare-cyan/20 transition-colors duration-300">
                  <DollarSign className="w-6 h-6 text-netcare-cyan" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Search and Filter Section */}
        <div className="flex flex-col sm:flex-row gap-4 mb-8">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-netcare-white/60 w-5 h-5" />
            <Input
              placeholder="Search claims by ID, type, provider, or policy number..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="netcare-input pl-10 h-12 text-base"
            />
          </div>
          <Select value={filterStatus} onValueChange={setFilterStatus}>
            <SelectTrigger className="w-full sm:w-64 netcare-input h-12">
              <Filter className="w-4 h-4 mr-2" />
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="bg-netcare-navy border-netcare-gold/30 shadow-2xl">
              <SelectItem value="All Claims" className="text-netcare-white hover:bg-netcare-gold/10 focus:bg-netcare-gold/10">All Claims</SelectItem>
              <SelectItem value="Submitted" className="text-netcare-white hover:bg-netcare-gold/10 focus:bg-netcare-gold/10">Submitted</SelectItem>
              <SelectItem value="Processing" className="text-netcare-white hover:bg-netcare-gold/10 focus:bg-netcare-gold/10">Processing</SelectItem>
              <SelectItem value="Processed" className="text-netcare-white hover:bg-netcare-gold/10 focus:bg-netcare-gold/10">Processed</SelectItem>
              <SelectItem value="Completed" className="text-netcare-white hover:bg-netcare-gold/10 focus:bg-netcare-gold/10">Completed</SelectItem>
              <SelectItem value="Rejected" className="text-netcare-white hover:bg-netcare-gold/10 focus:bg-netcare-gold/10">Rejected</SelectItem>
              <SelectItem value="Requires Attention" className="text-netcare-white hover:bg-netcare-gold/10 focus:bg-netcare-gold/10">Requires Attention</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Claims Grid */}
        <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-8">
          {filteredClaims.map((claim, index) => (
            <Card
              key={claim.id}
              className="netcare-card transition-all duration-500 hover:scale-[1.01] group animate-fade-in cursor-pointer"
              style={{ animationDelay: `${index * 0.1}s` }}
              onClick={() => handleClaimClick(claim.id)}
            >
              <CardHeader className="pb-4">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <div className="p-2 bg-netcare-cyan/15 rounded-lg group-hover:bg-netcare-cyan/20 transition-colors duration-300">
                      {getDocumentIcon(claim.type)}
                    </div>
                    <div>
                      <CardTitle className="text-xl font-bold text-netcare-white group-hover:text-netcare-cyan transition-colors duration-300">
                        {claim.id}
                      </CardTitle>
                      <p className="text-sm text-netcare-white/80 font-medium">{claim.type}</p>
                    </div>
                  </div>
                  <div className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-medium ${getStatusColor(claim.status)} shadow-sm`}>
                    {getStatusIcon(claim.status)}
                    <span className="ml-2">{claim.status}</span>
                  </div>
                </div>
              </CardHeader>
              
              <CardContent className="space-y-6">
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div className="space-y-1">
                    <p className="text-netcare-white/70 font-medium flex items-center">
                      <Calendar className="w-3 h-3 mr-1" />
                      Submitted
                    </p>
                    <p className="font-semibold text-netcare-white">{claim.submittedDate}</p>
                  </div>

                  {claim.policyNumber && (
                    <div className="space-y-1">
                      <p className="text-netcare-white/70 font-medium">Policy Number</p>
                      <p className="font-semibold text-netcare-white">{claim.policyNumber}</p>
                    </div>
                  )}

                  {claim.provider && (
                    <div className="col-span-2 space-y-1">
                      <p className="text-netcare-white/70 font-medium">Provider</p>
                      <p className="font-semibold text-netcare-white">{claim.provider}</p>
                    </div>
                  )}

                  {claim.serviceDate && (
                    <div className="space-y-1">
                      <p className="text-netcare-white/70 font-medium">Service Date</p>
                      <p className="font-semibold text-netcare-white">{claim.serviceDate}</p>
                    </div>
                  )}

                  {claim.shortfall && (
                    <div className="space-y-1">
                      <p className="text-netcare-white/70 font-medium">Shortfall</p>
                      <p className="font-semibold text-netcare-cyan">{claim.shortfall}</p>
                    </div>
                  )}
                </div>

                <div className="grid grid-cols-2 gap-4 text-sm pt-4 border-t border-netcare-cyan/20">
                  <div className="space-y-1">
                    <p className="text-netcare-white/70 font-medium flex items-center">
                      <TrendingUp className="w-3 h-3 mr-1" />
                      Amount Paid
                    </p>
                    <p className="font-bold text-netcare-cyan text-lg">{claim.amountPaid}</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-netcare-white/70 font-medium">Amount Unpaid</p>
                    <p className="font-bold text-netcare-light-cyan text-lg">{claim.amountUnpaid}</p>
                  </div>
                </div>

                <Button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleClaimClick(claim.id);
                  }}
                  variant="ghost"
                  className="w-full justify-between text-netcare-cyan hover:text-netcare-white hover:bg-netcare-cyan/15 mt-6 h-12 font-medium group-hover:bg-netcare-cyan/10 transition-all duration-300"
                >
                  View Details
                  <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredClaims.length === 0 && (
          <div className="text-center py-20">
            <div className="w-24 h-24 bg-netcare-cyan/15 rounded-full flex items-center justify-center mx-auto mb-6">
              <FileText className="w-12 h-12 text-netcare-cyan" />
            </div>
            <h3 className="text-2xl font-bold text-netcare-white mb-3">No claims found</h3>
            <p className="text-netcare-white/80 text-lg mb-8 max-w-md mx-auto">
              {searchQuery ? 'No claims match your search criteria.' : 'No claims match the selected filter criteria.'}
            </p>
            {searchQuery && (
              <Button
                variant="outline"
                onClick={() => setSearchQuery('')}
                className="border-netcare-cyan text-netcare-cyan hover:bg-netcare-cyan/10 hover:text-netcare-white transition-all duration-300"
              >
                Clear Search
              </Button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}