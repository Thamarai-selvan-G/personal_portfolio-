'use client';

import styled from 'styled-components';
import { motion, useMotionValue, useSpring } from 'framer-motion';
import { useState, useRef, MouseEvent } from 'react';
import ProjectCard from '@/components/ProjectCard';

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
`;

const Spotlight = styled(motion.div)`
  pointer-events: none;
  position: absolute;
  z-index: 1;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  background: radial-gradient(
    600px circle at var(--mouse-x, 50%) var(--mouse-y, 50%),
    rgba(var(--primary-rgb), 0.06),
    transparent 40%
  );
  opacity: 0;
  transition: opacity 0.3s ease;
  
  &.active {
    opacity: 1;
  }
`;

const BackgroundBlob = styled(motion.div)<{ $color: string; $top: string; $left: string }>`
  position: absolute;
  width: 500px;
  height: 500px;
  top: ${props => props.$top};
  left: ${props => props.$left};
  background: radial-gradient(circle, ${props => props.$color} 0%, transparent 70%);
  opacity: 0.05;
  filter: blur(60px);
  z-index: 0;
  pointer-events: none;
`;

const Header = styled(motion.div)`
  margin-bottom: 60px;
  text-align: center;
  position: relative;
  z-index: 10;
`;

const Title = styled.h2`
  font-size: 4rem;
  font-weight: 900;
  margin-bottom: 16px;
  color: var(--text-primary);
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

const Subtitle = styled.p`
  color: var(--text-secondary);
  font-size: 1.1rem;
  margin-bottom: 40px;
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
`;

const FilterContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 12px;
  flex-wrap: wrap;
`;

const FilterButton = styled(motion.button)<{ $active: boolean }>`
  padding: 12px 32px;
  border-radius: 100px;
  background: ${props => props.$active 
    ? 'linear-gradient(135deg, var(--primary) 0%, rgba(var(--primary-rgb), 0.8) 100%)' 
    : 'rgba(255, 255, 255, 0.03)'};
  color: ${props => props.$active ? 'white' : 'var(--text-secondary)'};
  font-weight: 600;
  font-size: 0.95rem;
  border: 1px solid ${props => props.$active ? 'var(--primary)' : 'rgba(255, 255, 255, 0.1)'};
  transition: all 0.3s ease;
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
  
  &:hover {
    background: ${props => props.$active 
      ? 'linear-gradient(135deg, var(--primary) 0%, rgba(var(--primary-rgb), 0.9) 100%)' 
      : 'rgba(255, 255, 255, 0.05)'};
    border-color: ${props => props.$active ? 'var(--primary)' : 'rgba(255, 255, 255, 0.2)'};
    transform: translateY(-2px);
    
    &::before {
      opacity: 1;
    }
  }
`;

const MasonryGrid = styled(motion.div)`
  column-count: 3;
  column-gap: 24px;
  position: relative;
  z-index: 10;
  
  @media (max-width: 1024px) {
    column-count: 2;
  }
  
  @media (max-width: 768px) {
    column-count: 1;
  }
`;

const projects = [
  {
    title: "IT Services Company Website",
    description:
      "A professional corporate website built for an IT development company to showcase services, technology expertise, and successful client case studies. Designed for high performance, SEO, and lead generation.",
    tags: ["Next.js", "Styled Components", "Firebase", "Framer Motion"],
    category: "web",
    demoLink: "https://itboomi.com/"
  },
  {
    title: "Engineering Solutions portfolio",
    description:
      "A modern portfolio platform for a Engineering Solutions business featuring product offerings, installation showcase, and sustainability benefits. Built with a clean UI optimized for conversions.",
    tags: ["React JS", "Styled Components"],
    category: "web",
    demoLink: "https://austro-engineering.web.app/"
  },
  // {
  //   title: "Solar Energy Solutions Portfolio",
  //   description:
  //     "A modern portfolio platform for a solar energy business featuring product offerings, installation showcase, and sustainability benefits. Built with a clean UI optimized for conversions.",
  //   tags: ["Next.js", "Styled Components"],
  //   category: "web",
  //   demoLink: "#"
  // },
  {
  title: "Land Survey CRM & Admin Panel",
  description:
    "An enterprise-level admin application built for a Land Survey company to manage branch operations across Tamil Nadu. The system includes employee management, project/task tracking, customer enquiries handling, and work progress monitoring. Features role-based access control, secure data workflows, and an intuitive UI for operational efficiency.",
  tags: ["React JS", "REST API", "React Strap"],
  category: "web",
  demoLink: "https://massive-thunder-d91.notion.site/Land-Survey-Gallery-view-2b445788299e80c882d2c4f5e0c42598?source=copy_link"
}
,
  {
    title: "GlowTune — AI-Based Skincare Coach App",
    description:
      "A personal skincare mobile application with AI-powered routine generation, progress tracking, and push notifications. Built using Supabase backend and integrated analytics. Cross-platform with 200+ active users.",
    tags: ["React Native", "Supabase", "Firebase", "Push Notifications"],
    category: "mobile",
    demoLink: "https://play.google.com/store/apps/details?id=com.itboomi.glowtune&hl=en_IN"
  },
  {
    title: "TownBus — Local Utility & Transport App",
    description:
      "A mobile solution offering real-time bus schedules, regional leader information, and local shopping directory. Includes Firebase backend and AdMob monetization.",
    tags: ["React Native", "Firebase", "AdMob", "REST APIs"],
    category: "mobile",
    demoLink: "https://play.google.com/store/search?q=townbus+app&c=apps&hl=en_IN"
  },
  {
  title: "Notefy — AI-Powered Smart Notes App",
  description:
    "A productivity-focused note-taking mobile app powered by AI to help users generate, organize, and summarize notes efficiently. Features include cloud sync, smart reminders, categorization, and secure Supabase storage. Currently live on the Play Store with 500+ downloads.",
  tags: ["React Native", "Supabase", "Firebase", "AI Integration"],
  category: "mobile",
  demoLink: "https://play.google.com/store/search?q=notefy&c=apps&hl=en_IN" 
}
,
  // {
  //   title: "Explore More Work",
  //   description:
  //     "I have built multiple experimental apps, UI components, and open-source tools across Web, Mobile, and Backend systems. Visit my GitHub to explore more projects and contributions.",
  //   tags: ["Open Source", "Experiments", "Contributions"],
  //   category: "more",
  //   demoLink: "https://github.com/Thamarai-selvan-G"
  // }
];


// const projects = [
//   {
//     title: "Enterprise IT Solutions Portfolio",
//     description: "A comprehensive portfolio website for showcasing advanced IT development services and successful case studies for enterprise clients.",
//     tags: ["Next.js", "Styled Components", "Firebase", "Framer Motion"],
//     category: "web",
//     demoLink: "#"
//   },
//   {
//     title: "Solar Energy Solutions Portfolio",
//     description: "Modern portfolio site highlighting innovative solar energy projects and sustainable green energy solutions.",
//     tags: ["Next.js", "Styled Components"],
//     category: "web",
//     demoLink: "#"
//   },
//   {
//     title: "Financial CRM Dashboard",
//     description: "Web-based CRM dashboard designed for managing client data, transactions, and analytics within a financial services mobile application.",
//     tags: ["React JS", "REST API", "React Strap"],
//     category: "web",
//     demoLink: "#"
//   },
//   {
//     title: "Glowtune Skincare Coach",
//     description: "Personalized skincare coaching mobile app with 100+ downloads, featuring routine tracking, tailored advice, and progress monitoring.",
//     tags: ["React Native", "Supabase", "Firebase", "Push Notifications"],
//     category: "mobile",
//     demoLink: "#"
//   },
//   {
//     title: "Townbus Utility App",
//     description: "Local utility mobile app delivering real-time bus schedules, community leader contacts, and shopping information for residents.",
//     tags: ["React Native", "Firebase", "Admob", "REST APIs"],
//     category: "mobile",
//     demoLink: "#"
//   },
  
//   {
//     title: "Expansive Projects & Contributions",
//     description: "Extensive collection of open source projects, experiments, and contributions. Visit my GitHub to explore the full portfolio.",
//     tags: ["Open Source", "Experiments", "Contributions"],
//     category: "more",
//     demoLink: "https://github.com/Thamarai-selvan-G"
//   }
// ];


export default function ProjectsSection() {
  const [filter, setFilter] = useState('all');
  const [isHovering, setIsHovering] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const filteredProjects = projects.filter(project => 
    filter === 'all' ? true : project.category === filter
  );

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!sectionRef.current) return;
    
    const rect = sectionRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    mouseX.set(x);
    mouseY.set(y);
    
    // Update CSS variables for spotlight
    sectionRef.current.style.setProperty('--mouse-x', `${x}px`);
    sectionRef.current.style.setProperty('--mouse-y', `${y}px`);
  };

  return (
    <Section 
      id="projects" 
      ref={sectionRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      <Spotlight className={isHovering ? 'active' : ''} />
      
      <BackgroundBlob 
        $color="rgba(var(--primary-rgb), 0.3)" 
        $top="10%" 
        $left="10%" 
        animate={{ 
          y: [0, 50, 0],
          scale: [1, 1.1, 1],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
      
      <BackgroundBlob 
        $color="rgba(147, 51, 234, 0.3)" 
        $top="60%" 
        $left="80%" 
        animate={{ 
          y: [0, -50, 0],
          scale: [1, 1.2, 1],
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
      
      <Header
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <Title>Featured <span>Projects</span></Title>
        <Subtitle>
          Crafting digital experiences that make a difference
        </Subtitle>
        <FilterContainer>
          <FilterButton 
            $active={filter === 'all'} 
            onClick={() => setFilter('all')}
            whileTap={{ scale: 0.95 }}
          >
            All Projects
          </FilterButton>
          <FilterButton 
            $active={filter === 'web'} 
            onClick={() => setFilter('web')}
            whileTap={{ scale: 0.95 }}
          >
            Web Apps
          </FilterButton>
          <FilterButton 
            $active={filter === 'mobile'} 
            onClick={() => setFilter('mobile')}
            whileTap={{ scale: 0.95 }}
          >
            Mobile Apps
          </FilterButton>
        </FilterContainer>
      </Header>
      
      <MasonryGrid
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        {filteredProjects.map((project, index) => (
          <div key={project.title} style={{ breakInside: 'avoid', marginBottom: '24px' }}>
            <ProjectCard
              index={index}
              {...project}
            />
          </div>
        ))}
      </MasonryGrid>
    </Section>
  );
}
