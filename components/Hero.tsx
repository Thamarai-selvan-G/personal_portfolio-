'use client';

import styled from 'styled-components';
import { useState, useEffect, useRef } from 'react';
import { motion, useMotionValue, useTransform, useSpring } from 'framer-motion';
import Link from 'next/link';
import { ArrowRight, Download, Sparkles, Code2, Terminal, Cpu, Globe } from 'lucide-react';

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
  padding: 0 1rem;

  @media (min-width: 768px) {
    padding: 0 2rem;
  }

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
  perspective: 1000px;
  height: 400px;
  
  @media (min-width: 968px) {
    display: flex;
  }
`;

const TiltContainer = styled(motion.div)`
  position: relative;
  width: 100%;
  max-width: 400px;
  transform-style: preserve-3d;
  z-index: 10;
`;

const AbstractCard = styled(motion.div)`
  background: rgba(20, 20, 20, 0.8);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 24px;
  padding: 2rem;
  width: 100%;
  backdrop-filter: blur(20px);
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5);
  transform-style: preserve-3d;
  
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

const GlowEffect = styled(motion.div)`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 120%;
  height: 120%;
  background: radial-gradient(circle, rgba(var(--primary-rgb), 0.2) 0%, rgba(0,0,0,0) 70%);
  filter: blur(40px);
  z-index: -1;
  opacity: 0.5;
`;

const CodeWindow = styled.div`
  font-family: 'Fira Code', monospace;
  font-size: 0.9rem;
  transform: translateZ(20px);
  
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

  .content {
    display: flex;
    flex-direction: column;
    gap: 0.25rem;
  }

  .line {
    display: flex;
    gap: 1rem;
    opacity: 0.9;
    min-height: 1.5em;
    
    span:first-child {
      color: var(--text-secondary);
      user-select: none;
      width: 20px;
      text-align: right;
    }
  }

  .keyword { color: #c678dd; }
  .function { color: #61afef; }
  .string { color: #98c379; }
  .boolean { color: #d19a66; }
  .cursor {
    display: inline-block;
    width: 2px;
    height: 1.2em;
    background: var(--primary);
    margin-left: 2px;
    vertical-align: middle;
    animation: blink 1s step-end infinite;
  }

  @keyframes blink {
    0%, 100% { opacity: 1; }
    50% { opacity: 0; }
  }
`;

const OrbitPath = styled(motion.div)`
  position: absolute;
  top: 50%;
  left: 50%;
  border: 1px dashed rgba(255, 255, 255, 0.1);
  border-radius: 50%;
  transform: translate(-50%, -50%);
  pointer-events: none;
`;

const OrbitIcon = styled(motion.div)`
  position: absolute;
  width: 40px;
  height: 40px;
  background: var(--card-bg);
  border: 1px solid var(--border);
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--primary);
  box-shadow: 0 4px 12px rgba(0,0,0,0.2);
  z-index: 20;
`;

const TypewriterText = ({ text, shouldStart = false, onComplete }: { text: string, shouldStart?: boolean, onComplete?: () => void }) => {
  const [displayedText, setDisplayedText] = useState('');
  const hasStartedRef = useRef(false);
  
  useEffect(() => {
    if (!shouldStart || hasStartedRef.current) return;
    
    hasStartedRef.current = true;
    let currentIndex = 0;
    const interval = setInterval(() => {
      if (currentIndex <= text.length) {
        setDisplayedText(text.slice(0, currentIndex));
        currentIndex++;
      } else {
        clearInterval(interval);
        if (onComplete) onComplete();
      }
    }, 30); // Typing speed
    
    return () => clearInterval(interval);
  }, [text, shouldStart, onComplete]);

  return <span dangerouslySetInnerHTML={{ __html: displayedText }} />;
};

export default function Hero() {
  // Typing Sequence State
  const [typingIndex, setTypingIndex] = useState(0);

  // Tilt Logic
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const mouseX = useSpring(x, { stiffness: 150, damping: 15 });
  const mouseY = useSpring(y, { stiffness: 150, damping: 15 });
  
  const rotateX = useTransform(mouseY, [-0.5, 0.5], ["10deg", "-10deg"]);
  const rotateY = useTransform(mouseX, [-0.5, 0.5], ["-10deg", "10deg"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

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
          Building Digital  <br />
            <span className="highlight">Experiences</span>
          </Title>
          
          <Description
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
           I'm Thamarai Selvan, a Fullstack Developer building web and mobile apps, exploring backend development with Supabase, and always motivated to learn from people around me and achieve more in this field.
          </Description>
          
          <ButtonGroup
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            <PrimaryButton href="#projects">
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
          <GlowEffect 
            animate={{ rotate: 360, scale: [1, 1.1, 1] }}
            transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
          />

          {/* Orbiting Icons */}
          <OrbitPath style={{ width: '500px', height: '500px' }} animate={{ rotate: 360 }} transition={{ duration: 20, repeat: Infinity, ease: "linear" }}>
            <OrbitIcon style={{ top: '0', left: '50%', transform: 'translate(-50%, -50%) rotate(-360deg)' }}>
              <Code2 size={20} />
            </OrbitIcon>
          </OrbitPath>
          
          <OrbitPath style={{ width: '600px', height: '600px' }} animate={{ rotate: -360 }} transition={{ duration: 25, repeat: Infinity, ease: "linear" }}>
            <OrbitIcon style={{ top: '50%', right: '0', transform: 'translate(50%, -50%)' }}>
              <Terminal size={20} />
            </OrbitIcon>
          </OrbitPath>

          <TiltContainer
            style={{ rotateX, rotateY }}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
          >
            <AbstractCard>
              <CodeWindow>
                <div className="header">
                  <div />
                  <div />
                  <div />
                </div>
                <div className="content">
                  <div className="line">
                    <span>1</span>
                    <span>
                      <TypewriterText 
                        text="<span class='keyword'>const</span> <span class='function'>Developer</span> = {" 
                        shouldStart={true}
                        onComplete={() => setTypingIndex(1)}
                      />
                    </span>
                  </div>
                  <div className="line">
                    <span>2</span>
                    <span>
                      <TypewriterText 
                        text="&nbsp;&nbsp;name: <span class='string'>'Thamarai selvan'</span>," 
                        shouldStart={typingIndex >= 1}
                        onComplete={() => setTypingIndex(2)}
                      />
                    </span>
                  </div>
                  <div className="line">
                    <span>3</span>
                    <span>
                      <TypewriterText 
                        text="&nbsp;&nbsp;role: <span class='string'>'Fullstack'</span>," 
                        shouldStart={typingIndex >= 2}
                        onComplete={() => setTypingIndex(3)}
                      />
                    </span>
                  </div>
                  <div className="line">
                    <span>4</span>
                    <span>
                      <TypewriterText 
                        text="&nbsp;&nbsp;skills: [<span class='string'>'React Native'</span>, <span class='string'>'Next JS'</span>,<span class='string'>'Supabase'</span>,]," 
                        shouldStart={typingIndex >= 3}
                        onComplete={() => setTypingIndex(4)}
                      />
                    </span>
                  </div>
                  <div className="line">
                    <span>5</span>
                    <span>
                      <TypewriterText 
                        text="&nbsp;&nbsp;hardWorker: <span class='boolean'>true</span>" 
                        shouldStart={typingIndex >= 4}
                        onComplete={() => setTypingIndex(5)}
                      />
                    </span>
                  </div>
                  <div className="line">
                    <span>6</span>
                    <span>
                      <TypewriterText 
                        text="};" 
                        shouldStart={typingIndex >= 5}
                      />
                      <span className="cursor" />
                    </span>
                  </div>
                </div>
              </CodeWindow>
            </AbstractCard>
            
            {/* Floating Elements attached to the card 3D space */}
            <motion.div style={{ position: 'absolute', top: -20, right: -20, transform: 'translateZ(40px)' }}>
              <OrbitIcon>
                <Cpu size={20} />
              </OrbitIcon>
            </motion.div>
            
            <motion.div style={{ position: 'absolute', bottom: -20, left: -20, transform: 'translateZ(40px)' }}>
              <OrbitIcon>
                <Globe size={20} />
              </OrbitIcon>
            </motion.div>

          </TiltContainer>
        </VisualWrapper>
      </Container>
    </HeroSection>
  );
}
