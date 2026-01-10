import AdminLayout from '@/layouts/admin-layout';
import { Head, usePage } from '@inertiajs/react';
import {
    Activity,
    AlertTriangle,
    ArrowDownRight,
    ArrowUpRight,
    Box,
    ChevronRight,
    DollarSign,
    Eye,
    ShoppingCart,
    TrendingUp,
    Users,
} from 'lucide-react';

interface Stats {
    totalUsers: number;
    usersChange: number;
    totalOrders: number;
    ordersChange: number;
    totalRevenue: number;
    revenueChange: number;
    activeServices: number;
    servicesChange: number;
}

interface RecentOrder {
    id: number;
    service: string;
    user: string;
    quantity: number;
    status: string;
    status_label: string;
    provider: string;
    date: string;
}

interface PageProps {
    stats: Stats;
    recentOrders: RecentOrder[];
    [key: string]: unknown;
}

// Provider health mock (can be made real later)
const providerHealth = [
    { name: 'Provider A', status: 'online', uptime: '99.9%', orders: 12450 },
    { name: 'Provider B', status: 'online', uptime: '98.5%', orders: 8230 },
    { name: 'Provider C', status: 'warning', uptime: '95.2%', orders: 5120 },
    { name: 'Provider D', status: 'offline', uptime: '0%', orders: 3200 },
];

const statusColors: Record<string, string> = {
    pending: 'bg-amber-50 text-amber-600',
    processing: 'bg-blue-50 text-blue-600',
    completed: 'bg-emerald-50 text-emerald-600',
    partial: 'bg-orange-50 text-orange-600',
    cancelled: 'bg-slate-100 text-slate-600',
    refunded: 'bg-purple-50 text-purple-600',
    error: 'bg-rose-50 text-rose-600',
};

const providerStatusColors: Record<string, string> = {
    online: 'bg-emerald-500',
    warning: 'bg-amber-500',
    offline: 'bg-rose-500',
};

export default function AdminDashboard() {
    const { stats, recentOrders } = usePage<PageProps>().props;

    const formatNumber = (num: number) => {
        return num.toLocaleString('id-ID');
    };

    const formatCurrencyShort = (amount: number) => {
        if (amount >= 1000000000) {
            return `Rp ${(amount / 1000000000).toFixed(1)} M`;
        }
        if (amount >= 1000000) {
            return `Rp ${(amount / 1000000).toFixed(1)} Jt`;
        }
        if (amount >= 1000) {
            return `Rp ${(amount / 1000).toFixed(1)} Rb`;
        }
        return `Rp ${amount}`;
    };

    const statsCards = [
        {
            title: 'Total Pengguna',
            value: formatNumber(stats.totalUsers),
            change: `${stats.usersChange >= 0 ? '+' : ''}${stats.usersChange}%`,
            trend: stats.usersChange >= 0 ? 'up' : 'down',
            icon: Users,
            color: 'indigo',
        },
        {
            title: 'Total Pesanan',
            value: formatNumber(stats.totalOrders),
            change: `${stats.ordersChange >= 0 ? '+' : ''}${stats.ordersChange}%`,
            trend: stats.ordersChange >= 0 ? 'up' : 'down',
            icon: ShoppingCart,
            color: 'emerald',
        },
        {
            title: 'Total Pendapatan',
            value: formatCurrencyShort(stats.totalRevenue),
            change: `${stats.revenueChange >= 0 ? '+' : ''}${stats.revenueChange}%`,
            trend: stats.revenueChange >= 0 ? 'up' : 'down',
            icon: DollarSign,
            color: 'amber',
        },
        {
            title: 'Layanan Aktif',
            value: formatNumber(stats.activeServices),
            change: `${stats.servicesChange >= 0 ? '+' : ''}${stats.servicesChange}%`,
            trend: stats.servicesChange >= 0 ? 'up' : 'down',
            icon: Box,
            color: 'rose',
        },
    ];

    return (
        <AdminLayout title="Dashboard Admin">
            <Head title="Dashboard Admin" />

            <div className="space-y-6">
                {/* Statistics Cards */}
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
                    {statsCards.map((stat) => {
                        const Icon = stat.icon;
                        const colorClasses: Record<
                            string,
                            { bg: string; text: string; iconBg: string }
                        > = {
                            indigo: {
                                bg: 'bg-indigo-50',
                                text: 'text-indigo-600',
                                iconBg: 'bg-indigo-100',
                            },
                            emerald: {
                                bg: 'bg-emerald-50',
                                text: 'text-emerald-600',
                                iconBg: 'bg-emerald-100',
                            },
                            amber: {
                                bg: 'bg-amber-50',
                                text: 'text-amber-600',
                                iconBg: 'bg-amber-100',
                            },
                            rose: {
                                bg: 'bg-rose-50',
                                text: 'text-rose-600',
                                iconBg: 'bg-rose-100',
                            },
                        };
                        const colors = colorClasses[stat.color];

                        return (
                            <div
                                key={stat.title}
                                className="rounded-xl bg-white p-5 shadow-sm ring-1 ring-slate-200"
                            >
                                <div className="flex items-start justify-between">
                                    <div>
                                        <p className="text-xs font-bold tracking-wider text-slate-400 uppercase">
                                            {stat.title}
                                        </p>
                                        <p className="mt-2 text-2xl font-black text-slate-800">
                                            {stat.value}
                                        </p>
                                        <div className="mt-2 flex items-center gap-1">
                                            {stat.trend === 'up' ? (
                                                <ArrowUpRight className="h-4 w-4 text-emerald-500" />
                                            ) : (
                                                <ArrowDownRight className="h-4 w-4 text-rose-500" />
                                            )}
                                            <span
                                                className={`text-xs font-bold ${
                                                    stat.trend === 'up'
                                                        ? 'text-emerald-600'
                                                        : 'text-rose-600'
                                                }`}
                                            >
                                                {stat.change}
                                            </span>
                                            <span className="text-xs text-slate-400">
                                                30 hari terakhir
                                            </span>
                                        </div>
                                    </div>
                                    <div
                                        className={`${colors.iconBg} rounded-xl p-3`}
                                    >
                                        <Icon
                                            className={`h-6 w-6 ${colors.text}`}
                                        />
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>

                {/* Charts & Analytics Row */}
                <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
                    {/* Orders Chart */}
                    <div className="rounded-xl bg-white p-5 shadow-sm ring-1 ring-slate-200 lg:col-span-2">
                        <div className="mb-4 flex items-center justify-between">
                            <div>
                                <h3 className="text-sm font-bold text-slate-800">
                                    Jumlah Pesanan per Hari
                                </h3>
                                <p className="text-xs text-slate-400">
                                    7 hari terakhir
                                </p>
                            </div>
                            <div className="flex items-center gap-2">
                                <TrendingUp className="h-4 w-4 text-emerald-500" />
                                <span className="text-xs font-bold text-emerald-600">
                                    +15.3%
                                </span>
                            </div>
                        </div>
                        {/* Chart Placeholder */}
                        <div className="flex h-48 items-end justify-between gap-2">
                            {[65, 45, 78, 52, 89, 67, 94].map(
                                (value, index) => (
                                    <div
                                        key={index}
                                        className="flex flex-1 flex-col items-center gap-2"
                                    >
                                        <div
                                            className="w-full rounded-t-lg bg-linear-to-t from-[#02c39a] to-[#02c39a]/60 transition-all hover:from-[#00a884] hover:to-[#00a884]/60"
                                            style={{ height: `${value}%` }}
                                        />
                                        <span className="text-[10px] font-bold text-slate-400">
                                            {
                                                [
                                                    'Sen',
                                                    'Sel',
                                                    'Rab',
                                                    'Kam',
                                                    'Jum',
                                                    'Sab',
                                                    'Min',
                                                ][index]
                                            }
                                        </span>
                                    </div>
                                ),
                            )}
                        </div>
                    </div>

                    {/* Order Status Donut */}
                    <div className="rounded-xl bg-white p-5 shadow-sm ring-1 ring-slate-200">
                        <h3 className="mb-4 text-sm font-bold text-slate-800">
                            Status Pesanan
                        </h3>
                        {/* Donut Chart Placeholder */}
                        <div className="relative mb-4 flex justify-center">
                            <div className="relative h-32 w-32">
                                <svg
                                    className="h-full w-full -rotate-90"
                                    viewBox="0 0 36 36"
                                >
                                    <circle
                                        cx="18"
                                        cy="18"
                                        r="14"
                                        fill="none"
                                        stroke="#e2e8f0"
                                        strokeWidth="4"
                                    />
                                    <circle
                                        cx="18"
                                        cy="18"
                                        r="14"
                                        fill="none"
                                        stroke="#10b981"
                                        strokeWidth="4"
                                        strokeDasharray="60, 100"
                                        strokeLinecap="round"
                                    />
                                    <circle
                                        cx="18"
                                        cy="18"
                                        r="14"
                                        fill="none"
                                        stroke="#3b82f6"
                                        strokeWidth="4"
                                        strokeDasharray="20, 100"
                                        strokeDashoffset="-60"
                                        strokeLinecap="round"
                                    />
                                    <circle
                                        cx="18"
                                        cy="18"
                                        r="14"
                                        fill="none"
                                        stroke="#f59e0b"
                                        strokeWidth="4"
                                        strokeDasharray="10, 100"
                                        strokeDashoffset="-80"
                                        strokeLinecap="round"
                                    />
                                    <circle
                                        cx="18"
                                        cy="18"
                                        r="14"
                                        fill="none"
                                        stroke="#ef4444"
                                        strokeWidth="4"
                                        strokeDasharray="5, 100"
                                        strokeDashoffset="-90"
                                        strokeLinecap="round"
                                    />
                                </svg>
                                <div className="absolute inset-0 flex flex-col items-center justify-center">
                                    <span className="text-xl font-black text-slate-800">
                                        48.2K
                                    </span>
                                    <span className="text-[10px] font-bold text-slate-400">
                                        Total
                                    </span>
                                </div>
                            </div>
                        </div>
                        {/* Legend */}
                        <div className="space-y-2">
                            <div className="flex items-center justify-between text-xs">
                                <div className="flex items-center gap-2">
                                    <span className="h-2.5 w-2.5 rounded-full bg-emerald-500" />
                                    <span className="text-slate-600">
                                        Selesai
                                    </span>
                                </div>
                                <span className="font-bold text-slate-700">
                                    60%
                                </span>
                            </div>
                            <div className="flex items-center justify-between text-xs">
                                <div className="flex items-center gap-2">
                                    <span className="h-2.5 w-2.5 rounded-full bg-blue-500" />
                                    <span className="text-slate-600">
                                        Diproses
                                    </span>
                                </div>
                                <span className="font-bold text-slate-700">
                                    20%
                                </span>
                            </div>
                            <div className="flex items-center justify-between text-xs">
                                <div className="flex items-center gap-2">
                                    <span className="h-2.5 w-2.5 rounded-full bg-amber-500" />
                                    <span className="text-slate-600">
                                        Sebagian
                                    </span>
                                </div>
                                <span className="font-bold text-slate-700">
                                    10%
                                </span>
                            </div>
                            <div className="flex items-center justify-between text-xs">
                                <div className="flex items-center gap-2">
                                    <span className="h-2.5 w-2.5 rounded-full bg-rose-500" />
                                    <span className="text-slate-600">
                                        Dibatalkan
                                    </span>
                                </div>
                                <span className="font-bold text-slate-700">
                                    5%
                                </span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Provider Health & Recent Orders Row */}
                <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
                    {/* Provider Health */}
                    <div className="rounded-xl bg-white p-5 shadow-sm ring-1 ring-slate-200">
                        <div className="mb-4 flex items-center justify-between">
                            <h3 className="text-sm font-bold text-slate-800">
                                Kesehatan Provider
                            </h3>
                            <Activity className="h-4 w-4 text-slate-400" />
                        </div>
                        <div className="space-y-3">
                            {providerHealth.map((provider) => (
                                <div
                                    key={provider.name}
                                    className="flex items-center justify-between rounded-lg bg-slate-50 p-3"
                                >
                                    <div className="flex items-center gap-3">
                                        <span
                                            className={`h-2.5 w-2.5 rounded-full ${providerStatusColors[provider.status]}`}
                                        />
                                        <div>
                                            <p className="text-xs font-bold text-slate-700">
                                                {provider.name}
                                            </p>
                                            <p className="text-[10px] text-slate-400">
                                                Uptime: {provider.uptime}
                                            </p>
                                        </div>
                                    </div>
                                    <span className="text-xs font-bold text-slate-600">
                                        {provider.orders.toLocaleString()}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Recent Orders */}
                    <div className="rounded-xl bg-white shadow-sm ring-1 ring-slate-200 lg:col-span-2">
                        <div className="flex items-center justify-between border-b border-slate-100 p-5">
                            <h3 className="text-sm font-bold text-slate-800">
                                Pesanan Terbaru
                            </h3>
                            <a
                                href="/admin/orders"
                                className="flex items-center gap-1 text-xs font-bold text-[#02c39a] hover:underline"
                            >
                                Lihat Semua
                                <ChevronRight className="h-4 w-4" />
                            </a>
                        </div>
                        <div className="overflow-x-auto">
                            <table className="w-full">
                                <thead>
                                    <tr className="bg-slate-50 text-[10px] font-bold tracking-wider text-slate-400 uppercase">
                                        <th className="px-4 py-3 text-left">
                                            ID Pesanan
                                        </th>
                                        <th className="px-4 py-3 text-left">
                                            Layanan
                                        </th>
                                        <th className="px-4 py-3 text-left">
                                            Pengguna
                                        </th>
                                        <th className="px-4 py-3 text-left">
                                            Jumlah
                                        </th>
                                        <th className="px-4 py-3 text-left">
                                            Status
                                        </th>
                                        <th className="px-4 py-3 text-left">
                                            Provider
                                        </th>
                                        <th className="px-4 py-3 text-left">
                                            Tanggal
                                        </th>
                                        <th className="px-4 py-3 text-left">
                                            Aksi
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-50">
                                    {recentOrders.map((order) => (
                                        <tr
                                            key={order.id}
                                            className="hover:bg-slate-50/50"
                                        >
                                            <td className="px-4 py-3">
                                                <span className="font-mono text-xs font-bold text-slate-700">
                                                    #{order.id}
                                                </span>
                                            </td>
                                            <td className="max-w-[150px] px-4 py-3">
                                                <span className="block truncate text-xs text-slate-600">
                                                    {order.service}
                                                </span>
                                            </td>
                                            <td className="px-4 py-3">
                                                <span className="text-xs text-slate-600">
                                                    {order.user}
                                                </span>
                                            </td>
                                            <td className="px-4 py-3">
                                                <span className="text-xs font-bold text-slate-700">
                                                    {order.quantity.toLocaleString()}
                                                </span>
                                            </td>
                                            <td className="px-4 py-3">
                                                <span
                                                    className={`inline-flex items-center rounded-md px-2 py-0.5 text-[10px] font-bold capitalize ${statusColors[order.status] || 'bg-slate-100 text-slate-600'}`}
                                                >
                                                    {order.status_label}
                                                </span>
                                            </td>
                                            <td className="px-4 py-3">
                                                <span className="text-xs text-slate-600">
                                                    {order.provider}
                                                </span>
                                            </td>
                                            <td className="px-4 py-3">
                                                <span className="text-xs text-slate-500">
                                                    {order.date}
                                                </span>
                                            </td>
                                            <td className="px-4 py-3">
                                                <button className="flex h-7 w-7 items-center justify-center rounded-lg bg-slate-100 text-slate-500 transition-all hover:bg-[#02c39a] hover:text-white">
                                                    <Eye className="h-3.5 w-3.5" />
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>

                {/* Alerts/Warnings */}
                <div className="rounded-xl bg-amber-50 p-4 ring-1 ring-amber-100">
                    <div className="flex items-start gap-3">
                        <div className="rounded-lg bg-amber-100 p-2">
                            <AlertTriangle className="h-5 w-5 text-amber-600" />
                        </div>
                        <div>
                            <h4 className="text-sm font-bold text-amber-800">
                                Peringatan Pesanan Bermasalah
                            </h4>
                            <p className="mt-1 text-xs text-amber-700">
                                Ada 23 pesanan yang membutuhkan perhatian.
                                Provider C mengalami masalah koneksi.
                            </p>
                            <a
                                href="/admin/orders?status=error"
                                className="mt-2 inline-flex items-center gap-1 text-xs font-bold text-amber-800 hover:underline"
                            >
                                Lihat Pesanan Bermasalah
                                <ChevronRight className="h-4 w-4" />
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
}
