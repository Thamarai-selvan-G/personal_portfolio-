'use client';

import styled from 'styled-components';
import { motion, useMotionTemplate, useMotionValue } from 'framer-motion';
import { Mail, Phone, Linkedin } from 'lucide-react';
import { MouseEvent } from 'react';

const Section = styled.section`
  padding: 80px 24px;
  max-width: 1000px;
  margin: 0 auto;
  min-height: 60vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Title = styled(motion.h2)`
  font-size: 3rem;
  font-weight: 800;
  margin-bottom: 64px;
  text-align: center;
  color: var(--text-primary);
  
  span {
    color: var(--primary);
  }
`;

const ContactGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 32px;
  width: 100%;
  max-width: 900px;
`;

const CardWrapper = styled(motion.div)`
  position: relative;
  border-radius: 16px;
  background: rgba(255, 255, 255, 0.03);
  padding: 1px; // For border
  overflow: hidden;
`;

const Glow = styled(motion.div)`
  pointer-events: none;
  position: absolute;
  inset: 0;
  z-index: 0;
  background: radial-gradient(
    600px circle at var(--mouse-x) var(--mouse-y),
    rgba(109, 40, 217, 0.4),
    transparent 40%
  );
  opacity: 0;
  transition: opacity 0.3s;
  
  ${CardWrapper}:hover & {
    opacity: 1;
  }
`;

const ContactCard = styled.a`
  background: var(--surface);
  padding: 48px 24px;
  border-radius: 15px; // Slightly less than wrapper
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 24px;
  transition: all 0.3s ease;
  cursor: pointer;
  text-decoration: none;
  position: relative;
  z-index: 1;
  height: 100%;

  &:hover {
    background: var(--surface-light);
    
    .icon-wrapper {
      background: var(--primary);
      color: white;
      transform: scale(1.1);
    }
  }
`;

const IconWrapper = styled.div`
  width: 80px;
  height: 80px;
  background: rgba(109, 40, 217, 0.1);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--primary);
  font-size: 2rem;
  transition: all 0.3s ease;
`;

const Label = styled.h3`
  font-size: 1.5rem;
  font-weight: 700;
  color: var(--text-primary);
`;

const Value = styled.p`
  color: var(--text-secondary);
  font-size: 1.1rem;
  text-align: center;
`;

function SpotlightCard({ href, icon, label, value, delay, target }: any) {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  function handleMouseMove({ currentTarget, clientX, clientY }: MouseEvent) {
    const { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }

  return (
    <CardWrapper
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay }}
      onMouseMove={handleMouseMove}
      style={{
        // @ts-ignore
        "--mouse-x": useMotionTemplate`${mouseX}px`,
        "--mouse-y": useMotionTemplate`${mouseY}px`,
      }}
    >
      <Glow />
      <ContactCard href={href} target={target}>
        <IconWrapper className="icon-wrapper">
          {icon}
        </IconWrapper>
        <Label>{label}</Label>
        <Value>{value}</Value>
      </ContactCard>
    </CardWrapper>
  );
}

export default function ContactSection() {
  return (
    <Section id="contact">
      <Title
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        Get in <span>Touch</span>
      </Title>
      
      <ContactGrid>
        <SpotlightCard 
          href="tel:8220494482"
          icon={<Phone size={32} />}
          label="Phone"
          value="+91 82204 94482"
          delay={0.1}
        />

        <SpotlightCard 
          href="mailto:thamaraiselvan878@gmail.com"
          icon={<Mail size={32} />}
          label="Email"
          value="thamaraiselvan878@gmail.com"
          delay={0.2}
        />

        <SpotlightCard 
          href="https://www.linkedin.com/in/thamaraiselvan08"
          target="_blank"
          icon={<Linkedin size={32} />}
          label="LinkedIn"
          value="Connect on LinkedIn"
          delay={0.3}
        />
      </ContactGrid>
    </Section>
  );
}
