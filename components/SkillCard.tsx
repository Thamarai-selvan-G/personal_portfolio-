'use client';

import styled from 'styled-components';
import { motion } from 'framer-motion';

const Card = styled(motion.div)`
  background: var(--surface);
  padding: 24px;
  border-radius: 12px;
  border: 1px solid var(--border);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
  transition: border-color 0.3s ease, transform 0.3s ease;
  cursor: pointer;

  &:hover {
    border-color: var(--primary);
    transform: translateY(-5px);
    box-shadow: 0 10px 30px -10px rgba(109, 40, 217, 0.3);
  }
`;

const IconWrapper = styled.div`
  font-size: 2.5rem;
  color: var(--primary);
`;

const SkillName = styled.h3`
  font-size: 1.1rem;
  font-weight: 600;
  color: var(--text-primary);
`;

const SkillLevel = styled.div`
  width: 100%;
  height: 6px;
  background: var(--surface-light);
  border-radius: 3px;
  overflow: hidden;
`;

const LevelBar = styled(motion.div)<{ $level: number }>`
  height: 100%;
  background: var(--primary);
  width: ${props => props.$level}%;
`;

interface SkillCardProps {
  name: string;
  icon: React.ReactNode;
  level: number; // 0 to 100
  index: number;
}

export default function SkillCard({ name, icon, level, index }: SkillCardProps) {
  return (
    <Card
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      <IconWrapper>{icon}</IconWrapper>
      <SkillName>{name}</SkillName>
      <SkillLevel>
        <LevelBar 
          $level={level} 
          initial={{ width: 0 }}
          whileInView={{ width: `${level}%` }}
          transition={{ duration: 1, delay: 0.5 + index * 0.1 }}
        />
      </SkillLevel>
    </Card>
  );
}
