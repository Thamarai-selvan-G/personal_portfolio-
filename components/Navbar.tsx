'use client';

import styled from 'styled-components';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { useState, useEffect } from 'react';
import CreativeLogo from './CreativeLogo';

const Nav = styled.nav`
  height: var(--nav-height);
  width: 100%;
  background: rgba(10, 10, 10, 0.8);
  backdrop-filter: blur(10px);
  position: fixed;
  top: 0;
  z-index: 100;
  border-bottom: 1px solid rgba(255, 255, 255, 0.05);
`;

const NavContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 100%;
`;



const DesktopMenu = styled.div`
  display: none;
  gap: 32px;

  @media (min-width: 768px) {
    display: flex;
  }
`;

const NavLink = styled.a<{ $active?: boolean }>`
  color: ${props => props.$active ? 'var(--primary)' : 'var(--text-secondary)'};
  font-size: 0.95rem;
  font-weight: 500;
  position: relative;
  cursor: pointer;
  
  &:hover {
    color: var(--text-primary);
  }

  &::after {
    content: '';
    position: absolute;
    bottom: -4px;
    left: 0;
    width: 100%;
    height: 2px;
    background: var(--primary);
    transform: scaleX(${props => props.$active ? 1 : 0});
    transform-origin: left;
    transition: transform 0.3s ease;
  }
`;

const MobileMenuButton = styled.button`
  display: block;
  color: var(--text-primary);
  
  @media (min-width: 768px) {
    display: none;
  }
`;

const MobileMenu = styled(motion.div)`
  position: fixed;
  top: var(--nav-height);
  left: 0;
  width: 100%;
  height: calc(100vh - var(--nav-height));
  background: var(--background);
  padding: 24px;
  display: flex;
  flex-direction: column;
  gap: 24px;
  border-top: 1px solid var(--border);
`;

const navItems = [
  { name: 'Home', path: '#' },
  { name: 'About', path: '#about' },
  { name: 'Services', path: '#services' },
  { name: 'Skills', path: '#skills' },
  { name: 'Experience', path: '#experience' },
  { name: 'Projects', path: '#projects' },
  { name: 'Contact', path: '#contact' },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('');

  useEffect(() => {
    const handleScroll = () => {
      const sections = navItems.map(item => item.path.substring(1)).filter(Boolean);
      let current = '';

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= 100 && rect.bottom >= 100) {
            current = section;
            break;
          }
        }
      }
      
      if (window.scrollY < 100) current = '';
      setActiveSection(current);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, path: string) => {
    e.preventDefault();
    setIsOpen(false);
    
    if (path === '#') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    const element = document.querySelector(path);
    if (element) {
      const navHeight = 80; // var(--nav-height)
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - navHeight;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <Nav>
      <NavContainer className="container">
        <Link href="/" onClick={(e) => handleNavClick(e, '#')}>
          <CreativeLogo />
        </Link>

        <DesktopMenu>
          {navItems.map((item) => (
            <NavLink 
              key={item.path} 
              href={item.path}
              $active={activeSection === item.path.substring(1) || (item.path === '#' && activeSection === '')}
              onClick={(e) => handleNavClick(e, item.path)}
            >
              {item.name}
            </NavLink>
          ))}
        </DesktopMenu>

        <MobileMenuButton onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </MobileMenuButton>

        {isOpen && (
          <MobileMenu
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
          >
            {navItems.map((item) => (
              <NavLink 
                key={item.path} 
                href={item.path}
                $active={activeSection === item.path.substring(1)}
                onClick={(e) => handleNavClick(e, item.path)}
                style={{ fontSize: '1.2rem' }}
              >
                {item.name}
              </NavLink>
            ))}
          </MobileMenu>
        )}
      </NavContainer>
    </Nav>
  );
}
