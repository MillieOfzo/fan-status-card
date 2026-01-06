import { Injectable, signal } from '@angular/core';

const STORAGE_KEY = 'ui_dark_mode';

@Injectable({ providedIn: 'root' })
export class DarkModeService {

    dark = signal<boolean>(this.getInitialState());

    constructor() {
        // pas theme toe bij service init
        this.applyTheme(this.dark());
        this.listenToSystemChanges();
    }

    private getInitialState(): boolean {
        const stored = localStorage.getItem(STORAGE_KEY);
        if (stored !== null) return stored === 'true';

        // fallback → volg OS setting
        return window.matchMedia('(prefers-color-scheme: dark)').matches;
    }

    toggle() {
        this.set(!this.dark());
    }

    set(value: boolean) {
        this.dark.set(value);
        localStorage.setItem(STORAGE_KEY, String(value));
        this.applyTheme(value);
    }

    private applyTheme(isDark: boolean) {
        // ✅ forceer altijd de class
        const root = document.documentElement;
        if (isDark) root.classList.add('dark');
        else root.classList.remove('dark');
    }

    private listenToSystemChanges() {
        const mq = window.matchMedia('(prefers-color-scheme: dark)');
        mq.addEventListener('change', e => {
            // alleen aanpassen als user niets heeft overschreven
            const stored = localStorage.getItem(STORAGE_KEY);
            if (stored === null) {
                this.set(e.matches);
            }
        });
    }
}

