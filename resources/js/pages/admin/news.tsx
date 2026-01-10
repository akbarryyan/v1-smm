import AdminLayout from '@/layouts/admin-layout';
import { Head, Link, router, useForm, usePage } from '@inertiajs/react';
import { debounce } from 'lodash';
import {
    AlertTriangle,
    CheckCircle,
    ChevronDown,
    Edit,
    Eye,
    EyeOff,
    Newspaper,
    Plus,
    Search,
    Trash2,
    X,
    XCircle,
} from 'lucide-react';
import { FormEvent, useEffect, useMemo, useState } from 'react';

interface NewsItem {
    id: number;
    title: string;
    content: string;
    type: string;
    type_label: string;
    type_color: string;
    is_active: boolean;
    created_at: string;
    updated_at: string;
}

interface PaginatedNews {
    data: NewsItem[];
    current_page: number;
    last_page: number;
    per_page: number;
    total: number;
    links: { url: string | null; label: string; active: boolean }[];
}

interface Stats {
    total: number;
    active: number;
    inactive: number;
}

interface PageProps {
    news: PaginatedNews;
    stats: Stats;
    filters: {
        type?: string;
        status?: string;
        search?: string;
    };
    flash?: {
        success?: string;
        error?: string;
    };
    [key: string]: unknown;
}

const typeColors: Record<string, string> = {
    announcement: 'bg-blue-100 text-blue-700',
    update: 'bg-emerald-100 text-emerald-700',
    promo: 'bg-amber-100 text-amber-700',
    maintenance: 'bg-rose-100 text-rose-700',
};

const typeLabels: Record<string, string> = {
    announcement: 'Pengumuman',
    update: 'Update',
    promo: 'Promo',
    maintenance: 'Maintenance',
};

export default function AdminNews() {
    const { news, stats, filters, flash } = usePage<PageProps>().props;

    const [type, setType] = useState(filters.type || 'all');
    const [status, setStatus] = useState(filters.status || 'all');
    const [search, setSearch] = useState(filters.search || '');
    const [showModal, setShowModal] = useState(false);
    const [editingNews, setEditingNews] = useState<NewsItem | null>(null);
    const [showFlash, setShowFlash] = useState(true);
    const [deleteId, setDeleteId] = useState<number | null>(null);

    const { data, setData, post, put, processing, reset, errors } = useForm({
        title: '',
        content: '',
        type: 'announcement',
        is_active: true,
    });

    const debouncedFilter = useMemo(
        () =>
            debounce((qType, qStatus, qSearch) => {
                router.get(
                    '/admin/news',
                    {
                        type: qType === 'all' ? '' : qType,
                        status: qStatus === 'all' ? '' : qStatus,
                        search: qSearch,
                    },
                    { preserveState: true, replace: true },
                );
            }, 300),
        [],
    );

    useEffect(() => {
        debouncedFilter(type, status, search);
        return () => debouncedFilter.cancel();
    }, [type, status, search, debouncedFilter]);

    // Auto-hide flash message after 5 seconds
    useEffect(() => {
        if (flash?.success || flash?.error) {
            const timer = setTimeout(() => setShowFlash(false), 5000);
            return () => clearTimeout(timer);
        }
    }, [flash]);

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('id-ID', {
            day: 'numeric',
            month: 'long',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
        });
    };

    const openCreateModal = () => {
        setEditingNews(null);
        reset();
        setShowModal(true);
    };

    const openEditModal = (item: NewsItem) => {
        setEditingNews(item);
        setData({
            title: item.title,
            content: item.content,
            type: item.type,
            is_active: item.is_active,
        });
        setShowModal(true);
    };

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        if (editingNews) {
            put(`/admin/news/${editingNews.id}`, {
                onSuccess: () => {
                    setShowModal(false);
                    reset();
                },
            });
        } else {
            post('/admin/news', {
                onSuccess: () => {
                    setShowModal(false);
                    reset();
                },
            });
        }
    };

    const handleDelete = (id: number) => {
        setDeleteId(id);
    };

    const confirmDelete = () => {
        if (deleteId) {
            router.delete(`/admin/news/${deleteId}`, {
                onSuccess: () => setDeleteId(null),
            });
        }
    };

    const handleToggle = (id: number) => {
        router.post(`/admin/news/${id}/toggle`);
    };

    return (
        <AdminLayout title="Berita">
            <Head title="Berita - Admin" />

            <div className="space-y-4">
                {/* Flash Messages */}
                {showFlash && flash?.success && (
                    <div className="flex items-center gap-3 rounded-xl bg-emerald-50 p-4 ring-1 ring-emerald-200">
                        <CheckCircle className="h-5 w-5 text-emerald-600" />
                        <p className="flex-1 text-sm font-medium text-emerald-800">
                            {flash.success}
                        </p>
                        <button
                            onClick={() => setShowFlash(false)}
                            className="text-emerald-600 hover:text-emerald-800"
                        >
                            <X className="h-4 w-4" />
                        </button>
                    </div>
                )}
                {showFlash && flash?.error && (
                    <div className="flex items-center gap-3 rounded-xl bg-rose-50 p-4 ring-1 ring-rose-200">
                        <XCircle className="h-5 w-5 text-rose-600" />
                        <p className="flex-1 text-sm font-medium text-rose-800">
                            {flash.error}
                        </p>
                        <button
                            onClick={() => setShowFlash(false)}
                            className="text-rose-600 hover:text-rose-800"
                        >
                            <X className="h-4 w-4" />
                        </button>
                    </div>
                )}

                {/* Stats */}
                <div className="grid grid-cols-3 gap-4">
                    <div className="rounded-xl bg-white p-4 shadow-sm ring-1 ring-slate-200">
                        <p className="text-2xl font-bold text-slate-800">
                            {stats.total}
                        </p>
                        <p className="text-xs text-slate-500">Total Berita</p>
                    </div>
                    <div className="rounded-xl bg-white p-4 shadow-sm ring-1 ring-slate-200">
                        <p className="text-2xl font-bold text-emerald-600">
                            {stats.active}
                        </p>
                        <p className="text-xs text-slate-500">Aktif</p>
                    </div>
                    <div className="rounded-xl bg-white p-4 shadow-sm ring-1 ring-slate-200">
                        <p className="text-2xl font-bold text-slate-400">
                            {stats.inactive}
                        </p>
                        <p className="text-xs text-slate-500">Nonaktif</p>
                    </div>
                </div>

                {/* Filters & Add Button */}
                <div className="flex flex-wrap items-center gap-3">
                    <div className="relative">
                        <select
                            value={type}
                            onChange={(e) => setType(e.target.value)}
                            className="h-10 appearance-none rounded-lg border border-slate-200 bg-white pr-10 pl-4 text-sm font-medium text-slate-700 outline-none focus:border-[#02c39a] focus:ring-2 focus:ring-[#02c39a]/10"
                        >
                            <option value="all">Semua Jenis</option>
                            <option value="announcement">Pengumuman</option>
                            <option value="update">Update</option>
                            <option value="promo">Promo</option>
                            <option value="maintenance">Maintenance</option>
                        </select>
                        <ChevronDown className="pointer-events-none absolute top-1/2 right-3 h-4 w-4 -translate-y-1/2 text-slate-400" />
                    </div>

                    <div className="relative">
                        <select
                            value={status}
                            onChange={(e) => setStatus(e.target.value)}
                            className="h-10 appearance-none rounded-lg border border-slate-200 bg-white pr-10 pl-4 text-sm font-medium text-slate-700 outline-none focus:border-[#02c39a] focus:ring-2 focus:ring-[#02c39a]/10"
                        >
                            <option value="all">Semua Status</option>
                            <option value="active">Aktif</option>
                            <option value="inactive">Nonaktif</option>
                        </select>
                        <ChevronDown className="pointer-events-none absolute top-1/2 right-3 h-4 w-4 -translate-y-1/2 text-slate-400" />
                    </div>

                    <div className="relative min-w-[200px] flex-1">
                        <Search className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-slate-400" />
                        <input
                            type="text"
                            placeholder="Cari berita..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className="h-10 w-full rounded-lg border border-slate-200 bg-white pr-4 pl-10 text-sm text-slate-700 outline-none focus:border-[#02c39a] focus:ring-2 focus:ring-[#02c39a]/10"
                        />
                    </div>

                    <button
                        onClick={openCreateModal}
                        className="flex h-10 items-center gap-2 rounded-lg bg-[#02c39a] px-4 text-sm font-bold text-white transition-all hover:bg-[#00a884]"
                    >
                        <Plus className="h-4 w-4" />
                        Tambah Berita
                    </button>
                </div>

                {/* News List */}
                <div className="overflow-hidden rounded-xl bg-white shadow-sm ring-1 ring-slate-200">
                    <div className="max-h-[500px] divide-y divide-slate-100 overflow-y-auto">
                        {news.data.length === 0 ? (
                            <div className="px-4 py-12 text-center">
                                <Newspaper className="mx-auto mb-3 h-10 w-10 text-slate-300" />
                                <p className="text-sm text-slate-500">
                                    Tidak ada berita ditemukan
                                </p>
                            </div>
                        ) : (
                            news.data.map((item) => (
                                <div
                                    key={item.id}
                                    className={`p-5 transition-colors hover:bg-slate-50 ${!item.is_active ? 'opacity-60' : ''}`}
                                >
                                    <div className="mb-3 flex items-start justify-between">
                                        <div className="flex flex-wrap items-center gap-2">
                                            <span
                                                className={`rounded-full px-2.5 py-1 text-[10px] font-bold ${typeColors[item.type] || 'bg-slate-100 text-slate-700'}`}
                                            >
                                                {typeLabels[item.type] ||
                                                    item.type}
                                            </span>
                                            <span className="text-xs text-slate-400">
                                                {formatDate(item.created_at)}
                                            </span>
                                            {!item.is_active && (
                                                <span className="rounded-full bg-slate-100 px-2.5 py-1 text-[10px] font-bold text-slate-500">
                                                    Nonaktif
                                                </span>
                                            )}
                                        </div>
                                        <div className="flex shrink-0 items-center gap-1">
                                            <button
                                                onClick={() =>
                                                    handleToggle(item.id)
                                                }
                                                className={`flex h-8 w-8 items-center justify-center rounded-lg transition-colors ${
                                                    item.is_active
                                                        ? 'bg-emerald-100 text-emerald-600 hover:bg-emerald-200'
                                                        : 'bg-slate-100 text-slate-500 hover:bg-slate-200'
                                                }`}
                                                title={
                                                    item.is_active
                                                        ? 'Nonaktifkan'
                                                        : 'Aktifkan'
                                                }
                                            >
                                                {item.is_active ? (
                                                    <Eye className="h-4 w-4" />
                                                ) : (
                                                    <EyeOff className="h-4 w-4" />
                                                )}
                                            </button>
                                            <button
                                                onClick={() =>
                                                    openEditModal(item)
                                                }
                                                className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-100 text-blue-600 transition-colors hover:bg-blue-200"
                                            >
                                                <Edit className="h-4 w-4" />
                                            </button>
                                            <button
                                                onClick={() =>
                                                    handleDelete(item.id)
                                                }
                                                className="flex h-8 w-8 items-center justify-center rounded-lg bg-rose-100 text-rose-600 transition-colors hover:bg-rose-200"
                                            >
                                                <Trash2 className="h-4 w-4" />
                                            </button>
                                        </div>
                                    </div>
                                    <h3 className="mb-2 text-base font-bold text-slate-800">
                                        {item.title}
                                    </h3>
                                    <p className="text-sm leading-relaxed whitespace-pre-line text-slate-600">
                                        {item.content}
                                    </p>
                                </div>
                            ))
                        )}
                    </div>

                    {/* Pagination - Always visible inside card */}
                    <div className="flex items-center justify-between border-t border-slate-100 px-4 py-3">
                        <p className="text-xs text-slate-500">
                            Menampilkan {news.data.length} dari {news.total}{' '}
                            berita
                            {news.last_page > 1 &&
                                ` (Halaman ${news.current_page} dari ${news.last_page})`}
                        </p>
                        {news.last_page > 1 && (
                            <div className="flex items-center gap-1">
                                {news.links.map((link, index) => (
                                    <Link
                                        key={index}
                                        href={link.url || '#'}
                                        className={`flex h-8 min-w-8 items-center justify-center rounded-lg px-2 text-xs font-medium transition-colors ${
                                            link.active
                                                ? 'bg-[#02c39a] text-white'
                                                : link.url
                                                  ? 'border border-slate-200 text-slate-600 hover:bg-slate-50'
                                                  : 'cursor-not-allowed text-slate-300'
                                        }`}
                                        dangerouslySetInnerHTML={{
                                            __html: link.label,
                                        }}
                                    />
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Modal */}
            {showModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
                    <div className="w-full max-w-lg rounded-xl bg-white shadow-xl">
                        <div className="flex items-center justify-between border-b border-slate-100 px-6 py-4">
                            <h3 className="text-lg font-bold text-slate-800">
                                {editingNews ? 'Edit Berita' : 'Tambah Berita'}
                            </h3>
                            <button
                                onClick={() => setShowModal(false)}
                                className="flex h-8 w-8 items-center justify-center rounded-lg text-slate-400 transition-colors hover:bg-slate-100 hover:text-slate-600"
                            >
                                <X className="h-5 w-5" />
                            </button>
                        </div>
                        <form onSubmit={handleSubmit} className="p-6">
                            <div className="space-y-4">
                                <div>
                                    <label className="mb-1.5 block text-sm font-medium text-slate-700">
                                        Jenis Berita
                                    </label>
                                    <select
                                        value={data.type}
                                        onChange={(e) =>
                                            setData('type', e.target.value)
                                        }
                                        className="w-full rounded-lg border border-slate-200 px-4 py-2.5 text-sm focus:border-[#02c39a] focus:ring-2 focus:ring-[#02c39a]/20 focus:outline-none"
                                    >
                                        <option value="announcement">
                                            Pengumuman
                                        </option>
                                        <option value="update">Update</option>
                                        <option value="promo">Promo</option>
                                        <option value="maintenance">
                                            Maintenance
                                        </option>
                                    </select>
                                </div>
                                <div>
                                    <label className="mb-1.5 block text-sm font-medium text-slate-700">
                                        Judul
                                    </label>
                                    <input
                                        type="text"
                                        value={data.title}
                                        onChange={(e) =>
                                            setData('title', e.target.value)
                                        }
                                        placeholder="Masukkan judul berita"
                                        className="w-full rounded-lg border border-slate-200 px-4 py-2.5 text-sm focus:border-[#02c39a] focus:ring-2 focus:ring-[#02c39a]/20 focus:outline-none"
                                        required
                                    />
                                    {errors.title && (
                                        <p className="mt-1 text-xs text-rose-500">
                                            {errors.title}
                                        </p>
                                    )}
                                </div>
                                <div>
                                    <label className="mb-1.5 block text-sm font-medium text-slate-700">
                                        Isi Berita
                                    </label>
                                    <textarea
                                        value={data.content}
                                        onChange={(e) =>
                                            setData('content', e.target.value)
                                        }
                                        placeholder="Masukkan isi berita..."
                                        rows={6}
                                        className="w-full resize-none rounded-lg border border-slate-200 px-4 py-2.5 text-sm focus:border-[#02c39a] focus:ring-2 focus:ring-[#02c39a]/20 focus:outline-none"
                                        required
                                    />
                                    {errors.content && (
                                        <p className="mt-1 text-xs text-rose-500">
                                            {errors.content}
                                        </p>
                                    )}
                                </div>
                                <div className="flex items-center gap-2">
                                    <input
                                        type="checkbox"
                                        id="is_active"
                                        checked={data.is_active}
                                        onChange={(e) =>
                                            setData(
                                                'is_active',
                                                e.target.checked,
                                            )
                                        }
                                        className="h-4 w-4 rounded border-slate-300 text-[#02c39a] focus:ring-[#02c39a]"
                                    />
                                    <label
                                        htmlFor="is_active"
                                        className="text-sm text-slate-700"
                                    >
                                        Aktifkan berita ini
                                    </label>
                                </div>
                            </div>
                            <div className="mt-6 flex justify-end gap-3">
                                <button
                                    type="button"
                                    onClick={() => setShowModal(false)}
                                    className="rounded-lg border border-slate-200 px-4 py-2.5 text-sm font-medium text-slate-600 transition-colors hover:bg-slate-50"
                                >
                                    Batal
                                </button>
                                <button
                                    type="submit"
                                    disabled={processing}
                                    className="rounded-lg bg-[#02c39a] px-4 py-2.5 text-sm font-bold text-white transition-colors hover:bg-[#00a884] disabled:opacity-50"
                                >
                                    {processing
                                        ? 'Menyimpan...'
                                        : editingNews
                                          ? 'Simpan Perubahan'
                                          : 'Tambah Berita'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* Delete Confirmation Modal */}
            {deleteId && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
                    <div className="w-full max-w-sm rounded-xl bg-white p-6 shadow-xl">
                        <div className="mb-4 flex justify-center">
                            <div className="flex h-14 w-14 items-center justify-center rounded-full bg-rose-100">
                                <AlertTriangle className="h-7 w-7 text-rose-600" />
                            </div>
                        </div>
                        <h3 className="mb-2 text-center text-lg font-bold text-slate-800">
                            Hapus Berita?
                        </h3>
                        <p className="mb-6 text-center text-sm text-slate-500">
                            Apakah Anda yakin ingin menghapus berita ini?
                            Tindakan ini tidak dapat dibatalkan.
                        </p>
                        <div className="flex gap-3">
                            <button
                                onClick={() => setDeleteId(null)}
                                className="flex-1 rounded-lg border border-slate-200 py-2.5 text-sm font-medium text-slate-600 transition-colors hover:bg-slate-50"
                            >
                                Batal
                            </button>
                            <button
                                onClick={confirmDelete}
                                className="flex-1 rounded-lg bg-rose-600 py-2.5 text-sm font-bold text-white transition-colors hover:bg-rose-700"
                            >
                                Ya, Hapus
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </AdminLayout>
    );
}
