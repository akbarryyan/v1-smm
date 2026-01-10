import { logout } from '@/routes';
import { type NavItem } from '@/types';
import { Link, router, usePage } from '@inertiajs/react';
import {
    AlertTriangle,
    Box,
    ChevronLeft,
    CreditCard,
    FileText,
    Folder,
    LayoutDashboard,
    LogOut,
    Plug,
    Settings,
    ShoppingCart,
    Users,
    X,
} from 'lucide-react';
import { useState } from 'react';

const adminNavItems: NavItem[] = [
    {
        title: 'Dashboard',
        href: '/admin/dashboard',
        icon: LayoutDashboard,
    },
    {
        title: 'Pesanan',
        href: '/admin/orders',
        icon: ShoppingCart,
    },
    {
        title: 'Layanan',
        href: '/admin/services',
        icon: Box,
    },
    {
        title: 'Kategori',
        href: '/admin/categories',
        icon: Folder,
    },
    {
        title: 'Provider API',
        href: '/admin/providers',
        icon: Plug,
    },
    {
        title: 'Payment Gateway',
        href: '/admin/payment-gateway',
        icon: CreditCard,
    },
    {
        title: 'Pengguna',
        href: '/admin/users',
        icon: Users,
    },
    {
        title: 'Saldo & Transaksi',
        href: '/admin/transactions',
        icon: CreditCard,
    },
    {
        title: 'Log Sistem',
        href: '/admin/logs',
        icon: FileText,
    },
    {
        title: 'Pengaturan',
        href: '/admin/settings',
        icon: Settings,
    },
];

interface AdminSidebarProps {
    collapsed: boolean;
    onToggle: () => void;
}

export function AdminSidebar({ collapsed, onToggle }: AdminSidebarProps) {
    const { url } = usePage();
    const [showLogoutModal, setShowLogoutModal] = useState(false);
    const [isLoggingOut, setIsLoggingOut] = useState(false);

    const isActive = (href: string) => {
        return url.startsWith(href);
    };

    const handleLogout = () => {
        setIsLoggingOut(true);
        router.post(
            logout().url,
            {},
            {
                onFinish: () => {
                    setIsLoggingOut(false);
                    setShowLogoutModal(false);
                },
            },
        );
    };

    return (
        <>
            <aside
                className={`fixed inset-y-0 left-0 z-50 flex flex-col bg-slate-900 text-white transition-all duration-300 ${
                    collapsed ? 'w-16' : 'w-64'
                }`}
            >
                {/* Logo */}
                <div className="flex h-16 items-center justify-between border-b border-slate-800 px-4">
                    {!collapsed && (
                        <div className="flex items-center gap-2">
                            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#02c39a] text-sm font-black text-white">
                                M
                            </div>
                            <span className="text-sm font-bold">
                                Medanpedia Admin
                            </span>
                        </div>
                    )}
                    {collapsed && (
                        <div className="mx-auto flex h-8 w-8 items-center justify-center rounded-lg bg-[#02c39a] text-sm font-black text-white">
                            M
                        </div>
                    )}
                </div>

                {/* Toggle Button */}
                <button
                    onClick={onToggle}
                    className="absolute top-20 -right-3 flex h-6 w-6 items-center justify-center rounded-full bg-slate-900 text-slate-400 ring-2 ring-slate-100 transition-colors hover:bg-slate-800 hover:text-white"
                >
                    <ChevronLeft
                        className={`h-4 w-4 transition-transform ${collapsed ? 'rotate-180' : ''}`}
                    />
                </button>

                {/* Navigation */}
                <nav className="flex-1 overflow-y-auto p-3">
                    <ul className="space-y-1">
                        {adminNavItems.map((item) => {
                            const Icon = item.icon;
                            const active = isActive(item.href || '');

                            return (
                                <li key={item.title}>
                                    <Link
                                        href={item.href || '#'}
                                        className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all ${
                                            active
                                                ? 'border-l-[3px] border-[#02c39a] bg-slate-800/50 text-white'
                                                : 'border-l-[3px] border-transparent text-slate-400 hover:bg-slate-800 hover:text-white'
                                        } ${collapsed ? 'justify-center' : ''}`}
                                        title={
                                            collapsed ? item.title : undefined
                                        }
                                    >
                                        {Icon && (
                                            <Icon
                                                className={`h-5 w-5 shrink-0 ${active ? 'text-[#02c39a]' : ''}`}
                                            />
                                        )}
                                        {!collapsed && (
                                            <span>{item.title}</span>
                                        )}
                                    </Link>
                                </li>
                            );
                        })}
                    </ul>
                </nav>

                {/* Footer */}
                <div className="border-t border-slate-800 p-3">
                    <button
                        onClick={() => setShowLogoutModal(true)}
                        className={`flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-slate-400 transition-all hover:bg-slate-800 hover:text-white ${collapsed ? 'justify-center' : ''}`}
                        title={collapsed ? 'Keluar' : undefined}
                    >
                        <LogOut className="h-5 w-5 shrink-0" />
                        {!collapsed && <span>Keluar</span>}
                    </button>
                </div>
            </aside>

            {/* Logout Confirmation Modal */}
            {showLogoutModal && (
                <div className="fixed inset-0 z-60 flex items-center justify-center">
                    {/* Backdrop */}
                    <div
                        className="absolute inset-0 bg-slate-900/50 backdrop-blur-sm"
                        onClick={() => setShowLogoutModal(false)}
                    />

                    {/* Modal */}
                    <div className="relative z-10 mx-4 w-full max-w-md animate-in duration-200 zoom-in-95 fade-in">
                        <div className="rounded-2xl bg-white shadow-2xl ring-1 ring-slate-200">
                            {/* Header */}
                            <div className="flex items-center justify-between border-b border-slate-100 px-6 py-4">
                                <div className="flex items-center gap-3">
                                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-rose-100">
                                        <AlertTriangle className="h-5 w-5 text-rose-600" />
                                    </div>
                                    <h3 className="text-lg font-bold text-slate-800">
                                        Konfirmasi Keluar
                                    </h3>
                                </div>
                                <button
                                    onClick={() => setShowLogoutModal(false)}
                                    className="rounded-lg p-2 text-slate-400 transition-colors hover:bg-slate-100 hover:text-slate-600"
                                >
                                    <X className="h-5 w-5" />
                                </button>
                            </div>

                            {/* Body */}
                            <div className="px-6 py-5">
                                <p className="text-sm leading-relaxed text-slate-600">
                                    Apakah Anda yakin ingin keluar dari akun
                                    admin? Anda harus login kembali untuk
                                    mengakses dashboard admin.
                                </p>
                            </div>

                            {/* Footer */}
                            <div className="flex items-center justify-end gap-3 border-t border-slate-100 px-6 py-4">
                                <button
                                    onClick={() => setShowLogoutModal(false)}
                                    disabled={isLoggingOut}
                                    className="rounded-xl border border-slate-200 px-5 py-2.5 text-sm font-bold text-slate-600 transition-all hover:bg-slate-50 disabled:opacity-50"
                                >
                                    Batal
                                </button>
                                <button
                                    onClick={handleLogout}
                                    disabled={isLoggingOut}
                                    className="flex items-center gap-2 rounded-xl bg-rose-600 px-5 py-2.5 text-sm font-bold text-white shadow-lg shadow-rose-600/25 transition-all hover:bg-rose-700 disabled:opacity-50"
                                >
                                    {isLoggingOut ? (
                                        <>
                                            <svg
                                                className="h-4 w-4 animate-spin"
                                                viewBox="0 0 24 24"
                                                fill="none"
                                            >
                                                <circle
                                                    className="opacity-25"
                                                    cx="12"
                                                    cy="12"
                                                    r="10"
                                                    stroke="currentColor"
                                                    strokeWidth="4"
                                                />
                                                <path
                                                    className="opacity-75"
                                                    fill="currentColor"
                                                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                                />
                                            </svg>
                                            Memproses...
                                        </>
                                    ) : (
                                        <>
                                            <LogOut className="h-4 w-4" />
                                            Ya, Keluar
                                        </>
                                    )}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
