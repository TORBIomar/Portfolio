import React from "react";

interface BrandIconProps {
  className?: string;
  size?: number;
}

export const BrandIcon: React.FC<BrandIconProps> = ({
  className = "w-6 h-6 text-black",
  size,
}) => {
  return (
    <svg
      viewBox="0 0 100 100"
      fill="currentColor"
      className={className}
      style={size ? { width: size, height: size } : undefined}
      xmlns="http://www.w3.org/2000/svg"
      aria-label="Brand Emblem"
    >
      {/* 8-spoke geometric flower inspired by Factory design mark */}
      <g transform="translate(50, 50)">
        {[0, 45, 90, 135, 180, 225, 270, 315].map((angle, idx) => (
          <g key={idx} transform={`rotate(${angle})`}>
            <path
              d="M -5.5,-40 C -8,-25 -8,-15 0,-8 C 8,-15 8,-25 5.5,-40 C 3,-45 -3,-45 -5.5,-40 Z"
              opacity="0.95"
            />
            <circle cx="0" cy="-28" r="3.2" fill="var(--background, #fcfcfc)" />
          </g>
        ))}
        <circle cx="0" cy="0" r="8.5" fill="none" stroke="currentColor" strokeWidth="3" />
        <circle cx="0" cy="0" r="3" fill="currentColor" />
      </g>
    </svg>
  );
};
