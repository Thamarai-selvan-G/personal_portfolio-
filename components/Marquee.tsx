'use client';

import styled, { keyframes } from 'styled-components';

const scroll = keyframes`
  0% { transform: translateX(0); }
  100% { transform: translateX(-50%); }
`;

const MarqueeContainer = styled.div`
  width: 100%;
  overflow: hidden;
  display: flex;
  mask-image: linear-gradient(to right, transparent, black 10%, black 90%, transparent);
`;

const MarqueeContent = styled.div<{ $reverse?: boolean }>`
  display: flex;
  gap: 32px;
  padding: 16px 0;
  animation: ${scroll} 30s linear infinite;
  animation-direction: ${props => props.$reverse ? 'reverse' : 'normal'};
  width: max-content;
  
  &:hover {
    animation-play-state: paused;
  }
`;

const SkillItem = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  padding: 12px 24px;
  border-radius: 100px;
  white-space: nowrap;
  backdrop-filter: blur(10px);
  transition: all 0.3s ease;
  
  &:hover {
    background: rgba(255, 255, 255, 0.1);
    border-color: var(--primary);
    transform: scale(1.05);
    box-shadow: 0 0 20px rgba(109, 40, 217, 0.3);
  }
`;

const IconWrapper = styled.span`
  color: var(--primary);
  display: flex;
  align-items: center;
`;

const SkillName = styled.span`
  color: var(--text-primary);
  font-weight: 600;
  font-size: 1rem;
`;

interface MarqueeProps {
  items: { name: string; icon: React.ReactNode }[];
  reverse?: boolean;
}

export default function Marquee({ items, reverse = false }: MarqueeProps) {
  return (
    <MarqueeContainer>
      <MarqueeContent $reverse={reverse}>
        {[...items, ...items, ...items].map((item, index) => (
          <SkillItem key={`${item.name}-${index}`}>
            <IconWrapper>{item.icon}</IconWrapper>
            <SkillName>{item.name}</SkillName>
          </SkillItem>
        ))}
      </MarqueeContent>
    </MarqueeContainer>
  );
}
