'use client';

import { Toaster as Sonner } from 'sonner';

type ToasterProps = React.ComponentProps<typeof Sonner>;

const Toaster = ({ ...props }: ToasterProps) => {
  return (
    <Sonner
      theme="dark"
      className="toaster group"
      toastOptions={{
        classNames: {
          toast:
            'group toast group-[.toaster]:bg-netcare-navy group-[.toaster]:text-netcare-white group-[.toaster]:border-netcare-gold/30 group-[.toaster]:shadow-lg',
          description: 'group-[.toast]:text-netcare-white/70',
          actionButton:
            'group-[.toast]:bg-netcare-gold group-[.toast]:text-netcare-navy',
          cancelButton:
            'group-[.toast]:bg-netcare-white/10 group-[.toast]:text-netcare-white/70',
        },
      }}
      {...props}
    />
  );
};

export { Toaster };
