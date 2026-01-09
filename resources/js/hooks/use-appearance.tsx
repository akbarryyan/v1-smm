import { useCallback, useMemo, useSyncExternalStore } from 'react';

export type ResolvedAppearance = 'light' | 'dark';
export type Appearance = ResolvedAppearance | 'system';

const listeners = new Set<() => void>();
let currentAppearance: Appearance = 'light'; // Standardize to light

const setCookie = (name: string, value: string, days = 365): void => {
    if (typeof document === 'undefined') return;
    const maxAge = days * 24 * 60 * 60;
    document.cookie = `${name}=${value};path=/;max-age=${maxAge};SameSite=Lax`;
};

const applyTheme = (_appearance: Appearance): void => {
    if (typeof document === 'undefined') return;

    // Force light theme always
    document.documentElement.classList.remove('dark');
    document.documentElement.style.colorScheme = 'light';
};

const subscribe = (callback: () => void) => {
    listeners.add(callback);

    return () => listeners.delete(callback);
};

const notify = (): void => listeners.forEach((listener) => listener());

export function initializeTheme(): void {
    if (typeof window === 'undefined') return;

    // Force light mode in storage
    localStorage.setItem('appearance', 'light');
    setCookie('appearance', 'light');

    currentAppearance = 'light';
    applyTheme('light');
}

export function useAppearance() {
    const appearance: Appearance = useSyncExternalStore(
        subscribe,
        () => 'light',
        () => 'light',
    );

    const resolvedAppearance: ResolvedAppearance = useMemo(() => 'light', []);

    const updateAppearance = useCallback((_mode: Appearance): void => {
        // No-op to prevent theme changes
        currentAppearance = 'light';
        applyTheme('light');
        notify();
    }, []);

    return { appearance, resolvedAppearance, updateAppearance } as const;
}
