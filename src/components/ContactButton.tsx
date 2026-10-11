import React from 'react';

export const DEFAULT_WHATSAPP_URL =
  'https://wa.me/201558082474?text=Hello%20SPARK%20Agency!%20I%27d%20like%20to%20discuss%20a%20project.';

interface ContactButtonProps {
  onClick?: (e?: React.MouseEvent) => void;
  className?: string;
  label?: string;
  href?: string;
  target?: string;
}

export const ContactButton: React.FC<ContactButtonProps> = ({
  onClick,
  className = '',
  label = "LET'S TALK",
  href = DEFAULT_WHATSAPP_URL,
  target = '_blank',
}) => {
  const buttonStyle: React.CSSProperties = {
    background: 'linear-gradient(123deg, #1C1200 0%, #D97706 32%, #F59E0B 62%, #FBBF24 85%, #FEF08A 100%)',
    boxShadow: '0px 4px 14px rgba(245, 158, 11, 0.35), inset 2px 2px 10px #D97706',
    outline: '2px solid #FFFFFF',
    outlineOffset: '-3px',
  };

  const sharedClasses = `inline-flex items-center justify-center rounded-full text-white font-heading font-bold uppercase tracking-wider cursor-pointer transition-all duration-300 hover:scale-105 active:scale-95 select-none px-8 py-3 sm:px-10 sm:py-3.5 md:px-12 md:py-4 text-xs sm:text-sm md:text-base ${className}`;

  return (
    <a
      href={href}
      target={target}
      rel="noopener noreferrer"
      style={buttonStyle}
      className={sharedClasses}
      onClick={(e) => {
        if (onClick) {
          onClick(e);
        }
      }}
    >
      {label}
    </a>
  );
};
