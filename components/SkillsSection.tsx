'use client';

import styled from 'styled-components';
import { motion } from 'framer-motion';
import ArcMarquee from '@/components/ArcMarquee';
import QuoteCarousel from '@/components/QuoteCarousel';
import { Code, Database, Layout, Smartphone, Server, GitBranch, Terminal, Figma, Globe, Cpu, Layers, Box } from 'lucide-react';

const Section = styled.section`
  padding: 80px 0;
  max-width: 100%;
  margin: 0 auto;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  overflow: hidden;
  position: relative;
`;

const Header = styled(motion.div)`
  margin-bottom: 0; // Reduced margin as Arc takes space
  text-align: center;
  padding: 0 24px;
  z-index: 10;
`;

const Title = styled.h2`
  font-size: 3rem;
  font-weight: 800;
  margin-bottom: 16px;
  color: var(--text-primary);
  
  span {
    color: var(--primary);
  }
`;

const Subtitle = styled.p`
  color: var(--text-secondary);
  font-size: 1.2rem;
  max-width: 600px;
  margin: 0 auto;
`;

const ContentWrapper = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 40px;
`;

const skills = [
  { name: 'React JS', icon: <Code size={24} /> },
  { name: 'Next.js', icon: <Layout size={24} /> },
  { name: 'React Native', icon: <Smartphone size={24} /> },
  { name: 'TypeScript', icon: <Code size={24} /> },
  { name: 'JavaScript', icon: <Code size={24} /> },
  { name: 'HTML5', icon: <Globe size={24} /> },
  { name: 'CSS3', icon: <Layout size={24} /> },
  { name: 'Redux', icon: <Database size={24} /> },
  { name: 'Supabase', icon: <Database size={24} /> },
  { name: 'Firebase', icon: <Server size={24} /> },
  { name: 'Git', icon: <GitBranch size={24} /> },
  { name: 'GitHub', icon: <GitBranch size={24} /> },
  { name: 'Postman', icon: <Terminal size={24} /> },
  { name: 'Figma', icon: <Figma size={24} /> },
  { name: 'Styled Components', icon: <Layers size={24} /> },
  { name: 'Framer Motion', icon: <Box size={24} /> },
];

export default function SkillsSection() {
  return (
    <Section id="skills">
      <Header
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        <Title>Tech <span>Skills</span></Title>
        <Subtitle>
          My technical expertise spans across frontend, backend, and mobile development.
        </Subtitle>
      </Header>
      
      <ContentWrapper>
        <ArcMarquee items={skills}>
          <QuoteCarousel />
        </ArcMarquee>
      </ContentWrapper>
    </Section>
  );
}
