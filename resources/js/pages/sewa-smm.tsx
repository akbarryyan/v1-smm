import AppLayout from '@/layouts/app-layout';
import { Head } from '@inertiajs/react';
import { ExternalLink } from 'lucide-react';

const breadcrumbs = [
    {
        title: 'Sewa SMM',
        href: '/sewa-smm',
    },
];

export default function SewaSMM() {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Sewa SMM" />

            <div className="flex h-full flex-1 flex-col gap-4 bg-slate-50/50 p-4 sm:p-5">
                {/* Header Section */}
                <div className="flex flex-col gap-1">
                    <h2 className="border-l-4 border-[#02c39a] pl-3 text-xl font-extrabold tracking-tight text-slate-900">
                        SEWA SMM
                    </h2>
                    <p className="pl-3 text-xs font-medium text-slate-500">
                        Sewa website SMM Panel untuk bisnis Anda.
                    </p>
                </div>

                {/* Main Content */}
                <div className="w-full">
                    <div className="overflow-hidden rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-200 sm:p-8">
                        <div className="space-y-8">
                            {/* Title */}
                            <h3 className="text-2xl font-black text-slate-800 italic">
                                Ingin memiliki website SENDIRI?
                            </h3>

                            {/* Penjelasan Section */}
                            <section>
                                <h4 className="mb-3 text-lg font-black text-slate-800 italic underline">
                                    Penjelasan
                                </h4>
                                <div className="space-y-2 text-sm leading-relaxed text-slate-600">
                                    <p>
                                        <span className="text-indigo-600">
                                            medanpedia.co.id
                                        </span>{' '}
                                        adalah portal di mana member dapat{' '}
                                        <span className="text-indigo-600">
                                            melakukan
                                        </span>{' '}
                                        pembelian layanan.
                                    </p>
                                    <p>
                                        Dengan memiliki website seperti
                                        medanpedia.co.id, bukan berarti anda
                                        bisa melakukan pemesanan semau anda dan
                                        sepuasnya.
                                    </p>
                                    <p>
                                        Karena setiap{' '}
                                        <span className="text-indigo-600">
                                            pemesanan yang di lakukan
                                        </span>{' '}
                                        oleh anda atau member anda, akan
                                        memotong saldo pusat di
                                        medanpedia.co.id.
                                    </p>
                                    <p className="mt-4">
                                        penyedia website SMM Panel Indonesia
                                        untuk reseller SMM. Sewa website SMM
                                        Panel{' '}
                                        <span className="text-indigo-600">
                                            di Sini
                                        </span>{' '}
                                        untuk meningkatkan kualitas bisnis SMM
                                        Anda.
                                    </p>
                                </div>
                            </section>

                            {/* Syarat Section */}
                            <section>
                                <h4 className="mb-3 text-lg font-black text-slate-800 italic underline">
                                    Syarat
                                </h4>
                                <ul className="space-y-2 text-sm leading-relaxed text-slate-600">
                                    <li className="flex items-start gap-2">
                                        <span className="text-slate-400">
                                            -
                                        </span>
                                        <span>
                                            Anda diharapkan berusia minimal 18
                                            tahun karena beberapa layanan yang
                                            membutuhkan perjanjian berdasar
                                            hukum.
                                        </span>
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <span className="text-slate-400">
                                            -
                                        </span>
                                        <span>Mempunyai rekening pribadi</span>
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <span className="text-slate-400">
                                            -
                                        </span>
                                        <span>
                                            Bertanggung jawab (Karena nanti{' '}
                                            <span className="text-indigo-600">
                                                akan mengurus member kalian
                                                sendiri
                                            </span>
                                            )
                                        </span>
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <span className="text-slate-400">
                                            -
                                        </span>
                                        <span>
                                            Di harapkan mempunyai PC/Laptop
                                            (untuk mempermudah mengelola website
                                            anda)
                                        </span>
                                    </li>
                                </ul>
                            </section>

                            {/* Pertanyaan Section */}
                            <section>
                                <h4 className="mb-3 text-lg font-black text-slate-800 italic underline">
                                    Pertanyaan
                                </h4>
                                <div className="space-y-4 text-sm leading-relaxed text-slate-600">
                                    <div>
                                        <p>
                                            <span className="font-bold text-slate-800">
                                                pertanyaan
                                            </span>{' '}
                                            = Apakah saya bisa{' '}
                                            <span className="text-indigo-600">
                                                memiliki
                                            </span>{' '}
                                            website smm? Sedangkan saya tidak
                                            bisa{' '}
                                            <span className="text-indigo-600">
                                                coding
                                            </span>
                                            .
                                        </p>
                                        <p>
                                            <span className="font-bold text-slate-800">
                                                Jawaban
                                            </span>{' '}
                                            = Sangat bisa, semua{' '}
                                            <span className="text-indigo-600">
                                                Urusan coding dan eror di
                                                website kami yang mengurus
                                            </span>
                                            .
                                        </p>
                                    </div>
                                    <div>
                                        <p>
                                            <span className="font-bold text-slate-800">
                                                pertanyaan
                                            </span>{' '}
                                            - Berapa harga pembuatan website
                                            smm?
                                        </p>
                                        <p>
                                            <span className="font-bold text-slate-800">
                                                Jawaban
                                            </span>{' '}
                                            ={' '}
                                            <span className="text-indigo-600">
                                                Harga akan kami cantumkan di
                                                bagian terakhir halaman{' '}
                                                <span className="text-rose-500">
                                                    ini
                                                </span>
                                            </span>
                                            .
                                        </p>
                                    </div>
                                    <div>
                                        <p>
                                            <span className="font-bold text-slate-800">
                                                pertanyaan
                                            </span>{' '}
                                            = Apakah penghasilan akan langsung
                                            masuk ke rekening saya?
                                        </p>
                                        <p>
                                            <span className="font-bold text-slate-800">
                                                Jawaban
                                            </span>{' '}
                                            = tentu saja, Semua deposit akan
                                            langsung masuk ke rekening anda.
                                        </p>
                                    </div>
                                    <div>
                                        <p>
                                            <span className="font-bold text-slate-800">
                                                pertanyaan
                                            </span>{' '}
                                            =Berapa lama proses pembuatan
                                            website yang saya pesan?
                                        </p>
                                        <p>
                                            <span className="font-bold text-slate-800">
                                                Jawaban
                                            </span>{' '}
                                            =Untuk pemrosesan layanan web SMM
                                            kami membutuhkan waktu 1-2 Hari,
                                            setelah pembayaran terkonfirmasi.
                                        </p>
                                    </div>
                                    <div>
                                        <p>
                                            <span className="font-bold text-slate-800">
                                                pertanyaan
                                            </span>{' '}
                                            =Apa bisa nanti nama website dan
                                            domain saya yang menentukan?
                                        </p>
                                        <p>
                                            <span className="font-bold text-slate-800">
                                                Jawaban
                                            </span>{' '}
                                            =Tentu saja, Nama website dan domain
                                            anda yang menentukan sendiri
                                        </p>
                                    </div>
                                    <div>
                                        <p>
                                            <span className="font-bold text-slate-800">
                                                pertanyaan
                                            </span>{' '}
                                            =Apakah saya bisa mengatur harga
                                            layanan sesuai keinginan saya?
                                        </p>
                                        <p>
                                            <span className="font-bold text-slate-800">
                                                Jawaban
                                            </span>{' '}
                                            =Bisa, anda bisa mengatur semua
                                            harga layanan di website anda untuk
                                            menyesuaikan keuntungan
                                        </p>
                                    </div>
                                    <div>
                                        <p>
                                            <span className="font-bold text-slate-800">
                                                pertanyaan
                                            </span>{' '}
                                            =Apakah saya bisa mendapatkan akses
                                            cpanel?
                                        </p>
                                        <p>
                                            <span className="font-bold text-slate-800">
                                                Jawaban
                                            </span>{' '}
                                            =Tidak, anda hanya mendapatkan akses
                                            penuh admin panel
                                        </p>
                                    </div>
                                </div>
                            </section>

                            {/* Harga Section */}
                            <section>
                                <h4 className="mb-3 text-lg font-black text-slate-800 italic underline">
                                    Harga
                                </h4>
                                <div className="space-y-2 text-sm leading-relaxed text-slate-600">
                                    <p>
                                        <span className="font-bold text-slate-800">
                                            LITE
                                        </span>{' '}
                                        : Untuk SMM dengan pesanan kurang dari
                                        3.000 pesanan perbulan :{' '}
                                        <span className="font-bold">
                                            Rp 100.000/Bulan
                                        </span>
                                    </p>
                                    <p>
                                        <span className="font-bold text-slate-800">
                                            PREMIUM
                                        </span>{' '}
                                        : Untuk SMM dengan pesanan 3.000 sampai
                                        5.000 pesanan perbulan. :{' '}
                                        <span className="font-bold">
                                            Rp 250.000/Bulan
                                        </span>
                                    </p>
                                    <p>
                                        <span className="font-bold text-slate-800">
                                            Pertamax
                                        </span>{' '}
                                        : Untuk SMM dengan pesanan 5.000 sampai
                                        15.000 pesanan perbulan. :{' '}
                                        <span className="font-bold">
                                            Rp 500.000/Bulan
                                        </span>
                                    </p>
                                    <p>
                                        <span className="font-bold text-slate-800">
                                            Pertamax Plus
                                        </span>{' '}
                                        : Untuk SMM dengan pesanan 15.000 sampai
                                        50.000 pesanan perbulan. :{' '}
                                        <span className="font-bold">
                                            Rp 750.000/Bulan
                                        </span>
                                    </p>
                                    <p>
                                        <span className="font-bold text-indigo-600">
                                            Unlimited
                                        </span>{' '}
                                        :{' '}
                                        <span className="text-indigo-600">
                                            Untuk SMM dengan pesanan 50.000
                                            sampai 300.000 pesanan perbulan.
                                        </span>{' '}
                                        :{' '}
                                        <span className="font-bold">
                                            Rp 1.000.000/Bulan
                                        </span>
                                    </p>
                                </div>
                                <p className="mt-4 text-sm leading-relaxed text-slate-600">
                                    <span className="font-bold text-slate-800">
                                        Catatan
                                    </span>{' '}
                                    : Harga di atas tidak termasuk harga membeli
                                    / sewa domain, untuk domain kalian bisa
                                    membeli sendiri (bagi yang belum memiliki)
                                    dan bisa order dengan kami. Harga domain
                                    extensi .com Rp 125.000 pertahun (sudah
                                    termasuk pajak dari pihak provider domain).
                                </p>
                            </section>

                            {/* Demo & SPEK Links */}
                            <section className="space-y-2">
                                <p className="text-sm text-slate-600">
                                    <span className="font-bold text-slate-800">
                                        Demo:
                                    </span>{' '}
                                    <a
                                        href="https://sewasosmed.com/"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-flex items-center gap-1 text-indigo-600 hover:underline"
                                    >
                                        https://sewasosmed.com/
                                        <ExternalLink className="h-3 w-3" />
                                    </a>
                                </p>
                                <p className="text-sm text-slate-600">
                                    <span className="font-bold text-slate-800">
                                        SPEK:
                                    </span>{' '}
                                    <a
                                        href="https://sewasosmed.com/spesifikasi.txt"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-flex items-center gap-1 text-indigo-600 hover:underline"
                                    >
                                        https://sewasosmed.com/spesifikasi.txt
                                        <ExternalLink className="h-3 w-3" />
                                    </a>
                                </p>
                            </section>

                            {/* Contact */}
                            <section className="border-t border-slate-100 pt-4">
                                <p className="text-sm text-slate-600">
                                    Ada pertanyaan lain? Silahkan hubungi admin
                                    di telegram :{' '}
                                    <span className="font-bold text-slate-800">
                                        082272883762
                                    </span>
                                </p>
                            </section>
                        </div>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
