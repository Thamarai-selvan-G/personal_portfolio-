'use client';

import styled from 'styled-components';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowRight, Download } from 'lucide-react';

const HeroSection = styled.section`
  min-height: calc(100vh - var(--nav-height));
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem 0;
`;

const HeroContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 1.5rem;
  max-width: 800px;
`;

const Greeting = styled(motion.span)`
  color: var(--primary);
  font-size: 1.2rem;
  font-weight: 600;
  letter-spacing: 2px;
  text-transform: uppercase;
`;

const Title = styled(motion.h1)`
  font-size: 3rem;
  font-weight: 800;
  line-height: 1.1;
  
  span {
    color: var(--text-secondary);
  }

  @media (min-width: 768px) {
    font-size: 4.5rem;
  }
`;

const Description = styled(motion.p)`
  font-size: 1.1rem;
  color: var(--text-secondary);
  max-width: 600px;
  line-height: 1.6;
  margin-bottom: 1rem;

  @media (min-width: 768px) {
    font-size: 1.25rem;
  }
`;

const ButtonGroup = styled(motion.div)`
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
`;

const PrimaryButton = styled(Link)`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  background: var(--primary);
  color: white;
  padding: 0.8rem 1.5rem;
  border-radius: 8px;
  font-weight: 600;
  transition: background 0.3s ease, transform 0.2s ease;

  &:hover {
    background: var(--primary-hover);
    transform: translateY(-2px);
  }
`;

const SecondaryButton = styled.a`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  background: transparent;
  color: var(--text-primary);
  padding: 0.8rem 1.5rem;
  border-radius: 8px;
  font-weight: 600;
  border: 1px solid var(--border);
  transition: border-color 0.3s ease, transform 0.2s ease;

  &:hover {
    border-color: var(--primary);
    transform: translateY(-2px);
  }
`;

export default function Hero() {
  return (
    <HeroSection className="container">
      <HeroContainer>
        <Greeting
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Hi, I'm Thamarai Selvan
        </Greeting>
        
        <Title
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          Fullstack Web & <br />
          <span>Mobile App Developer.</span>
        </Title>
        
        <Description
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          I build production-ready applications with modern technologies. 
          With 1 year of professional experience, I specialize in creating 
          seamless digital experiences across web and mobile platforms.
        </Description>
        
        <ButtonGroup
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <PrimaryButton href="/projects">
            View My Work <ArrowRight size={20} />
          </PrimaryButton>
          <SecondaryButton href="/resume/Thamarai-selvan-G-dev.pdf" target="_blank" rel="noopener noreferrer">
            Download Resume <Download size={20} />
          </SecondaryButton>
        </ButtonGroup>
      </HeroContainer>
    </HeroSection>
  );
}
