'use client';

import { useState, useEffect } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { Quote } from 'lucide-react';

const Container = styled.div`
  max-width: 800px;
  margin: 0 auto;
  text-align: center;
  padding: 40px 24px;
  position: relative;
  min-height: 200px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const QuoteIcon = styled.div`
  color: var(--primary);
  margin-bottom: 24px;
  opacity: 0.5;
`;

const QuoteText = styled(motion.p)`
  font-size: 1.5rem;
  font-weight: 500;
  color: var(--text-primary);
  line-height: 1.6;
  margin-bottom: 16px;
  font-family: serif; // Optional: for a more "quote-like" feel
`;

const Author = styled(motion.span)`
  font-size: 1rem;
  color: var(--text-secondary);
  font-weight: 400;
  display: block;
`;

const quotes = [
  { text: "First, solve the problem. Then, write the code.", author: "John Johnson" },
  { text: "If you don’t take risks, you can’t create a future.", author: "Luffy" },
  { text: "A real pro never stops trying new things.", author: "Jiraiya" },
  { text: "Knowledge is power.", author: "Francis Bacon" },
  { text: "Sometimes the only way to go forward is to rewrite the plan.", author: "Michael Scott" },
  { text: "Code is like humor. When you have to explain it, it’s bad.", author: "Cory House" },
  { text: "Make it simple, but significant.", author: "Don Draper" },
];

export default function QuoteCarousel() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % quotes.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <Container>
      <QuoteIcon>
        <Quote size={40} />
      </QuoteIcon>
      <AnimatePresence mode="wait">
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.5 }}
        >
          <QuoteText>
            "{quotes[index].text}"
          </QuoteText>
          <Author>- {quotes[index].author}</Author>
        </motion.div>
      </AnimatePresence>
    </Container>
  );
}
