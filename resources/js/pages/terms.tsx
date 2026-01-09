import LandingFooter from '@/components/landing-footer';
import LandingNavbar from '@/components/landing-navbar';
import { Head } from '@inertiajs/react';
import { FileText, Gavel, HelpCircle, ShieldAlert } from 'lucide-react';

export default function Terms() {
    const sections = [
        {
            title: 'Umum',
            icon: <Gavel className="h-6 w-6 text-[#457b9d]" />,
            content: [
                'Dengan memesan atau membeli pesanan di SMM Panel, anda menyetujui semua peraturan yang ada. Tidak perduli anda membacanya atau tidak.',
                'Kami SMM Panel mempunyai hak untuk merubah peraturan yang ada tanpa ada pemberitahuan sebelumnya. Kami harapkan anda untuk membaca ketentuan yang ada sebelum memesan/membeli agar anda tetap up to date dengan perubahan yang ada.',
                'Rate deposit SMM Panel dapat berubah kapanpun tanpa pemberitahuan. Pembayaran akan bergantung dengan rate yang kami sediakan.',
                'Disclaimer: SMM Panel tidak akan bertanggung jawab untuk semua kerusakan pada akun anda atau bisnis anda.',
                'Liabilities: SMM Panel sama sekali tidak akan bertanggung jawab atas setiap akun suspensi atau penghapusan gambar yang dilakukan oleh Instagram / Twitter / layanan lainnya.',
                'Liabilities: SMM Panel sama sekali tidak akan bertanggung jawab Jika Anda Memasukkan Nomor Hp/Data Yang Salah.',
            ],
        },
        {
            title: 'Layanan',
            icon: <HelpCircle className="h-6 w-6 text-[#457b9d]" />,
            content: [
                'Kami tidak memberi jaminan pengikut baru anda akan berinteraksi dengan anda tetapi kami akan memberi garansi pada server tertentu untuk pengikut yang anda beli jika dalam kurun waktu yang ditentukan berkurang.',
                'Kami tidak dapat membatalkan orderan yang sudah masuk.',
                'Usahakan pesanan jangan double, tunggu pesanan selesai terlebih daulu pada pesanan baru bisa order lagi, kami tidak bertanggung jawab jika tidak mengikutin aturan.',
            ],
        },
        {
            title: 'Pembayaran/Kebijakan Pengembalian',
            icon: <ShieldAlert className="h-6 w-6 text-[#457b9d]" />,
            content: [
                'Tidak dapat diuangkan kembali/refund.setelah pembayaran sukses,tidak ada cara untuk mengembalikannya lagi. Anda hanya dapat menggunakan saldo untuk membeli layanan yang ada di SMM Panel.',
                'Anda setuju bahwa sekali Anda menyelesaikan pembayaran, Anda tidak akan mengajukan sengketa atau tagihan balik melawan kami untuk alasan apapun.',
                'Uang sudah masuk tidak bisa kembalikan! hanya bisa dijadikan saldo.',
                'Jika Anda mengajukan sengketa atau tagihan terhadap kami setelah deposit, kami berhak untuk mengakhiri semua pesanan anda yang akan datang, membanned akun anda dari situs kami. Kami juga berhak untuk mengambil layanan kami yang dikirim ke akun Anda atau klien anda.',
            ],
        },
    ];

    return (
        <>
            <Head title="Ketentuan Layanan - SMM Panel">
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
                            <FileText className="h-4 w-4" />
                            Ketentuan Layanan
                        </div>
                        <h1 className="mb-4 text-3xl font-bold tracking-tight text-white sm:text-4xl md:text-5xl">
                            Terms of Service
                        </h1>
                        <p className="mx-auto max-w-2xl text-base leading-relaxed text-white/90 sm:text-lg">
                            Harap baca ketentuan layanan kami dengan seksama
                            sebelum menggunakan platform kami.
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

                {/* Content Section */}
                <section className="px-4 py-16 sm:px-6 sm:py-24">
                    <div className="mx-auto max-w-4xl">
                        <div className="space-y-12">
                            {sections.map((section, idx) => (
                                <div
                                    key={idx}
                                    className="group overflow-hidden rounded-3xl border border-slate-200 bg-white p-8 shadow-sm transition-all duration-300 hover:shadow-md"
                                >
                                    <div className="mb-6 flex items-center gap-4">
                                        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#a8dadc]/20 ring-4 ring-[#a8dadc]/5">
                                            {section.icon}
                                        </div>
                                        <h2 className="text-2xl font-bold text-slate-800">
                                            {section.title}
                                        </h2>
                                    </div>
                                    <div className="space-y-4">
                                        {section.content.map((text, i) => (
                                            <div key={i} className="flex gap-4">
                                                <div className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[#a8dadc]" />
                                                <p className="text-sm leading-relaxed text-slate-600 sm:text-base">
                                                    {text}
                                                </p>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Agreement Footer */}
                        <div className="mt-16 rounded-3xl bg-slate-100 p-8 text-center ring-1 ring-slate-200">
                            <p className="text-sm font-medium text-slate-500">
                                Terakhir diperbarui: 9 Januari 2026
                            </p>
                            <p className="mt-2 text-slate-600">
                                Dengan menggunakan layanan kami, Anda dianggap
                                telah memahami dan menyetujui seluruh butir
                                ketentuan di atas.
                            </p>
                        </div>
                    </div>
                </section>

                <LandingFooter />
            </div>
        </>
    );
}
