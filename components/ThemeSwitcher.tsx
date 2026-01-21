'use client';

import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { useTheme, themes } from '@/lib/ThemeContext';

const FloatingButton = styled(motion.button)`
  position: fixed;
  bottom: 24px;
  right: 24px;
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
  cursor: pointer;
  z-index: 1000;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
  transition: all 0.3s ease;

  &:hover {
    background: rgba(255, 255, 255, 0.08);
    transform: scale(1.05);
    box-shadow: 0 12px 40px rgba(0, 0, 0, 0.4);
  }

  &:active {
    transform: scale(0.95);
  }

  @media (max-width: 768px) {
    width: 56px;
    height: 56px;
    bottom: 20px;
    right: 20px;
    font-size: 1.3rem;
  }
`;

const ThemeMenu = styled(motion.div)`
  position: fixed;
  bottom: 94px;
  right: 24px;
  background: rgba(var(--surface-light, 30, 30, 30), 0.95);
  backdrop-filter: blur(20px);
  border-radius: 16px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  padding: 12px;
  z-index: 999;
  box-shadow: 0 12px 48px rgba(0, 0, 0, 0.5);
  min-width: 200px;

  @media (max-width: 768px) {
    bottom: 86px;
    right: 20px;
    min-width: 180px;
  }
`;

const ThemeOption = styled(motion.button) <{ $isActive: boolean }>`
  width: 100%;
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px 16px;
  border-radius: 12px;
  background: ${props => props.$isActive
        ? 'linear-gradient(135deg, rgba(var(--primary-rgb), 0.2), rgba(var(--primary-rgb), 0.1))'
        : 'transparent'};
  border: 1px solid ${props => props.$isActive
        ? 'rgba(var(--primary-rgb), 0.3)'
        : 'transparent'};
  color: var(--text-primary);
  font-size: 0.95rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
  margin-bottom: 6px;

  &:last-child {
    margin-bottom: 0;
  }

  &:hover {
    background: ${props => props.$isActive
        ? 'linear-gradient(135deg, rgba(var(--primary-rgb), 0.25), rgba(var(--primary-rgb), 0.15))'
        : 'rgba(255, 255, 255, 0.05)'};
    border-color: ${props => props.$isActive
        ? 'rgba(var(--primary-rgb), 0.4)'
        : 'rgba(255, 255, 255, 0.1)'};
    transform: translateX(-2px);
  }

  &:active {
    transform: scale(0.98);
  }

  @media (max-width: 768px) {
    padding: 10px 14px;
    font-size: 0.9rem;
    gap: 10px;
  }
`;

const ThemeIcon = styled.span`
  font-size: 1.3rem;
  line-height: 1;

  @media (max-width: 768px) {
    font-size: 1.2rem;
  }
`;

const ThemeName = styled.span`
  flex: 1;
  text-align: left;
`;

const ColorPreview = styled.div<{ $color: string }>`
  width: 16px;
  height: 16px;
  border-radius: 50%;
  background: ${props => props.$color};
  border: 2px solid rgba(255, 255, 255, 0.2);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.3);

  @media (max-width: 768px) {
    width: 14px;
    height: 14px;
  }
`;

export default function ThemeSwitcher() {
    const [isOpen, setIsOpen] = useState(false);
    const { currentTheme, setTheme } = useTheme();

    const handleThemeChange = (themeName: string) => {
        setTheme(themeName);
        setIsOpen(false);
    };

    return (
        <>
            <FloatingButton
                onClick={() => setIsOpen(!isOpen)}
                whileTap={{ scale: 0.9 }}
                aria-label="Toggle theme menu"
            >
                🎨
            </FloatingButton>

            <AnimatePresence>
                {isOpen && (
                    <ThemeMenu
                        initial={{ opacity: 0, y: 20, scale: 0.9 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 20, scale: 0.9 }}
                        transition={{ duration: 0.2, ease: 'easeOut' }}
                    >
                        {Object.values(themes).map((theme) => (
                            <ThemeOption
                                key={theme.name}
                                $isActive={currentTheme.name === theme.name}
                                onClick={() => handleThemeChange(theme.name)}
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                            >
                                <ThemeIcon>{theme.icon}</ThemeIcon>
                                <ThemeName>{theme.displayName}</ThemeName>
                                <ColorPreview $color={theme.colors.primary} />
                            </ThemeOption>
                        ))}
                    </ThemeMenu>
                )}
            </AnimatePresence>
        </>
    );
}
