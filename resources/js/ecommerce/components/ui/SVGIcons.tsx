import React from 'react';

export const CrownLogo = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/0000/svg" className={className}>
    <path d="M2 19C2 20.1046 2.89543 21 4 21H20C21.1046 21 22 20.1046 22 19V17H2V19Z" fill="currentColor" opacity="0.3"/>
    <path d="M2 15L4 5L9 11L12 3L15 11L20 5L22 15H2Z" fill="currentColor" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

// Simple SVG vector illustrated faces
export const DogIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/0000/svg" className={className}>
    <circle cx="50" cy="50" r="50" fill="#FDE68A" />
    <path d="M25 40C25 40 30 20 40 25C40 25 35 45 25 40Z" fill="#D97706" />
    <path d="M75 40C75 40 70 20 60 25C60 25 65 45 75 40Z" fill="#D97706" />
    <ellipse cx="50" cy="55" rx="35" ry="30" fill="#FBBF24" />
    <ellipse cx="50" cy="65" rx="20" ry="15" fill="#FFFBEB" />
    <circle cx="35" cy="50" r="4" fill="#1F2937" />
    <circle cx="65" cy="50" r="4" fill="#1F2937" />
    <ellipse cx="50" cy="60" rx="8" ry="5" fill="#1F2937" />
    <path d="M50 65C50 65 45 72 50 72C55 72 50 65 50 65Z" fill="#EF4444" />
  </svg>
);

export const CatIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/0000/svg" className={className}>
    <circle cx="50" cy="50" r="50" fill="#E0E7FF" />
    <path d="M30 50L20 20L50 40L30 50Z" fill="#93C5FD" />
    <path d="M70 50L80 20L50 40L70 50Z" fill="#93C5FD" />
    <circle cx="50" cy="55" r="30" fill="#BFDBFE" />
    <circle cx="40" cy="50" r="4" fill="#1E3A8A" />
    <circle cx="60" cy="50" r="4" fill="#1E3A8A" />
    <path d="M45 60C45 60 50 65 55 60" stroke="#1E3A8A" strokeWidth="2" strokeLinecap="round" />
    <ellipse cx="50" cy="56" rx="4" ry="3" fill="#F472B6" />
  </svg>
);

export const BirdIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/0000/svg" className={className}>
    <circle cx="50" cy="50" r="50" fill="#D1FAE5" />
    <ellipse cx="50" cy="55" rx="25" ry="30" fill="#34D399" />
    <path d="M50 40L65 50L50 60L50 40Z" fill="#FBBF24" />
    <circle cx="40" cy="45" r="3" fill="#064E3B" />
    <path d="M25 55C25 55 15 45 20 65C20 65 30 65 35 55" fill="#10B981" />
  </svg>
);

export const FishIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/0000/svg" className={className}>
    <circle cx="50" cy="50" r="50" fill="#FFE4E6" />
    <ellipse cx="55" cy="50" rx="30" ry="20" fill="#FB7185" />
    <path d="M25 50L10 35V65L25 50Z" fill="#F43F5E" />
    <path d="M55 30C55 30 65 20 70 30" fill="#F43F5E" />
    <circle cx="70" cy="45" r="3" fill="#881337" />
    <path d="M75 55C75 55 80 50 80 55C80 60 75 55 75 55Z" fill="#881337" />
  </svg>
);

export const RabbitIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/0000/svg" className={className}>
    <circle cx="50" cy="50" r="50" fill="#F3F4F6" />
    <ellipse cx="35" cy="35" rx="10" ry="25" fill="#CBD5E1" />
    <ellipse cx="65" cy="35" rx="10" ry="25" fill="#CBD5E1" />
    <ellipse cx="35" cy="35" rx="5" ry="20" fill="#F472B6" />
    <ellipse cx="65" cy="35" rx="5" ry="20" fill="#F472B6" />
    <ellipse cx="50" cy="60" rx="30" ry="25" fill="#E2E8F0" />
    <circle cx="40" cy="55" r="3" fill="#0F172A" />
    <circle cx="60" cy="55" r="3" fill="#0F172A" />
    <ellipse cx="50" cy="60" rx="4" ry="3" fill="#F472B6" />
    <path d="M45 65C45 65 50 70 55 65" stroke="#0F172A" strokeWidth="2" strokeLinecap="round" />
  </svg>
);
