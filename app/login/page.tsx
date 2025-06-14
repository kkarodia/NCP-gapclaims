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
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

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
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Logo and Header */}
        <div className="text-center mb-8">
          <div className="flex justify-center items-center space-x-3 mb-4">
            <img
              src="/assets/images/netcarelogo.png"
              alt="Netcare Logo"
              className="w-12 h-12 object-contain"
            />
            <div className="text-left">
              <h1 className="text-2xl font-bold text-gray-900 tracking-tight">NETCARE</h1>
              <p className="text-sm text-blue-600 font-medium">plus</p>
            </div>
          </div>
          <h2 className="text-xl text-gray-700 mb-1">Sign in to your account</h2>
          <p className="text-sm text-gray-500">
            Or{' '}
            <Link 
              href="#" 
              className="text-blue-600 hover:text-blue-500 transition-colors"
            >
              get help with your account
            </Link>
          </p>
        </div>

        {/* Login Form */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Email Field */}
            <div className="space-y-1">
              <Label htmlFor="email" className="text-sm font-medium text-gray-700">
                Email address
              </Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  id="email"
                  type="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="pl-10 h-10 border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                  required
                />
              </div>
            </div>

            {/* Password Field */}
            <div className="space-y-1">
              <Label htmlFor="password" className="text-sm font-medium text-gray-700">
                Password
              </Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  placeholder=""
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="pl-10 pr-10 h-10 border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Remember Me and Forgot Password */}
            <div className="flex items-center justify-between py-2">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="remember"
                  checked={rememberMe}
                  onCheckedChange={(checked) => setRememberMe(checked as boolean)}
                  className="border-gray-300 data-[state=checked]:bg-blue-600 data-[state=checked]:border-blue-600"
                />
                <Label 
                  htmlFor="remember" 
                  className="text-sm text-gray-600 cursor-pointer"
                >
                  Remember me
                </Label>
              </div>
              <Link 
                href="#" 
                className="text-sm text-blue-600 hover:text-blue-500 transition-colors"
              >
                Forgot your password?
              </Link>
            </div>

            {/* Sign In Button */}
            <Button
              type="submit"
              className="w-full bg-teal-700 hover:bg-teal-800 text-white h-10 text-sm font-medium"
              disabled={isLoading}
              onClick={() => router.push('/dashboard')}
            >
              {isLoading ? (
                <div className="flex items-center space-x-2">
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  <span>Signing in...</span>
                </div>
              ) : (
                'Sign In'
              )}
              
              

            </Button>

            {/* Divider */}
            <div className="relative my-6">
              <Separator className="bg-gray-200" />
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="bg-white px-4 text-gray-500 text-sm">
                  OR
                </span>
              </div>
            </div>

            {/* Sign Up Button */}
            <Button
              type="button"
              variant="outline"
              className="w-full h-10 text-sm font-medium border-teal-700 text-teal-700 hover:bg-teal-700 hover:text-white transition-all duration-300"
              onClick={() => console.log('Navigate to sign up')}
            >
              Sign up
            </Button>
          </form>
        </div>

        {/* Footer */}
        <div className="text-center mt-8 text-gray-500 text-sm">
          <p>© 2025 Netcare. All rights reserved.</p>
        </div>
      </div>
    </div>
  );
}