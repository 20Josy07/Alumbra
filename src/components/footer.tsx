import Link from 'next/link';
import { Logo } from '@/components/logo';
import { Github, Twitter, Linkedin } from 'lucide-react';
import { Button } from './ui/button';

const socialLinks = [
  {
    name: 'GitHub',
    icon: Github,
    href: '#',
  },
  {
    name: 'Twitter',
    icon: Twitter,
    href: '#',
  },
  {
    name: 'LinkedIn',
    icon: Linkedin,
    href: '#',
  },
];

const navLinks = [
  { name: 'Home', href: '/' },
  { name: 'How It Works', href: '/#how-it-works' },
  { name: 'Support', href: '/support' },
  { name: 'Privacy Policy', href: '/privacy' },
];

export function Footer() {
  return (
    <footer className="bg-background border-t">
      <div className="container mx-auto px-4 py-12">
        <div className="grid gap-8 md:grid-cols-3">
          <div className="space-y-4">
            <Logo />
            <p className="text-sm text-muted-foreground max-w-xs">
              AI-powered insights to illuminate your conversations and improve communication.
            </p>
          </div>
          <div className="md:col-span-2 grid grid-cols-2 sm:grid-cols-3 gap-8">
            <div>
              <h3 className="font-semibold text-foreground">Navigation</h3>
              <ul className="mt-4 space-y-2">
                {navLinks.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="text-sm text-muted-foreground hover:text-primary transition-colors"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-foreground">Legal</h3>
              <ul className="mt-4 space-y-2">
                <li>
                  <Link
                    href="/privacy"
                    className="text-sm text-muted-foreground hover:text-primary transition-colors"
                  >
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="text-sm text-muted-foreground hover:text-primary transition-colors"
                  >
                    Terms of Service
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-foreground">Connect</h3>
              <div className="mt-4 flex space-x-2">
                {socialLinks.map((social) => (
                  <Button
                    key={social.name}
                    variant="ghost"
                    size="icon"
                    asChild
                  >
                    <a
                      href={social.href}
                      aria-label={social.name}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <social.icon className="h-5 w-5" />
                    </a>
                  </Button>
                ))}
              </div>
            </div>
          </div>
        </div>
        <div className="mt-12 border-t pt-8 text-center">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} Alumbra. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
