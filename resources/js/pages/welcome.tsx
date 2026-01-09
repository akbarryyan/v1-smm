import { dashboard, login, register } from '@/routes';
import { type SharedData } from '@/types';
import { Head, Link, usePage } from '@inertiajs/react';
import {
    ArrowRight,
    ChevronDown,
    Facebook,
    Instagram,
    LayoutDashboard,
    LogIn,
    MonitorPlay,
    Rocket,
    Send,
    Shield,
    Sparkles,
    TrendingUp,
    Twitter,
    UserPlus,
    Users,
    Zap,
} from 'lucide-react';
import { useEffect, useRef, useState } from 'react';

// Declare particles.js global
declare global {
    interface Window {
        particlesJS: (id: string, config: object) => void;
    }
}

// Particles.js Component - Now targets hero-particles instead of full page
function ParticlesBackground() {
    const initialized = useRef(false);

    useEffect(() => {
        if (initialized.current) return;
        initialized.current = true;

        // Load particles.js script
        const script = document.createElement('script');
        script.src =
            'https://cdn.jsdelivr.net/npm/particles.js@2.0.0/particles.min.js';
        script.async = true;
        script.onload = () => {
            if (window.particlesJS) {
                window.particlesJS('hero-particles', {
                    particles: {
                        number: {
                            value: 60,
                            density: {
                                enable: true,
                                value_area: 800,
                            },
                        },
                        color: {
                            value: ['#ffffff', '#e8f4f5', '#d4edef'],
                        },
                        shape: {
                            type: 'circle',
                        },
                        opacity: {
                            value: 0.6,
                            random: true,
                            anim: {
                                enable: true,
                                speed: 1,
                                opacity_min: 0.1,
                                sync: false,
                            },
                        },
                        size: {
                            value: 3,
                            random: true,
                            anim: {
                                enable: true,
                                speed: 2,
                                size_min: 0.5,
                                sync: false,
                            },
                        },
                        line_linked: {
                            enable: true,
                            distance: 150,
                            color: '#ffffff',
                            opacity: 0.3,
                            width: 1,
                        },
                        move: {
                            enable: true,
                            speed: 1.5,
                            direction: 'none',
                            random: true,
                            straight: false,
                            out_mode: 'out',
                            bounce: false,
                            attract: {
                                enable: false,
                                rotateX: 600,
                                rotateY: 1200,
                            },
                        },
                    },
                    interactivity: {
                        detect_on: 'canvas',
                        events: {
                            onhover: {
                                enable: true,
                                mode: 'grab',
                            },
                            onclick: {
                                enable: true,
                                mode: 'push',
                            },
                            resize: true,
                        },
                        modes: {
                            grab: {
                                distance: 140,
                                line_linked: {
                                    opacity: 0.5,
                                },
                            },
                            push: {
                                particles_nb: 4,
                            },
                        },
                    },
                    retina_detect: true,
                });
            }
        };
        document.body.appendChild(script);

        return () => {
            const existingScript = document.querySelector(
                'script[src*="particles.js"]',
            );
            if (existingScript) {
                existingScript.remove();
            }
        };
    }, []);

    return (
        <div
            id="hero-particles"
            className="pointer-events-auto absolute inset-0 z-0"
        />
    );
}

// Animated counter hook
function useCounter(
    end: number,
    duration: number = 2000,
    startOnView: boolean = true,
) {
    const [count, setCount] = useState(0);
    const [hasStarted, setHasStarted] = useState(!startOnView);

    useEffect(() => {
        if (!hasStarted) return;

        let startTime: number;
        const animate = (currentTime: number) => {
            if (!startTime) startTime = currentTime;
            const progress = Math.min((currentTime - startTime) / duration, 1);
            setCount(Math.floor(progress * end));
            if (progress < 1) {
                requestAnimationFrame(animate);
            }
        };
        requestAnimationFrame(animate);
    }, [end, duration, hasStarted]);

    return { count, start: () => setHasStarted(true) };
}

// Intersection Observer hook for animations
function useInView(threshold = 0.1) {
    const [ref, setRef] = useState<HTMLElement | null>(null);
    const [isInView, setIsInView] = useState(false);

    useEffect(() => {
        if (!ref) return;

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsInView(true);
                    observer.disconnect();
                }
            },
            { threshold },
        );

        observer.observe(ref);
        return () => observer.disconnect();
    }, [ref, threshold]);

    return { ref: setRef, isInView };
}

// Feature Card Component
function FeatureCard({
    icon: Icon,
    title,
    desc,
    delay,
}: {
    icon: React.ElementType;
    title: string;
    desc: string;
    delay: number;
}) {
    const { ref, isInView } = useInView();

    return (
        <div
            ref={ref}
            className={`group cursor-pointer rounded-2xl border border-slate-100 bg-white p-5 shadow-sm transition-all duration-500 hover:-translate-y-2 hover:shadow-xl hover:shadow-[#a8dadc]/20 sm:p-7 ${
                isInView
                    ? 'translate-y-0 opacity-100'
                    : 'translate-y-8 opacity-0'
            }`}
            style={{ transitionDelay: `${delay}ms` }}
        >
            <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-[#a8dadc]/20 transition-all duration-300 group-hover:scale-110 group-hover:bg-[#a8dadc]">
                <Icon className="h-6 w-6 text-[#457b9d] transition-colors duration-300 group-hover:text-white" />
            </div>
            <h3 className="mb-2 text-lg font-semibold text-slate-800">
                {title}
            </h3>
            <p className="text-sm leading-relaxed text-slate-500">{desc}</p>
        </div>
    );
}

// Platform Icon Component
function PlatformIcon({
    icon: Icon,
    name,
    delay,
}: {
    icon: React.ElementType;
    name: string;
    delay: number;
}) {
    const { ref, isInView } = useInView();

    return (
        <div
            ref={ref}
            className={`group flex min-w-[110px] cursor-pointer flex-col items-center gap-2 rounded-2xl border border-slate-100 bg-white p-4 shadow-sm transition-all duration-500 hover:-translate-y-2 hover:shadow-lg sm:min-w-[130px] sm:gap-3 sm:p-5 ${
                isInView
                    ? 'translate-y-0 opacity-100'
                    : 'translate-y-8 opacity-0'
            }`}
            style={{ transitionDelay: `${delay}ms` }}
        >
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-slate-50 transition-all duration-300 group-hover:scale-110 group-hover:bg-[#a8dadc] sm:h-14 sm:w-14">
                <Icon className="h-7 w-7 text-slate-600 transition-colors duration-300 group-hover:text-white" />
            </div>
            <span className="text-sm font-medium text-slate-700">{name}</span>
        </div>
    );
}

// FAQ Item Component
function FAQItem({
    question,
    answer,
    isOpenInitial = false,
    delay,
}: {
    question: string;
    answer: string;
    isOpenInitial?: boolean;
    delay: number;
}) {
    const [isOpen, setIsOpen] = useState(isOpenInitial);
    const { ref, isInView } = useInView();

    return (
        <div
            ref={ref}
            className={`overflow-hidden rounded-2xl border border-slate-100 bg-white transition-all duration-500 ${
                isInView
                    ? 'translate-y-0 opacity-100'
                    : 'translate-y-8 opacity-0'
            }`}
            style={{ transitionDelay: `${delay}ms` }}
        >
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="flex w-full items-center justify-between p-4 text-left transition-colors hover:bg-slate-50 sm:p-6"
            >
                <span className="pr-4 text-sm font-semibold text-slate-800 sm:text-base">{question}</span>
                <ChevronDown
                    className={`h-5 w-5 text-slate-400 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}
                />
            </button>
            <div
                className={`transition-all duration-300 ease-in-out ${isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}
            >
                <div className="border-t border-slate-50 p-4 text-sm leading-relaxed text-slate-500 sm:p-6">
                    {answer}
                </div>
            </div>
        </div>
    );
}

// Testimonial Card Component
function TestimonialCard({
    name,
    role,
    content,
    image,
}: {
    name: string;
    role: string;
    content: string;
    image: string;
}) {
    return (
        <div className="mx-2 w-[280px] shrink-0 rounded-2xl border border-slate-100 bg-white p-5 shadow-sm transition-all duration-300 hover:shadow-md sm:mx-4 sm:w-[350px] sm:p-6">
            <p className="mb-6 text-sm leading-relaxed text-slate-600 italic">
                "{content}"
            </p>
            <div className="flex items-center gap-3">
                <div className="h-10 w-10 overflow-hidden rounded-full bg-slate-200">
                    <img
                        src={image}
                        alt={name}
                        className="h-full w-full object-cover"
                    />
                </div>
                <div>
                    <h4 className="text-sm font-bold text-slate-800">{name}</h4>
                    <p className="text-xs text-slate-500">{role}</p>
                </div>
            </div>
        </div>
    );
}

export default function Welcome({
    canRegister = true,
}: {
    canRegister?: boolean;
}) {
    const { auth } = usePage<SharedData>().props;
    const [isScrolled, setIsScrolled] = useState(false);

    // Stats counters
    const users = useCounter(5000, 2000);
    const orders = useCounter(100000, 2500);
    const platforms = useCounter(50, 1500);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Start counters when component mounts
    useEffect(() => {
        const timer = setTimeout(() => {
            users.start();
            orders.start();
            platforms.start();
        }, 500);
        return () => clearTimeout(timer);
    }, [users, orders, platforms]);

    return (
        <>
            <Head title="Panel SMM Terbaik Indonesia">
                <link rel="preconnect" href="https://fonts.googleapis.com" />
                <link
                    rel="preconnect"
                    href="https://fonts.gstatic.com"
                    crossOrigin="anonymous"
                />
                <link
                    href="https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,200..800&display=swap"
                    rel="stylesheet"
                />
                <style>{`
                    * { font-family: 'Bricolage Grotesque', sans-serif; }
                    html { scroll-behavior: smooth; }
                    #hero-particles {
                        position: absolute;
                        top: 0;
                        left: 0;
                        width: 100%;
                        height: 100%;
                        z-index: 0;
                    }
                    @keyframes marquee {
                        0% { transform: translateX(0); }
                        100% { transform: translateX(-50%); }
                    }
                    .animate-marquee {
                        display: flex;
                        width: max-content;
                        animation: marquee 40s linear infinite;
                    }
                    .animate-marquee:hover {
                        animation-play-state: paused;
                    }
                    @keyframes move-forever {
                        0% { transform: translateX(-90px); }
                        100% { transform: translateX(85px); }
                    }
                    .parallax-waves {
                        will-change: transform;
                    }
                    .parallax-waves > use {
                        animation: move-forever 25s cubic-bezier(.55,.5,.45,.5) infinite;
                        will-change: transform;
                    }
                    .parallax-waves > use:nth-child(1) { animation-delay: -2s; animation-duration: 7s; }
                    .parallax-waves > use:nth-child(2) { animation-delay: -3s; animation-duration: 10s; }
                    .parallax-waves > use:nth-child(3) { animation-delay: -4s; animation-duration: 13s; }
                    .parallax-waves > use:nth-child(4) { animation-delay: -5s; animation-duration: 20s; }
                `}</style>
            </Head>

            <div className="min-h-screen bg-slate-50">
                {/* Navbar - Fixed at top */}
                <nav
                    className={`fixed top-0 right-0 left-0 z-50 transition-all duration-300 ${
                        isScrolled
                            ? 'border-b border-slate-200 bg-white/95 shadow-sm backdrop-blur-md'
                            : 'bg-transparent'
                    }`}
                >
                    <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 md:px-6 md:py-4">
                        <Link
                            href="/"
                            className="group flex items-center gap-2"
                        >
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
                            {[
                                { name: 'Beranda', href: '#' },
                                { name: 'Layanan', href: '#pricing' },
                                { name: 'Pertanyaan Umum', href: '#' },
                                { name: 'Kontak', href: '#' },
                            ].map((item) => (
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
                                    <span className="hidden sm:inline">
                                        Dashboard
                                    </span>
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
                                        <span className="hidden sm:inline">
                                            Masuk
                                        </span>
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

                {/* Hero Section - With Gradient Background & Particles */}
                <section className="relative min-h-screen overflow-hidden bg-linear-to-br from-[#a8dadc] via-[#81c8cc] to-[#457b9d] px-6 pt-32 pb-48">
                    {/* Particles only in hero */}
                    <ParticlesBackground />

                    <div className="relative z-10 mx-auto max-w-4xl text-center">
                        <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/20 px-4 py-2 text-sm font-medium text-white backdrop-blur-sm">
                            <Sparkles className="h-4 w-4" />
                            Platform SMM Terpercaya #1 di Indonesia
                        </div>

                        <h1 className="mb-5 text-3xl leading-tight font-bold tracking-tight text-white sm:text-4xl md:text-6xl">
                            Panel SMM Otomatis untuk{' '}
                            <span className="text-[#f4a261]">Media Sosial</span>{' '}
                            Anda
                        </h1>

                        <p className="mx-auto mb-8 max-w-2xl text-base leading-relaxed text-white/90 sm:text-lg">
                            Kelola dan jalankan layanan media sosial dengan
                            sistem otomatis, cepat, dan mudah digunakan.
                            Tingkatkan engagement Anda sekarang!
                        </p>

                        <div className="mb-14 flex flex-wrap justify-center gap-4">
                            <Link
                                href={register().url}
                                className="group inline-flex items-center gap-2 rounded-xl bg-white px-7 py-3.5 text-sm font-semibold text-[#457b9d] shadow-xl transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl"
                            >
                                Mulai Sekarang
                                <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                            </Link>
                            <a
                                href="#pricing"
                                className="group inline-flex items-center gap-2 rounded-xl border border-white/30 bg-white/10 px-7 py-3.5 text-sm font-semibold text-white backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:bg-white/20"
                            >
                                Lihat Harga
                                <ChevronDown className="h-4 w-4" />
                            </a>
                        </div>

                        {/* Stats */}
                        <div className="mx-auto grid max-w-2xl grid-cols-3 gap-2 rounded-2xl border border-white/30 bg-white/20 p-4 backdrop-blur-md sm:gap-6 sm:p-6">
                            <div className="text-center">
                                <div className="mb-1 text-2xl font-bold text-white md:text-3xl">
                                    {users.count.toLocaleString()}+
                                </div>
                                <div className="text-xs text-white/70">
                                    Pengguna Aktif
                                </div>
                            </div>
                            <div className="border-x border-white/30 text-center">
                                <div className="mb-1 text-2xl font-bold text-white md:text-3xl">
                                    {orders.count.toLocaleString()}+
                                </div>
                                <div className="text-xs text-white/70">
                                    Order Sukses
                                </div>
                            </div>
                            <div className="text-center">
                                <div className="mb-1 text-2xl font-bold text-white md:text-3xl">
                                    {platforms.count}+
                                </div>
                                <div className="text-xs text-white/70">
                                    Layanan Tersedia
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Wave Shape Divider */}
                    <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-0">
                        <svg
                            className="relative block h-[50px] w-[calc(100%+1.3px)] md:h-[100px]"
                            data-name="Layer 1"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 1200 120"
                            preserveAspectRatio="none"
                        >
                            <path
                                d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V120H0V95.8C58.15,97.02,126,104,180,95.8,234,87.6,281.42,68.96,321.39,56.44Z"
                                className="fill-white"
                            ></path>
                        </svg>
                    </div>
                </section>

                {/* Features Section - White Background */}
                <section className="bg-white px-4 py-14 sm:px-6 sm:py-20">
                    <div className="mx-auto max-w-6xl">
                        <div className="mb-10 text-center sm:mb-12">
                            <h2 className="mb-3 text-2xl font-bold text-slate-800 sm:text-3xl md:text-4xl">
                                Kenapa Memilih Kami?
                            </h2>
                            <p className="text-slate-500">
                                Fitur unggulan untuk kesuksesan bisnis SMM Anda
                            </p>
                        </div>

                        <div className="grid gap-4 sm:gap-5 md:grid-cols-2 lg:grid-cols-3">
                            <FeatureCard
                                icon={Zap}
                                title="Pemesanan Otomatis"
                                desc="Order diproses 24/7 tanpa perlu menunggu konfirmasi manual"
                                delay={0}
                            />
                            <FeatureCard
                                icon={MonitorPlay}
                                title="Monitoring Real-Time"
                                desc="Pantau status pesanan secara langsung dengan update instan"
                                delay={100}
                            />
                            <FeatureCard
                                icon={Users}
                                title="Multi Platform"
                                desc="Instagram, TikTok, YouTube, Facebook, Twitter, dan lainnya"
                                delay={200}
                            />
                            <FeatureCard
                                icon={Rocket}
                                title="Proses Cepat"
                                desc="Server handal dengan kecepatan maksimal dan uptime 99.9%"
                                delay={300}
                            />
                            <FeatureCard
                                icon={Shield}
                                title="Pembayaran Aman"
                                desc="Berbagai metode pembayaran dengan keamanan terjamin"
                                delay={400}
                            />
                            <FeatureCard
                                icon={TrendingUp}
                                title="Cocok untuk Reseller"
                                desc="Harga kompetitif untuk memaksimalkan keuntungan Anda"
                                delay={500}
                            />
                        </div>
                    </div>
                </section>

                {/* Platforms Section - Soft Indigo Background */}
                <section className="relative overflow-hidden bg-linear-to-b from-indigo-50/50 to-white px-4 pt-24 pb-14 sm:px-6 sm:pt-32 sm:pb-20">
                    {/* Wave Top Divider */}
                    <div className="absolute top-0 left-0 w-full overflow-hidden leading-0">
                        <svg
                            className="relative block h-[50px] w-[calc(100%+1.3px)] md:h-[80px]"
                            data-name="Layer 1"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 1200 120"
                            preserveAspectRatio="none"
                        >
                            <path
                                d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V95.8C58.15,97.02,126,104,180,95.8,234,87.6,281.42,68.96,321.39,56.44Z"
                                className="fill-white"
                            ></path>
                        </svg>
                    </div>

                    {/* Subtle decorative circles */}
                    <div className="absolute top-0 right-0 translate-x-1/2 -translate-y-1/2 rounded-full bg-indigo-100/30 p-32 blur-3xl" />
                    <div className="absolute bottom-0 left-0 -translate-x-1/2 translate-y-1/2 rounded-full bg-blue-100/20 p-40 blur-3xl" />

                    <div className="relative z-10 mx-auto max-w-6xl">
                        <div className="mb-10 text-center sm:mb-12">
                            <h2 className="mb-3 text-2xl font-bold text-slate-800 sm:text-3xl md:text-4xl">
                                Platform yang Didukung
                            </h2>
                            <p className="text-sm text-slate-500 sm:text-base">
                                Lengkap untuk semua kebutuhan media sosial Anda
                            </p>
                        </div>

                        <div className="flex flex-wrap justify-center gap-3 sm:gap-4">
                            <PlatformIcon
                                icon={Instagram}
                                name="Instagram"
                                delay={0}
                            />
                            <PlatformIcon
                                icon={MonitorPlay}
                                name="TikTok"
                                delay={100}
                            />
                            <PlatformIcon
                                icon={MonitorPlay}
                                name="YouTube"
                                delay={200}
                            />
                            <PlatformIcon
                                icon={Facebook}
                                name="Facebook"
                                delay={300}
                            />
                            <PlatformIcon
                                icon={Twitter}
                                name="Twitter"
                                delay={400}
                            />
                            <PlatformIcon
                                icon={Send}
                                name="Telegram"
                                delay={500}
                            />
                        </div>
                    </div>
                </section>

                {/* Testimonials Section - Smooth Auto Scroll */}
                <section className="overflow-hidden bg-white px-4 py-16 sm:px-6 sm:py-24">
                    <div className="mb-10 text-center sm:mb-16">
                        <h2 className="mb-3 text-2xl font-bold text-slate-800 sm:text-3xl md:text-4xl">
                            Apa Kata Mereka?
                        </h2>
                        <p className="text-sm text-slate-500 sm:text-base">
                            Testimoni nyata dari pengguna setia kami
                        </p>
                    </div>

                    <div className="relative">
                        {/* Gradient Fade Overlays */}
                        <div className="absolute top-0 bottom-0 left-0 z-10 w-32 bg-linear-to-r from-white to-transparent" />
                        <div className="absolute top-0 right-0 bottom-0 z-10 w-32 bg-linear-to-l from-white to-transparent" />

                        <div className="animate-marquee py-4">
                            {[...Array(2)].map((_, i) => (
                                <div key={i} className="flex">
                                    <TestimonialCard
                                        name="Bayu fahri"
                                        role="Reseller sosmed"
                                        content="Medanpedia yang luar biasa !!! , lebih baik dari yang dijelaskan!! Akan digunakan lagi dan lagi!!"
                                        image="https://ui-avatars.com/api/?name=Bayu+Fahri&background=a8dadc&color=fff"
                                    />
                                    <TestimonialCard
                                        name="Robby sanjaya"
                                        role="Reseller sosmed"
                                        content="Sobat sangat berguna dan saya mendapatkan penghasilan lebih!!! Layanan sangat cepat dan stabil."
                                        image="https://ui-avatars.com/api/?name=Robby+Sanjaya&background=457b9d&color=fff"
                                    />
                                    <TestimonialCard
                                        name="Ani Wijaya"
                                        role="Digital Marketer"
                                        content="Panel ini sangat membantu kampanye media sosial klien saya. Prosesnya instan dan harganya sangat bersahabat."
                                        image="https://ui-avatars.com/api/?name=Ani+Wijaya&background=f4a261&color=fff"
                                    />
                                    <TestimonialCard
                                        name="Diki Pratama"
                                        role="Influencer"
                                        content="Layanan terbaik yang pernah saya temukan. CS nya responsif dan sangat membantu saat ada kendala."
                                        image="https://ui-avatars.com/api/?name=Diki+Pratama&background=81c8cc&color=fff"
                                    />
                                    <TestimonialCard
                                        name="Siska Putri"
                                        role="Owner Olshop"
                                        content="Jualan jadi makin lancar semenjak pakai panel ini. Terpercaya dan sangat direkomendasikan!"
                                        image="https://ui-avatars.com/api/?name=Siska+Putri&background=f8bbd9&color=fff"
                                    />
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* FAQ Section - Light Indigo Background */}
                <section
                    id="faq"
                    className="relative overflow-hidden bg-[#a8dadc]/10 px-4 pt-16 pb-40 sm:px-6 sm:pt-24 sm:pb-48"
                >
                    <div className="relative z-10 mx-auto max-w-3xl">
                        <div className="mb-10 text-center sm:mb-16">
                            <h2 className="mb-3 text-2xl font-bold text-slate-800 sm:text-3xl md:text-4xl">
                                Pertanyaan Umum
                            </h2>
                            <p className="text-sm text-slate-500 sm:text-base">
                                Pertanyaan lain? Jangan ragu untuk menghubungi
                                kami — tim kami siap membantu Anda secepat
                                mungkin.
                            </p>
                        </div>

                        <div className="space-y-3 sm:space-y-4">
                            <FAQItem
                                question="Apa itu SMM Panel?"
                                answer="SMM Panel adalah sebuah platform yang menyediakan berbagai layanan pemasaran media sosial seperti followers, likes, views, dan lainnya untuk berbagai platform seperti Instagram, TikTok, YouTube, dan Facebook secara otomatis."
                                isOpenInitial={true}
                                delay={0}
                            />
                            <FAQItem
                                question="Berapa lama proses pesanan saya?"
                                answer="Sebagian besar layanan kami diproses secara instan atau dalam hitungan menit. Namun, beberapa layanan mungkin memerlukan waktu hingga 24 jam tergantung pada beban server dan jenis layanan yang dipilih."
                                delay={100}
                            />
                            <FAQItem
                                question="Apakah layanan ini aman untuk akun saya?"
                                answer="Ya, layanan kami didesain agar aman untuk akun media sosial Anda. Kami menggunakan metode yang sesuai dengan kebijakan platform dan tidak pernah meminta kata sandi akun Anda."
                                delay={200}
                            />
                            <FAQItem
                                question="Bagaimana cara melakukan isi saldo?"
                                answer="Kami menyediakan berbagai metode pembayaran otomatis mulai dari Transfer Bank (BCA, Mandiri, BNI, BRI), E-Wallet (OVO, DANA, GoPay, QRIS), hingga Pulsa yang aktif 24 jam."
                                delay={300}
                            />
                            <FAQItem
                                question="Apakah ada bonus untuk reseller?"
                                answer="Tentu! Kami memberikan harga khusus reseller dan bonus saldo untuk deposit dalam jumlah tertentu. Semakin sering Anda bertransaksi, semakin besar keuntungan yang Anda dapatkan."
                                delay={400}
                            />
                        </div>
                    </div>

                    {/* Animated Wave Bottom */}
                    <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-0">
                        <svg
                            className="relative block h-[60px] w-full md:h-[150px]"
                            xmlns="http://www.w3.org/2000/svg"
                            xmlnsXlink="http://www.w3.org/1999/xlink"
                            viewBox="0 24 150 28"
                            preserveAspectRatio="none"
                            shapeRendering="auto"
                        >
                            <defs>
                                <path
                                    id="gentle-wave"
                                    d="M-160 44c30 0 58-18 88-18s 58 18 88 18 58-18 88-18 58 18 88 18 v44h-352z"
                                />
                            </defs>
                            <g className="parallax-waves">
                                <use
                                    xlinkHref="#gentle-wave"
                                    x="48"
                                    y="0"
                                    fill="rgba(255,255,255,0.7)"
                                    stroke="none"
                                />
                                <use
                                    xlinkHref="#gentle-wave"
                                    x="48"
                                    y="3"
                                    fill="rgba(255,255,255,0.5)"
                                    stroke="none"
                                />
                                <use
                                    xlinkHref="#gentle-wave"
                                    x="48"
                                    y="5"
                                    fill="rgba(255,255,255,0.3)"
                                    stroke="none"
                                />
                                <use
                                    xlinkHref="#gentle-wave"
                                    x="48"
                                    y="7"
                                    fill="#ffffff"
                                    stroke="none"
                                />
                            </g>
                        </svg>
                    </div>
                </section>

                {/* Footer - Dark Slate Background */}
                <footer className="relative z-10 bg-slate-800 px-4 py-10 sm:px-6 sm:py-14">
                    <div className="mx-auto max-w-6xl">
                        <div className="mb-8 flex flex-col justify-between gap-8 sm:mb-10 sm:gap-10 md:flex-row">
                            <div className="max-w-sm">
                                <Link
                                    href="/"
                                    className="mb-4 flex items-center gap-2"
                                >
                                    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#a8dadc]">
                                        <Sparkles className="h-4 w-4 text-white" />
                                    </div>
                                    <span className="text-lg font-bold text-white">
                                        SMM Panel
                                    </span>
                                </Link>
                                <p className="text-sm leading-relaxed text-slate-400">
                                    Panel SMM terpercaya untuk mengembangkan
                                    media sosial Anda dengan layanan terbaik dan
                                    proses otomatis.
                                </p>
                            </div>

                            <div className="flex flex-col gap-10 md:flex-row md:gap-24">
                                <div>
                                    <h4 className="mb-4 text-sm font-semibold text-white">
                                        Layanan & Informasi
                                    </h4>
                                    <ul className="space-y-2.5">
                                        {[
                                            'SEWA SMM',
                                            'Keuntungan Join',
                                            'Contoh Pengisian Target',
                                            'Penjelasan Status Pesanan',
                                        ].map((item) => (
                                            <li key={item}>
                                                <a
                                                    href="#"
                                                    className="text-sm text-slate-400 transition-colors duration-300 hover:text-[#a8dadc]"
                                                >
                                                    {item}
                                                </a>
                                            </li>
                                        ))}
                                    </ul>
                                </div>

                                <div>
                                    <h4 className="mb-4 text-sm font-semibold text-white">
                                        Bantuan
                                    </h4>
                                    <ul className="space-y-2.5">
                                        {[
                                            'Pertanyaan Umum',
                                            'Kontak',
                                            'Ketentuan Layanan',
                                        ].map((item) => (
                                            <li key={item}>
                                                <a
                                                    href="#"
                                                    className="text-sm text-slate-400 transition-colors duration-300 hover:text-[#a8dadc]"
                                                >
                                                    {item}
                                                </a>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        </div>

                        <div className="border-t border-slate-700 pt-8 text-center text-sm text-slate-500">
                            © 2026 SMM Panel. Hak cipta dilindungi.
                        </div>
                    </div>
                </footer>
            </div>
        </>
    );
}
