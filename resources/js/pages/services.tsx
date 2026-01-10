import AppLayout from '@/layouts/app-layout';
import { Head, Link, router, usePage } from '@inertiajs/react';
import { debounce } from 'lodash';
import {
    ChevronDown,
    ChevronLeft,
    ChevronRight,
    Layers,
    Search,
    ShoppingBag,
    Tag,
} from 'lucide-react';
import { useEffect, useMemo, useState } from 'react';

interface Service {
    id: number;
    name: string;
    category: string;
    price: number;
    min: number;
    max: number;
    description: string;
    is_active: boolean;
}

interface PaginatedServices {
    data: Service[];
    current_page: number;
    last_page: number;
    links: {
        url: string | null;
        label: string;
        active: boolean;
    }[];
    total: number;
    from: number;
    to: number;
}

export default function Services() {
    const { services, categories, filters } = usePage<{
        services: PaginatedServices;
        categories: string[];
        filters: { search?: string; category?: string };
    }>().props;

    const [search, setSearch] = useState(filters.search || '');
    const [selectedCategory, setSelectedCategory] = useState(
        filters.category || '',
    );

    // Debounce search to avoid too many requests
    const debouncedSearch = useMemo(
        () =>
            debounce((query: string, category: string) => {
                router.get(
                    '/services',
                    { search: query, category },
                    { preserveState: true, replace: true },
                );
            }, 300),
        [],
    );

    useEffect(() => {
        // Trigger search when search text or category changes
        // checking if values differ from props to avoid initial double fetch or loops
        if (
            search !== (filters.search || '') ||
            selectedCategory !== (filters.category || '')
        ) {
            debouncedSearch(search, selectedCategory);
        }
        // Cleanup debounce on unmount
        return () => {
            debouncedSearch.cancel();
        };
    }, [
        search,
        selectedCategory,
        debouncedSearch,
        filters.search,
        filters.category,
    ]);

    const formatRupiah = (amount: number) => {
        return new Intl.NumberFormat('id-ID', {
            style: 'currency',
            currency: 'IDR',
            minimumFractionDigits: 0,
        }).format(amount);
    };

    return (
        <AppLayout
            breadcrumbs={[
                {
                    title: 'Daftar Layanan',
                    href: '/services',
                },
            ]}
        >
            <Head title="Daftar Layanan" />

            <div className="flex h-full flex-1 flex-col gap-6 bg-slate-50/50 p-4 sm:p-6 lg:p-8">
                {/* Header Section */}
                <div className="flex flex-col gap-2">
                    <h2 className="border-l-4 border-[#02c39a] pl-4 text-2xl font-extrabold tracking-tight text-slate-900">
                        Daftar Layanan
                    </h2>
                    <p className="mt-1 pl-4 text-sm font-medium text-slate-500">
                        Temukan layanan terbaik untuk kebutuhan sosial media
                        Anda.
                    </p>
                </div>

                <div className="col-span-12">
                    <div className="overflow-hidden rounded-3xl bg-white shadow-[0_8px_30px_rgb(0,0,0,0.04)] ring-1 ring-slate-200">
                        <div className="flex items-center justify-between border-b border-slate-100 bg-white px-8 py-6">
                            <div className="flex items-center gap-3">
                                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#02c39a]/10 text-[#02c39a]">
                                    <ShoppingBag className="h-5 w-5" />
                                </div>
                                <h3 className="text-lg font-bold text-slate-800">
                                    Daftar Layanan Tersedia
                                </h3>
                            </div>
                        </div>

                        {/* Filter Section */}
                        <div className="flex flex-col items-center gap-3 border-b border-slate-100 bg-slate-50/30 p-6 sm:flex-row">
                            <div className="relative w-full sm:w-64">
                                <div className="pointer-events-none absolute top-1/2 left-4 -translate-y-1/2 text-slate-400">
                                    <Layers className="h-4 w-4" />
                                </div>
                                <select
                                    value={selectedCategory}
                                    onChange={(e) =>
                                        setSelectedCategory(e.target.value)
                                    }
                                    className="h-11 w-full appearance-none rounded-xl border border-slate-300 bg-white pr-4 pl-10 text-xs font-bold text-slate-600 shadow-sm transition-all outline-none focus:border-[#02c39a] focus:ring-2 focus:ring-[#02c39a]/20"
                                >
                                    <option value="">SEMUA KATEGORI</option>
                                    {categories.map((cat) => (
                                        <option key={cat} value={cat}>
                                            {cat}
                                        </option>
                                    ))}
                                </select>
                                <div className="pointer-events-none absolute top-1/2 right-4 -translate-y-1/2 text-slate-400">
                                    <ChevronDown className="h-4 w-4" />
                                </div>
                            </div>

                            <div className="relative w-full flex-1">
                                <input
                                    type="text"
                                    value={search}
                                    onChange={(e) => setSearch(e.target.value)}
                                    placeholder="Cari nama layanan atau ID..."
                                    className="h-11 w-full rounded-xl border border-slate-300 bg-white px-4 pr-12 text-sm font-medium text-slate-700 shadow-sm transition-all outline-none focus:border-[#02c39a] focus:ring-2 focus:ring-[#02c39a]/20"
                                />
                                <button className="absolute top-1.5 right-1.5 flex h-8 w-8 items-center justify-center rounded-lg bg-[#02c39a] text-white shadow-lg shadow-[#02c39a]/20 transition-all hover:bg-[#00a884] active:scale-95">
                                    <Search className="h-4 w-4" />
                                </button>
                            </div>
                        </div>

                        {/* Table */}
                        <div className="overflow-x-auto">
                            <table className="w-full text-left">
                                <thead>
                                    <tr className="bg-slate-50/50 text-[11px] font-bold tracking-wider text-slate-400 uppercase">
                                        <th className="px-6 py-4">ID</th>
                                        <th className="px-6 py-4">Layanan</th>
                                        <th className="px-6 py-4">Kategori</th>
                                        <th className="px-6 py-4">
                                            Harga / 1K
                                        </th>
                                        <th className="px-6 py-4">Min / Max</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-50">
                                    {services.data.length === 0 ? (
                                        <tr>
                                            <td
                                                colSpan={5}
                                                className="px-6 py-10 text-center"
                                            >
                                                <div className="flex flex-col items-center justify-center">
                                                    <div className="mb-4 rounded-full bg-slate-50 p-6">
                                                        <Tag className="h-12 w-12 text-slate-200" />
                                                    </div>
                                                    <p className="text-sm font-bold text-slate-400">
                                                        Tidak ada layanan
                                                        ditemukan
                                                    </p>
                                                </div>
                                            </td>
                                        </tr>
                                    ) : (
                                        services.data.map((service) => (
                                            <tr
                                                key={service.id}
                                                className="group transition-colors hover:bg-slate-50/50"
                                            >
                                                <td className="px-6 py-4">
                                                    <span className="text-xs font-black text-slate-400">
                                                        #{service.id}
                                                    </span>
                                                </td>
                                                <td className="px-6 py-4">
                                                    <div className="max-w-md">
                                                        <p className="text-sm font-bold text-slate-700">
                                                            {service.name}
                                                        </p>
                                                        {service.description && (
                                                            <p className="mt-0.5 truncate text-[10px] text-slate-400">
                                                                {
                                                                    service.description
                                                                }
                                                            </p>
                                                        )}
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4">
                                                    <span className="inline-flex items-center rounded-md bg-purple-50 px-2 py-1 text-xs font-bold text-purple-600 ring-1 ring-purple-100">
                                                        {service.category}
                                                    </span>
                                                </td>
                                                <td className="px-6 py-4">
                                                    <span className="text-sm font-bold text-[#02c39a]">
                                                        {formatRupiah(
                                                            service.price,
                                                        )}
                                                    </span>
                                                </td>
                                                <td className="px-6 py-4">
                                                    <span className="text-xs font-semibold text-slate-500">
                                                        {service.min.toLocaleString(
                                                            'id-ID',
                                                        )}{' '}
                                                        /{' '}
                                                        {service.max.toLocaleString(
                                                            'id-ID',
                                                        )}
                                                    </span>
                                                </td>
                                            </tr>
                                        ))
                                    )}
                                </tbody>
                            </table>
                        </div>

                        {/* Footer Summary & Pagination */}
                        <div className="flex flex-col items-center justify-between gap-4 border-t border-slate-100 bg-slate-50/30 px-8 py-4 sm:flex-row">
                            <p className="text-[11px] font-bold tracking-widest text-slate-400 uppercase">
                                Menampilkan {services.from || 0}-
                                {services.to || 0} dari {services.total} Layanan
                            </p>

                            <div className="flex flex-wrap justify-center gap-1">
                                {services.links.map((link, i) => {
                                    // Clean up label
                                    const label = link.label
                                        .replace('&laquo;', '')
                                        .replace('&raquo;', '')
                                        .trim();
                                    const isPrevious = label === 'Previous';
                                    const isNext = label === 'Next';

                                    let content;
                                    if (isPrevious) {
                                        content = (
                                            <ChevronLeft className="h-4 w-4" />
                                        );
                                    } else if (isNext) {
                                        content = (
                                            <ChevronRight className="h-4 w-4" />
                                        );
                                    } else {
                                        content = (
                                            <span
                                                dangerouslySetInnerHTML={{
                                                    __html: link.label,
                                                }}
                                            />
                                        );
                                    }

                                    return link.url ? (
                                        <Link
                                            key={i}
                                            href={link.url}
                                            className={`flex h-8 min-w-[32px] items-center justify-center rounded-lg px-2 text-xs font-bold transition-all ${
                                                link.active
                                                    ? 'bg-[#02c39a] text-white shadow-sm'
                                                    : 'border border-slate-200 bg-white text-slate-500 hover:border-[#02c39a] hover:text-[#02c39a]'
                                            }`}
                                            preserveState
                                            preserveScroll
                                        >
                                            {content}
                                        </Link>
                                    ) : (
                                        <span
                                            key={i}
                                            className={`flex h-8 min-w-[32px] items-center justify-center rounded-lg border border-slate-200 bg-slate-50 px-2 text-xs font-bold text-slate-300 ${isPrevious || isNext ? 'hidden' : ''}`}
                                        >
                                            {content}
                                        </span>
                                    );
                                })}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
