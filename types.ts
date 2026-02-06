
export type StepId = 
  | 'start' 
  | 'not_you' 
  | 'have_plans' 
  | 'priority' 
  | 'rotting' 
  | 'lies' 
  | 'reconsider' 
  | 'have_job' 
  | 'true_love' 
  | 'resources' 
  | 'success';

export interface Option {
  label: string;
  next: StepId;
  variant?: 'primary' | 'secondary' | 'danger';
}

export interface FlowchartStep {
  id: StepId;
  question: string;
  description?: string;
  options: Option[];
  image?: string;
  position: { x: number; y: number };
}
