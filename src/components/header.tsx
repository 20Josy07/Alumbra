'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X, LogOut, BrainCircuit, ChevronDown } from 'lucide-react';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { cn } from '@/lib/utils';
import { useAuth } from '@/hooks/use-auth';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import Image from 'next/image';

const navLinks = [
  { name: 'Cómo Funciona', href: '/#how-it-works' },
  { name: 'Soporte', href: '/support' },
];

const resourcesLinks = [
    { name: 'Privacidad', href: '/privacy' },
    { name: 'Testimonios', href: '/#testimonials' },
];

export function Header() {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { user, logout } = useAuth();

  const handleScrollTo = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMobileMenuOpen(false);
  };

  const isHome = pathname === '/';

  return (
    <header className="fixed inset-x-0 bottom-4 z-50 mx-auto max-w-4xl">
      <div className="container mx-auto flex h-16 items-center justify-between rounded-full bg-background/80 px-4 backdrop-blur-sm border border-border/50 shadow-lg">
        <Link href="/" className="flex items-center gap-2">
          <Image src="https://i.postimg.cc/QCys4Rbt/favicon-light.png" alt="Alumbra logo" width={28} height={28} />
          <span className="sr-only">Alumbra</span>
        </Link>
        <nav className="hidden items-center space-x-6 md:flex">
          {navLinks.map((link) => {
            if (link.href.startsWith('/#') && isHome) {
              return (
                <button
                  key={link.name}
                  onClick={() => handleScrollTo(link.href.substring(2))}
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
            );
          })}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <button className='flex items-center gap-1 text-sm font-medium text-muted-foreground transition-colors hover:text-primary'>
                    Recursos
                    <ChevronDown className="h-4 w-4" />
                </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
                {resourcesLinks.map(link => (
                     <DropdownMenuItem key={link.name} asChild>
                         <Link href={link.href}>{link.name}</Link>
                    </DropdownMenuItem>
                ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </nav>

        <div className="flex items-center gap-2">
          <Button asChild className="hidden sm:inline-flex rounded-full" variant="default">
            <Link href="/analizar">Probar Alumbra</Link>
          </Button>

          {user && (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  className="relative h-10 w-10 rounded-full"
                >
                  <Avatar className="h-10 w-10">
                    <AvatarImage
                      src={user.photoURL!}
                      alt={user.displayName!}
                    />
                    <AvatarFallback>
                      {user.displayName?.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56" align="end" forceMount>
                <DropdownMenuLabel className="font-normal">
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-medium leading-none">
                      {user.displayName}
                    </p>
                    <p className="text-xs leading-none text-muted-foreground">
                      {user.email}
                    </p>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => logout()}>
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Cerrar sesión</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          )}

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
                    <Image src="https://i.postimg.cc/QCys4Rbt/favicon-light.png" alt="Alumbra logo" width={32} height={32} />
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
                  {[...navLinks, ...resourcesLinks].map((link) => {
                    if (link.href.startsWith('/#') && isHome) {
                      return (
                        <button
                          key={link.name}
                          onClick={() => handleScrollTo(link.href.substring(2))}
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
                    );
                  })}
                </nav>
                <Button asChild className="mt-8 w-full rounded-full" size="lg">
                  <Link
                    href="/analizar"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Probar Alumbra
                  </Link>
                </Button>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
