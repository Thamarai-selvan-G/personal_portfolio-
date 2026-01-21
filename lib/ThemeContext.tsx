'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export type ThemeColors = {
    background: string;
    surface: string;
    surfaceLight: string;
    primary: string;
    primaryHover: string;
    secondary: string;
    accent: string;
    textPrimary: string;
    textSecondary: string;
    border: string;
    primaryRgb: string;
};

export type Theme = {
    name: string;
    displayName: string;
    colors: ThemeColors;
    icon: string;
};

export const themes: Record<string, Theme> = {
    softBlueprint: {
        name: 'softBlueprint',
        displayName: 'Soft Blueprint',
        icon: '💻',
        colors: {
            background: '#0a1119',
            surface: '#0f1922',
            surfaceLight: '#1a2332',
            primary: '#3b82f6',
            primaryHover: '#2563eb',
            secondary: '#06b6d4',
            accent: '#0ea5e9',
            textPrimary: '#e2e8f0',
            textSecondary: '#94a3b8',
            border: '#1e3a5f',
            primaryRgb: '59, 130, 246',
        },
    },
    darkPurple: {
        name: 'darkPurple',
        displayName: 'Dark Purple',
        icon: '🌙',
        colors: {
            background: '#0a0a0a',
            surface: '#121212',
            surfaceLight: '#1e1e1e',
            primary: '#6d28d9',
            primaryHover: '#5b21b6',
            secondary: '#03dac6',
            accent: '#ff0266',
            textPrimary: '#ffffff',
            textSecondary: '#a1a1aa',
            border: '#27272a',
            primaryRgb: '109, 40, 217',
        },
    },
};

type ThemeContextType = {
    currentTheme: Theme;
    setTheme: (themeName: string) => void;
};

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const useTheme = () => {
    const context = useContext(ThemeContext);
    if (!context) {
        throw new Error('useTheme must be used within a ThemeProvider');
    }
    return context;
};

type ThemeProviderProps = {
    children: ReactNode;
};

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
    const [currentTheme, setCurrentTheme] = useState<Theme>(themes.softBlueprint);

    useEffect(() => {
        // Load theme from localStorage on mount
        const savedTheme = localStorage.getItem('portfolio-theme');
        if (savedTheme && themes[savedTheme]) {
            setCurrentTheme(themes[savedTheme]);
        }
    }, []);

    useEffect(() => {
        // Apply theme colors to CSS variables
        const root = document.documentElement;
        const colors = currentTheme.colors;

        root.style.setProperty('--background', colors.background);
        root.style.setProperty('--surface', colors.surface);
        root.style.setProperty('--surface-light', colors.surfaceLight);
        root.style.setProperty('--primary', colors.primary);
        root.style.setProperty('--primary-hover', colors.primaryHover);
        root.style.setProperty('--secondary', colors.secondary);
        root.style.setProperty('--accent', colors.accent);
        root.style.setProperty('--text-primary', colors.textPrimary);
        root.style.setProperty('--text-secondary', colors.textSecondary);
        root.style.setProperty('--border', colors.border);
        root.style.setProperty('--primary-rgb', colors.primaryRgb);

        // Save to localStorage
        localStorage.setItem('portfolio-theme', currentTheme.name);
    }, [currentTheme]);

    const setTheme = (themeName: string) => {
        if (themes[themeName]) {
            setCurrentTheme(themes[themeName]);
        }
    };

    return (
        <ThemeContext.Provider value={{ currentTheme, setTheme }}>
            {children}
        </ThemeContext.Provider>
    );
};
