import React from 'react';
import clsx from 'clsx';
import Translate, { translate } from '@docusaurus/Translate';
import Heading from '@theme/Heading';
import { AuraBackground, Badge, Card } from '../DesignSystem';
import styles from './styles.module.css';

type FeatureItem = {
  title: string;
  Icon: React.ComponentType<React.ComponentProps<'svg'>>;
  description: JSX.Element;
  badge?: string;
  accent: 'purple' | 'green' | 'blue';
};

function ZapIcon(props: React.ComponentProps<'svg'>) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}>
      <path d="M13 2 3 14h9l-1 8 10-12h-9l1-8Z" />
    </svg>
  );
}

function TargetIcon(props: React.ComponentProps<'svg'>) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}>
      <circle cx="12" cy="12" r="10" />
      <circle cx="12" cy="12" r="6" />
      <circle cx="12" cy="12" r="2" />
    </svg>
  );
}

function CodeIcon(props: React.ComponentProps<'svg'>) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}>
      <polyline points="16 18 22 12 16 6" />
      <polyline points="8 6 2 12 8 18" />
      <line x1="14" y1="4" x2="10" y2="20" />
    </svg>
  );
}

const FeatureList: FeatureItem[] = [
  {
    title: translate({
      id: 'homepage.features.easy.title',
      message: 'Easy to Use',
      description: 'Title for the "Easy to use" feature on the homepage',
    }),
    Icon: ZapIcon,
    description: (
      <Translate
        id="homepage.features.easy.description"
        description="Description for the Easy to Use feature">
        Woofed CRM was designed to be quick to install and effortless to operate
        — your team can start managing leads in minutes, not weeks.
      </Translate>
    ),
    badge: 'fast setup',
    accent: 'purple',
  },
  {
    title: translate({
      id: 'homepage.features.focus.title',
      message: 'Focus on What Matters',
      description: 'Title for the "Focus on what matters" feature on the homepage',
    }),
    Icon: TargetIcon,
    description: (
      <Translate
        id="homepage.features.focus.description"
        description="Description for the Focus on What Matters feature">
        Pipelines, deal activities and metrics in one place — so your team can
        spend energy on relationships, not on stitching tools together.
      </Translate>
    ),
    badge: 'all-in-one',
    accent: 'blue',
  },
  {
    title: translate({
      id: 'homepage.features.openSource.title',
      message: 'Open & Self-hosted',
      description: 'Title for the Open & Self-hosted feature on the homepage',
    }),
    Icon: CodeIcon,
    description: (
      <Translate
        id="homepage.features.openSource.description"
        description="Description for the Open & Self-hosted feature">
        Run Woofed CRM on your own infrastructure. Open source, extendable, and
        powered by the same tooling your engineers already love.
      </Translate>
    ),
    badge: 'open source',
    accent: 'green',
  },
];

function Feature({ title, Icon, description, badge, accent }: FeatureItem) {
  return (
    <div className={clsx('col col--4', styles.featureCol)}>
      <Card className={styles.featureCard} flashlight>
        <div className={clsx(styles.iconBlock, styles[`iconBlock--${accent}`])}>
          <Icon className={styles.iconSvg} aria-hidden="true" focusable="false" />
        </div>
        <div className={styles.featureBody}>
          <div className={styles.featureMeta}>
            {badge && <Badge variant="mono">{badge}</Badge>}
          </div>
          <Heading as="h3" className={styles.featureTitle}>
            {title}
          </Heading>
          <p className={styles.featureDescription}>{description}</p>
        </div>
      </Card>
    </div>
  );
}

export default function HomepageFeatures(): JSX.Element {
  return (
    <section className={styles.features}>
      <AuraBackground variant="subtle" />
      <div className={clsx('container', styles.featuresContainer)}>
        <header className={styles.featuresHeader}>
          <Badge variant="mono" className={styles.featuresEyebrow}>
            <span
              className={clsx('woofed-animate-dotty', styles.eyebrowDot)}
              aria-hidden="true"
            />
            <Translate
              id="homepage.features.section.label"
              description="Eyebrow label above the homepage feature grid">
              Why Woofed CRM
            </Translate>
          </Badge>
          <Heading as="h2" className={styles.featuresTitle}>
            <Translate
              id="homepage.features.section.title"
              description="Section title above the homepage feature grid">
              Built for teams that sell with care
            </Translate>
          </Heading>
          <p className={styles.featuresSubtitle}>
            <Translate
              id="homepage.features.section.subtitle"
              description="Section subtitle above the homepage feature grid">
              A documentation hub for the open source CRM that puts pipelines,
              automations, and clarity together.
            </Translate>
          </p>
        </header>
        <div className={clsx('row', styles.featureRow)}>
          {FeatureList.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}
