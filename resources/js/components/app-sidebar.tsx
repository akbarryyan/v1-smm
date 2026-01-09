import { NavFooter } from '@/components/nav-footer';
import { NavMain } from '@/components/nav-main';
import { NavUser } from '@/components/nav-user';
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from '@/components/ui/sidebar';
import { dashboard } from '@/routes';
import { type NavItem } from '@/types';
import { Link } from '@inertiajs/react';
import {
    ClipboardList,
    Gift,
    HelpCircle,
    History,
    Layers,
    LayoutGrid,
    List,
    LogIn,
    Monitor,
    Newspaper,
    Phone,
    Receipt,
    RefreshCw,
    ScrollText,
    Server,
    Settings,
    ShoppingBag,
    Target,
    Ticket,
    Trophy,
    Wallet,
    Wrench,
    Zap,
} from 'lucide-react';
import AppLogo from './app-logo';

const mainNavItems: NavItem[] = [
    {
        title: 'Dasbor',
        href: dashboard().url,
        icon: LayoutGrid,
    },
    {
        title: 'Peringkat',
        icon: Trophy,
        items: [
            {
                title: 'Top 10 Pemesanan',
                href: '/rankings/orders',
            },
            {
                title: 'Top 10 Deposit',
                href: '/rankings/deposits',
            },
            {
                title: 'Top 10 Layanan',
                href: '/rankings/services',
            },
        ],
    },
    {
        title: 'Buat Pesanan',
        href: '/orders/create',
        icon: ShoppingBag,
    },
    {
        title: 'Pesanan Massal',
        href: '/orders/mass',
        icon: Layers,
    },
    {
        title: 'Riwayat Pemesanan',
        href: '/orders/history',
        icon: History,
    },
    {
        title: 'Refill',
        href: '/refill',
        icon: RefreshCw,
    },
    {
        title: 'Deposit',
        href: '/deposit',
        icon: Wallet,
    },
    {
        title: 'Riwayat Deposit',
        href: '/deposit/history',
        icon: Receipt,
    },
    {
        title: 'Tiket',
        href: '/tickets',
        icon: Ticket,
    },
    {
        title: 'Layanan',
        href: '/services',
        icon: List,
    },
    {
        title: 'Berita',
        href: '/news',
        icon: Newspaper,
    },
    {
        title: 'Pembaruan Layanan',
        href: '/service-updates',
        icon: Zap,
    },
    {
        title: 'Monitoring Layanan',
        href: '/service-monitoring',
        icon: Monitor,
    },
];

const accountNavItems: NavItem[] = [
    {
        title: 'Pengaturan',
        href: '/settings/profile',
        icon: Settings,
    },
    {
        title: 'Mutasi Saldo',
        href: '/balance/mutations',
        icon: Receipt,
    },
    {
        title: 'Log Login',
        href: '/login-logs',
        icon: LogIn,
    },
];

const sitemapNavItems: NavItem[] = [
    {
        title: 'Kontak Kami',
        href: '/contact',
        icon: Phone,
    },
    {
        title: 'Pertanyaan Umum',
        href: '/faq',
        icon: HelpCircle,
    },
    {
        title: 'Ketentuan Layanan',
        href: '/terms',
        icon: ScrollText,
    },
    {
        title: 'Sewa SMM',
        href: '/rent-smm',
        icon: Server,
    },
    {
        title: 'Contoh Pengisian Target',
        href: '/target-examples',
        icon: Target,
    },
    {
        title: 'Penjelasan Status Pesanan',
        href: '/order-status-guide',
        icon: ClipboardList,
    },
    {
        title: 'Keuntungan Join Medanpedia',
        href: '/benefits',
        icon: Gift,
    },
    {
        title: 'Tool',
        href: '/tools',
        icon: Wrench,
    },
];

const footerNavItems: NavItem[] = [];

export function AppSidebar() {
    return (
        <Sidebar collapsible="icon">
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton size="lg" asChild>
                            <Link href={dashboard().url} prefetch>
                                <AppLogo />
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>

            <SidebarContent>
                <NavMain items={mainNavItems} label="Menu" />
                <NavMain items={accountNavItems} label="Akun" />
                <NavMain items={sitemapNavItems} label="Sitemap" />
            </SidebarContent>

            <SidebarFooter>
                <NavFooter items={footerNavItems} className="mt-auto" />
                <NavUser />
            </SidebarFooter>
        </Sidebar>
    );
}
