'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, Zap, Shield, Users, Stethoscope, Calendar } from 'lucide-react';

export default function RootPage() {
  const router = useRouter();

  useEffect(() => {
    router.replace('/home');
  }, [router]);

  const features = [
    {
      icon: <Stethoscope className="w-6 h-6" />,
      title: 'Healthcare Management',
      description: 'Comprehensive patient care and medical record management'
    },
    {
      icon: <Users className="w-6 h-6" />,
      title: 'User Management',
      description: 'Role-based access control for healthcare professionals'
    },
    {
      icon: <Calendar className="w-6 h-6" />,
      title: 'Appointment Scheduling',
      description: 'Streamlined booking and calendar management system'
    },
    {
      icon: <Shield className="w-6 h-6" />,
      title: 'Security & Compliance',
      description: 'HIPAA compliant with enterprise-grade security'
    },
    {
      icon: <Zap className="w-6 h-6" />,
      title: 'Real-time Analytics',
      description: 'Live dashboard with actionable insights'
    },
    {
      icon: <CheckCircle className="w-6 h-6" />,
      title: 'Quality Assurance',
      description: 'Built-in quality checks and validation systems'
    }
  ];

  return null;
}