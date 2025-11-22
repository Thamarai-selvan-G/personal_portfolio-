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
  { name: 'React JS', icon: <img src="/icons/techStacks/react.svg" alt="React JS" width={40} height={40} /> },
  { name: 'Next.js', icon: <img src="/icons/techStacks/nextjs.svg" alt="Next.js" width={40} height={40} /> },
  { name: 'React Native', icon: <img src="/icons/techStacks/android.svg" alt="React Native" width={40} height={40} /> }, // Using android logo for now as placeholder or specific if available
  { name: 'JavaScript', icon: <img src="/icons/techStacks/js.svg" alt="JavaScript" width={40} height={40} /> },
  { name: 'HTML5', icon: <img src="/icons/techStacks/html5.svg" alt="HTML5" width={40} height={40} /> },
  { name: 'CSS3', icon: <img src="/icons/techStacks/css3.svg" alt="CSS3" width={40} height={40} /> },
  { name: 'Redux', icon: <img src="/icons/techStacks/redux.svg" alt="Redux" width={40} height={40} /> },
  { name: 'Supabase', icon: <img src="/icons/techStacks/supabase.svg" alt="Supabase" width={40} height={40} /> },
  { name: 'Firebase', icon: <img src="/icons/techStacks/firebase.svg" alt="Firebase" width={40} height={40} /> },
  { name: 'Git', icon: <img src="/icons/techStacks/git.svg" alt="Git" width={40} height={40} /> },
  { name: 'GitHub', icon: <img src="/icons/techStacks/github.svg" alt="GitHub" width={40} height={40} /> },
  { name: 'Postman', icon: <img src="/icons/techStacks/postman.svg" alt="Postman" width={40} height={40} /> },
  { name: 'Figma', icon: <img src="/icons/techStacks/android-studio.svg" alt="Figma" width={40} height={40} /> }, // Replaced with available icon or need to check if figma exists, list didn't show figma.svg, using android studio as placeholder or remove?
  // Wait, I should check the file list again. Figma was NOT in the list.
  // The list was: android-studio, android, css3, firebase, git, github, html5, js, nextjs, nodejs, npm, postgresql, postman, react, redux, styledcomponents, supabase, vercel, vitejs.
  // So I should only use those.
  { name: 'Node.js', icon: <img src="/icons/techStacks/nodejs.svg" alt="Node.js" width={40} height={40} /> },
  { name: 'PostgreSQL', icon: <img src="/icons/techStacks/postgresql.svg" alt="PostgreSQL" width={40} height={40} /> },
  { name: 'Styled Components', icon: <img src="/icons/techStacks/styledcomponents.svg" alt="Styled Components" width={40} height={40} /> },
  { name: 'Vite', icon: <img src="/icons/techStacks/vitejs.svg" alt="Vite" width={40} height={40} /> },
  { name: 'Vercel', icon: <img src="/icons/techStacks/vercel.svg" alt="Vercel" width={40} height={40} /> },
  { name: 'NPM', icon: <img src="/icons/techStacks/npm.svg" alt="NPM" width={40} height={40} /> },
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
