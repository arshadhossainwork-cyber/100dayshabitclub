import BackgroundSystem from './BackgroundSystem';
import HeroSection from './HeroSection';
import ProductDemo from './ProductDemo';
import HabitsShowcase from './HabitsShowcase';
import SocialProof from './SocialProof';
import HowItWorks from './HowItWorks';
import QuoteCarousel from './QuoteCarousel';
import FinalCTA from './FinalCTA';
import styles from './EmptyState.module.css';

export default function EmptyState({ onAddClick, onAddHabit }) {
  return (
    <div className={styles.landing} data-landing="">
      <BackgroundSystem />
      <div className={styles.content}>
        <HeroSection onAddClick={onAddClick} />
        <ProductDemo />
        <HabitsShowcase onAddClick={onAddClick} onAddHabit={onAddHabit} />
        <SocialProof />
        <HowItWorks />
        <QuoteCarousel />
        <FinalCTA onAddClick={onAddClick} />
      </div>
    </div>
  );
}
