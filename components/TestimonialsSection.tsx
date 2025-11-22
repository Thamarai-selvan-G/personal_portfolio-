'use client';

import styled from 'styled-components';
import { motion } from 'framer-motion';

const Section = styled.section`
  padding: 120px 24px;
  max-width: 1200px;
  margin: 0 auto;
  min-height: 80vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const Header = styled(motion.div)`
  margin-bottom: 80px;
  text-align: center;
`;

const Title = styled.h2`
  font-size: 3.5rem;
  font-weight: 800;
  margin-bottom: 24px;
  color: var(--text-primary);
  letter-spacing: -1px;
  
  span {
    background: linear-gradient(135deg, var(--primary) 0%, var(--secondary) 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }
`;

const Subtitle = styled.p`
  color: var(--text-secondary);
  font-size: 1.2rem;
  max-width: 600px;
  margin: 0 auto;
  line-height: 1.6;
`;

const BentoGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 24px;
  
  @media (min-width: 1024px) {
    grid-template-columns: repeat(3, 1fr);
    grid-template-rows: repeat(2, auto);
  }
`;

const Card = styled(motion.div)<{ $large?: boolean }>`
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.05);
  padding: 32px;
  border-radius: 24px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  backdrop-filter: blur(20px);
  transition: all 0.4s ease;
  position: relative;
  overflow: hidden;
  
  ${props => props.$large && `
    @media (min-width: 1024px) {
      grid-column: span 2;
    }
  `}

  &:hover {
    transform: translateY(-5px);
    background: rgba(255, 255, 255, 0.03);
    border-color: var(--primary);
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.2);
  }

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: radial-gradient(
      800px circle at var(--mouse-x, 50%) var(--mouse-y, 50%),
      rgba(109, 40, 217, 0.15),
      transparent 40%
    );
    opacity: 0;
    transition: opacity 0.3s;
    pointer-events: none;
  }

  &:hover::before {
    opacity: 1;
  }
`;

const Emoji = styled.div`
  font-size: 4rem;
  margin-bottom: 24px;
  filter: drop-shadow(0 10px 20px rgba(0,0,0,0.2));
`;

const Text = styled.p<{ $large?: boolean }>`
  color: var(--text-secondary);
  font-size: ${props => props.$large ? '1.25rem' : '1rem'};
  line-height: 1.6;
  margin-bottom: 32px;
  font-weight: 400;
`;

const Author = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
  margin-top: auto;
`;

const Avatar = styled.div`
  width: 48px;
  height: 48px;
  border-radius: 50%;
  background: linear-gradient(135deg, var(--primary), var(--secondary));
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 700;
  color: white;
  font-size: 1.2rem;
`;

const Info = styled.div`
  display: flex;
  flex-direction: column;
`;

const Name = styled.span`
  color: var(--text-primary);
  font-weight: 600;
  font-size: 1.1rem;
`;

const Role = styled.span`
  color: var(--text-secondary);
  font-size: 0.9rem;
`;

const testimonials = [
  {
    emoji: "🚀",
    text: "Thamarai transformed our outdated website into a modern, high-performance platform. The attention to detail and animations are simply world-class.",
    name: "Alex Morgan",
    role: "CTO, TechFlow",
    initials: "AM",
    large: true
  },
  {
    emoji: "🎨",
    text: "The UI/UX design provided was exactly what we needed. Clean, intuitive, and visually stunning. Highly recommended!",
    name: "Sarah Chen",
    role: "Product Lead, DesignCo",
    initials: "SC",
    large: false
  },
  {
    emoji: "⚡",
    text: "Incredible speed and optimization. Our app load times decreased by 60% after the refactor.",
    name: "Mike Ross",
    role: "Founder, SpeedUp",
    initials: "MR",
    large: false
  },
  {
    emoji: "💎",
    text: "Professional, reliable, and incredibly talented. The mobile app development process was smooth from start to finish.",
    name: "Emily White",
    role: "Director, MobileFirst",
    initials: "EW",
    large: false
  },
  {
    emoji: "🤝",
    text: "Great communication and technical expertise. Thamarai went above and beyond to ensure our backend was scalable.",
    name: "David Kim",
    role: "VP Engineering, ScaleIt",
    initials: "DK",
    large: true
  }
];

export default function TestimonialsSection() {
  return (
    <Section id="testimonials">
      <Header
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        <Title>What People <span>Say</span></Title>
        <Subtitle>
          Feedback from clients and collaborators I've had the pleasure of working with.
        </Subtitle>
      </Header>
      
      <BentoGrid>
        {testimonials.map((item, index) => (
          <Card
            key={index}
            $large={item.large}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <Emoji>{item.emoji}</Emoji>
            <Text $large={item.large}>"{item.text}"</Text>
            <Author>
              <Avatar>{item.initials}</Avatar>
              <Info>
                <Name>{item.name}</Name>
                <Role>{item.role}</Role>
              </Info>
            </Author>
          </Card>
        ))}
      </BentoGrid>
    </Section>
  );
}
