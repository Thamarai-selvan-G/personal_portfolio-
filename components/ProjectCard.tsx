'use client';

import styled from 'styled-components';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { ExternalLink, Smartphone, Globe, Layers, ArrowUpRight } from 'lucide-react';
import { MouseEvent, useState } from 'react';

const Card = styled(motion.div)`
  background: rgba(255, 255, 255, 0.03);
  border-radius: 24px;
  overflow: hidden;
  border: 1px solid rgba(255, 255, 255, 0.08);
  position: relative;
  cursor: pointer;
  transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  height: 100%;
  display: flex;
  flex-direction: column;
  
  &:hover {
    border-color: rgba(var(--primary-rgb), 0.4);
    transform: translateY(-8px);
    box-shadow: 0 20px 40px -10px rgba(0, 0, 0, 0.3);
  }
`;

const CardGlow = styled.div`
  pointer-events: none;
  position: absolute;
  inset: -1px;
  border-radius: 24px;
  z-index: 0;
  background: radial-gradient(
    600px circle at var(--card-mouse-x, 50%) var(--card-mouse-y, 50%),
    rgba(var(--primary-rgb), 0.1),
    transparent 40%
  );
  opacity: 0;
  transition: opacity 0.3s ease;
`;

const CardInner = styled.div`
  position: relative;
  height: 100%;
  display: flex;
  flex-direction: column;
  padding: 32px;
  z-index: 1;
  background: linear-gradient(180deg, rgba(255,255,255,0.01) 0%, rgba(255,255,255,0) 100%);
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 24px;
`;

const IconWrapper = styled.div`
  width: 48px;
  height: 48px;
  border-radius: 14px;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--primary);
  transition: all 0.3s ease;
  
  ${Card}:hover & {
    background: var(--primary);
    color: white;
    border-color: var(--primary);
    transform: scale(1.1) rotate(-5deg);
  }
  
  svg {
    width: 24px;
    height: 24px;
  }
`;

const CategoryBadge = styled(motion.div)<{ $category: string }>`
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 6px 12px;
  border-radius: 100px;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  color: var(--text-secondary);
  font-size: 0.75rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  
  svg {
    width: 12px;
    height: 12px;
  }
`;

const Title = styled.h3`
  font-size: 1.5rem;
  font-weight: 700;
  color: #fff;
  margin-bottom: 12px;
  line-height: 1.2;
  letter-spacing: -0.5px;
`;

const Description = styled.p`
  color: var(--text-secondary);
  font-size: 0.95rem;
  line-height: 1.6;
  margin-bottom: 24px;
  flex: 1;
`;

const Tags = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-bottom: 28px;
`;

const Tag = styled(motion.span)`
  background: rgba(255, 255, 255, 0.03);
  color: var(--text-secondary);
  padding: 4px 10px;
  border-radius: 6px;
  font-size: 0.75rem;
  font-weight: 500;
  border: 1px solid rgba(255, 255, 255, 0.05);
  transition: border-color 0.3s ease;
  cursor: default;
`;

const Footer = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  margin-top: auto;
`;

const ProjectLink = styled(Link)`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  color: var(--text-primary);
  font-size: 0.9rem;
  font-weight: 600;
  transition: all 0.3s ease;
  
  span {
    position: relative;
    
    &::after {
      content: '';
      position: absolute;
      bottom: -2px;
      left: 0;
      width: 0;
      height: 1px;
      background: var(--primary);
      transition: width 0.3s ease;
    }
  }
  
  svg {
    width: 16px;
    height: 16px;
    transition: transform 0.3s ease;
  }
  
  &:hover {
    color: var(--primary);
    
    span::after {
      width: 100%;
    }
    
    svg {
      transform: translate(2px, -2px);
    }
  }
`;

interface ProjectCardProps {
  title: string;
  description: string;
  tags: string[];
  category: string;
  demoLink?: string;
  githubLink?: string;
  index: number;
}

export default function ProjectCard({ 
  title, 
  description, 
  tags, 
  category,
  demoLink, 
  githubLink, 
  index
}: ProjectCardProps) {
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    card.style.setProperty('--card-mouse-x', `${x}px`);
    card.style.setProperty('--card-mouse-y', `${y}px`);
  };

  if (category === 'more') {
    return (
      <Card
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.5, delay: index * 0.1 }}
        whileHover={{ scale: 1.02, translateY: -5 }}
        onClick={() => demoLink && window.open(demoLink, '_blank')}
        style={{ 
          background: 'linear-gradient(135deg, rgba(var(--primary-rgb), 0.1), rgba(var(--primary-rgb), 0.05))',
          borderColor: 'rgba(var(--primary-rgb), 0.3)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          textAlign: 'center'
        }}
      >
        <CardInner style={{ alignItems: 'center', justifyContent: 'center', padding: '40px' }}>
          <IconWrapper style={{ 
            width: '80px', 
            height: '80px', 
            marginBottom: '24px',
            background: 'var(--primary)',
            color: 'white',
            borderRadius: '50%'
          }}>
            <ArrowUpRight size={40} />
          </IconWrapper>
          
          <Title style={{ fontSize: '1.8rem', marginBottom: '16px' }}>Explore More</Title>
          <Description style={{ marginBottom: '32px', maxWidth: '300px' }}>
            {description}
          </Description>
          
          <ProjectLink href={demoLink || '#'} target="_blank" style={{ background: 'white', color: 'var(--primary)', padding: '12px 24px' }}>
            <span>Visit GitHub</span>
            <ExternalLink size={16} />
          </ProjectLink>
        </CardInner>
      </Card>
    );
  }

  return (
    <Card
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ 
        duration: 0.5, 
        delay: index * 0.1,
        ease: "easeOut"
      }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <CardGlow style={{ opacity: isHovered ? 1 : 0 }} />
      
      <CardInner>
        <Header>
          <IconWrapper>
            <Layers />
          </IconWrapper>
          <CategoryBadge 
            $category={category}
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.1 + 0.2 }}
            whileHover={{ scale: 1.05, backgroundColor: "rgba(255, 255, 255, 0.1)" }}
          >
            {category === 'web' ? <Globe /> : <Smartphone />}
            {category === 'web' ? 'Web App' : 'Mobile App'}
          </CategoryBadge>
        </Header>
        
        <Title>{title}</Title>
        <Description>{description}</Description>
        
        <Tags>
          {tags.map((tag, i) => (
            <Tag 
              key={tag}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 + 0.3 + (i * 0.05) }}
              whileHover={{ 
                scale: 1.05, 
                backgroundColor: "rgba(var(--primary-rgb), 0.15)",
                borderColor: "rgba(var(--primary-rgb), 0.3)",
                color: "var(--text-primary)"
              }}
            >
              {tag}
            </Tag>
          ))}
        </Tags>
        
        <Footer>
          {demoLink && (
            <ProjectLink href={demoLink} target="_blank">
              <span>View Project</span>
              <ArrowUpRight />
            </ProjectLink>
          )}
        </Footer>
      </CardInner>
    </Card>
  );
}

