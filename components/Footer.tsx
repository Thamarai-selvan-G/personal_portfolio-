'use client';

import styled from 'styled-components';
import { motion } from 'framer-motion';
import { Github, Linkedin, Mail, Phone, Twitter, ArrowUpRight } from 'lucide-react';

const FooterWrapper = styled.footer`
  background: rgba(0, 0, 0, 0.8);
  padding: 80px 0 40px;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  margin-top: auto;
  position: relative;
  overflow: hidden;
`;

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 24px;
`;

const TopSection = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 48px;
  margin-bottom: 64px;

  @media (min-width: 768px) {
    grid-template-columns: 2fr 1fr 1fr;
  }
`;

const BrandSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
`;

const Logo = styled.h2`
  font-size: 2rem;
  font-weight: 800;
  color: var(--text-primary);
  letter-spacing: -1px;
  
  span {
    color: var(--primary);
  }
`;

const Bio = styled.p`
  color: var(--text-secondary);
  line-height: 1.6;
  max-width: 400px;
  font-size: 1.1rem;
`;

const Column = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
`;

const ColumnTitle = styled.h3`
  color: var(--text-primary);
  font-size: 1.2rem;
  font-weight: 600;
`;

const LinkList = styled.ul`
  list-style: none;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const LinkItem = styled.li``;

const FooterLink = styled.a`
  color: var(--text-secondary);
  text-decoration: none;
  transition: all 0.2s ease;
  display: inline-flex;
  align-items: center;
  gap: 8px;

  &:hover {
    color: var(--primary);
    transform: translateX(5px);
  }
`;

const SocialLinks = styled.div`
  display: flex;
  gap: 16px;
`;

const SocialButton = styled.a`
  width: 48px;
  height: 48px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.05);
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--text-secondary);
  transition: all 0.3s ease;
  border: 1px solid rgba(255, 255, 255, 0.1);

  &:hover {
    background: var(--primary);
    color: white;
    transform: translateY(-3px);
    box-shadow: 0 10px 20px rgba(109, 40, 217, 0.3);
  }
`;

const BottomSection = styled.div`
  padding-top: 40px;
  border-top: 1px solid rgba(255, 255, 255, 0.05);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
  text-align: center;

  @media (min-width: 768px) {
    flex-direction: row;
    justify-content: space-between;
    text-align: left;
  }
`;

const Copyright = styled.p`
  color: var(--text-secondary);
  font-size: 0.9rem;
`;

const CTA = styled.div`
  background: linear-gradient(135deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.01) 100%);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 24px;
  padding: 40px;
  margin-bottom: 64px;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  gap: 24px;
  
  @media (min-width: 768px) {
    flex-direction: row;
    justify-content: space-between;
    text-align: left;
    padding: 60px;
  }
`;

const CTAText = styled.div`
  h3 {
    font-size: 2.5rem;
    font-weight: 800;
    margin-bottom: 16px;
    color: var(--text-primary);
  }
  p {
    color: var(--text-secondary);
    font-size: 1.1rem;
    max-width: 500px;
  }
`;

const CTAButton = styled(motion.a)`
  background: var(--primary);
  color: white;
  padding: 16px 32px;
  border-radius: 100px;
  font-weight: 600;
  font-size: 1.1rem;
  display: inline-flex;
  align-items: center;
  gap: 12px;
  transition: all 0.3s ease;

  &:hover {
    transform: scale(1.05);
    box-shadow: 0 0 30px rgba(109, 40, 217, 0.5);
  }
`;

export default function Footer() {
  return (
    <FooterWrapper>
      <Container>
        <CTA>
          <CTAText>
            <h3>Let's work together</h3>
            <p>Have a project in mind? Let's build something extraordinary together.</p>
          </CTAText>
          <CTAButton 
            href="#contact"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Get in Touch <ArrowUpRight size={20} />
          </CTAButton>
        </CTA>

        <TopSection>
          <BrandSection>
            <Logo>Thamarai selvan<span>.</span></Logo>
            <Bio>
              A passionate Full Stack Developer crafting digital experiences with modern technologies and creative design.
            </Bio>
            <SocialLinks>
              <SocialButton href="https://github.com" target="_blank" aria-label="GitHub">
                <Github size={20} />
              </SocialButton>
              <SocialButton href="https://www.linkedin.com/in/thamaraiselvan08" target="_blank" aria-label="LinkedIn">
                <Linkedin size={20} />
              </SocialButton>
              <SocialButton href="https://twitter.com" target="_blank" aria-label="Twitter">
                <Twitter size={20} />
              </SocialButton>
              <SocialButton href="mailto:thamaraiselvan878@gmail.com" aria-label="Email">
                <Mail size={20} />
              </SocialButton>
            </SocialLinks>
          </BrandSection>

          <Column>
            <ColumnTitle>Quick Links</ColumnTitle>
            <LinkList>
              <LinkItem><FooterLink href="#about">About</FooterLink></LinkItem>
              <LinkItem><FooterLink href="#services">Services</FooterLink></LinkItem>
              <LinkItem><FooterLink href="#projects">Projects</FooterLink></LinkItem>
              <LinkItem><FooterLink href="#testimonials">Testimonials</FooterLink></LinkItem>
            </LinkList>
          </Column>

          <Column>
            <ColumnTitle>Contact</ColumnTitle>
            <LinkList>
              <LinkItem>
                <FooterLink href="mailto:thamaraiselvan878@gmail.com">
                  <Mail size={16} /> thamaraiselvan878@gmail.com
                </FooterLink>
              </LinkItem>
              <LinkItem>
                <FooterLink href="tel:8220494482">
                  <Phone size={16} /> +91 82204 94482
                </FooterLink>
              </LinkItem>
            </LinkList>
          </Column>
        </TopSection>

        <BottomSection>
          <Copyright>
            © {new Date().getFullYear()} Thamarai Selvan. All rights reserved.
          </Copyright>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
            Designed & Built with Thamarai selvan❤️
          </p>
        </BottomSection>
      </Container>
    </FooterWrapper>
  );
}
