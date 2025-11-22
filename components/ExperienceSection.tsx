'use client';

import styled from 'styled-components';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Briefcase, Calendar, Code2 } from 'lucide-react';
import { useRef } from 'react';

const Section = styled.section`
  padding: 100px 24px;
  max-width: 1200px;
  margin: 0 auto;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  position: relative;
  overflow: hidden;
`;

const BackgroundGlow = styled.div`
  position: absolute;
  width: 500px;
  height: 500px;
  background: radial-gradient(circle, var(--primary) 0%, transparent 70%);
  opacity: 0.05;
  filter: blur(100px);
  z-index: 0;
  top: 20%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

const Title = styled(motion.h2)`
  font-size: 3.5rem;
  font-weight: 800;
  margin-bottom: 80px;
  text-align: center;
  color: var(--text-primary);
  position: relative;
  z-index: 1;
  
  span {
    background: linear-gradient(135deg, var(--primary) 0%, #fff 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }

  @media (max-width: 768px) {
    font-size: 2.5rem;
  }
`;

const TimelineContainer = styled.div`
  position: relative;
  max-width: 1000px;
  margin: 0 auto;
  z-index: 1;
`;

const TimelineLine = styled(motion.div)`
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  width: 2px;
  background: linear-gradient(to bottom, 
    transparent 0%, 
    var(--primary) 15%, 
    var(--primary) 85%, 
    transparent 100%
  );
  opacity: 0.3;
  
  @media (min-width: 768px) {
    left: 50%;
    transform: translateX(-50%);
  }
`;

const TimelineItem = styled(motion.div)`
  position: relative;
  margin-bottom: 60px;
  padding-left: 40px;
  
  @media (min-width: 768px) {
    padding-left: 0;
    width: 50%;
    margin-left: auto;
    padding-left: 50px;
    
    &:nth-child(even) {
      margin-left: 0;
      padding-left: 0;
      padding-right: 50px;
      text-align: right;
      
      .content-wrapper {
        align-items: flex-end;
      }
      
      .tech-stack {
        justify-content: flex-end;
      }

      .dot-container {
        left: auto;
        right: -50px;
        transform: translateX(50%);
      }
    }
  }
`;

const DotContainer = styled(motion.div)`
  position: absolute;
  left: 0;
  top: 0;
  transform: translateX(-50%);
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 2;
  
  @media (min-width: 768px) {
    left: -50px; // Adjust based on padding
  }
`;

const Dot = styled.div`
  width: 16px;
  height: 16px;
  background: var(--primary);
  border-radius: 50%;
  box-shadow: 0 0 20px var(--primary);
  position: relative;
  
  &::after {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 100%;
    height: 100%;
    border-radius: 50%;
    border: 2px solid #fff;
    opacity: 0.5;
    animation: pulse 2s infinite;
  }

  @keyframes pulse {
    0% { transform: translate(-50%, -50%) scale(1); opacity: 0.5; }
    100% { transform: translate(-50%, -50%) scale(2.5); opacity: 0; }
  }
`;

const Card = styled(motion.div)`
  background: rgba(255, 255, 255, 0.03);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  padding: 32px;
  border-radius: 24px;
  border: 1px solid rgba(255, 255, 255, 0.05);
  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 1px;
    background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
  }

  &:hover {
    transform: translateY(-5px);
    background: rgba(255, 255, 255, 0.05);
    border-color: rgba(255, 255, 255, 0.1);
    box-shadow: 0 10px 40px -10px rgba(var(--primary-rgb), 0.15);
  }
`;

const Role = styled.h3`
  font-size: 1.5rem;
  font-weight: 700;
  color: #fff;
  margin-bottom: 8px;
  line-height: 1.3;
`;

const Company = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  color: var(--primary);
  font-weight: 600;
  font-size: 1.1rem;
  margin-bottom: 16px;
  
  svg {
    opacity: 0.8;
  }
`;

const Period = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 6px 12px;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 100px;
  color: var(--text-secondary);
  font-size: 0.85rem;
  margin-bottom: 20px;
  border: 1px solid rgba(255, 255, 255, 0.05);
`;

const Description = styled.p`
  color: var(--text-secondary);
  line-height: 1.7;
  margin-bottom: 24px;
  font-size: 1rem;
`;

const TechStack = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  
  &.right-aligned {
    justify-content: flex-end;
  }
`;

const TechTag = styled.span`
  font-size: 0.8rem;
  padding: 4px 12px;
  border-radius: 100px;
  background: rgba(var(--primary-rgb), 0.1);
  color: var(--primary);
  border: 1px solid rgba(var(--primary-rgb), 0.2);
  transition: all 0.2s ease;

  &:hover {
    background: rgba(var(--primary-rgb), 0.2);
    transform: translateY(-2px);
  }
`;

const experiences = [
  {
    role: "Fullstack Web & Mobile App Developer",
    company: "itboomi innovations",
    period: "1 Year Experience",
    description: "Working on full-cycle development of web and mobile applications. Collaborating with design and marketing teams to deliver high-quality products. Leading the migration of legacy systems to modern tech stacks.",
    tech: ["React", "Next.js", "React Native", "Supabase", "TypeScript", "Tailwind"]
  }
];

export default function ExperienceSection() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  return (
    <Section id="experience" ref={containerRef}>
      <BackgroundGlow />
      
      <Title
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7, ease: "easeOut" }}
      >
        My <span>Experience</span>
      </Title>
      
      <TimelineContainer>
        <TimelineLine style={{ scaleY: scrollYProgress }} />
        
        {experiences.map((exp, index) => (
          <TimelineItem
            key={index}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: index * 0.2 }}
          >
            <DotContainer className="dot-container">
              <Dot />
            </DotContainer>
            
            <div className="content-wrapper" style={{ display: 'flex', flexDirection: 'column' }}>
              <Card>
                <Role>{exp.role}</Role>
                <Company>
                  <Briefcase size={18} /> {exp.company}
                </Company>
                <Period>
                  <Calendar size={14} /> {exp.period}
                </Period>
                <Description>
                  {exp.description}
                </Description>
                <TechStack className="tech-stack">
                  {exp.tech.map((tech, i) => (
                    <TechTag key={i}>{tech}</TechTag>
                  ))}
                </TechStack>
              </Card>
            </div>
          </TimelineItem>
        ))}
      </TimelineContainer>
    </Section>
  );
}
