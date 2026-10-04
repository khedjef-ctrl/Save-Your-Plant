export interface DiagnosisResult {
  cause: string;
  fix: string;
  prevent: string;
  severity: 'low' | 'moderate' | 'critical';
  recoveryTimeDays: number;
}

export interface FixCard {
  id: string;
  title: string;
  category: 'watering' | 'light' | 'pests' | 'nutrition';
  symptom: string;
  primaryCause: string;
  emergencyStep: string;
  dayByDayGuide: string[];
  preventionRule: string;
  affectedPlants: string[];
}

export interface RescueDayStep {
  day: number;
  title: string;
  objective: string;
  actionItems: string[];
  proTip: string;
}

export interface PricingTier {
  id: 'starter' | 'pro' | 'ultimate';
  name: string;
  price: number;
  badge?: string;
  popular?: boolean;
  description: string;
  features: string[];
  ctaText: string;
}

export interface Testimonial {
  quote: string;
  author: string;
  plantSaved: string;
  recoveryDays: number;
  location: string;
}
