import LandingFooter from '@/components/landing-footer';
import LandingNavbar from '@/components/landing-navbar';
import { Head } from '@inertiajs/react';
import {
    Activity,
    AlertCircle,
    CheckCircle2,
    Clock,
    HelpCircle,
    Info,
    RefreshCw,
    Server,
    XCircle,
} from 'lucide-react';

export default function OrderStatus() {
    const statuses = [
        {
            name: 'Pending',
            color: 'text-amber-500',
            bgColor: 'bg-amber-50',
            borderColor: 'border-amber-100',
            icon: <Clock className="h-6 w-6" />,
            description: 'Pesanan/deposit sedang dalam antrian di server.',
        },
        {
            name: 'Processing',
            color: 'text-blue-500',
            bgColor: 'bg-blue-50',
            borderColor: 'border-blue-100',
            icon: <Activity className="h-6 w-6" />,
            description: 'Pesanan sedang dalam proses.',
        },
        {
            name: 'Success',
            color: 'text-emerald-500',
            bgColor: 'bg-emerald-50',
            borderColor: 'border-emerald-100',
            icon: <CheckCircle2 className="h-6 w-6" />,
            description: 'Pesanan telah berhasil.',
        },
        {
            name: 'Partial',
            color: 'text-indigo-500',
            bgColor: 'bg-indigo-50',
            borderColor: 'border-indigo-100',
            icon: <AlertCircle className="h-6 w-6" />,
            description:
                'Pesanan sudah terproses tapi tercancel. Dan anda hanya akan membayar layanan yang masuk saja.',
        },
        {
            name: 'Error',
            color: 'text-rose-500',
            bgColor: 'bg-rose-50',
            borderColor: 'border-rose-100',
            icon: <XCircle className="h-6 w-6" />,
            description:
                'Pesanan dibatalkan, dan saldo akan otomatis kembali ke akun.',
        },
    ];

    return (
        <>
            <Head title="Penjelasan Status Pesanan - SMM Panel">
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
                            <Info className="h-4 w-4" />
                            Pusat Informasi
                        </div>
                        <h1 className="mb-4 text-3xl font-bold tracking-tight text-white sm:text-4xl md:text-5xl">
                            Status Pesanan
                        </h1>
                        <p className="mx-auto max-w-2xl text-base leading-relaxed text-white/90 sm:text-lg">
                            Pelajari berbagai status pesanan Anda dan bagaimana
                            sistem kami bekerja untuk memastikan kepuasan Anda.
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

                {/* Status Definitions */}
                <section className="px-4 py-16 sm:px-6 sm:py-24">
                    <div className="mx-auto max-w-6xl">
                        <div className="mb-12 text-center text-2xl font-bold text-slate-800">
                            Daftar Status Pesanan
                        </div>
                        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                            {statuses.map((status, idx) => (
                                <div
                                    key={idx}
                                    className={`group rounded-3xl border ${status.borderColor} ${status.bgColor} p-8 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg`}
                                >
                                    <div
                                        className={`mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-white shadow-sm ring-1 ${status.borderColor} ${status.color}`}
                                    >
                                        {status.icon}
                                    </div>
                                    <h3
                                        className={`mb-2 text-xl font-bold ${status.color}`}
                                    >
                                        {status.name}
                                    </h3>
                                    <p className="text-slate-600">
                                        {status.description}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* FAQ Style Explanations */}
                <section className="bg-white px-4 py-16 ring-1 ring-slate-100 sm:px-6 sm:py-24">
                    <div className="mx-auto max-w-4xl">
                        <div className="space-y-16">
                            {/* Partial Explanation */}
                            <div>
                                <div className="mb-8 flex items-center gap-4">
                                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#a8dadc]/20">
                                        <AlertCircle className="h-6 w-6 text-[#457b9d]" />
                                    </div>
                                    <h2 className="text-2xl font-bold text-slate-800">
                                        Mengapa Bisa Partial?
                                    </h2>
                                </div>
                                <div className="grid gap-8 md:grid-cols-2">
                                    <div className="rounded-3xl border border-slate-100 bg-slate-50 p-6">
                                        <h4 className="mb-3 flex items-center gap-2 font-bold text-slate-800">
                                            <XCircle className="h-4 w-4 text-rose-500" />
                                            Masalah Limit
                                        </h4>
                                        <p className="text-sm leading-relaxed text-slate-600">
                                            Jika satu layanan memiliki maksimal
                                            1.000 followers, dan Anda membeli
                                            1.000 followers 2x di akun yang
                                            sama, kemungkinan besar akan terjadi
                                            partial. Ini karena server hanya
                                            menyediakan total 1.000 followers
                                            unik untuk layanan tersebut. Jika
                                            terjadi, silakan gunakan
                                            server/layanan lainnya. Ini tidak
                                            berpengaruh jika pesanan dilakukan
                                            pada akun yang berbeda.
                                        </p>
                                    </div>
                                    <div className="rounded-3xl border border-slate-100 bg-slate-50 p-6">
                                        <h4 className="mb-3 flex items-center gap-2 font-bold text-slate-800">
                                            <Server className="h-4 w-4 text-amber-500" />
                                            Server Overload
                                        </h4>
                                        <p className="text-sm leading-relaxed text-slate-600">
                                            Overload biasanya terjadi di layanan
                                            yang sangat murah karena volume
                                            pesanan yang sangat tinggi. Hal ini
                                            menyebabkan server kewalahan dan
                                            memproses pesanan secara partial.
                                            Untuk pesanan partial, sisa saldo
                                            layanan yang tidak masuk akan
                                            otomatis kembali ke akun Anda.
                                        </p>
                                    </div>
                                </div>
                            </div>

                            {/* Refill Explanation */}
                            <div className="rounded-3xl bg-linear-to-r from-[#457b9d] to-[#1d3557] p-8 text-white shadow-xl sm:p-12">
                                <div className="mb-6 flex items-center gap-4">
                                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/20 backdrop-blur-sm">
                                        <RefreshCw className="h-6 w-6 text-white" />
                                    </div>
                                    <h2 className="text-2xl font-bold">
                                        Garansi (Refill)
                                    </h2>
                                </div>
                                <div className="space-y-4 text-white/90">
                                    <p className="leading-relaxed">
                                        Refill adalah proses isi ulang. Jika
                                        Anda membeli layanan bergaransi (refill)
                                        dan dalam beberapa hari followers
                                        berkurang (drop), Anda dapat mengajukan
                                        laporan melalui tiket.
                                    </p>
                                    <div className="grid gap-6 md:grid-cols-2">
                                        <div className="rounded-2xl bg-white/10 p-5 ring-1 ring-white/20">
                                            <div className="mb-2 flex items-center gap-2 font-bold">
                                                <HelpCircle className="h-4 w-4" />
                                                Layanan Manual Refill
                                            </div>
                                            <p className="text-sm">
                                                Sertakan Order ID dan ajukan
                                                request refill. Tim kami akan
                                                memeriksanya segera.
                                            </p>
                                        </div>
                                        <div className="rounded-2xl bg-white/10 p-5 ring-1 ring-white/20">
                                            <div className="mb-2 flex items-center gap-2 font-bold">
                                                <Activity className="h-4 w-4" />
                                                Layanan Auto Refill
                                            </div>
                                            <p className="text-sm">
                                                Proses isi ulang berjalan
                                                otomatis oleh sistem. Anda tidak
                                                perlu lapor kecuali jika dalam
                                                2x24 jam proses refill belum
                                                berjalan.
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                <LandingFooter />
            </div>
        </>
    );
}
