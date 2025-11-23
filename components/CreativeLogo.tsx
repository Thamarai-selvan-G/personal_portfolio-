'use client';

import styled from 'styled-components';
import { motion } from 'framer-motion';

const LogoWrapper = styled(motion.div)`
  display: flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
  position: relative;
  padding: 8px;
  
  &::before {
    content: '';
    position: absolute;
    inset: 0;
    background: linear-gradient(135deg, rgba(var(--primary-rgb), 0.1), transparent);
    border-radius: 12px;
    opacity: 0;
    transition: opacity 0.3s ease;
  }

  &:hover::before {
    opacity: 1;
  }
`;

const Monogram = styled.div`
  font-family: 'Outfit', sans-serif;
  font-weight: 800;
  font-size: 1.8rem;
  line-height: 1;
  background: linear-gradient(135deg, var(--primary) 0%, #fff 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  position: relative;
  z-index: 1;
  letter-spacing: -1px;
  
  &::after {
    content: '.';
    color: var(--primary);
    -webkit-text-fill-color: var(--primary);
    font-size: 2rem;
    line-height: 0;
  }
`;

const DecorativeLine = styled(motion.div)`
  height: 2px;
  width: 24px;
  background: var(--primary);
  border-radius: 2px;
  position: absolute;
  bottom: 4px;
  left: 50%;
  transform: translateX(-50%);
`;

interface CreativeLogoProps {
  onClick?: (e: React.MouseEvent) => void;
  href?: string;
}

export default function CreativeLogo({ onClick }: CreativeLogoProps) {
  return (
    <LogoWrapper
      onClick={onClick}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      <Monogram>TS</Monogram>
      <DecorativeLine 
        initial={{ width: 0, opacity: 0 }}
        animate={{ width: 24, opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.5 }}
      />
    </LogoWrapper>
  );
}
