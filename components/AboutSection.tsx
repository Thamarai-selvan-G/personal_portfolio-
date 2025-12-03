'use client';

import styled from 'styled-components';
import { motion, useMotionValue, useTransform, useSpring } from 'framer-motion';
import Image from 'next/image';
import { useRef } from 'react';

const Section = styled.section`
  padding: 100px 24px;
  max-width: 1200px;
  margin: 0 auto;
  min-height: 80vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  position: relative;
  overflow: visible;
`;

const BackgroundElement = styled(motion.div)`
  position: absolute;
  border-radius: 50%;
  filter: blur(80px);
  z-index: -1;
  opacity: 0.4;
`;

const Container = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 60px;
  align-items: center;
  position: relative;
  z-index: 1;
  
  @media (min-width: 968px) {
    grid-template-columns: 1fr 1fr;
    gap: 100px;
  }
`;

const ImageWrapper = styled(motion.div)`
  position: relative;
  width: 100%;
  max-width: 450px;
  margin: 0 auto;
  perspective: 1000px;
  
  @media (min-width: 968px) {
    margin: 0;
    order: 2;
  }
`;

const TiltCard = styled(motion.div)`
  position: relative;
  width: 100%;
  aspect-ratio: 1;
  transform-style: preserve-3d;
  border-radius: 50%;
`;

const StyledImage = styled(Image)`
  border-radius: 50%;
  object-fit: cover;
  border: 1px solid rgba(255, 255, 255, 0.1);
  box-shadow: 
    0 20px 40px rgba(0, 0, 0, 0.4),
    0 0 0 1px rgba(255, 255, 255, 0.1);
  user-select: none;
  -webkit-user-drag: none;
`;

const ImageFrame = styled(motion.div)`
  position: absolute;
  inset: -20px;
  border: 2px solid var(--primary);
  border-radius: 50%;
  z-index: -1;
  opacity: 0.3;
  transform: translateZ(-50px);
`;

const TextContent = styled(motion.div)`
  display: flex;
  flex-direction: column;
  
  @media (min-width: 968px) {
    order: 1;
  }
`;

const Title = styled(motion.h2)`
  font-size: 3.5rem;
  font-weight: 800;
  margin-bottom: 32px;
  color: var(--text-primary);
  line-height: 1.1;
  
  span {
    background: linear-gradient(135deg, var(--primary) 0%, #fff 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }
  
  @media (max-width: 768px) {
    font-size: 2.5rem;
    text-align: center;
  }
`;

const Content = styled(motion.div)`
  display: flex;
  flex-direction: column;
  gap: 24px;
  font-size: 1.1rem;
  line-height: 1.8;
  color: var(--text-secondary);
  margin-bottom: 40px;
  
  p {
    margin: 0;
  }
`;

const Highlight = styled.span`
  color: #fff;
  font-weight: 600;
  position: relative;
  display: inline-block;
  
  &::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 2px;
    background: var(--primary);
    opacity: 0.5;
  }
`;

const RedirectLink = styled.a`
  color: #fff;
  font-weight: 600;
  position: relative;
  display: inline-block;
  cursor: pointer;
  text-decoration: none;
  
  &::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 2px;
    background: var(--primary);
    opacity: 0.5;
    transition: all 0.3s ease;
  }
  
  &:hover::after {
    opacity: 1;
    height: 3px;
  }
`;

const StatsRow = styled(motion.div)`
  display: flex;
  gap: 40px;
  margin-top: 20px;
  
  @media (max-width: 768px) {
    justify-content: center;
    gap: 20px;
  }
`;

const StatItem = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

const StatValue = styled.span`
  font-size: 2.5rem;
  font-weight: 800;
  color: var(--primary);
  line-height: 1;
`;

const StatLabel = styled.span`
  font-size: 0.9rem;
  color: var(--text-secondary);
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 1px;
`;

export default function AboutSection() {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseX = useSpring(x, { stiffness: 150, damping: 15 });
  const mouseY = useSpring(y, { stiffness: 150, damping: 15 });

  const rotateX = useTransform(mouseY, [-0.5, 0.5], ["15deg", "-15deg"]);
  const rotateY = useTransform(mouseX, [-0.5, 0.5], ["-15deg", "15deg"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseXFromCenter = e.clientX - rect.left - width / 2;
    const mouseYFromCenter = e.clientY - rect.top - height / 2;
    
    x.set(mouseXFromCenter / width);
    y.set(mouseYFromCenter / height);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <Section id="about">
      <BackgroundElement 
        style={{ 
          top: '10%', 
          left: '-10%', 
          width: '500px', 
          height: '500px', 
          background: 'radial-gradient(circle, var(--primary) 0%, transparent 70%)' 
        }} 
        animate={{ 
          y: [0, 50, 0],
          opacity: [0.3, 0.5, 0.3]
        }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
      />
      
      <Container>
        <ImageWrapper
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <TiltCard style={{ rotateX, rotateY }}>
            <StyledImage
              src="/images/myProfileImage.png"
              alt="Thamarai Selvan"
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              priority
              style={{ transform: "translateZ(20px)" }}
              draggable={false}
              onContextMenu={(e: React.MouseEvent) => e.preventDefault()}
            />
            <ImageFrame style={{ transform: "translateZ(-40px)" }} />
          </TiltCard>
        </ImageWrapper>

        <TextContent>
          <Title
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            About <span>Me</span>
          </Title>
          
          <Content
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <p>
              Hello! I'm <Highlight>Thamarai Selvan</Highlight>, a passionate Fullstack Web & Mobile App Developer based in Tiruppur. 
              With <RedirectLink href="#experience">1.3 year of professional experience</RedirectLink> at itboomi innovations, I have honed my skills in building 
              scalable and high-performance applications.
            </p>
            
            <p>
              My journey in software development has allowed me to work across the full development workflow, 
              from <Highlight>design collaboration</Highlight> to <Highlight>backend API integration</Highlight> and {""}
              <Highlight>marketing team coordination</Highlight>. I thrive in dynamic environments where I can solve complex problems 
              and deliver tangible results.
            </p>

            <p>
              I have successfully completed <RedirectLink href="#projects">10+ web applications</RedirectLink> and <RedirectLink href="#projects">5 mobile applications</RedirectLink>, 
              ranging from portfolio sites to complex administrative panels and consumer-facing apps. My technical stack includes 
              <RedirectLink href="#skills">React JS, Next.js, React Native, Supabase, and Firebase</RedirectLink>, enabling me to build robust fullstack solutions.
            </p>
          </Content>

          <StatsRow
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <StatItem>
              <StatValue>01+</StatValue>
              <StatLabel>Years Exp.</StatLabel>
            </StatItem>
            <StatItem>
              <StatValue>15+</StatValue>
              <StatLabel>Projects</StatLabel>
            </StatItem>
            <StatItem>
              <StatValue>10+</StatValue>
              <StatLabel>Happy Clients</StatLabel>
            </StatItem>
          </StatsRow>
        </TextContent>
      </Container>
    </Section>
  );
}
