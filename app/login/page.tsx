'use client';

import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Separator } from '@/components/ui/separator';
import { Mail, Lock, Eye, EyeOff } from 'lucide-react';
import Link from 'next/link';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      console.log('Login attempt:', { email, password, rememberMe });
    }, 2000);
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Logo and Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-netcare-white mb-2">
            Netcare
          </h1>
          <div className="w-16 h-1 bg-gold-gradient mx-auto rounded-full mb-6"></div>
        </div>

        {/* Login Card */}
        <Card className="netcare-card border-netcare-gold/20 shadow-2xl">
          <CardHeader className="text-center pb-6">
            <CardTitle className="text-2xl font-bold text-netcare-white">
              Sign in to your account
            </CardTitle>
            <CardDescription className="text-netcare-white/70 text-base">
              Or{' '}
              <Link 
                href="#" 
                className="text-netcare-gold hover:text-netcare-light-gold transition-colors underline"
              >
                get help with your account
              </Link>
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-6">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Email Field */}
              <div className="space-y-2">
                <Label htmlFor="email" className="text-netcare-white font-medium">
                  Email address
                </Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-netcare-white/60 w-5 h-5" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="you@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="netcare-input pl-10 h-12 text-base"
                    required
                  />
                </div>
              </div>

              {/* Password Field */}
              <div className="space-y-2">
                <Label htmlFor="password" className="text-netcare-white font-medium">
                  Password
                </Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-netcare-white/60 w-5 h-5" />
                  <Input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="netcare-input pl-10 pr-10 h-12 text-base"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-netcare-white/60 hover:text-netcare-white transition-colors"
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
              </div>

              {/* Remember Me and Forgot Password */}
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="remember"
                    checked={rememberMe}
                    onCheckedChange={(checked) => setRememberMe(checked as boolean)}
                    className="border-netcare-gold/50 data-[state=checked]:bg-netcare-gold data-[state=checked]:border-netcare-gold"
                  />
                  <Label 
                    htmlFor="remember" 
                    className="text-netcare-white/80 text-sm cursor-pointer"
                  >
                    Remember me
                  </Label>
                </div>
                <Link 
                  href="#" 
                  className="text-netcare-gold hover:text-netcare-light-gold transition-colors text-sm font-medium"
                >
                  Forgot your password?
                </Link>
              </div>

              {/* Sign In Button */}
              <Button
                type="submit"
                className="w-full netcare-button h-12 text-base font-semibold"
                disabled={isLoading}
              >
                {isLoading ? (
                  <div className="flex items-center space-x-2">
                    <div className="w-4 h-4 border-2 border-netcare-navy border-t-transparent rounded-full animate-spin"></div>
                    <span>Signing in...</span>
                  </div>
                ) : (
                  'Sign In'
                )}
              </Button>

              {/* Divider */}
              <div className="relative">
                <Separator className="bg-netcare-gold/20" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="bg-netcare-navy px-4 text-netcare-white/60 text-sm font-medium">
                    OR
                  </span>
                </div>
              </div>

              {/* Sign Up Button */}
              <Button
                type="button"
                variant="outline"
                className="w-full h-12 text-base font-semibold border-netcare-gold text-netcare-gold hover:bg-netcare-gold hover:text-netcare-navy transition-all duration-300"
                onClick={() => console.log('Navigate to sign up')}
              >
                Sign up
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* Footer */}
        <div className="text-center mt-8 text-netcare-white/60 text-sm">
          <p>© 2025 Netcare. All rights reserved.</p>
        </div>
      </div>
    </div>
  );
}