'use client';

import styled from 'styled-components';
import { motion, useScroll, useTransform, useMotionValue, useSpring } from 'framer-motion';
import { Briefcase, Calendar, Code2, Sparkles, TrendingUp } from 'lucide-react';
import { useRef, useState, useEffect } from 'react';

const Section = styled.section`
  padding: 120px 24px;
  max-width: 1400px;
  margin: 0 auto;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  position: relative;
  overflow: hidden;
  perspective: 2000px;
`;

const AnimatedGrid = styled.div`
  position: absolute;
  inset: 0;
  background-image: 
    linear-gradient(rgba(255, 255, 255, 0.08) 1px, transparent 1px),
    linear-gradient(90deg, rgba(255, 255, 255, 0.08) 1px, transparent 1px);
  background-size: 50px 50px;
  transform: rotateX(60deg) scale(2);
  transform-origin: center center;
  animation: gridMove 20s linear infinite;
  opacity: 0.6;
  
  @keyframes gridMove {
    0% { background-position: 0 0; }
    100% { background-position: 50px 50px; }
  }
`;

const FloatingOrb = styled(motion.div)<{ $color: string; $size: number }>`
  position: absolute;
  width: ${props => props.$size}px;
  height: ${props => props.$size}px;
  border-radius: 50%;
  background: radial-gradient(circle, ${props => props.$color}40 0%, transparent 70%);
  filter: blur(40px);
  pointer-events: none;
`;

const Title = styled(motion.h2)`
  font-size: 4rem;
  font-weight: 900;
  margin-bottom: 20px;
  text-align: center;
  color: var(--text-primary);
  position: relative;
  z-index: 10;
  letter-spacing: -2px;
  
  span {
    background: linear-gradient(135deg, var(--primary) 0%, #fff 50%, var(--primary) 100%);
    background-size: 200% 200%;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    animation: gradientShift 3s ease infinite;
  }

  @keyframes gradientShift {
    0%, 100% { background-position: 0% 50%; }
    50% { background-position: 100% 50%; }
  }

  @media (max-width: 768px) {
    font-size: 2.5rem;
  }
`;

const Subtitle = styled(motion.p)`
  text-align: center;
  color: var(--text-secondary);
  font-size: 1.1rem;
  margin-bottom: 80px;
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
  z-index: 10;
  position: relative;
`;

const CardsContainer = styled.div`
  position: relative;
  max-width: 900px;
  margin: 0 auto;
  z-index: 10;
  width: 100%;
`;

const MagneticCard = styled(motion.div)<{ $isHovered: boolean }>`
  background: rgba(255, 255, 255, 0.02);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  padding: 48px;
  border-radius: 32px;
  border: 1px solid rgba(255, 255, 255, 0.08);
  position: relative;
  overflow: hidden;
  margin-bottom: 40px;
  cursor: pointer;
  transform-style: preserve-3d;
  
  &::before {
    content: '';
    position: absolute;
    inset: 0;
    border-radius: 32px;
    padding: 2px;
    background: linear-gradient(135deg, 
      var(--primary) 0%, 
      transparent 50%, 
      var(--primary) 100%
    );
    -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
    -webkit-mask-composite: xor;
    mask-composite: exclude;
    opacity: ${props => props.$isHovered ? 1 : 0};
    transition: opacity 0.3s ease;
  }

  &::after {
    content: '';
    position: absolute;
    top: -50%;
    left: -50%;
    width: 200%;
    height: 200%;
    background: linear-gradient(
      45deg,
      transparent 30%,
      rgba(255, 255, 255, 0.1) 50%,
      transparent 70%
    );
    transform: translateX(-100%) translateY(-100%) rotate(45deg);
    transition: transform 0.6s ease;
  }

  &:hover::after {
    transform: translateX(100%) translateY(100%) rotate(45deg);
  }

  @media (max-width: 768px) {
    padding: 32px;
  }
`;

const CardGlow = styled(motion.div)`
  position: absolute;
  inset: -2px;
  border-radius: 32px;
  background: radial-gradient(
    600px circle at var(--mouse-x, 50%) var(--mouse-y, 50%),
    rgba(var(--primary-rgb), 0.15),
    transparent 40%
  );
  opacity: 0;
  transition: opacity 0.3s ease;
  pointer-events: none;
  z-index: -1;
`;

const CardHeader = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  margin-bottom: 24px;
  gap: 20px;
  
  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const RoleSection = styled.div`
  flex: 1;
`;

const Role = styled.h3`
  font-size: 1.8rem;
  font-weight: 800;
  color: #fff;
  margin-bottom: 12px;
  line-height: 1.2;
  
  @media (max-width: 768px) {
    font-size: 1.5rem;
  }
`;

const Company = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  color: var(--primary);
  font-weight: 700;
  font-size: 1.2rem;
  margin-bottom: 8px;
  
  svg {
    opacity: 0.9;
  }
`;

const Badge = styled(motion.div)`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 10px 20px;
  background: linear-gradient(135deg, rgba(var(--primary-rgb), 0.2) 0%, rgba(var(--primary-rgb), 0.05) 100%);
  border-radius: 100px;
  color: var(--primary);
  font-size: 0.9rem;
  font-weight: 600;
  border: 1px solid rgba(var(--primary-rgb), 0.3);
  white-space: nowrap;
  
  svg {
    width: 16px;
    height: 16px;
  }
`;

const Description = styled.p`
  color: var(--text-secondary);
  line-height: 1.8;
  margin-bottom: 32px;
  font-size: 1.05rem;
`;

const TechStack = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  margin-top: 24px;
`;

const TechTag = styled(motion.span)`
  font-size: 0.85rem;
  padding: 8px 16px;
  border-radius: 100px;
  background: rgba(255, 255, 255, 0.05);
  color: var(--text-primary);
  border: 1px solid rgba(255, 255, 255, 0.1);
  font-weight: 500;
  position: relative;
  overflow: hidden;
  
  &::before {
    content: '';
    position: absolute;
    inset: 0;
    background: linear-gradient(135deg, rgba(var(--primary-rgb), 0.2), transparent);
    opacity: 0;
    transition: opacity 0.3s ease;
  }
  
  &:hover::before {
    opacity: 1;
  }
`;

const FloatingIcon = styled(motion.div)<{ $index: number }>`
  position: absolute;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(var(--primary-rgb), 0.1);
  border: 1px solid rgba(var(--primary-rgb), 0.3);
  border-radius: 12px;
  backdrop-filter: blur(10px);
  color: var(--primary);
  font-size: 20px;
  pointer-events: none;
  
  ${props => {
    const positions = [
      { top: '10%', right: '5%' },
      { top: '30%', left: '5%' },
      { bottom: '20%', right: '8%' },
    ];
    return positions[props.$index % 3];
  }}
`;

const experiences = [
  {
    role: "Fullstack Web & Mobile App Developer",
    company: "itboomi innovations",
    period: "1 Year Experience",
    description: `Driving end-to-end development across web, mobile, and backend services at Itboomi. Collaborating closely with talented teams and working through the full product lifecycle, contributing as both a developer and a product owner.`,
    tech: ["React", "Next.js", "React Native", "Supabase", "Firebase"],
    highlights: ["10+ Projects Delivered", "Performance Optimization", "Team Leadership"]
  }
];

export default function ExperienceSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const y1 = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, 100]);
  const y3 = useTransform(scrollYProgress, [0, 1], [0, -50]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>, index: number) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    setMousePosition({ x, y });
    
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = (y - centerY) / 20;
    const rotateY = (centerX - x) / 20;
    
    card.style.setProperty('--mouse-x', `${x}px`);
    card.style.setProperty('--mouse-y', `${y}px`);
  };

  return (
    <Section id="experience" ref={containerRef}>
      <AnimatedGrid />
      
      <FloatingOrb
        $color="var(--primary)"
        $size={400}
        style={{ y: y1, top: '10%', left: '10%' }}
      />
      <FloatingOrb
        $color="#6366f1"
        $size={300}
        style={{ y: y2, bottom: '20%', right: '15%' }}
      />
      <FloatingOrb
        $color="var(--primary)"
        $size={350}
        style={{ y: y3, top: '50%', right: '5%' }}
      />
      
      <Title
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        My <span>Experience</span> Journey
      </Title>
      
      <Subtitle
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.2 }}
      >
        Building innovative solutions and pushing boundaries in web & mobile development
      </Subtitle>
      
      <CardsContainer>
        {experiences.map((exp, index) => (
          <MagneticCard
            key={index}
            $isHovered={hoveredCard === index}
            initial={{ opacity: 0, y: 100, rotateX: 10 }}
            whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ 
              duration: 0.8, 
              delay: index * 0.2,
              type: "spring",
              stiffness: 100
            }}
            whileHover={{ 
              scale: 1.02,
              transition: { duration: 0.3 }
            }}
            onMouseMove={(e) => handleMouseMove(e, index)}
            onMouseEnter={() => setHoveredCard(index)}
            onMouseLeave={() => setHoveredCard(null)}
          >
            <CardGlow 
              style={{ 
                opacity: hoveredCard === index ? 1 : 0 
              }} 
            />
            
            <FloatingIcon
              $index={0}
              animate={{ 
                y: [0, -10, 0],
                rotate: [0, 5, 0]
              }}
              transition={{ 
                duration: 3, 
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              <Code2 size={20} />
            </FloatingIcon>
            
            <FloatingIcon
              $index={1}
              animate={{ 
                y: [0, 10, 0],
                rotate: [0, -5, 0]
              }}
              transition={{ 
                duration: 4, 
                repeat: Infinity,
                ease: "easeInOut",
                delay: 0.5
              }}
            >
              <Sparkles size={20} />
            </FloatingIcon>
            
            <FloatingIcon
              $index={2}
              animate={{ 
                y: [0, -8, 0],
                rotate: [0, 8, 0]
              }}
              transition={{ 
                duration: 3.5, 
                repeat: Infinity,
                ease: "easeInOut",
                delay: 1
              }}
            >
              <TrendingUp size={20} />
            </FloatingIcon>
            
            <CardHeader>
              <RoleSection>
                <Role>{exp.role}</Role>
                <Company>
                  <Briefcase size={20} />
                  {exp.company}
                </Company>
              </RoleSection>
              
              <Badge
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Calendar size={16} />
                {exp.period}
              </Badge>
            </CardHeader>
            
            <Description>{exp.description}</Description>
            
            <TechStack>
              {exp.tech.map((tech, i) => (
                <TechTag
                  key={i}
                  whileHover={{ 
                    scale: 1.1,
                    y: -2
                  }}
                  transition={{ type: "spring", stiffness: 400 }}
                >
                  {tech}
                </TechTag>
              ))}
            </TechStack>
          </MagneticCard>
        ))}
      </CardsContainer>
    </Section>
  );
}
