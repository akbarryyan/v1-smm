import AppLayout from '@/layouts/app-layout';
import { Head } from '@inertiajs/react';
import { ScrollText } from 'lucide-react';

const breadcrumbs = [
    {
        title: 'Ketentuan Layanan',
        href: '/terms-of-service',
    },
];

export default function TermsOfService() {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Ketentuan Layanan" />

            <div className="flex h-full flex-1 flex-col gap-4 bg-slate-50/50 p-4 sm:p-5">
                {/* Header Section */}
                <div className="flex flex-col gap-1">
                    <h2 className="border-l-4 border-[#02c39a] pl-3 text-xl font-extrabold tracking-tight text-slate-900">
                        Ketentuan Layanan
                    </h2>
                    <p className="pl-3 text-xs font-medium text-slate-500">
                        Syarat dan ketentuan penggunaan layanan Medanpedia.
                    </p>
                </div>

                {/* Main Content */}
                <div className="w-full">
                    <div className="overflow-hidden rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-200 sm:p-8">
                        <div className="space-y-8">
                            {/* Umum Section */}
                            <section>
                                <h3 className="mb-4 flex items-center gap-2 text-lg font-black text-slate-800">
                                    <ScrollText className="h-5 w-5 text-[#02c39a]" />
                                    Umum
                                </h3>
                                <ul className="space-y-3 text-sm leading-relaxed text-slate-600">
                                    <li className="flex items-start gap-2">
                                        <span className="mt-1 text-[#02c39a]">
                                            •
                                        </span>
                                        <span>
                                            Dengan memesan atau membeli pesanan
                                            di MedanPedia, anda menyetujui semua{' '}
                                            <span className="font-medium text-indigo-600">
                                                peraturan yang ada
                                            </span>
                                            . Tidak perduli anda membacanya atau
                                            tidak.
                                        </span>
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <span className="mt-1 text-[#02c39a]">
                                            •
                                        </span>
                                        <span>
                                            Kami MedanPedia mempunyai hak untuk
                                            merubah peraturan yang ada tanpa ada
                                            pemberitahuan sebelumnya. Kami
                                            harapkan anda untuk membaca
                                            ketentuan yang ada sebelum
                                            memesan/membeli agar anda tetap{' '}
                                            <span className="font-medium text-indigo-600">
                                                up to date
                                            </span>{' '}
                                            dengan perubahan yang ada.
                                        </span>
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <span className="mt-1 text-[#02c39a]">
                                            •
                                        </span>
                                        <span>
                                            Rate deposit MedanPedia dapat
                                            berubah kapanpun tanpa
                                            pemberitahuan. Pembayaran akan
                                            bergantung dengan rate yang kami
                                            sediakan.
                                        </span>
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <span className="mt-1 text-[#02c39a]">
                                            •
                                        </span>
                                        <span>
                                            <span className="font-bold text-rose-500">
                                                Disclaimer:
                                            </span>{' '}
                                            MedanPedia tidak akan bertanggung
                                            jawab untuk semua kerusakan pada
                                            akun anda atau bisnis anda.
                                        </span>
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <span className="mt-1 text-[#02c39a]">
                                            •
                                        </span>
                                        <span>
                                            <span className="font-bold text-rose-500">
                                                Liabilities:
                                            </span>{' '}
                                            MedanPedia sama sekali tidak akan
                                            bertanggung jawab atas setiap akun
                                            suspensi atau penghapusan gambar
                                            yang dilakukan oleh Instagram /
                                            Twitter / layanan lainnya.
                                        </span>
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <span className="mt-1 text-[#02c39a]">
                                            •
                                        </span>
                                        <span>
                                            <span className="font-bold text-rose-500">
                                                Liabilities:
                                            </span>{' '}
                                            MedanPedia sama sekali tidak akan
                                            bertanggung jawab jika Anda
                                            Memasukkan Nomor Hp/Data Yang
                                            Salah..
                                        </span>
                                    </li>
                                </ul>
                            </section>

                            {/* Layanan Section */}
                            <section>
                                <h3 className="mb-4 flex items-center gap-2 text-lg font-black text-slate-800">
                                    <ScrollText className="h-5 w-5 text-[#02c39a]" />
                                    Layanan
                                </h3>
                                <ul className="space-y-3 text-sm leading-relaxed text-slate-600">
                                    <li className="flex items-start gap-2">
                                        <span className="mt-1 text-[#02c39a]">
                                            •
                                        </span>
                                        <span>
                                            Kami tidak memberi jaminan pengikut
                                            baru anda akan berinteraksi dengan
                                            anda tetapi kami akan memberi{' '}
                                            <span className="font-bold text-slate-800">
                                                garansi pada server tertentu
                                            </span>{' '}
                                            untuk pengikut yang anda beli jika
                                            dalam kurun waktu yang ditentukan
                                            berkurang
                                        </span>
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <span className="mt-1 text-[#02c39a]">
                                            •
                                        </span>
                                        <span>
                                            Kami tidak dapat membatalkan orderan
                                            yang sudah masuk
                                        </span>
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <span className="mt-1 text-[#02c39a]">
                                            •
                                        </span>
                                        <span>
                                            Usahakan{' '}
                                            <span className="font-bold text-slate-800">
                                                pesanan jangan double
                                            </span>
                                            , tunggu pesanan selesai terlebih
                                            daulu pada pesanan baru bisa order
                                            lagi, kami tidak bertanggung jawab
                                            jika tidak mengikutin aturan.
                                        </span>
                                    </li>
                                </ul>
                            </section>

                            {/* Pembayaran Section */}
                            <section>
                                <h3 className="mb-4 flex items-center gap-2 text-lg font-black text-slate-800">
                                    <ScrollText className="h-5 w-5 text-[#02c39a]" />
                                    Pembayaran/Kebijakan Pengembalian
                                </h3>
                                <ul className="space-y-3 text-sm leading-relaxed text-slate-600">
                                    <li className="flex items-start gap-2">
                                        <span className="mt-1 text-[#02c39a]">
                                            •
                                        </span>
                                        <span>
                                            <span className="font-bold text-rose-500">
                                                Tidak dapat diuangkan
                                                kembali/refund
                                            </span>
                                            ,setelah pembayaran sukses,tidak ada
                                            cara untuk mengembalikannya lagi,
                                            Anda{' '}
                                            <span className="font-bold text-slate-800">
                                                hanya dapat menggunakan saldo
                                                untuk membeli layanan yang ada
                                                di MedanPedia
                                            </span>
                                        </span>
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <span className="mt-1 text-[#02c39a]">
                                            •
                                        </span>
                                        <span>
                                            Anda setuju bahwa sekali Anda
                                            menyelesaikan pembayaran, Anda tidak
                                            akan mengajukan sengketa atau
                                            tagihan balik melawan kami untuk
                                            alasan apapun
                                        </span>
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <span className="mt-1 text-[#02c39a]">
                                            •
                                        </span>
                                        <span>
                                            uang sudah masuk tidak bisa
                                            kembalikan hanya bisa dijadikan{' '}
                                            <span className="font-medium text-indigo-600">
                                                saldo
                                            </span>
                                        </span>
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <span className="mt-1 text-[#02c39a]">
                                            •
                                        </span>
                                        <span>
                                            Jika Anda mengajukan sengketa atau
                                            tagihan terhadap kami setelah{' '}
                                            <span className="font-medium text-indigo-600">
                                                deposit
                                            </span>
                                            , kami berhak untuk mengakhiri semua
                                            pesanan anda yang akan datang,
                                            membanned akun anda dari situs kami.
                                            Kami juga berhak untuk mengambil
                                            layanan kami yang dikirim ke akun
                                            Anda atau klien anda.
                                        </span>
                                    </li>
                                </ul>
                            </section>
                        </div>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
