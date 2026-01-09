import LandingFooter from '@/components/landing-footer';
import LandingNavbar from '@/components/landing-navbar';
import { Head } from '@inertiajs/react';
import {
    BadgeCheck,
    Briefcase,
    Coins,
    Rocket,
    Store,
    TrendingUp,
    Users,
} from 'lucide-react';

export default function Benefits() {
    const benefits = [
        {
            title: 'Peluang Bisnis Reseller (Jual Kembali)',
            icon: <Coins className="h-8 w-8 text-[#457b9d]" />,
            description:
                'Dapatkan penghasilan tambahan tanpa batas dengan menjual kembali layanan kami kepada prospek Anda.',
            example: {
                title: 'Simulasi Keuntungan:',
                text: 'Misalkan harga Instagram Likes di server kami adalah Rp5.000 untuk 1.000 likes. Anda dapat menjualnya kembali dengan harga Rp10.000. Anda mendapatkan margin keuntungan 100%!',
                profit: 'Hanya dengan 5 pesanan per hari, Anda sudah mengantongi profit bersih Rp25.000/hari atau Rp750.000/bulan secara pasif.',
            },
            color: 'bg-emerald-50 border-emerald-100',
            iconBg: 'bg-emerald-100',
        },
        {
            title: 'Meningkatkan Kredibilitas Bisnis (Social Proof)',
            icon: <Store className="h-8 w-8 text-[#457b9d]" />,
            description:
                'Tingkatkan kepercayaan calon pembeli pada produk atau jasa yang Anda jual di media sosial.',
            example: {
                title: 'Pentingnya Penampilan:',
                text: 'Jika Anda memiliki toko online di Instagram namun jumlah pengikut sedikit, calon pelanggan akan ragu untuk bertransaksi.',
                profit: 'Dengan menambah followers dan engagement, profil bisnis Anda terlihat lebih profesional, terpercaya, dan menarik bagi pelanggan baru.',
            },
            color: 'bg-blue-50 border-blue-100',
            iconBg: 'bg-blue-100',
        },
        {
            title: 'Optimasi Personal Branding & Peluang Endorse',
            icon: <Users className="h-8 w-8 text-[#457b9d]" />,
            description:
                'Mulai karier Anda sebagai Influencer, Selebgram, atau Content Creator dengan basis pengikut yang kuat.',
            example: {
                title: 'Langkah Menjadi Selebgram:',
                text: 'Banyak member kami memulai dari 0, meningkatkan subscribers atau followers mereka untuk mendapatkan "pancingan" algoritma.',
                profit: 'Profil dengan engagement tinggi lebih mudah dilirik oleh brand untuk kerjasama endorse atau promosi produk berbayar.',
            },
            color: 'bg-indigo-50 border-indigo-100',
            iconBg: 'bg-indigo-100',
        },
    ];

    return (
        <>
            <Head title="Keuntungan Join - SMM Panel">
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
                <section className="relative overflow-hidden bg-linear-to-br from-[#a8dadc] via-[#81c8cc] to-[#457b9d] px-4 py-16 sm:px-6 sm:py-24">
                    <div className="relative z-10 mx-auto max-w-4xl text-center">
                        <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/20 px-4 py-2 text-sm font-medium text-white backdrop-blur-sm">
                            <Rocket className="h-4 w-4" />
                            Grow with Us
                        </div>
                        <h1 className="mb-4 text-3xl font-bold tracking-tight text-white sm:text-4xl md:text-5xl">
                            Keuntungan Bergabung
                        </h1>
                        <p className="mx-auto max-w-2xl text-base leading-relaxed text-white/90 sm:text-lg">
                            Temukan berbagai cara untuk mendapatkan penghasilan
                            dan memaksimalkan potensi media sosial Anda bersama
                            SMM Panel.
                        </p>
                    </div>

                    {/* Wave divider */}
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

                {/* Detailed Benefits */}
                <section className="px-4 py-16 sm:px-6 sm:py-24">
                    <div className="mx-auto max-w-6xl">
                        <div className="space-y-20">
                            {benefits.map((benefit, idx) => (
                                <div
                                    key={idx}
                                    className={`flex flex-col items-center gap-10 lg:flex-row ${idx % 2 === 1 ? 'lg:flex-row-reverse' : ''}`}
                                >
                                    <div className="flex-1 space-y-6">
                                        <div
                                            className={`inline-flex h-16 w-16 items-center justify-center rounded-2xl ${benefit.iconBg} shadow-sm ring-1 ring-slate-200`}
                                        >
                                            {benefit.icon}
                                        </div>
                                        <h2 className="text-2xl font-bold text-slate-800 sm:text-3xl">
                                            {benefit.title}
                                        </h2>
                                        <p className="text-lg leading-relaxed text-slate-600">
                                            {benefit.description}
                                        </p>
                                        <div className="space-y-4 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
                                            <div className="flex items-center gap-2 font-bold text-slate-800">
                                                <BadgeCheck className="h-5 w-5 text-[#457b9d]" />
                                                {benefit.example.title}
                                            </div>
                                            <p className="text-slate-600">
                                                {benefit.example.text}
                                            </p>
                                            <div className="rounded-2xl bg-slate-50 p-4 text-sm font-medium text-[#457b9d] ring-1 ring-slate-100 ring-inset">
                                                {benefit.example.profit}
                                            </div>
                                        </div>
                                    </div>
                                    <div className="w-full max-w-md flex-1">
                                        <div
                                            className={`aspect-square rounded-3xl ${benefit.color} flex items-center justify-center border-2 border-dashed p-12`}
                                        >
                                            <div className="space-y-4 text-center">
                                                {idx === 0 && (
                                                    <Coins className="mx-auto h-32 w-32 text-emerald-500/20" />
                                                )}
                                                {idx === 1 && (
                                                    <Store className="mx-auto h-32 w-32 text-blue-500/20" />
                                                )}
                                                {idx === 2 && (
                                                    <TrendingUp className="mx-auto h-32 w-32 text-indigo-500/20" />
                                                )}
                                                <p className="font-medium text-slate-400 italic">
                                                    Ilustrasi Potensi Bisnis
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* CEO Message */}
                <section className="bg-white px-4 py-16 ring-1 ring-slate-100 sm:px-6 sm:py-24">
                    <div className="mx-auto max-w-3xl text-center">
                        <div className="mb-8 inline-flex h-20 w-20 items-center justify-center rounded-full bg-[#457b9d]/10 ring-8 ring-[#457b9d]/5">
                            <Briefcase className="h-10 w-10 text-[#457b9d]" />
                        </div>
                        <h2 className="mb-6 text-2xl font-bold text-slate-800 sm:text-3xl">
                            Siap Untuk Menjadi Bagian dari Kami?
                        </h2>
                        <p className="mb-10 text-lg leading-relaxed text-slate-600">
                            Itulah beberapa keuntungan besar yang bisa Anda
                            dapatkan dengan bergabung di SMM Panel. Jangan
                            lewatkan kesempatan untuk membangun kerajaan bisnis
                            media sosial Anda sekarang juga.
                        </p>
                        <div className="space-y-2">
                            <p className="text-xl font-bold text-slate-800 underline decoration-[#a8dadc] decoration-4 underline-offset-4">
                                SALAM SUKSES
                            </p>
                            <p className="font-medium text-slate-500">
                                CEO SMM Panel
                            </p>
                        </div>
                    </div>
                </section>

                <LandingFooter />
            </div>
        </>
    );
}
