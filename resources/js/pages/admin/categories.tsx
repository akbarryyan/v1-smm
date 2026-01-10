import AdminLayout from '@/layouts/admin-layout';
import { Head } from '@inertiajs/react';
import { Edit, GripVertical, Plus, Trash2 } from 'lucide-react';

const categories = [
    { id: 1, name: 'Instagram', services: 245, order: 1 },
    { id: 2, name: 'TikTok', services: 189, order: 2 },
    { id: 3, name: 'YouTube', services: 156, order: 3 },
    { id: 4, name: 'Twitter', services: 98, order: 4 },
    { id: 5, name: 'Facebook', services: 124, order: 5 },
    { id: 6, name: 'Telegram', services: 67, order: 6 },
    { id: 7, name: 'Spotify', services: 45, order: 7 },
    { id: 8, name: 'Discord', services: 32, order: 8 },
];

export default function AdminCategories() {
    return (
        <AdminLayout title="Kategori">
            <Head title="Kategori - Admin" />

            <div className="space-y-4">
                {/* Header */}
                <div className="flex items-center justify-between">
                    <p className="text-sm text-slate-600">
                        Kelola kategori layanan. Drag untuk mengubah urutan.
                    </p>
                    <button className="flex items-center gap-2 rounded-lg bg-[#02c39a] px-4 py-2.5 text-sm font-bold text-white transition-all hover:bg-[#00a884]">
                        <Plus className="h-4 w-4" />
                        Tambah Kategori
                    </button>
                </div>

                {/* Categories Grid */}
                <div className="grid grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-3">
                    {categories.map((category) => (
                        <div
                            key={category.id}
                            className="flex items-center justify-between rounded-xl bg-white p-4 shadow-sm ring-1 ring-slate-200 transition-all hover:shadow-md"
                        >
                            <div className="flex items-center gap-3">
                                <button className="cursor-grab text-slate-300 hover:text-slate-400 active:cursor-grabbing">
                                    <GripVertical className="h-5 w-5" />
                                </button>
                                <div>
                                    <h3 className="text-sm font-bold text-slate-800">
                                        {category.name}
                                    </h3>
                                    <p className="text-xs text-slate-400">
                                        {category.services} layanan
                                    </p>
                                </div>
                            </div>
                            <div className="flex items-center gap-1">
                                <button className="flex h-8 w-8 items-center justify-center rounded-lg text-slate-400 hover:bg-indigo-50 hover:text-indigo-600">
                                    <Edit className="h-4 w-4" />
                                </button>
                                <button className="flex h-8 w-8 items-center justify-center rounded-lg text-slate-400 hover:bg-rose-50 hover:text-rose-600">
                                    <Trash2 className="h-4 w-4" />
                                </button>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Info */}
                <div className="rounded-lg bg-blue-50 p-4 ring-1 ring-blue-100">
                    <p className="text-sm text-blue-700">
                        <strong>Tips:</strong> Urutan kategori akan mempengaruhi
                        tampilan pada halaman layanan pengguna. Kategori dengan
                        urutan lebih kecil akan ditampilkan terlebih dahulu.
                    </p>
                </div>
            </div>
        </AdminLayout>
    );
}
