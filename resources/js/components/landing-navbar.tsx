import { dashboard, login, register } from '@/routes';
import { type SharedData } from '@/types';
import { Link, usePage } from '@inertiajs/react';
import { LayoutDashboard, LogIn, Sparkles, UserPlus } from 'lucide-react';
import { useEffect, useState } from 'react';

interface LandingNavbarProps {
    variant?: 'transparent' | 'solid';
    canRegister?: boolean;
}

export default function LandingNavbar({
    variant = 'transparent',
    canRegister = true,
}: LandingNavbarProps) {
    const { auth } = usePage<SharedData>().props;
    const [isScrolled, setIsScrolled] = useState(variant === 'solid');

    useEffect(() => {
        if (variant === 'solid') {
            return;
        }

        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [variant]);

    const navLinks = [
        { name: 'Beranda', href: '/' },
        { name: 'Layanan', href: '/#features' },
        { name: 'Pertanyaan Umum', href: '/#faq' },
        { name: 'Kontak', href: '/contact' },
    ];

    return (
        <nav
            className={`fixed top-0 right-0 left-0 z-50 transition-all duration-300 ${
                isScrolled
                    ? 'border-b border-slate-200 bg-white/95 shadow-sm backdrop-blur-md'
                    : 'bg-transparent'
            }`}
        >
            <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 md:px-6 md:py-4">
                <Link href="/" className="group flex items-center gap-2">
                    <div
                        className={`flex h-9 w-9 items-center justify-center rounded-lg transition-all duration-300 group-hover:scale-105 ${
                            isScrolled
                                ? 'bg-[#a8dadc]'
                                : 'bg-white/20 backdrop-blur-sm'
                        }`}
                    >
                        <Sparkles
                            className={`h-5 w-5 ${isScrolled ? 'text-white' : 'text-white'}`}
                        />
                    </div>
                    <span
                        className={`text-lg font-bold ${isScrolled ? 'text-slate-800' : 'text-white'}`}
                    >
                        SMM Panel
                    </span>
                </Link>

                {/* Center Menu */}
                <div className="hidden items-center gap-8 md:flex">
                    {navLinks.map((item) => (
                        <a
                            key={item.name}
                            href={item.href}
                            className={`text-sm font-semibold transition-all duration-300 hover:scale-105 ${
                                isScrolled
                                    ? 'text-slate-600 hover:text-[#457b9d]'
                                    : 'text-white/90 hover:text-white'
                            }`}
                        >
                            {item.name}
                        </a>
                    ))}
                </div>

                {/* Auth Buttons */}
                <div className="flex items-center gap-2 md:gap-4">
                    {auth.user ? (
                        <Link
                            href={dashboard().url}
                            className={`group relative flex items-center gap-2 rounded-xl px-4 py-2 text-sm font-bold transition-all duration-200 active:translate-y-1 md:px-6 md:py-2.5 ${
                                isScrolled
                                    ? 'bg-[#457b9d] text-white shadow-[0_4px_0_rgb(45,76,98)] hover:bg-[#3d6a87] active:shadow-none'
                                    : 'bg-white text-slate-800 shadow-[0_4px_0_rgb(200,200,200)] hover:bg-slate-100 active:shadow-none'
                            }`}
                        >
                            <LayoutDashboard className="h-4 w-4" />
                            <span className="hidden sm:inline">Dashboard</span>
                        </Link>
                    ) : (
                        <>
                            <Link
                                href={login().url}
                                className={`group relative flex items-center gap-1.5 rounded-xl px-3 py-2 text-sm font-bold transition-all duration-200 active:translate-y-1 md:gap-2 md:px-5 md:py-2.5 ${
                                    isScrolled
                                        ? 'bg-slate-100 text-slate-700 shadow-[0_4px_0_rgb(200,200,200)] hover:bg-slate-200 active:shadow-none'
                                        : 'bg-white/20 text-white shadow-[0_4px_0_rgba(255,255,255,0.2)] backdrop-blur-sm hover:bg-white/30 active:shadow-none'
                                }`}
                            >
                                <LogIn className="h-4 w-4" />
                                <span className="hidden sm:inline">Masuk</span>
                            </Link>
                            {canRegister && (
                                <Link
                                    href={register().url}
                                    className={`group relative flex items-center gap-1.5 rounded-xl px-3 py-2 text-sm font-bold transition-all duration-200 active:translate-y-1 md:gap-2 md:px-6 md:py-2.5 ${
                                        isScrolled
                                            ? 'bg-[#457b9d] text-white shadow-[0_4px_0_rgb(45,76,98)] hover:bg-[#3d6a87] active:shadow-none'
                                            : 'bg-white text-slate-800 shadow-[0_4px_0_rgb(200,200,200)] hover:bg-white/90 active:shadow-none'
                                    }`}
                                >
                                    <UserPlus className="h-4 w-4" />
                                    <span className="hidden sm:inline">
                                        Daftar
                                    </span>
                                </Link>
                            )}
                        </>
                    )}
                </div>
            </div>
        </nav>
    );
}
