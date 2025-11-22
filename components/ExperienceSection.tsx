'use client';

import styled from 'styled-components';
import { motion } from 'framer-motion';
import { Briefcase, Calendar } from 'lucide-react';

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
  margin-bottom: 48px;
  text-align: center;
  color: var(--text-primary);
  
  span {
    color: var(--primary);
  }
`;

const Timeline = styled.div`
  position: relative;
  max-width: 800px;
  margin: 0 auto;
  
  &::before {
    content: '';
    position: absolute;
    left: 0;
    top: 0;
    height: 100%;
    width: 2px;
    background: var(--border);
    
    @media (min-width: 768px) {
      left: 50%;
      transform: translateX(-50%);
    }
  }
`;

const TimelineItem = styled(motion.div)`
  position: relative;
  margin-bottom: 48px;
  padding-left: 32px;
  
  @media (min-width: 768px) {
    padding-left: 0;
    width: 50%;
    margin-left: auto;
    padding-left: 32px;
    
    &:nth-child(even) {
      margin-left: 0;
      padding-left: 0;
      padding-right: 32px;
      text-align: right;
      
      .dot {
        left: auto;
        right: -9px;
      }
    }
  }
`;

const Dot = styled.div`
  position: absolute;
  left: -9px;
  top: 0;
  width: 20px;
  height: 20px;
  background: var(--primary);
  border-radius: 50%;
  border: 4px solid var(--background);
  box-shadow: 0 0 0 2px var(--primary);
  
  @media (min-width: 768px) {
    left: -10px;
  }
`;

const Card = styled.div`
  background: var(--surface);
  padding: 24px;
  border-radius: 12px;
  border: 1px solid var(--border);
  
  &:hover {
    border-color: var(--primary);
  }
`;

const Role = styled.h3`
  font-size: 1.25rem;
  font-weight: 700;
  color: var(--text-primary);
  margin-bottom: 8px;
`;

const Company = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  color: var(--primary);
  font-weight: 600;
  margin-bottom: 8px;
  
  @media (min-width: 768px) {
    justify-content: flex-start;
  }
`;

const Period = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  color: var(--text-secondary);
  font-size: 0.9rem;
  margin-bottom: 16px;
`;

const Description = styled.p`
  color: var(--text-secondary);
  line-height: 1.6;
`;

export default function ExperienceSection() {
  return (
    <Section id="experience">
      <Title
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        My <span>Experience</span>
      </Title>
      
      <Timeline>
        <TimelineItem
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <Dot className="dot" />
          <Card>
            <Role>Fullstack Web & Mobile App Developer</Role>
            <Company>
              <Briefcase size={16} /> itboomi innovations
            </Company>
            <Period>
              <Calendar size={16} /> 1 Year Experience
            </Period>
            <Description>
              Working on full-cycle development of web and mobile applications. 
              Collaborating with design and marketing teams to deliver high-quality products.
              Specializing in React, Next.js, React Native, and Supabase.
            </Description>
          </Card>
        </TimelineItem>
      </Timeline>
    </Section>
  );
}
