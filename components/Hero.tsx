'use client';

import styled from 'styled-components';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowRight, Download, Sparkles, Code2, Terminal } from 'lucide-react';

const HeroSection = styled.section`
  min-height: calc(100vh - var(--nav-height));
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 4rem 0;
  position: relative;
  overflow: hidden;
  
  /* Background decorative elements */
  &::before {
    content: '';
    position: absolute;
    top: -10%;
    right: -5%;
    width: 500px;
    height: 500px;
    background: radial-gradient(circle, rgba(var(--primary-rgb), 0.15) 0%, rgba(0,0,0,0) 70%);
    border-radius: 50%;
    z-index: -1;
    filter: blur(60px);
  }

  &::after {
    content: '';
    position: absolute;
    bottom: -10%;
    left: -5%;
    width: 400px;
    height: 400px;
    background: radial-gradient(circle, rgba(var(--secondary-rgb), 0.1) 0%, rgba(0,0,0,0) 70%);
    border-radius: 50%;
    z-index: -1;
    filter: blur(60px);
  }
`;

const Container = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 4rem;
  align-items: center;
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;

  @media (min-width: 968px) {
    grid-template-columns: 1.2fr 0.8fr;
  }
`;

const ContentWrapper = styled(motion.div)`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  align-items: center;
  text-align: center;

  @media (min-width: 968px) {
    align-items: flex-start;
    text-align: left;
  }
`;

const StatusBadge = styled(motion.div)`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  background: rgba(var(--primary-rgb), 0.1);
  border: 1px solid rgba(var(--primary-rgb), 0.2);
  border-radius: 100px;
  color: var(--primary);
  font-size: 0.875rem;
  font-weight: 600;
  width: fit-content;
  backdrop-filter: blur(10px);

  span {
    position: relative;
    display: flex;
    width: 8px;
    height: 8px;
    
    &::before {
      content: '';
      position: absolute;
      width: 100%;
      height: 100%;
      background: var(--primary);
      border-radius: 50%;
      animation: pulse 2s infinite;
    }
    
    &::after {
      content: '';
      position: absolute;
      width: 100%;
      height: 100%;
      background: var(--primary);
      border-radius: 50%;
    }
  }

  @keyframes pulse {
    0% { transform: scale(1); opacity: 1; }
    50% { transform: scale(2); opacity: 0; }
    100% { transform: scale(1); opacity: 0; }
  }
`;

const Title = styled(motion.h1)`
  font-size: 3.5rem;
  font-weight: 800;
  line-height: 1.1;
  letter-spacing: -0.02em;
  
  @media (min-width: 768px) {
    font-size: 5rem;
  }

  .highlight {
    background: linear-gradient(135deg, var(--primary) 0%, #a855f7 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }
`;

const Description = styled(motion.p)`
  font-size: 1.125rem;
  color: var(--text-secondary);
  line-height: 1.7;
  max-width: 540px;
  
  @media (min-width: 768px) {
    font-size: 1.25rem;
  }
`;

const ButtonGroup = styled(motion.div)`
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
  margin-top: 1rem;
  justify-content: center;

  @media (min-width: 968px) {
    justify-content: flex-start;
  }
`;

const PrimaryButton = styled(Link)`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  background: var(--primary);
  color: white;
  padding: 1rem 2rem;
  border-radius: 12px;
  font-weight: 600;
  font-size: 1rem;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: 0 4px 14px 0 rgba(var(--primary-rgb), 0.39);

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 20px rgba(var(--primary-rgb), 0.23);
    background: var(--primary-hover);
  }
`;

const SecondaryButton = styled.a`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  background: rgba(255, 255, 255, 0.05);
  color: var(--text-primary);
  padding: 1rem 2rem;
  border-radius: 12px;
  font-weight: 600;
  font-size: 1rem;
  border: 1px solid var(--border);
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  backdrop-filter: blur(10px);

  &:hover {
    transform: translateY(-2px);
    background: rgba(255, 255, 255, 0.1);
    border-color: var(--text-primary);
  }
`;

const VisualWrapper = styled(motion.div)`
  position: relative;
  display: none;
  justify-content: center;
  align-items: center;
  
  @media (min-width: 968px) {
    display: flex;
  }
`;

const AbstractCard = styled(motion.div)`
  background: rgba(20, 20, 20, 0.6);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 24px;
  padding: 2rem;
  width: 100%;
  max-width: 400px;
  backdrop-filter: blur(20px);
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5);
  position: relative;
  
  &::before {
    content: '';
    position: absolute;
    inset: 0;
    border-radius: 24px;
    padding: 1px;
    background: linear-gradient(135deg, rgba(255,255,255,0.2), rgba(255,255,255,0));
    -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
    -webkit-mask-composite: xor;
    mask-composite: exclude;
    pointer-events: none;
  }
`;

const CodeWindow = styled.div`
  font-family: 'Fira Code', monospace;
  font-size: 0.9rem;
  
  .header {
    display: flex;
    gap: 8px;
    margin-bottom: 1.5rem;
    
    div {
      width: 12px;
      height: 12px;
      border-radius: 50%;
      
      &:nth-child(1) { background: #ff5f56; }
      &:nth-child(2) { background: #ffbd2e; }
      &:nth-child(3) { background: #27c93f; }
    }
  }

  .line {
    display: flex;
    gap: 1rem;
    margin-bottom: 0.5rem;
    opacity: 0.8;
    
    span:first-child {
      color: var(--text-secondary);
      user-select: none;
    }
  }

  .keyword { color: #c678dd; }
  .function { color: #61afef; }
  .string { color: #98c379; }
  .comment { color: #5c6370; font-style: italic; }
`;

const FloatingIcon = styled(motion.div)`
  position: absolute;
  background: var(--card-bg);
  border: 1px solid var(--border);
  padding: 1rem;
  border-radius: 16px;
  box-shadow: 0 10px 30px rgba(0,0,0,0.2);
  z-index: 2;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--primary);
`;

export default function Hero() {
  return (
    <HeroSection className="container">
      <Container>
        <ContentWrapper
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <StatusBadge
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <span /> Available for work
          </StatusBadge>
          
          <Title
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            Building Digital <br />
            <span className="highlight">Experiences</span>
          </Title>
          
          <Description
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            I'm Thamarai Selvan, a Fullstack Developer specializing in building 
            exceptional digital experiences. I transform complex problems into 
            elegant, scalable solutions.
          </Description>
          
          <ButtonGroup
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            <PrimaryButton href="/projects">
              View Projects <ArrowRight size={20} />
            </PrimaryButton>
            <SecondaryButton href="/resume/Thamarai-selvan-G-dev.pdf" target="_blank" rel="noopener noreferrer">
              Download Resume <Download size={20} />
            </SecondaryButton>
          </ButtonGroup>
        </ContentWrapper>

        <VisualWrapper
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <AbstractCard
            animate={{ y: [0, -20, 0] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          >
            <CodeWindow>
              <div className="header">
                <div />
                <div />
                <div />
              </div>
              <div className="content">
                <div className="line">
                  <span>1</span>
                  <span><span className="keyword">const</span> <span className="function">Developer</span> = &#123;</span>
                </div>
                <div className="line">
                  <span>2</span>
                  <span>&nbsp;&nbsp;name: <span className="string">'Thamarai selvan'</span>,</span>
                </div>
                <div className="line">
                  <span>3</span>
                  <span>&nbsp;&nbsp;role: <span className="string">'Fullstack Dev'</span>,</span>
                </div>
                <div className="line">
                  <span>4</span>
                  <span>&nbsp;&nbsp;skills: [<span className="string">'React. js'</span>, <span className="string">'Next.js'</span>, <span className="string">'React native'</span>],</span>
                </div>
                <div className="line">
                  <span>5</span>
                  <span>&nbsp;&nbsp;hardWorker: <span className="keyword">true</span></span>
                </div>
                <div className="line">
                  <span>6</span>
                  <span>&#125;;</span>
                </div>
              </div>
            </CodeWindow>
          </AbstractCard>

          <FloatingIcon
            style={{ top: '-20px', right: '20px' }}
            animate={{ y: [0, 15, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          >
            <Code2 size={32} />
          </FloatingIcon>

          <FloatingIcon
            style={{ bottom: '-20px', left: '20px' }}
            animate={{ y: [0, -15, 0] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
          >
            <Terminal size={32} />
          </FloatingIcon>
        </VisualWrapper>
      </Container>
    </HeroSection>
  );
}
