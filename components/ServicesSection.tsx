'use client';

import styled from 'styled-components';
import { motion } from 'framer-motion';
import { Monitor, Smartphone, Server, Palette, Globe, Database } from 'lucide-react';

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
  margin-bottom: 64px;
  text-align: center;
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

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 32px;
`;

const ServiceCard = styled(motion.div)`
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.1);
  padding: 32px;
  border-radius: 16px;
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-5px);
    border-color: var(--primary);
    background: rgba(255, 255, 255, 0.05);
    
    .icon {
      color: var(--primary);
      transform: scale(1.1);
    }
  }
`;

const IconWrapper = styled.div`
  margin-bottom: 24px;
  color: var(--text-secondary);
  transition: all 0.3s ease;
`;

const ServiceTitle = styled.h3`
  font-size: 1.5rem;
  font-weight: 700;
  color: var(--text-primary);
  margin-bottom: 16px;
`;

const ServiceDescription = styled.p`
  color: var(--text-secondary);
  line-height: 1.6;
`;

const services = [
  {
    title: 'Web Development',
    description: 'Building responsive, high-performance websites using modern technologies like React and Next.js.',
    icon: <Monitor size={40} className="icon" />
  },
  {
    title: 'Mobile App Development',
    description: 'Creating native-like mobile experiences for iOS and Android using React Native.',
    icon: <Smartphone size={40} className="icon" />
  },
  // {
  //   title: 'Backend Development',
  //   description: 'Designing robust APIs and server-side logic with Node.js, Supabase, and Firebase.',
  //   icon: <Server size={40} className="icon" />
  // },
  // {
  //   title: 'UI/UX Design',
  //   description: 'Crafting intuitive and visually appealing user interfaces with a focus on user experience.',
  //   icon: <Palette size={40} className="icon" />
  // },
  // {
  //   title: 'Fullstack Solutions',
  //   description: 'End-to-end development from database design to frontend implementation.',
  //   icon: <Globe size={40} className="icon" />
  // },
  // {
  //   title: 'Database Management',
  //   description: 'Efficient data modeling and management using SQL and NoSQL databases.',
  //   icon: <Database size={40} className="icon" />
  // }
];

export default function ServicesSection() {
  return (
    <Section id="services">
      <Header
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        <Title>My <span>Services</span></Title>
        <Subtitle>
          Comprehensive development solutions tailored to your needs.
        </Subtitle>
      </Header>
      
      <Grid>
        {services.map((service, index) => (
          <ServiceCard
            key={service.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <IconWrapper>{service.icon}</IconWrapper>
            <ServiceTitle>{service.title}</ServiceTitle>
            <ServiceDescription>{service.description}</ServiceDescription>
          </ServiceCard>
        ))}
      </Grid>
    </Section>
  );
}
