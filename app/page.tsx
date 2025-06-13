import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, Zap, Shield, Users, Stethoscope, Calendar } from 'lucide-react';

export default function Home() {
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

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <div className="container mx-auto px-6 py-16">
        <div className="text-center mb-16 animate-fade-in">
          <Badge variant="outline" className="mb-4 border-netcare-gold text-netcare-gold">
            Next.js • Redux • Tailwind CSS • shadcn/ui
          </Badge>
          <h1 className="text-5xl md:text-7xl font-bold mb-6">
            <span className="text-netcare-white">Netcare</span>
            <span className="text-gradient"> Professional</span>
          </h1>
          <p className="text-xl md:text-2xl text-netcare-white/80 mb-8 max-w-3xl mx-auto leading-relaxed">
            Advanced healthcare management system built with modern technologies. 
            Ready for production with Redux state management, beautiful UI components, and responsive design.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="netcare-button text-lg px-8 py-4">
              Get Started
            </Button>
            <Button size="lg" variant="outline" className="border-netcare-gold text-netcare-gold hover:bg-netcare-gold hover:text-netcare-navy text-lg px-8 py-4">
              View Documentation
            </Button>
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {features.map((feature, index) => (
            <Card key={index} className="netcare-card group transition-all duration-500 hover:scale-[1.02] animate-fade-in" style={{ animationDelay: `${index * 0.1}s` }}>
              <CardHeader>
                <div className="flex items-center gap-3 mb-2">
                  <div className="p-2 rounded-lg bg-netcare-cyan/15 group-hover:bg-netcare-cyan/20 transition-colors duration-300">
                    <div className="text-netcare-cyan">
                      {feature.icon}
                    </div>
                  </div>
                  <CardTitle className="text-netcare-white">{feature.title}</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-netcare-white/80 text-base">
                  {feature.description}
                </CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Tech Stack Section */}
        <Card className="netcare-card text-center p-8 animate-fade-in">
          <CardHeader>
            <CardTitle className="text-2xl md:text-3xl text-netcare-white mb-4">
              Tech Stack Ready
            </CardTitle>
            <CardDescription className="text-netcare-white/80 text-lg">
              Your project is configured with the following technologies:
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap justify-center gap-4 mt-6">
              {[
                'Next.js 13',
                'React 18',
                'TypeScript',
                'Redux Toolkit',
                'Tailwind CSS',
                'shadcn/ui',
                'Lucide React',
                'React Hook Form',
                'Zod Validation'
              ].map((tech, index) => (
                <Badge
                  key={index}
                  variant="secondary"
                  className="bg-netcare-cyan/15 text-netcare-cyan border-netcare-cyan/25 px-4 py-2 text-sm hover:bg-netcare-cyan/20 hover:text-netcare-white transition-colors duration-300"
                >
                  {tech}
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Status Section */}
        <div className="text-center mt-16 animate-fade-in">
          <div className="inline-flex items-center gap-2 bg-netcare-cyan/15 text-netcare-cyan px-6 py-3 rounded-full border border-netcare-cyan/25">
            <CheckCircle className="w-5 h-5" />
            <span className="font-semibold">Project Initialized Successfully</span>
          </div>
          <p className="text-netcare-white/80 mt-4 text-lg">
            Ready to receive your page screenshots and requirements
          </p>
        </div>
      </div>
    </div>
  );
}