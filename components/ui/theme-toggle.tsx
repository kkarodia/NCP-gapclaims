'use client';

import React from 'react';
import { Button } from '@/components/ui/button';
import { Palette } from 'lucide-react';

export function ThemeToggle() {
  return (
    <Button
      variant="ghost"
      size="sm"
      className="text-netcare-white/80 hover:text-netcare-cyan hover:bg-netcare-cyan/10 transition-all duration-300"
      disabled
    >
      <Palette className="w-4 h-4 mr-2" />
      Teal Theme
    </Button>
  );
}