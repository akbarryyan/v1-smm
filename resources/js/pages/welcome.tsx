import { dashboard, login, register } from '@/routes';
import { type SharedData } from '@/types';
import { Head, Link, usePage } from '@inertiajs/react';
import {
    ArrowRight,
    CheckCircle2,
    ChevronDown,
    Facebook,
    Instagram,
    LayoutDashboard,
    MonitorPlay,
    RefreshCw,
    Rocket,
    Send,
    Shield,
    Sparkles,
    TrendingUp,
    Twitter,
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
            className={`group cursor-pointer rounded-2xl border border-slate-100 bg-white p-7 shadow-sm transition-all duration-500 hover:-translate-y-2 hover:shadow-xl hover:shadow-[#a8dadc]/20 ${
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
            className={`group flex min-w-[130px] cursor-pointer flex-col items-center gap-3 rounded-2xl border border-slate-100 bg-white p-5 shadow-sm transition-all duration-500 hover:-translate-y-2 hover:shadow-lg ${
                isInView
                    ? 'translate-y-0 opacity-100'
                    : 'translate-y-8 opacity-0'
            }`}
            style={{ transitionDelay: `${delay}ms` }}
        >
            <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-slate-50 transition-all duration-300 group-hover:scale-110 group-hover:bg-[#a8dadc]">
                <Icon className="h-7 w-7 text-slate-600 transition-colors duration-300 group-hover:text-white" />
            </div>
            <span className="text-sm font-medium text-slate-700">{name}</span>
        </div>
    );
}

// Step Component
function StepCard({
    step,
    title,
    desc,
    delay,
}: {
    step: number;
    title: string;
    desc: string;
    delay: number;
}) {
    const { ref, isInView } = useInView();

    return (
        <div
            ref={ref}
            className={`group text-center transition-all duration-500 ${isInView ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}
            style={{ transitionDelay: `${delay}ms` }}
        >
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-[#a8dadc] text-xl font-bold text-white shadow-lg shadow-[#a8dadc]/40 transition-all duration-300 group-hover:scale-110">
                {step}
            </div>
            <h3 className="mb-2 text-lg font-semibold text-slate-800">
                {title}
            </h3>
            <p className="text-sm leading-relaxed text-slate-500">{desc}</p>
        </div>
    );
}

// Pricing Card Component
function PricingCard({
    name,
    price,
    desc,
    features,
    highlight,
    delay,
}: {
    name: string;
    price: string;
    desc: string;
    features: string[];
    highlight: boolean;
    delay: number;
}) {
    const { ref, isInView } = useInView();

    return (
        <div
            ref={ref}
            className={`relative rounded-2xl border bg-white p-8 transition-all duration-500 hover:-translate-y-2 ${
                highlight
                    ? 'border-[#a8dadc] shadow-xl shadow-[#a8dadc]/20'
                    : 'border-slate-100 shadow-sm hover:shadow-xl'
            } ${isInView ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}
            style={{ transitionDelay: `${delay}ms` }}
        >
            {highlight && (
                <div className="mb-4 inline-flex items-center gap-1 rounded-full bg-[#a8dadc] px-3 py-1 text-xs font-semibold text-white">
                    <Sparkles className="h-3 w-3" />
                    Paling Popular
                </div>
            )}
            <h3 className="mb-1 text-xl font-bold text-slate-800">{name}</h3>
            <p className="mb-4 text-sm text-slate-500">{desc}</p>
            <div className="mb-6 text-3xl font-bold text-[#457b9d]">
                {price}
            </div>
            <ul className="mb-8 space-y-3">
                {features.map((feature, index) => (
                    <li
                        key={index}
                        className="flex items-center gap-3 text-sm text-slate-600"
                    >
                        <div className="flex h-5 w-5 items-center justify-center rounded-full bg-emerald-100">
                            <CheckCircle2 className="h-3 w-3 text-emerald-600" />
                        </div>
                        <span>{feature}</span>
                    </li>
                ))}
            </ul>
            <Link
                href={register().url}
                className={`block w-full rounded-xl py-3.5 text-center text-sm font-semibold transition-all duration-300 ${
                    highlight
                        ? 'bg-[#457b9d] text-white shadow-lg shadow-[#457b9d]/25 hover:bg-[#3d6a87]'
                        : 'bg-slate-100 text-slate-700 hover:bg-[#a8dadc] hover:text-white'
                }`}
            >
                Pilih Paket
            </Link>
        </div>
    );
}

// Trust Item Component
function TrustItem({
    icon: Icon,
    text,
    delay,
}: {
    icon: React.ElementType;
    text: string;
    delay: number;
}) {
    const { ref, isInView } = useInView();

    return (
        <div
            ref={ref}
            className={`group flex items-center gap-4 rounded-xl border border-slate-100 bg-white p-5 shadow-sm transition-all duration-500 hover:-translate-y-1 hover:shadow-lg ${
                isInView
                    ? 'translate-y-0 opacity-100'
                    : 'translate-y-8 opacity-0'
            }`}
            style={{ transitionDelay: `${delay}ms` }}
        >
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-[#a8dadc]/20 transition-all duration-300 group-hover:bg-[#a8dadc]">
                <Icon className="h-5 w-5 text-[#457b9d] transition-colors duration-300 group-hover:text-white" />
            </div>
            <span className="font-medium text-slate-700">{text}</span>
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
    }, []);

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
                    <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
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

                        <div className="flex items-center gap-3">
                            {auth.user ? (
                                <Link
                                    href={dashboard().url}
                                    className={`rounded-lg px-5 py-2.5 text-sm font-semibold transition-all duration-300 ${
                                        isScrolled
                                            ? 'bg-[#457b9d] text-white hover:bg-[#3d6a87]'
                                            : 'bg-white text-slate-800 hover:bg-white/90'
                                    }`}
                                >
                                    Dashboard
                                </Link>
                            ) : (
                                <>
                                    <Link
                                        href={login().url}
                                        className={`px-5 py-2.5 text-sm font-medium transition-all duration-300 ${
                                            isScrolled
                                                ? 'text-slate-600 hover:text-[#457b9d]'
                                                : 'text-white/90 hover:text-white'
                                        }`}
                                    >
                                        Masuk
                                    </Link>
                                    {canRegister && (
                                        <Link
                                            href={register().url}
                                            className={`rounded-lg px-5 py-2.5 text-sm font-semibold transition-all duration-300 ${
                                                isScrolled
                                                    ? 'bg-[#457b9d] text-white hover:bg-[#3d6a87]'
                                                    : 'bg-white text-slate-800 hover:bg-white/90'
                                            }`}
                                        >
                                            Daftar
                                        </Link>
                                    )}
                                </>
                            )}
                        </div>
                    </div>
                </nav>

                {/* Hero Section - With Gradient Background & Particles */}
                <section className="relative min-h-screen overflow-hidden bg-gradient-to-br from-[#a8dadc] via-[#81c8cc] to-[#457b9d] px-6 pt-32 pb-20">
                    {/* Particles only in hero */}
                    <ParticlesBackground />

                    <div className="relative z-10 mx-auto max-w-4xl text-center">
                        <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/20 px-4 py-2 text-sm font-medium text-white backdrop-blur-sm">
                            <Sparkles className="h-4 w-4" />
                            Platform SMM Terpercaya #1 di Indonesia
                        </div>

                        <h1 className="mb-5 text-4xl leading-tight font-bold tracking-tight text-white md:text-6xl">
                            Panel SMM Otomatis untuk{' '}
                            <span className="text-[#f4a261]">Media Sosial</span>{' '}
                            Anda
                        </h1>

                        <p className="mx-auto mb-8 max-w-2xl text-lg leading-relaxed text-white/90">
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
                        <div className="mx-auto grid max-w-2xl grid-cols-3 gap-6 rounded-2xl border border-white/30 bg-white/20 p-6 backdrop-blur-md">
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
                </section>

                {/* Features Section - White Background */}
                <section className="bg-white px-6 py-20">
                    <div className="mx-auto max-w-6xl">
                        <div className="mb-12 text-center">
                            <h2 className="mb-3 text-3xl font-bold text-slate-800 md:text-4xl">
                                Kenapa Memilih Kami?
                            </h2>
                            <p className="text-slate-500">
                                Fitur unggulan untuk kesuksesan bisnis SMM Anda
                            </p>
                        </div>

                        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
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

                {/* Platforms Section - Light Gray Background */}
                <section className="bg-slate-50 px-6 py-20">
                    <div className="mx-auto max-w-6xl">
                        <div className="mb-12 text-center">
                            <h2 className="mb-3 text-3xl font-bold text-slate-800 md:text-4xl">
                                Platform yang Didukung
                            </h2>
                            <p className="text-slate-500">
                                Lengkap untuk semua kebutuhan media sosial Anda
                            </p>
                        </div>

                        <div className="flex flex-wrap justify-center gap-4">
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

                {/* How It Works Section - White Background */}
                <section className="bg-white px-6 py-20">
                    <div className="mx-auto max-w-4xl">
                        <div className="mb-12 text-center">
                            <h2 className="mb-3 text-3xl font-bold text-slate-800 md:text-4xl">
                                Cara Kerja
                            </h2>
                            <p className="text-slate-500">
                                Mulai dalam 4 langkah mudah
                            </p>
                        </div>

                        <div className="grid gap-8 md:grid-cols-4">
                            <StepCard
                                step={1}
                                title="Daftar"
                                desc="Buat akun gratis dalam hitungan detik"
                                delay={0}
                            />
                            <StepCard
                                step={2}
                                title="Top Up"
                                desc="Isi saldo dengan berbagai metode"
                                delay={150}
                            />
                            <StepCard
                                step={3}
                                title="Pesan"
                                desc="Pilih layanan dan buat pesanan"
                                delay={300}
                            />
                            <StepCard
                                step={4}
                                title="Pantau"
                                desc="Lihat progress secara real-time"
                                delay={450}
                            />
                        </div>
                    </div>
                </section>

                {/* Pricing Section - Light Blue Background */}
                <section id="pricing" className="bg-[#a8dadc]/10 px-6 py-20">
                    <div className="mx-auto max-w-5xl">
                        <div className="mb-12 text-center">
                            <h2 className="mb-3 text-3xl font-bold text-slate-800 md:text-4xl">
                                Pilihan Paket
                            </h2>
                            <p className="text-slate-500">
                                Harga transparan, tanpa biaya tersembunyi
                            </p>
                        </div>

                        <div className="grid gap-6 md:grid-cols-3">
                            <PricingCard
                                name="Starter"
                                price="Rp 50.000"
                                desc="Untuk pemula"
                                features={[
                                    'Akses semua layanan',
                                    'Harga standar',
                                    'Support via ticket',
                                    'Dashboard lengkap',
                                ]}
                                highlight={false}
                                delay={0}
                            />
                            <PricingCard
                                name="Professional"
                                price="Rp 200.000"
                                desc="Untuk reseller aktif"
                                features={[
                                    'Akses semua layanan',
                                    'Diskon 10%',
                                    'Priority support',
                                    'API access',
                                    'Bonus saldo 5%',
                                ]}
                                highlight={true}
                                delay={150}
                            />
                            <PricingCard
                                name="Enterprise"
                                price="Rp 500.000"
                                desc="Untuk agency"
                                features={[
                                    'Akses semua layanan',
                                    'Diskon 20%',
                                    'Dedicated support',
                                    'Full API access',
                                    'Bonus saldo 10%',
                                ]}
                                highlight={false}
                                delay={300}
                            />
                        </div>
                    </div>
                </section>

                {/* Trust Section - White Background */}
                <section className="bg-white px-6 py-20">
                    <div className="mx-auto max-w-4xl">
                        <div className="mb-12 text-center">
                            <h2 className="mb-3 text-3xl font-bold text-slate-800 md:text-4xl">
                                Kenapa Kami Dipercaya?
                            </h2>
                        </div>

                        <div className="grid gap-4 md:grid-cols-2">
                            <TrustItem
                                icon={Zap}
                                text="Sistem stabil dengan uptime 99.9%"
                                delay={0}
                            />
                            <TrustItem
                                icon={LayoutDashboard}
                                text="Dashboard intuitif dan mudah digunakan"
                                delay={100}
                            />
                            <TrustItem
                                icon={Users}
                                text="Cocok untuk pemula hingga profesional"
                                delay={200}
                            />
                            <TrustItem
                                icon={RefreshCw}
                                text="Layanan aktif 24/7 tanpa henti"
                                delay={300}
                            />
                        </div>
                    </div>
                </section>

                {/* CTA Section - Teal Background */}
                <section className="bg-gradient-to-r from-[#457b9d] to-[#3d6a87] px-6 py-24">
                    <div className="mx-auto max-w-2xl text-center">
                        <h2 className="mb-4 text-3xl font-bold text-white md:text-4xl">
                            Siap Memulai?
                        </h2>
                        <p className="mb-8 text-white/90">
                            Daftar sekarang dan mulai kembangkan media sosial
                            Anda dengan panel SMM terbaik.
                        </p>
                        <Link
                            href={register().url}
                            className="group inline-flex items-center gap-2 rounded-xl bg-white px-8 py-4 text-sm font-bold text-[#457b9d] shadow-xl transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl"
                        >
                            Daftar Gratis Sekarang
                            <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                        </Link>
                    </div>
                </section>

                {/* Footer - Dark Slate Background */}
                <footer className="bg-slate-800 px-6 py-14">
                    <div className="mx-auto max-w-6xl">
                        <div className="mb-10 grid gap-10 md:grid-cols-4">
                            <div>
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
                                    media sosial Anda.
                                </p>
                            </div>

                            <div>
                                <h4 className="mb-4 text-sm font-semibold text-white">
                                    Navigasi
                                </h4>
                                <ul className="space-y-2.5">
                                    {[
                                        'Tentang Kami',
                                        'Harga',
                                        'API Docs',
                                        'Blog',
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
                                    {['FAQ', 'Support', 'Kontak', 'Status'].map(
                                        (item) => (
                                            <li key={item}>
                                                <a
                                                    href="#"
                                                    className="text-sm text-slate-400 transition-colors duration-300 hover:text-[#a8dadc]"
                                                >
                                                    {item}
                                                </a>
                                            </li>
                                        ),
                                    )}
                                </ul>
                            </div>

                            <div>
                                <h4 className="mb-4 text-sm font-semibold text-white">
                                    Ikuti Kami
                                </h4>
                                <div className="flex gap-2">
                                    {[Instagram, Facebook, Twitter, Send].map(
                                        (Icon, index) => (
                                            <a
                                                key={index}
                                                href="#"
                                                className="flex h-9 w-9 items-center justify-center rounded-lg bg-slate-700 text-slate-400 transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#a8dadc] hover:text-white"
                                            >
                                                <Icon className="h-4 w-4" />
                                            </a>
                                        ),
                                    )}
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
