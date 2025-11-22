'use client';

import styled, { keyframes } from 'styled-components';
import { motion } from 'framer-motion';

const move = keyframes`
  0% {
    transform: translate(0, 0) rotate(0deg);
  }
  50% {
    transform: translate(100px, 100px) rotate(180deg);
  }
  100% {
    transform: translate(0, 0) rotate(360deg);
  }
`;

const BackgroundContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  z-index: -1;
  overflow: hidden;
  background: var(--background);
`;

const Blob = styled(motion.div)<{ $color: string; $top: string; $left: string; $size: string }>`
  position: absolute;
  top: ${props => props.$top};
  left: ${props => props.$left};
  width: ${props => props.$size};
  height: ${props => props.$size};
  background: ${props => props.$color};
  border-radius: 50%;
  filter: blur(100px);
  opacity: 0.4;
  animation: ${move} 20s infinite alternate ease-in-out;
`;

const Overlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(10, 10, 10, 0.5); // Darken the blobs slightly
  backdrop-filter: blur(30px); // Glassmorphism effect
`;

export default function AnimatedBackground() {
  return (
    <BackgroundContainer>
      <Blob 
        $color="var(--primary)" 
        $top="-10%" 
        $left="-10%" 
        $size="600px"
        animate={{ 
          x: [0, 100, 0],
          y: [0, 50, 0],
          rotate: [0, 90, 0]
        }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
      />
      <Blob 
        $color="var(--secondary)" 
        $top="40%" 
        $left="80%" 
        $size="500px"
        animate={{ 
          x: [0, -100, 0],
          y: [0, -50, 0],
          rotate: [0, -90, 0]
        }}
        transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
      />
      <Blob 
        $color="var(--accent)" 
        $top="80%" 
        $left="20%" 
        $size="400px"
        animate={{ 
          x: [0, 50, 0],
          y: [0, -100, 0],
          rotate: [0, 180, 0]
        }}
        transition={{ duration: 22, repeat: Infinity, ease: "linear" }}
      />
      <Overlay />
    </BackgroundContainer>
  );
}
