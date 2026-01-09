import LandingFooter from '@/components/landing-footer';
import LandingNavbar from '@/components/landing-navbar';
import { Head } from '@inertiajs/react';
import {
    Check,
    ChevronDown,
    Globe,
    Laptop,
    Layout,
    MessageSquare,
    Monitor,
    Send,
    ShieldCheck,
    Zap,
} from 'lucide-react';
import { useState } from 'react';

export default function RentSMM() {
    const [openFaq, setOpenFaq] = useState<number | null>(0);

    const requirements = [
        {
            title: 'Usia Minimal 18 Tahun',
            description:
                'Diperlukan untuk kepatuhan hukum dan perjanjian layanan.',
            icon: <ShieldCheck className="h-6 w-6 text-emerald-500" />,
        },
        {
            title: 'Rekening Pribadi',
            description:
                'Untuk menerima pembayaran deposit langsung dari member Anda.',
            icon: <Zap className="h-6 w-6 text-amber-500" />,
        },
        {
            title: 'Tanggung Jawab Tinggi',
            description:
                'Anda akan mengelola member dan operasional website Anda sendiri.',
            icon: <Check className="h-6 w-6 text-blue-500" />,
        },
        {
            title: 'PC atau Laptop',
            description:
                'Sangat disarankan untuk mempermudah pengelolaan website/admin panel.',
            icon: <Laptop className="h-6 w-6 text-slate-700" />,
        },
    ];

    const faqs = [
        {
            q: 'Apakah saya bisa memiliki website SMM tanpa bisa coding?',
            a: 'Sangat bisa! Kami menangani seluruh urusan teknis, coding, hingga jika terjadi error pada website. Anda cukup fokus pada pemasaran dan pengelolaan member.',
        },
        {
            q: 'Berapa lama proses pembuatan website yang saya pesan?',
            a: 'Proses setup dan instalasi biasanya memakan waktu 1-2 hari kerja setelah pembayaran terkonfirmasi.',
        },
        {
            q: 'Apakah penghasilan akan langsung masuk ke rekening saya?',
            a: 'Tentu saja. Semua pembayaran deposit dari member akan ditransfer langsung ke rekening yang Anda tentukan di website Anda.',
        },
        {
            q: 'Apa bisa saya menentukan nama website dan domain sendiri?',
            a: 'Bisa. Anda memiliki kendali penuh untuk menentukan nama brand dan alamat domain (URL) website Anda.',
        },
        {
            q: 'Apakah saya bisa mengatur harga layanan sesuai keinginan?',
            a: 'Sangat bisa. Anda dapat mengatur margin keuntungan dengan menyesuaikan harga jual layanan di admin panel.',
        },
        {
            q: 'Apakah saya mendapatkan akses CPANEL?',
            a: 'Tidak. Anda akan mendapatkan akses penuh ke Admin Panel yang sudah dirancang khusus untuk mengelola operasional SMM, bukan file server mentah (CPanel).',
        },
    ];

    const pricing = [
        {
            name: 'LITE',
            price: '100.000',
            limit: 'Hingga 3.000 pesanan/bulan',
            features: [
                'Full Admin Panel',
                'Sistem Otomatis',
                'Update Berkala',
                'CS Support',
            ],
            featured: false,
        },
        {
            name: 'PREMIUM',
            price: '250.000',
            limit: '3.000 - 5.000 pesanan/bulan',
            features: [
                'Full Admin Panel',
                'Sistem Otomatis',
                'Update Berkala',
                'Priority Support',
            ],
            featured: false,
        },
        {
            name: 'PERTAMAX',
            price: '500.000',
            limit: '5.000 - 15.000 pesanan/bulan',
            features: [
                'Full Admin Panel',
                'Sistem Otomatis',
                'Optimasi Kecepatan',
                'Special Support',
            ],
            featured: true,
        },
        {
            name: 'PERTAMAX PLUS',
            price: '750.000',
            limit: '15.000 - 50.000 pesanan/bulan',
            features: [
                'Full Admin Panel',
                'Sistem Otomatis',
                'High Performance',
                'Dedicated Support',
            ],
            featured: false,
        },
        {
            name: 'UNLIMITED',
            price: '1.000.000',
            limit: '50.000 - 300.000 pesanan/bulan',
            features: [
                'Enterprise Performance',
                'Custom Scaling',
                'Unlimited Support',
                'VIP Maintenance',
            ],
            featured: false,
        },
    ];

    return (
        <>
            <Head title="Sewa Website SMM Panel - MedanPedia">
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
                `}</style>
            </Head>

            <div className="min-h-screen bg-slate-50">
                <LandingNavbar variant="solid" />

                {/* Hero Section */}
                <section className="relative overflow-hidden bg-linear-to-br from-[#a8dadc] via-[#81c8cc] to-[#457b9d] px-4 py-20 sm:px-6 sm:py-32">
                    <div className="relative z-10 mx-auto max-w-4xl text-center">
                        <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/20 px-4 py-2 text-sm font-medium text-white backdrop-blur-sm">
                            <Monitor className="h-4 w-4" />
                            Whitelabel Solution
                        </div>
                        <h1 className="mb-6 text-4xl font-extrabold tracking-tight text-white sm:text-5xl md:text-6xl">
                            Ingin Memiliki Website{' '}
                            <span className="relative inline-block">
                                <span className="relative z-10 text-amber-300">
                                    SMM SENDIRI?
                                </span>
                                <span className="absolute -bottom-2 left-0 z-0 h-3 w-full opacity-70">
                                    <svg
                                        viewBox="0 0 100 20"
                                        preserveAspectRatio="none"
                                        className="h-full w-full"
                                    >
                                        <path
                                            d="M0,10 Q25,0 50,10 T100,10"
                                            fill="none"
                                            stroke="#fcd34d"
                                            strokeWidth="4"
                                            strokeLinecap="round"
                                        />
                                    </svg>
                                </span>
                            </span>
                        </h1>
                        <p className="mx-auto max-w-2xl text-lg leading-relaxed text-white/95 sm:text-xl">
                            Bangun kualitas bisnis reseller Anda dengan platform
                            profesional. Kami urus teknologinya, Anda urus
                            profitnya.
                        </p>
                    </div>

                    {/* Wave Divider */}
                    <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-0">
                        <svg
                            className="relative block h-[40px] w-[calc(100%+1.3px)] md:h-[80px]"
                            viewBox="0 0 1200 120"
                            preserveAspectRatio="none"
                        >
                            <path
                                d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V120H0V95.8C58.15,97.02,126,104,180,95.8,234,87.6,281.42,68.96,321.39,56.44Z"
                                className="fill-slate-50"
                            ></path>
                        </svg>
                    </div>
                </section>

                {/* Penjelasan Section */}
                <section className="px-4 py-16 sm:px-6 sm:py-24">
                    <div className="mx-auto max-w-6xl">
                        <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
                            <div className="space-y-6">
                                <h2 className="text-3xl font-bold text-slate-800 sm:text-4xl">
                                    Solusi Bisnis SMM Whitelabel
                                </h2>
                                <div className="space-y-4 text-lg text-slate-600">
                                    <p>
                                        Memiliki website panel seperti kamis
                                        memungkinkan Anda untuk memiliki
                                        branding sendiri. Namun, perlu diketahui
                                        bahwa setiap pesanan dari member Anda
                                        akan tetap memotong saldo pusat Anda di
                                        SMM Panel.
                                    </p>
                                    <p className="rounded-2xl bg-amber-50 p-6 text-sm text-amber-800 italic ring-1 ring-amber-100">
                                        "Ini adalah gerbang menuju skalabilitas
                                        bisnis. Anda tidak lagi hanya sebagai
                                        reseller manual, tapi sebagai pemilik
                                        platform."
                                    </p>
                                </div>
                                <div className="flex flex-wrap gap-4">
                                    <a
                                        href="https://sewasosmed.com/"
                                        target="_blank"
                                        className="inline-flex items-center gap-2 rounded-xl bg-[#457b9d] px-6 py-3 font-bold text-white transition-all hover:bg-[#3d6a87] hover:shadow-lg"
                                    >
                                        Lihat Demo Website{' '}
                                        <Globe className="h-4 w-4" />
                                    </a>
                                    <a
                                        href="https://sewasosmed.com/spesifikasi.txt"
                                        target="_blank"
                                        className="inline-flex items-center gap-2 rounded-xl bg-white px-6 py-3 font-bold text-[#457b9d] ring-1 ring-[#457b9d]/20 transition-all hover:bg-slate-50"
                                    >
                                        Cek Spesifikasi{' '}
                                        <Layout className="h-4 w-4" />
                                    </a>
                                </div>
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                {requirements.map((req, i) => (
                                    <div
                                        key={i}
                                        className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm"
                                    >
                                        <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-50">
                                            {req.icon}
                                        </div>
                                        <h3 className="mb-2 font-bold text-slate-800">
                                            {req.title}
                                        </h3>
                                        <p className="text-xs text-slate-500">
                                            {req.description}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </section>

                {/* FAQ Section */}
                <section className="bg-slate-100 px-4 py-16 sm:px-6 sm:py-24">
                    <div className="mx-auto max-w-4xl">
                        <div className="mb-12 text-center">
                            <h2 className="text-3xl font-bold text-slate-800">
                                Pertanyaan Umum
                            </h2>
                            <p className="mt-4 text-slate-600">
                                Segala yang perlu Anda ketahui sebelum melangkah
                                lebih jauh.
                            </p>
                        </div>
                        <div className="space-y-4">
                            {faqs.map((faq, idx) => (
                                <div
                                    key={idx}
                                    className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm"
                                >
                                    <button
                                        onClick={() =>
                                            setOpenFaq(
                                                openFaq === idx ? null : idx,
                                            )
                                        }
                                        className="flex w-full items-center justify-between px-6 py-4 text-left transition-colors hover:bg-slate-50"
                                    >
                                        <span className="font-bold text-slate-700">
                                            {faq.q}
                                        </span>
                                        <ChevronDown
                                            className={`h-5 w-5 text-slate-400 transition-transform ${openFaq === idx ? 'rotate-180' : ''}`}
                                        />
                                    </button>
                                    {openFaq === idx && (
                                        <div className="px-6 pb-4 text-slate-600">
                                            <div className="mb-4 h-px w-full bg-slate-100" />
                                            {faq.a}
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Pricing Section */}
                <section className="px-4 py-16 sm:px-6 sm:py-24">
                    <div className="mx-auto max-w-7xl">
                        <div className="mb-16 text-center">
                            <h2 className="text-3xl font-bold text-slate-800 sm:text-4xl">
                                Paket Sewa Website
                            </h2>
                            <p className="mt-4 text-slate-600">
                                Pilih skala yang sesuai dengan target bisnis
                                Anda.
                            </p>
                        </div>
                        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-5">
                            {pricing.map((plan, i) => (
                                <div
                                    key={i}
                                    className={`relative flex flex-col items-center rounded-3xl border bg-white p-8 transition-all hover:-translate-y-1 hover:shadow-xl ${plan.featured ? 'border-[#457b9d] ring-2 ring-[#457b9d]/20' : 'border-slate-200'}`}
                                >
                                    {plan.featured && (
                                        <span className="absolute -top-4 left-1/2 -translate-x-1/2 rounded-full bg-[#457b9d] px-4 py-1 text-xs font-bold text-white">
                                            PALING POPULER
                                        </span>
                                    )}
                                    <h3 className="text-lg font-bold text-slate-800">
                                        {plan.name}
                                    </h3>
                                    <div className="my-6">
                                        <span className="text-3xl font-bold text-[#457b9d]">
                                            Rp {plan.price}
                                        </span>
                                        <span className="text-slate-400">
                                            /bulan
                                        </span>
                                    </div>
                                    <p className="mb-8 text-center text-xs font-medium text-slate-500">
                                        {plan.limit}
                                    </p>
                                    <ul className="mb-8 w-full space-y-3">
                                        {plan.features.map((feat, f) => (
                                            <li
                                                key={f}
                                                className="flex items-center gap-2 text-sm text-slate-600"
                                            >
                                                <Check className="h-4 w-4 text-emerald-500" />
                                                {feat}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            ))}
                        </div>

                        <div className="mx-auto mt-12 max-w-4xl rounded-3xl bg-blue-50 p-8 text-center ring-1 ring-blue-100">
                            <p className="text-sm leading-relaxed text-slate-600">
                                <span className="font-bold text-blue-600">
                                    Catatan:
                                </span>{' '}
                                Harga di atas belum termasuk biaya domain. Anda
                                bisa menggunakan domain sendiri atau memesan
                                melalui kami (Extensi .com RP 125.000/tahun).
                            </p>
                        </div>
                    </div>
                </section>

                {/* Final CTA */}
                <section className="bg-white px-4 py-16 ring-1 ring-slate-100 sm:px-6 sm:py-24">
                    <div className="mx-auto max-w-3xl text-center">
                        <div className="mb-8 inline-flex h-20 w-20 items-center justify-center rounded-full bg-[#457b9d]/10 ring-8 ring-[#457b9d]/5">
                            <MessageSquare className="h-10 w-10 text-[#457b9d]" />
                        </div>
                        <h2 className="mb-6 text-2xl font-bold text-slate-800 sm:text-3xl">
                            Ada Pertanyaan Lain?
                        </h2>
                        <p className="mb-10 text-lg leading-relaxed text-slate-600">
                            Jangan ragu untuk berkonsultasi lebih lanjut
                            mengenai kebutuhan website SMM Anda langsung dengan
                            tim ahli kami.
                        </p>
                        <a
                            href="https://t.me/6282272883762"
                            target="_blank"
                            className="inline-flex items-center gap-3 rounded-2xl bg-sky-500 px-8 py-4 text-lg font-bold text-white shadow-lg shadow-sky-500/25 transition-all hover:-translate-y-1 hover:bg-sky-600 hover:shadow-xl"
                        >
                            Hubungi via Telegram
                            <Send className="h-5 w-5" />
                        </a>
                    </div>
                </section>

                <LandingFooter />
            </div>
        </>
    );
}
