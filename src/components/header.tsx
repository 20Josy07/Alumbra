'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X } from 'lucide-react';
import { useState } from 'react';
import { Logo } from '@/components/logo';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { cn } from '@/lib/utils';

const navLinks = [
  { name: 'Inicio', href: '/' },
  { name: 'Cómo Funciona', href: '/#how-it-works' },
  { name: 'Soporte', href: '/support' },
  { name: 'Privacidad', href: '/privacy' },
];

export function Header() {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleScrollToAnalysis = () => {
    const element = document.getElementById('analysis-section');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMobileMenuOpen(false);
  };
  
  const handleScrollToHowItWorks = () => {
    const element = document.getElementById('how-it-works');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMobileMenuOpen(false);
  };

  const isHome = pathname === '/';

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <Link href="/" className="flex items-center">
          <Logo />
        </Link>
        <nav className="hidden items-center space-x-6 md:flex">
          {navLinks.map((link) => {
            if (link.href.startsWith('/#') && isHome) {
               return (
                <button
                  key={link.name}
                  onClick={link.href === '/#how-it-works' ? handleScrollToHowItWorks : handleScrollToAnalysis}
                  className={cn(
                    'text-sm font-medium text-muted-foreground transition-colors hover:text-primary'
                  )}
                >
                  {link.name}
                </button>
              );
            }
            return (
              <Link
                key={link.name}
                href={link.href}
                className={cn(
                  'text-sm font-medium transition-colors hover:text-primary',
                  pathname === link.href
                    ? 'text-primary'
                    : 'text-muted-foreground'
                )}
              >
                {link.name}
              </Link>
            )
          })}
        </nav>

        <div className="flex items-center gap-2">
          <Button
            onClick={handleScrollToAnalysis}
            className="hidden sm:inline-flex"
            variant="default"
          >
            Analizar Ahora
          </Button>

          <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon" className="md:hidden">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Abrir menú</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right">
              <div className="flex h-full flex-col">
                <div className="flex items-center justify-between border-b pb-4">
                  <Link href="/" onClick={() => setIsMobileMenuOpen(false)}>
                    <Logo />
                  </Link>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <X className="h-5 w-5" />
                  </Button>
                </div>
                <nav className="mt-6 flex flex-col space-y-4">
                  {navLinks.map((link) => {
                     if (link.href.startsWith('/#') && isHome) {
                      return (
                       <button
                         key={link.name}
                         onClick={link.href === '/#how-it-works' ? handleScrollToHowItWorks : handleScrollToAnalysis}
                         className={cn(
                           'text-lg font-medium text-muted-foreground transition-colors hover:text-primary text-left'
                         )}
                       >
                         {link.name}
                       </button>
                     );
                   }
                    return (
                    <Link
                      key={link.name}
                      href={link.href}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className={cn(
                        'text-lg font-medium transition-colors hover:text-primary',
                        pathname === link.href
                          ? 'text-primary'
                          : 'text-muted-foreground'
                      )}
                    >
                      {link.name}
                    </Link>
                  )
                  })}
                </nav>
                <Button
                  onClick={handleScrollToAnalysis}
                  className="mt-8 w-full"
                  size="lg"
                >
                  Analizar Ahora
                </Button>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
