import AppLayout from '@/layouts/app-layout';
import { Head } from '@inertiajs/react';
import { HelpCircle } from 'lucide-react';

const breadcrumbs = [
    {
        title: 'Pertanyaan Umum',
        href: '/faq',
    },
];

const faqs = [
    {
        id: 1,
        question: 'Apa Itu MedanPedia ?',
        answer: 'MedanPedia adalah SMM Reseller Panel, di mana Orang Beli kebutuhan Social Media Marketing Seperti Facebook, Twitter, Instagram, YouTube, Website Traffic dan masih banyak layanan lainnya.',
    },
    {
        id: 2,
        question: 'Mengapa Medanpedia adalah yang Terbaik?',
        answer: `Medanpedia adalah Panel Reseller SMM Terbaik di Dunia

• dipercaya oleh 20.000 lebih user, dan hampir 70% user menjual nya kembali dan kami sebagai distributor terbesar diIndonesia
• Dukungan API untuk pemilik panel dan Individu untuk Pesanan Otomatis.
• Panel menunjukkan berapa jam dan menit untuk menyelesaikan Pesanan.
• Setiap Layanan harus memiliki deskripsi yang baik untuk pelanggan. Semua Pelanggan harus Memahami Layanan. Cara kerjanya.
• Panel terbaik selalu mengaktifkan gateway pembayaran populer untuk Layanan Belanja, Seperti Virtual Account semua bank, QRIS, Pulsa, dan pembayaran Lainnya.
• Panel yang baik selalu memiliki Ketentuan Layanan dan kebijakan Pengembalian Dana yang singkat dengan jaminan Uang kembali.`,
    },
    {
        id: 3,
        question: 'Bagaimana cara mendaftarnya? Apakah ada biaya pendaftaran?',
        answer: 'Pendaftaran cukup klik Register, dan isi data sesuai yang dibutuhkan, kamu sudah terdaftar di Medan Pedia. Untuk pendaftaran GRATIS tidak dipungut biaya seperserpun.',
    },
    {
        id: 4,
        question: 'Bagaimana cara membuat pesanan?',
        answer: 'Untuk membuat pesanan sangatlah mudah, Anda hanya perlu masuk terlebih dahulu ke akun Anda dan menuju halaman pemesanan dengan mengklik menu yang sudah tersedia. Selain itu Anda juga dapat melakukan pemesanan melalui request API.',
    },
    {
        id: 5,
        question: 'Apa Itu Partial?',
        answer: 'Status Partial adalah ketika kami mengembalikan sebagian sisa-sisa pesanan. Terkadang karena beberapa alasan kami tidak dapat mengirimkan pesanan penuh, jadi kami mengembalikan Saldo sesuai jumlah yang belum terkirim kepada Anda. Contoh: Anda memesan pesanan dengan jumlah 1000 dan membutuhkan biaya 10.000, katakanlah kami mengirimkan 900 dan Kurang 100 tidak dapat kami kirim, maka kami akan "Kembalikan saldo" pesanan dan mengembalikan kurang 100 kepada Anda Kami mengembalikan saldo anda 1.000).',
    },
    {
        id: 6,
        question: 'Bagaimana cara melakukan deposit/isi saldo?',
        answer: 'Untuk melakukan deposit/isi saldo, Anda hanya perlu masuk terlebih dahulu ke akun Anda dan menuju halaman deposit dengan mengklik menu yang sudah tersedia. Kami menyediakan deposit melalui bank dan pulsa.',
    },
];

export default function Faq() {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Pertanyaan Umum" />

            <div className="flex h-full flex-1 flex-col gap-4 bg-slate-50/50 p-4 sm:p-5">
                {/* Header Section */}
                <div className="flex flex-col gap-1">
                    <h2 className="border-l-4 border-[#02c39a] pl-3 text-xl font-extrabold tracking-tight text-slate-900">
                        Pertanyaan Umum
                    </h2>
                    <p className="pl-3 text-xs font-medium text-slate-500">
                        Temukan jawaban untuk pertanyaan yang sering diajukan.
                    </p>
                </div>

                {/* FAQ Grid */}
                <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
                    {faqs.map((faq) => (
                        <div
                            key={faq.id}
                            className="group rounded-2xl bg-white p-5 shadow-sm ring-1 ring-slate-200 transition-all hover:shadow-md hover:ring-[#02c39a]/20"
                        >
                            <div className="flex items-start justify-between gap-4">
                                <h3 className="text-sm leading-tight font-bold text-slate-800">
                                    {faq.question}
                                </h3>
                                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-indigo-50 text-indigo-400 transition-colors group-hover:bg-[#02c39a]/10 group-hover:text-[#02c39a]">
                                    <HelpCircle className="h-4 w-4" />
                                </div>
                            </div>
                            <p className="mt-3 text-xs leading-relaxed font-medium whitespace-pre-line text-slate-500">
                                {faq.answer}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </AppLayout>
    );
}
