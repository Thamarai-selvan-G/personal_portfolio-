'use client';

import styled from 'styled-components';
import { motion } from 'framer-motion';
import { Mail, Phone, Linkedin, ArrowUpRight } from 'lucide-react';

const Section = styled.section`
  padding: 100px 24px;
  max-width: 1200px;
  margin: 0 auto;
  min-height: 80vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: relative;
`;

const Header = styled(motion.div)`
  text-align: center;
  margin-bottom: 80px;
`;

const Title = styled.h2`
  font-size: 3.5rem;
  font-weight: 800;
  margin-bottom: 16px;
  background: linear-gradient(to right, #fff, #94a3b8);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  
  @media (max-width: 768px) {
    font-size: 2.5rem;
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
  grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
  gap: 32px;
  width: 100%;
  padding: 20px;
`;

const CardContent = styled.div`
  position: relative;
  z-index: 2;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  text-align: center;
`;

const IconBox = styled(motion.div)`
  width: 80px;
  height: 80px;
  border-radius: 24px;
  background: linear-gradient(135deg, rgba(255,255,255,0.1), rgba(255,255,255,0.05));
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--primary);
  border: 1px solid rgba(255,255,255,0.1);
  box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.15);
  backdrop-filter: blur(4px);
  margin-bottom: 10px;
`;

const CardTitle = styled.h3`
  font-size: 1.5rem;
  font-weight: 700;
  color: var(--text-primary);
`;

const CardValue = styled.p`
  color: var(--text-secondary);
  font-size: 1.1rem;
  line-height: 1.6;
`;

const ActionLink = styled(motion.div)`
  margin-top: 10px;
  display: flex;
  align-items: center;
  gap: 8px;
  color: var(--primary);
  font-weight: 600;
  font-size: 0.9rem;
  text-transform: uppercase;
  letter-spacing: 1px;
`;

const Card = styled(motion.a)`
  position: relative;
  padding: 48px 32px;
  border-radius: 30px;
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.05);
  overflow: hidden;
  text-decoration: none;
  cursor: pointer;
  transition: border-color 0.3s ease;

  &::before {
    content: '';
    position: absolute;
    inset: 0;
    background: radial-gradient(
      800px circle at var(--mouse-x) var(--mouse-y),
      rgba(109, 40, 217, 0.15),
      transparent 40%
    );
    opacity: 0;
    transition: opacity 0.5s;
    z-index: 1;
  }

  &:hover {
    border-color: var(--primary);
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.2);
    
    &::before {
      opacity: 1;
    }
  }
`;

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2
    }
  }
};

const cardVariants = {
  hidden: { y: 50, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      type: "spring" as const,
      stiffness: 100,
      damping: 12
    }
  }
};

const iconVariants = {
  hover: {
    scale: 1.1,
    rotate: 5,
    transition: { type: "spring" as const, stiffness: 300 }
  }
};

interface ContactCardProps {
  icon: React.ReactNode;
  title: string;
  value: string;
  href: string;
  action: string;
}

function ContactCard({ icon, title, value, href, action }: ContactCardProps) {
  return (
    <Card
      href={href}
      target={href.startsWith('http') ? '_blank' : undefined}
      rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
      variants={cardVariants}
      whileHover={{ y: -10 }}
      onMouseMove={(e: React.MouseEvent<HTMLAnchorElement>) => {
        const { left, top } = e.currentTarget.getBoundingClientRect();
        e.currentTarget.style.setProperty('--mouse-x', `${e.clientX - left}px`);
        e.currentTarget.style.setProperty('--mouse-y', `${e.clientY - top}px`);
      }}
    >
      <CardContent>
        <IconBox variants={iconVariants}>
          {icon}
        </IconBox>
        <CardTitle>{title}</CardTitle>
        <CardValue>{value}</CardValue>
        <ActionLink>
          {action} <ArrowUpRight size={16} />
        </ActionLink>
      </CardContent>
    </Card>
  );
}

export default function ContactSection() {
  return (
    <Section id="contact">
      <Header
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <Title>Let's Work Together</Title>
        <Subtitle>
          Have a project in mind? I'd love to hear about it. 
          Get in touch and let's create something amazing.
        </Subtitle>
      </Header>

      <Grid as={motion.div}
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
      >
        <ContactCard
          icon={<Phone size={32} />}
          title="Phone"
          value="+91 82204 94482"
          href="tel:8220494482"
          action="Call Now"
        />
        <ContactCard
          icon={<Mail size={32} />}
          title="Email"
          value="thamaraiselvan878@gmail.com"
          href="mailto:thamaraiselvan878@gmail.com"
          action="Send Email"
        />
        <ContactCard
          icon={<Linkedin size={32} />}
          title="LinkedIn"
          value="Connect on LinkedIn"
          href="https://www.linkedin.com/in/thamaraiselvan08"
          action="View Profile"
        />
      </Grid>
    </Section>
  );
}
