import { type NavItem } from '@/types';
import { Link, usePage } from '@inertiajs/react';
import {
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
} from 'lucide-react';

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

    const isActive = (href: string) => {
        return url.startsWith(href);
    };

    return (
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
                                            ? 'bg-[#02c39a] text-white'
                                            : 'text-slate-400 hover:bg-slate-800 hover:text-white'
                                    } ${collapsed ? 'justify-center' : ''}`}
                                    title={collapsed ? item.title : undefined}
                                >
                                    {Icon && (
                                        <Icon className="h-5 w-5 shrink-0" />
                                    )}
                                    {!collapsed && <span>{item.title}</span>}
                                </Link>
                            </li>
                        );
                    })}
                </ul>
            </nav>

            {/* Footer */}
            <div className="border-t border-slate-800 p-3">
                <button
                    className={`flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-slate-400 transition-all hover:bg-slate-800 hover:text-white ${collapsed ? 'justify-center' : ''}`}
                    title={collapsed ? 'Keluar' : undefined}
                >
                    <LogOut className="h-5 w-5 shrink-0" />
                    {!collapsed && <span>Keluar</span>}
                </button>
            </div>
        </aside>
    );
}
