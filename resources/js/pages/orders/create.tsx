import AppLayout from '@/layouts/app-layout';
import { Head, useForm } from '@inertiajs/react';
import {
    AlertCircle,
    ChevronDown,
    Info,
    Loader2,
    ShoppingCart,
    Tag,
} from 'lucide-react';
import { useMemo, useState } from 'react';

interface Service {
    id: number;
    provider_service_id: string;
    name: string;
    category: string;
    type: string;
    price: number;
    min: number;
    max: number;
    refill: boolean;
    description: string | null;
}

interface Props {
    services: Service[];
    categories: string[];
    errors?: {
        balance?: string;
    };
}

const breadcrumbs = [
    {
        title: 'Buat Pesanan',
        href: '/orders/create',
    },
];

export default function CreateOrder({ services, categories, errors }: Props) {
    const [selectedCategory, setSelectedCategory] = useState('');
    const [selectedServiceId, setSelectedServiceId] = useState('');
    const [quantity, setQuantity] = useState('');

    const form = useForm({
        service_id: '',
        link: '',
        quantity: '',
    });

    // Filter services by selected category
    const filteredServices = useMemo(() => {
        if (!selectedCategory) return [];
        return services.filter((s) => s.category === selectedCategory);
    }, [selectedCategory, services]);

    // Get selected service details
    const selectedService = useMemo(() => {
        if (!selectedServiceId) return null;
        return services.find((s) => s.id === Number(selectedServiceId));
    }, [selectedServiceId, services]);

    // Calculate cost
    const calculatedCost = useMemo(() => {
        if (!selectedService || !quantity || Number(quantity) <= 0) return 0;
        return (Number(quantity) / 1000) * selectedService.price;
    }, [selectedService, quantity]);

    const formatCurrency = (amount: number) => {
        return new Intl.NumberFormat('id-ID', {
            style: 'currency',
            currency: 'IDR',
            minimumFractionDigits: 0,
        }).format(amount);
    };

    const handleCategoryChange = (category: string) => {
        setSelectedCategory(category);
        setSelectedServiceId('');
        form.setData('service_id', '');
    };

    const handleServiceChange = (serviceId: string) => {
        setSelectedServiceId(serviceId);
        form.setData('service_id', serviceId);
        // Reset quantity when service changes
        setQuantity('');
        form.setData('quantity', '');
    };

    const handleQuantityChange = (value: string) => {
        setQuantity(value);
        form.setData('quantity', value);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        form.post('/orders', {
            preserveScroll: true,
        });
    };

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
                            <div className="flex items-center gap-1.5 rounded-lg bg-indigo-50 px-3 py-1.5">
                                <Tag className="h-3 w-3 text-indigo-500" />
                                <span className="text-[10px] font-bold text-indigo-600">
                                    {services.length} Layanan
                                </span>
                            </div>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-4 p-5">
                            {/* Kategori */}
                            <div className="space-y-1.5">
                                <label className="text-xs font-bold text-slate-700">
                                    Kategori
                                </label>
                                <div className="relative">
                                    <select
                                        value={selectedCategory}
                                        onChange={(e) =>
                                            handleCategoryChange(e.target.value)
                                        }
                                        className="h-10 w-full cursor-pointer appearance-none rounded-xl border border-slate-200 bg-white px-4 text-xs font-bold text-slate-600 transition-all outline-none focus:border-[#02c39a] focus:ring-2 focus:ring-[#02c39a]/10"
                                    >
                                        <option value="">
                                            Pilih Kategori...
                                        </option>
                                        {categories.map((category) => (
                                            <option
                                                key={category}
                                                value={category}
                                            >
                                                {category}
                                            </option>
                                        ))}
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
                                    <select
                                        value={selectedServiceId}
                                        onChange={(e) =>
                                            handleServiceChange(e.target.value)
                                        }
                                        disabled={!selectedCategory}
                                        className="h-10 w-full cursor-pointer appearance-none rounded-xl border border-slate-200 bg-white px-4 text-xs font-bold text-slate-600 transition-all outline-none focus:border-[#02c39a] focus:ring-2 focus:ring-[#02c39a]/10 disabled:cursor-not-allowed disabled:bg-slate-50 disabled:text-slate-400"
                                    >
                                        <option value="">
                                            {selectedCategory
                                                ? 'Pilih Layanan...'
                                                : 'Pilih kategori terlebih dahulu...'}
                                        </option>
                                        {filteredServices.map((service) => (
                                            <option
                                                key={service.id}
                                                value={service.id}
                                            >
                                                {service.name} -{' '}
                                                {formatCurrency(service.price)}
                                                /1K
                                            </option>
                                        ))}
                                    </select>
                                    <div className="pointer-events-none absolute top-1/2 right-3 -translate-y-1/2 text-slate-400">
                                        <ChevronDown className="h-4 w-4" />
                                    </div>
                                </div>
                                {form.errors.service_id && (
                                    <p className="flex items-center gap-1 text-[10px] text-rose-500">
                                        <AlertCircle className="h-3 w-3" />
                                        {form.errors.service_id}
                                    </p>
                                )}
                            </div>

                            {/* Deskripsi Layanan */}
                            <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
                                {selectedService ? (
                                    <div className="space-y-2">
                                        <div className="flex items-center justify-between">
                                            <span className="text-[10px] font-bold text-slate-400 uppercase">
                                                Detail Layanan
                                            </span>
                                            {selectedService.refill && (
                                                <span className="rounded bg-blue-100 px-1.5 py-0.5 text-[9px] font-bold text-blue-600">
                                                    REFILL
                                                </span>
                                            )}
                                        </div>
                                        <p className="text-xs font-medium text-slate-700">
                                            {selectedService.name}
                                        </p>
                                        {selectedService.description && (
                                            <p className="text-xs leading-relaxed text-slate-500">
                                                {selectedService.description}
                                            </p>
                                        )}
                                        <div className="grid grid-cols-3 gap-2 pt-2">
                                            <div className="rounded-lg bg-white px-3 py-2 text-center ring-1 ring-slate-200">
                                                <span className="text-[9px] font-bold tracking-wide text-slate-400 uppercase">
                                                    Harga
                                                </span>
                                                <p className="text-xs font-bold text-[#02c39a]">
                                                    {formatCurrency(
                                                        selectedService.price,
                                                    )}
                                                    /1K
                                                </p>
                                            </div>
                                            <div className="rounded-lg bg-white px-3 py-2 text-center ring-1 ring-slate-200">
                                                <span className="text-[9px] font-bold tracking-wide text-slate-400 uppercase">
                                                    Min
                                                </span>
                                                <p className="text-xs font-bold text-indigo-600">
                                                    {selectedService.min.toLocaleString()}
                                                </p>
                                            </div>
                                            <div className="rounded-lg bg-white px-3 py-2 text-center ring-1 ring-slate-200">
                                                <span className="text-[9px] font-bold tracking-wide text-slate-400 uppercase">
                                                    Max
                                                </span>
                                                <p className="text-xs font-bold text-amber-600">
                                                    {selectedService.max.toLocaleString()}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                ) : (
                                    <p className="text-xs text-slate-500 italic">
                                        Pilih layanan untuk melihat deskripsi.
                                    </p>
                                )}
                            </div>

                            {/* Link/Target */}
                            <div className="space-y-1.5">
                                <label className="text-xs font-bold text-slate-700">
                                    Link/Target
                                </label>
                                <input
                                    type="text"
                                    value={form.data.link}
                                    onChange={(e) =>
                                        form.setData('link', e.target.value)
                                    }
                                    placeholder={
                                        selectedService
                                            ? 'Masukkan link atau username target'
                                            : 'Pilih layanan terlebih dahulu'
                                    }
                                    disabled={!selectedService}
                                    className="h-10 w-full rounded-xl border border-slate-200 bg-white px-4 text-xs font-bold text-slate-700 transition-all outline-none focus:border-[#02c39a] focus:ring-2 focus:ring-[#02c39a]/10 disabled:cursor-not-allowed disabled:bg-slate-50 disabled:text-slate-400"
                                />
                                {form.errors.link && (
                                    <p className="flex items-center gap-1 text-[10px] text-rose-500">
                                        <AlertCircle className="h-3 w-3" />
                                        {form.errors.link}
                                    </p>
                                )}
                            </div>

                            {/* Jumlah */}
                            <div className="space-y-1.5">
                                <div className="flex items-center gap-2">
                                    <label className="text-xs font-bold text-slate-700">
                                        Jumlah
                                    </label>
                                    {selectedService && (
                                        <>
                                            <span className="inline-flex items-center rounded bg-indigo-100 px-1.5 py-0.5 text-[9px] font-bold text-indigo-600">
                                                Min:{' '}
                                                {selectedService.min.toLocaleString()}
                                            </span>
                                            <span className="inline-flex items-center rounded bg-amber-100 px-1.5 py-0.5 text-[9px] font-bold text-amber-600">
                                                Max:{' '}
                                                {selectedService.max.toLocaleString()}
                                            </span>
                                        </>
                                    )}
                                </div>
                                <input
                                    type="number"
                                    value={quantity}
                                    onChange={(e) =>
                                        handleQuantityChange(e.target.value)
                                    }
                                    placeholder={
                                        selectedService
                                            ? `Masukkan jumlah (${selectedService.min} - ${selectedService.max})`
                                            : 'Pilih layanan terlebih dahulu'
                                    }
                                    disabled={!selectedService}
                                    min={selectedService?.min || 0}
                                    max={selectedService?.max || 0}
                                    className="h-10 w-full rounded-xl border border-slate-200 bg-white px-4 text-xs font-bold text-slate-700 transition-all outline-none focus:border-[#02c39a] focus:ring-2 focus:ring-[#02c39a]/10 disabled:cursor-not-allowed disabled:bg-slate-50 disabled:text-slate-400"
                                />
                                {form.errors.quantity && (
                                    <p className="flex items-center gap-1 text-[10px] text-rose-500">
                                        <AlertCircle className="h-3 w-3" />
                                        {form.errors.quantity}
                                    </p>
                                )}
                            </div>

                            {/* Biaya */}
                            <div className="space-y-1.5">
                                <label className="text-xs font-bold text-slate-700">
                                    Total Biaya
                                </label>
                                <div className="flex h-12 w-full items-center justify-between rounded-xl border border-slate-200 bg-linear-to-r from-slate-50 to-emerald-50 px-4">
                                    <span className="text-xs font-medium text-slate-500">
                                        Total
                                    </span>
                                    <span className="text-lg font-bold text-[#02c39a]">
                                        {formatCurrency(calculatedCost)}
                                    </span>
                                </div>
                                {errors?.balance && (
                                    <p className="flex items-center gap-1 text-[10px] text-rose-500">
                                        <AlertCircle className="h-3 w-3" />
                                        {errors.balance}
                                    </p>
                                )}
                            </div>

                            {/* Submit Button */}
                            <button
                                type="submit"
                                disabled={
                                    form.processing ||
                                    !selectedService ||
                                    !form.data.link ||
                                    !quantity
                                }
                                className="hover:translate-y-1px flex h-11 w-full items-center justify-center gap-2 rounded-xl bg-[#02c39a] text-xs font-bold text-white shadow-[0_3px_0_rgb(0,168,132)] transition-all hover:bg-[#00a884] hover:shadow-[0_1px_0_rgb(0,168,132)] active:translate-y-[2px] active:shadow-none disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:translate-y-0 disabled:hover:shadow-[0_3px_0_rgb(0,168,132)]"
                            >
                                {form.processing ? (
                                    <>
                                        <Loader2 className="h-4 w-4 animate-spin" />
                                        Memproses...
                                    </>
                                ) : (
                                    <>
                                        <ShoppingCart className="h-4 w-4" />
                                        Pesan Sekarang
                                    </>
                                )}
                            </button>
                        </form>
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
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
