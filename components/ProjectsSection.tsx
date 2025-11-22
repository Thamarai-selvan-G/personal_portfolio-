'use client';

import styled from 'styled-components';
import { motion } from 'framer-motion';
import { useState } from 'react';
import ProjectCard from '@/components/ProjectCard';

const Section = styled.section`
  padding: 80px 24px;
  max-width: 1200px;
  margin: 0 auto;
  min-height: 80vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const Header = styled(motion.div)`
  margin-bottom: 48px;
  text-align: center;
`;

const Title = styled.h2`
  font-size: 3rem;
  font-weight: 800;
  margin-bottom: 24px;
  color: var(--text-primary);
  
  span {
    color: var(--primary);
  }
`;

const FilterContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 16px;
  margin-bottom: 48px;
  flex-wrap: wrap;
`;

const FilterButton = styled.button<{ $active: boolean }>`
  padding: 8px 24px;
  border-radius: 100px;
  background: ${props => props.$active ? 'var(--primary)' : 'var(--surface)'};
  color: ${props => props.$active ? 'white' : 'var(--text-secondary)'};
  font-weight: 600;
  border: 1px solid ${props => props.$active ? 'var(--primary)' : 'var(--border)'};
  transition: all 0.3s ease;
  
  &:hover {
    background: ${props => props.$active ? 'var(--primary)' : 'var(--surface-light)'};
    color: ${props => props.$active ? 'white' : 'var(--text-primary)'};
  }
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 32px;
`;

const projects = [
  {
    title: "IT Development Portfolio",
    description: "A comprehensive portfolio website for an IT development company showcasing services and case studies.",
    tags: ["Next.js", "Styled Components", "Firebase", "Framer Motion"],
    category: "web",
    demoLink: "#",
    githubLink: "#"
  },
  {
    title: "Solar Company Portfolio",
    description: "Modern portfolio site for a solar energy company highlighting projects and green energy solutions.",
    tags: ["Next.js", "Styled Components"],
    category: "web",
    demoLink: "#",
    githubLink: "#"
  },
  {
    title: "Financial Admin Panel",
    description: "Web-based admin dashboard for managing a financial mobile application's data and users.",
    tags: ["React JS", "Redux", "REST API"],
    category: "web",
    demoLink: "#",
    githubLink: "#"
  },
  {
    title: "Glowtune",
    description: "Personal skincare coach app with 100+ downloads. Features routine tracking and personalized advice.",
    tags: ["React Native", "Supabase", "Firebase", "Push Notifications"],
    category: "mobile",
    demoLink: "#",
    githubLink: "#"
  },
  {
    title: "Townbus",
    description: "Local utility app providing bus timings, leader details, and shopping info.",
    tags: ["React Native", "Firebase", "Admob", "REST APIs"],
    category: "mobile",
    demoLink: "#",
    githubLink: "#"
  }
];

export default function ProjectsSection() {
  const [filter, setFilter] = useState('all');

  const filteredProjects = projects.filter(project => 
    filter === 'all' ? true : project.category === filter
  );

  return (
    <Section id="projects">
      <Header
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        <Title>My <span>Projects</span></Title>
        <FilterContainer>
          <FilterButton $active={filter === 'all'} onClick={() => setFilter('all')}>
            All
          </FilterButton>
          <FilterButton $active={filter === 'web'} onClick={() => setFilter('web')}>
            Web
          </FilterButton>
          <FilterButton $active={filter === 'mobile'} onClick={() => setFilter('mobile')}>
            Mobile App
          </FilterButton>
        </FilterContainer>
      </Header>
      
      <Grid>
        {filteredProjects.map((project, index) => (
          <ProjectCard
            key={project.title}
            index={index}
            {...project}
          />
        ))}
      </Grid>
    </Section>
  );
}
