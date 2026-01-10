import { AdminSidebar } from '@/components/admin-sidebar';
import { type SharedData } from '@/types';
import { usePage } from '@inertiajs/react';
import {
    Bell,
    ChevronDown,
    LogOut,
    Search,
    Settings,
    User,
} from 'lucide-react';
import { type PropsWithChildren, useState } from 'react';

interface AdminLayoutProps extends PropsWithChildren {
    title?: string;
}

export default function AdminLayout({
    children,
    title = 'Dashboard Admin',
}: AdminLayoutProps) {
    const { auth } = usePage<SharedData>().props;
    const [showUserMenu, setShowUserMenu] = useState(false);
    const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

    return (
        <div className="min-h-screen bg-slate-100">
            {/* Sidebar */}
            <AdminSidebar
                collapsed={sidebarCollapsed}
                onToggle={() => setSidebarCollapsed(!sidebarCollapsed)}
            />

            {/* Main Content - Dynamic margin based on sidebar state */}
            <div
                className={`transition-all duration-300 ${sidebarCollapsed ? 'ml-16' : 'ml-64'}`}
            >
                {/* Top Navbar */}
                <header className="sticky top-0 z-40 flex h-16 items-center justify-between border-b border-slate-200 bg-white px-6 shadow-sm">
                    {/* Left - Title */}
                    <h1 className="text-lg font-bold text-slate-800">
                        {title}
                    </h1>

                    {/* Right - Actions */}
                    <div className="flex items-center gap-4">
                        {/* Search */}
                        <div className="relative hidden md:block">
                            <Search className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-slate-400" />
                            <input
                                type="text"
                                placeholder="Cari pesanan / pengguna..."
                                className="h-10 w-64 rounded-lg border border-slate-200 bg-slate-50 pr-4 pl-10 text-sm text-slate-700 transition-all outline-none focus:border-[#02c39a] focus:bg-white focus:ring-2 focus:ring-[#02c39a]/10"
                            />
                        </div>

                        {/* Notifications */}
                        <button className="relative flex h-10 w-10 items-center justify-center rounded-lg border border-slate-200 text-slate-500 transition-all hover:bg-slate-50">
                            <Bell className="h-5 w-5" />
                            <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-rose-500 text-[10px] font-bold text-white">
                                3
                            </span>
                        </button>

                        {/* User Menu */}
                        <div className="relative">
                            <button
                                onClick={() => setShowUserMenu(!showUserMenu)}
                                className="flex items-center gap-2 rounded-lg border border-slate-200 p-2 pr-3 transition-all hover:bg-slate-50"
                            >
                                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-slate-900 text-white">
                                    <User className="h-4 w-4" />
                                </div>
                                <div className="hidden flex-col items-start text-left sm:flex">
                                    <span className="text-xs font-bold text-slate-700">
                                        {auth.user.name}
                                    </span>
                                    <span className="text-[10px] font-medium text-slate-400">
                                        Administrator
                                    </span>
                                </div>
                                <ChevronDown className="h-4 w-4 text-slate-400" />
                            </button>

                            {/* Dropdown */}
                            {showUserMenu && (
                                <div className="absolute top-full right-0 mt-2 w-48 rounded-lg border border-slate-100 bg-white py-2 shadow-xl">
                                    <a
                                        href="#"
                                        className="flex items-center gap-2 px-4 py-2 text-sm text-slate-700 hover:bg-slate-50"
                                    >
                                        <Settings className="h-4 w-4 text-slate-400" />
                                        Pengaturan Akun
                                    </a>
                                    <hr className="my-1 border-slate-100" />
                                    <button className="flex w-full items-center gap-2 px-4 py-2 text-sm text-rose-600 hover:bg-rose-50">
                                        <LogOut className="h-4 w-4" />
                                        Logout
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                </header>

                {/* Page Content */}
                <main className="p-6">{children}</main>
            </div>
        </div>
    );
}
