import React from 'react';
import clsx from 'clsx';
import styles from './styles.module.css';

/**
 * Reusable building blocks that mirror the Woofed design system
 * (cards, badges, gradient text, aura backgrounds). These compose with
 * Docusaurus + MDX so docs can opt into the visual language without
 * losing native Markdown features.
 */

type AuraBackgroundProps = {
  variant?: 'default' | 'dense' | 'subtle';
  className?: string;
};

export function AuraBackground({
  variant = 'default',
  className,
}: AuraBackgroundProps): JSX.Element {
  return (
    <div
      aria-hidden="true"
      className={clsx(styles.auraWrap, styles[`auraWrap--${variant}`], className)}
    >
      <div className={clsx(styles.gridLayer, 'woofed-bg-grid')} />
      <span
        className={clsx(
          'woofed-aura-blob woofed-aura-blob--a woofed-animate-aura',
          styles.auraA,
        )}
      />
      <span
        className={clsx(
          'woofed-aura-blob woofed-aura-blob--b woofed-animate-aura',
          styles.auraB,
        )}
      />
      {variant !== 'subtle' && (
        <span
          className={clsx(
            'woofed-aura-blob woofed-aura-blob--c woofed-animate-aura',
            styles.auraC,
          )}
        />
      )}
      {variant === 'dense' && (
        <span
          className={clsx(
            'woofed-aura-blob woofed-aura-blob--d woofed-animate-aura',
            styles.auraD,
          )}
        />
      )}
    </div>
  );
}

type GradientTextProps = {
  as?: keyof JSX.IntrinsicElements;
  children: React.ReactNode;
  className?: string;
};

export function GradientText({
  as: Tag = 'span',
  children,
  className,
}: GradientTextProps): JSX.Element {
  return (
    <Tag className={clsx('woofed-gradient-text', className)}>{children}</Tag>
  );
}

type BadgeProps = {
  children: React.ReactNode;
  variant?: 'default' | 'success' | 'info' | 'danger' | 'mono';
  className?: string;
};

export function Badge({
  children,
  variant = 'default',
  className,
}: BadgeProps): JSX.Element {
  const variantClass = variant === 'default' ? '' : `woofed-badge--${variant}`;
  return (
    <span className={clsx('woofed-badge', variantClass, className)}>
      {children}
    </span>
  );
}

type CardProps = {
  children: React.ReactNode;
  className?: string;
  flashlight?: boolean;
  onMouseMove?: React.MouseEventHandler<HTMLDivElement>;
};

export function Card({
  children,
  className,
  flashlight = false,
  onMouseMove,
}: CardProps): JSX.Element {
  const handleMouseMove: React.MouseEventHandler<HTMLDivElement> = (event) => {
    if (flashlight) {
      const target = event.currentTarget;
      const rect = target.getBoundingClientRect();
      target.style.setProperty('--mx', `${event.clientX - rect.left}px`);
      target.style.setProperty('--my', `${event.clientY - rect.top}px`);
    }
    onMouseMove?.(event);
  };

  return (
    <div
      className={clsx('woofed-card', flashlight && 'woofed-flashlight', className)}
      onMouseMove={handleMouseMove}
    >
      {children}
    </div>
  );
}

type IconCircleProps = {
  children: React.ReactNode;
  className?: string;
};

export function IconCircle({ children, className }: IconCircleProps): JSX.Element {
  return <span className={clsx('woofed-icon-circle', className)}>{children}</span>;
}
