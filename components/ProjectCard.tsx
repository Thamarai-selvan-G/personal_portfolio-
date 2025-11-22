'use client';

import styled from 'styled-components';
import { motion, useMotionTemplate, useMotionValue } from 'framer-motion';
import Link from 'next/link';
import { ExternalLink, Github } from 'lucide-react';
import { MouseEvent } from 'react';

const Card = styled(motion.div)`
  background: rgba(255, 255, 255, 0.03);
  border-radius: 12px;
  overflow: hidden;
  border: 1px solid rgba(255, 255, 255, 0.1);
  display: flex;
  flex-direction: column;
  height: 100%;
  position: relative;
  group: hover;
`;

const Glow = styled(motion.div)`
  pointer-events: none;
  position: absolute;
  inset: -1px;
  border-radius: 12px;
  z-index: 0;
  background: radial-gradient(
    600px circle at var(--mouse-x) var(--mouse-y),
    rgba(109, 40, 217, 0.4),
    transparent 40%
  );
  opacity: 0;
  transition: opacity 0.3s;
  
  ${Card}:hover & {
    opacity: 1;
  }
`;

const CardInner = styled.div`
  background: var(--surface);
  border-radius: 11px;
  height: 100%;
  width: 100%;
  z-index: 1;
  display: flex;
  flex-direction: column;
  margin: 1px; // To show the border glow
  overflow: hidden;
`;

const ImagePlaceholder = styled.div`
  width: 100%;
  height: 200px;
  background: var(--surface-light);
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--text-secondary);
  font-size: 3rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 2px;
`;

const Content = styled.div`
  padding: 24px;
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const Title = styled.h3`
  font-size: 1.5rem;
  font-weight: 700;
  color: var(--text-primary);
`;

const Description = styled.p`
  color: var(--text-secondary);
  font-size: 0.95rem;
  line-height: 1.6;
  flex: 1;
`;

const Tags = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
`;

const Tag = styled.span`
  background: rgba(109, 40, 217, 0.1);
  color: var(--primary);
  padding: 4px 12px;
  border-radius: 100px;
  font-size: 0.8rem;
  font-weight: 500;
`;

const Links = styled.div`
  display: flex;
  gap: 16px;
  margin-top: 8px;
`;

const ProjectLink = styled(Link)`
  display: flex;
  align-items: center;
  gap: 6px;
  color: var(--text-secondary);
  font-size: 0.9rem;
  font-weight: 500;
  
  &:hover {
    color: var(--primary);
  }
`;

interface ProjectCardProps {
  title: string;
  description: string;
  tags: string[];
  demoLink?: string;
  githubLink?: string;
  index: number;
}

export default function ProjectCard({ title, description, tags, demoLink, githubLink, index }: ProjectCardProps) {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  function handleMouseMove({ currentTarget, clientX, clientY }: MouseEvent) {
    const { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }

  return (
    <Card
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      onMouseMove={handleMouseMove}
      style={{
        // @ts-ignore
        "--mouse-x": useMotionTemplate`${mouseX}px`,
        "--mouse-y": useMotionTemplate`${mouseY}px`,
      }}
    >
      <Glow />
      <CardInner>
        <ImagePlaceholder>
          {title.substring(0, 2)}
        </ImagePlaceholder>
        <Content>
          <Title>{title}</Title>
          <Description>{description}</Description>
          <Tags>
            {tags.map(tag => (
              <Tag key={tag}>{tag}</Tag>
            ))}
          </Tags>
          <Links>
            {demoLink && (
              <ProjectLink href={demoLink} target="_blank">
                <ExternalLink size={16} /> Live Demo
              </ProjectLink>
            )}
            
          </Links>
        </Content>
      </CardInner>
    </Card>
  );
}
