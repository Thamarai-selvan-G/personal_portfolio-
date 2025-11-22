'use client';

import styled from 'styled-components';
import { motion } from 'framer-motion';

const Section = styled.section`
  padding: 80px 24px;
  max-width: 1000px;
  margin: 0 auto;
  min-height: 80vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const Title = styled(motion.h2)`
  font-size: 3rem;
  font-weight: 800;
  margin-bottom: 32px;
  color: var(--text-primary);
  
  span {
    color: var(--primary);
  }
`;

const Content = styled(motion.div)`
  display: flex;
  flex-direction: column;
  gap: 24px;
  font-size: 1.1rem;
  line-height: 1.8;
  color: var(--text-secondary);
`;

const Highlight = styled.span`
  color: var(--text-primary);
  font-weight: 600;
`;

export default function AboutSection() {
  return (
    <Section id="about">
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
          With <Highlight>1 year of professional experience</Highlight> at itboomi innovations, I have honed my skills in building 
          scalable and high-performance applications.
        </p>
        
        <p>
          My journey in software development has allowed me to work across the full development workflow, 
          from <Highlight>design collaboration</Highlight> to <Highlight>backend API integration</Highlight> and 
          <Highlight>marketing team coordination</Highlight>. I thrive in dynamic environments where I can solve complex problems 
          and deliver tangible results.
        </p>

        <p>
          I have successfully completed <Highlight>10+ web applications</Highlight> and <Highlight>5 mobile applications</Highlight>, 
          ranging from portfolio sites to complex administrative panels and consumer-facing apps. My technical stack includes 
          <Highlight>React JS, Next.js, React Native, Supabase, and Firebase</Highlight>, enabling me to build robust fullstack solutions.
        </p>

        <p>
          Beyond coding, I am dedicated to continuous learning and staying updated with the latest industry trends. 
          I am currently looking for new opportunities to leverage my skills and contribute to innovative projects.
        </p>
      </Content>
    </Section>
  );
}
