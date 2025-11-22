'use client';

import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';

const Wrapper = styled.div`
  position: relative;
  width: 100%;
  height: 600px;
  overflow: hidden;
  display: flex;
  justify-content: center;
  mask-image: linear-gradient(to bottom, black 60%, transparent 100%);
`;

const Circle = styled(motion.div)`
  position: absolute;
  width: 1200px;
  height: 1200px;
  border-radius: 50%;
  border: 1px solid rgba(255, 255, 255, 0.05);
  top: 100px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ItemWrapper = styled(motion.div)<{ $angle: number }>`
  position: absolute;
  top: 50%;
  left: 50%;
  width: 60px;
  height: 60px;
  margin-left: -30px;
  margin-top: -30px;
  transform-origin: center center;
`;

const IconContainer = styled(motion.div)`
  width: 100%;
  height: 100%;
  background: rgba(20, 20, 20, 0.8);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--primary);
  box-shadow: 0 0 15px rgba(0,0,0,0.5);
  backdrop-filter: blur(5px);
`;

const Label = styled(motion.span)`
  position: absolute;
  top: 100%;
  left: 50%;
  transform: translateX(-50%);
  font-size: 0.8rem;
  color: var(--text-secondary);
  white-space: nowrap;
  margin-top: 8px;
  opacity: 0;
  transition: opacity 0.3s;

  ${IconContainer}:hover + & {
    opacity: 1;
  }
`;

const CenterContent = styled.div`
  position: absolute;
  top: 250px; // Positioned inside the upper part of the circle
  left: 50%;
  transform: translateX(-50%);
  z-index: 10;
  width: 100%;
  max-width: 600px;
  display: flex;
  justify-content: center;
`;

interface ArcMarqueeProps {
  items: { name: string; icon: React.ReactNode }[];
  children?: React.ReactNode;
}

export default function ArcMarquee({ items, children }: ArcMarqueeProps) {
  const radius = 600; 
  
  return (
    <Wrapper>
      <Circle
        animate={{ rotate: 360 }}
        transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
      >
        {items.map((item, index) => {
          const angle = (index / items.length) * 360;
          const radian = (angle * Math.PI) / 180;
          const x = Math.cos(radian) * radius;
          const y = Math.sin(radian) * radius;

          return (
            <ItemWrapper
              key={item.name}
              $angle={angle}
              style={{
                transform: `translate(${x.toFixed(3)}px, ${y.toFixed(3)}px) rotate(${(angle + 90).toFixed(3)}deg)`,
              }}
            >
              <IconContainer
                animate={{ rotate: -360 }}
                transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
              >
                {item.icon}
              </IconContainer>
              <Label>{item.name}</Label>
            </ItemWrapper>
          );
        })}
      </Circle>
      <CenterContent>
        {children}
      </CenterContent>
    </Wrapper>
  );
}
