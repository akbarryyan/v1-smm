import AppLayout from '@/layouts/app-layout';
import { Head } from '@inertiajs/react';
import { ChevronDown, Info, ShoppingCart, Tag } from 'lucide-react';

const breadcrumbs = [
    {
        title: 'Buat Pesanan',
        href: '/orders/create',
    },
];

export default function CreateOrder() {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Buat Pesanan" />

            <div className="flex h-full flex-1 flex-col gap-4 bg-slate-50/50 p-4 sm:p-5">
                {/* Header Section */}
                <div className="flex flex-col gap-1">
                    <h2 className="border-l-4 border-[#02c39a] pl-3 text-xl font-extrabold tracking-tight text-slate-900">
                        Buat Pesanan
                    </h2>
                    <p className="pl-3 text-xs font-medium text-slate-500">
                        Buat pesanan baru untuk layanan sosial media.
                    </p>
                </div>

                {/* Main Content */}
                <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
                    {/* Left Column - Order Form */}
                    <div className="overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-slate-200">
                        {/* Header */}
                        <div className="flex items-center justify-between border-b border-slate-100 bg-white px-5 py-3">
                            <div className="flex items-center gap-2">
                                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#02c39a]/10 text-[#02c39a]">
                                    <ShoppingCart className="h-4 w-4" />
                                </div>
                                <h3 className="text-sm font-bold text-slate-800">
                                    Buat Pesanan
                                </h3>
                            </div>
                            <button className="flex items-center gap-1.5 rounded-lg bg-indigo-500 px-3 py-1.5 text-[10px] font-bold text-white transition-all hover:bg-indigo-600">
                                <Tag className="h-3 w-3" />
                                Kategori
                            </button>
                        </div>

                        <div className="space-y-4 p-5">
                            {/* Kategori */}
                            <div className="space-y-1.5">
                                <label className="text-xs font-bold text-slate-700">
                                    Kategori
                                </label>
                                <div className="relative">
                                    <select className="h-10 w-full cursor-pointer appearance-none rounded-xl border border-slate-200 bg-white px-4 text-xs font-bold text-slate-600 transition-all outline-none focus:border-[#02c39a] focus:ring-2 focus:ring-[#02c39a]/10">
                                        <option>Pilih...</option>
                                        <option>Instagram</option>
                                        <option>TikTok</option>
                                        <option>YouTube</option>
                                        <option>Twitter</option>
                                        <option>Facebook</option>
                                    </select>
                                    <div className="pointer-events-none absolute top-1/2 right-3 -translate-y-1/2 text-slate-400">
                                        <ChevronDown className="h-4 w-4" />
                                    </div>
                                </div>
                            </div>

                            {/* Layanan */}
                            <div className="space-y-1.5">
                                <label className="text-xs font-bold text-slate-700">
                                    Layanan
                                </label>
                                <div className="relative">
                                    <select className="h-10 w-full cursor-pointer appearance-none rounded-xl border border-slate-200 bg-white px-4 text-xs font-bold text-slate-600 transition-all outline-none focus:border-[#02c39a] focus:ring-2 focus:ring-[#02c39a]/10">
                                        <option>Pilih...</option>
                                    </select>
                                    <div className="pointer-events-none absolute top-1/2 right-3 -translate-y-1/2 text-slate-400">
                                        <ChevronDown className="h-4 w-4" />
                                    </div>
                                </div>
                            </div>

                            {/* Deskripsi Layanan */}
                            <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
                                <p className="text-xs text-slate-500 italic">
                                    Deskripsi layanan.
                                </p>
                            </div>

                            {/* Link/Target */}
                            <div className="space-y-1.5">
                                <label className="text-xs font-bold text-slate-700">
                                    Link/Target
                                </label>
                                <input
                                    type="text"
                                    placeholder=""
                                    className="h-10 w-full rounded-xl border border-slate-200 bg-white px-4 text-xs font-bold text-slate-700 transition-all outline-none focus:border-[#02c39a] focus:ring-2 focus:ring-[#02c39a]/10"
                                />
                            </div>

                            {/* Jumlah */}
                            <div className="space-y-1.5">
                                <div className="flex items-center gap-2">
                                    <label className="text-xs font-bold text-slate-700">
                                        Jumlah
                                    </label>
                                    <span className="inline-flex items-center rounded bg-indigo-100 px-1.5 py-0.5 text-[9px] font-bold text-indigo-600">
                                        Min: 0
                                    </span>
                                    <span className="inline-flex items-center rounded bg-amber-100 px-1.5 py-0.5 text-[9px] font-bold text-amber-600">
                                        Max: 0
                                    </span>
                                </div>
                                <input
                                    type="number"
                                    placeholder=""
                                    className="h-10 w-full rounded-xl border border-slate-200 bg-white px-4 text-xs font-bold text-slate-700 transition-all outline-none focus:border-[#02c39a] focus:ring-2 focus:ring-[#02c39a]/10"
                                />
                            </div>

                            {/* Biaya */}
                            <div className="space-y-1.5">
                                <label className="text-xs font-bold text-slate-700">
                                    Biaya
                                </label>
                                <div className="flex h-10 w-full items-center rounded-xl border border-slate-200 bg-slate-50 px-4">
                                    <span className="text-xs font-bold text-slate-500">
                                        Rp
                                    </span>
                                </div>
                            </div>

                            {/* Submit Button */}
                            <button className="h-10 w-full rounded-xl bg-[#02c39a] text-xs font-bold text-white shadow-[0_3px_0_rgb(0,168,132)] transition-all hover:translate-y-[1px] hover:bg-[#00a884] hover:shadow-[0_1px_0_rgb(0,168,132)] active:translate-y-[2px] active:shadow-none">
                                Pesan
                            </button>
                        </div>
                    </div>

                    {/* Right Column - Information */}
                    <div className="overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-slate-200">
                        {/* Header */}
                        <div className="flex items-center gap-2 border-b border-slate-100 bg-white px-5 py-3">
                            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-amber-50 text-amber-500">
                                <Info className="h-4 w-4" />
                            </div>
                            <h3 className="text-sm font-bold text-slate-800">
                                Informasi
                            </h3>
                        </div>

                        <div className="max-h-[600px] space-y-5 overflow-y-auto p-5 text-sm text-slate-600">
                            {/* Instagram Warning */}
                            <div>
                                <h4 className="mb-3 font-bold text-slate-800">
                                    Khusus pesan layanan Instagram tolong baca
                                    ini!
                                </h4>

                                <div className="mb-3 rounded-lg border border-slate-200 p-3">
                                    <p className="text-center text-xs text-slate-500 italic">
                                        [Screenshot pengaturan privasi
                                        Instagram]
                                    </p>
                                </div>

                                <h5 className="mb-2 font-bold text-slate-800">
                                    Penting Instagram:
                                </h5>
                                <p className="mb-3 text-xs leading-relaxed">
                                    Jika Anda tidak melihat pengikut baru,
                                    kemungkinan besar karena mereka perlu
                                    disetujui secara manual. Untuk mengatasinya,
                                    ikuti langkah-langkah berikut untuk akun
                                    yang mau{' '}
                                    <span className="text-indigo-600">
                                        diisi
                                    </span>{' '}
                                    followersnya:
                                </p>
                                <ol className="mb-3 list-inside list-decimal space-y-1 text-xs leading-relaxed">
                                    <li>Buka Pengaturan dan Privasi.</li>
                                    <li>
                                        <span className="text-indigo-600">
                                            Pilih Ikuti
                                        </span>{' '}
                                        dan Undang Teman.
                                    </li>
                                    <li>
                                        <span className="text-indigo-600">
                                            Nonaktifkan
                                        </span>{' '}
                                        opsi Tandai untuk Ditinjau.
                                    </li>
                                    <li>
                                        Jika baru Nonaktifkan opsi Tandai untuk
                                        Ditinjau, kamu bisa test pesan sedikit
                                        dulu.
                                    </li>
                                </ol>
                                <p className="text-xs leading-relaxed">
                                    Ini akan memungkinkan pengikut baru diterima
                                    secara otomatis tanpa perlu persetujuan
                                    manual. Tolong lakukan biar tidak terjadi
                                    sukses tetapi followers tidak masuk padahal
                                    sebenarnya masuk tapi cuman masuk ke spam.
                                </p>
                            </div>

                            {/* Langkah-langkah */}
                            <div>
                                <h4 className="mb-3 font-bold text-slate-800">
                                    Langkah-langkah membuat pesanan baru:
                                </h4>
                                <ul className="space-y-1 text-xs leading-relaxed">
                                    <li className="flex items-start gap-2">
                                        <span className="text-slate-400">
                                            •
                                        </span>
                                        <span>
                                            Pilih salah satu{' '}
                                            <span className="text-indigo-600">
                                                Kategori
                                            </span>
                                            .
                                        </span>
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <span className="text-slate-400">
                                            •
                                        </span>
                                        <span>
                                            Pilih salah satu{' '}
                                            <span className="text-indigo-600">
                                                Layanan
                                            </span>{' '}
                                            yang ingin dipesan.
                                        </span>
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <span className="text-slate-400">
                                            •
                                        </span>
                                        <span>
                                            Masukkan Target pesanan sesuai{' '}
                                            <span className="text-indigo-600">
                                                ketentuan yang diberikan layanan
                                                tersebut
                                            </span>
                                            .
                                        </span>
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <span className="text-slate-400">
                                            •
                                        </span>
                                        <span>
                                            Masukkan{' '}
                                            <span className="text-indigo-600">
                                                Jumlah Pesanan yang diinginkan
                                            </span>
                                            .
                                        </span>
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <span className="text-slate-400">
                                            •
                                        </span>
                                        <span>
                                            Klik Submit untuk membuat pesanan
                                            baru
                                        </span>
                                    </li>
                                </ul>
                            </div>

                            {/* Ketentuan */}
                            <div>
                                <h4 className="mb-3 font-bold text-slate-800">
                                    Ketentuan membuat pesanan baru:
                                </h4>
                                <ul className="space-y-2 text-xs leading-relaxed">
                                    <li className="flex items-start gap-2">
                                        <span className="text-slate-400">
                                            •
                                        </span>
                                        <span>
                                            <span className="text-indigo-600">
                                                Silahkan
                                            </span>{' '}
                                            membuat pesanan sesuai
                                            langkah-langkah diatas.
                                        </span>
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <span className="text-slate-400">
                                            •
                                        </span>
                                        <span>
                                            Jika ingin{' '}
                                            <span className="text-indigo-600">
                                                membuat pesanan
                                            </span>{' '}
                                            dengan Target yang sama dengan
                                            pesanan yang sudah pernah dipesan
                                            sebelumnya, mohon menunggu sampai
                                            pesanan sebelumnya selesai diproses.
                                            Jika terjadi kesalahan / mendapatkan
                                            pesan gagal yang kurang jelas,
                                            silahkan hubungi Admin untuk
                                            informasi lebih{' '}
                                            <span className="text-indigo-600">
                                                lanjut
                                            </span>
                                            .
                                        </span>
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <span className="text-slate-400">
                                            •
                                        </span>
                                        <span>
                                            <span className="text-indigo-600">
                                                Jangan
                                            </span>{' '}
                                            memasukkan orderan yang sama jika
                                            orderan sebelumnya belum selesai.
                                        </span>
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <span className="text-slate-400">
                                            •
                                        </span>
                                        <span>
                                            <span className="text-indigo-600">
                                                Jangan
                                            </span>{' '}
                                            memasukkan orderan yang sama di
                                            panel lain{' '}
                                            <span className="text-indigo-600">
                                                jika
                                            </span>{' '}
                                            orderan di MedanPedia belum selesai.
                                        </span>
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <span className="text-slate-400">
                                            •
                                        </span>
                                        <span>
                                            <span className="text-indigo-600">
                                                Jangan mengganti
                                            </span>{' '}
                                            username atau menghapus link target
                                            saat sudah order.
                                        </span>
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <span className="text-slate-400">
                                            •
                                        </span>
                                        <span>
                                            Orderan yang sudah masuk tidak dapat
                                            di cancel / refund manual, seluruh
                                            proses orderan dikerjakan secara
                                            otomatis oleh server.
                                        </span>
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <span className="text-slate-400">
                                            •
                                        </span>
                                        <span>
                                            Jika Anda memasukkan orderan di
                                            MedanPedia berarti Anda sudah
                                            mengerti aturan MedanPedia dan{' '}
                                            <span className="text-indigo-600">
                                                jangan lupa
                                            </span>{' '}
                                            baca menu F.A.Q serta Terms
                                        </span>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
