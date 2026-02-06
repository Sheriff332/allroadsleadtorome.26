
import { FlowchartStep } from './types';

export const FLOWCHART_STEPS: Record<string, FlowchartStep> = {
  start: {
    id: 'start',
    question: "Do you want me to be your valentine?",
    position: { x: 0, y: 0 },
    options: [
      { label: "Yes", next: 'success', variant: 'primary' },
      { label: "Yes but not you", next: 'not_you', variant: 'secondary' },
      { label: "No", next: 'have_plans', variant: 'danger' }
    ]
  },
  not_you: {
    id: 'not_you',
    question: "BLASPHEMY",
    description: "How could you even suggest such a thing?",
    position: { x: 450, y: -250 },
    options: [
      { label: "Acceptance", next: 'success', variant: 'primary' }
    ]
  },
  have_plans: {
    id: 'have_plans',
    question: "Do you have plans?",
    position: { x: 450, y: 250 },
    options: [
      { label: "Yes", next: 'priority', variant: 'primary' },
      { label: "No (I'm free)", next: 'rotting', variant: 'secondary' }
    ]
  },
  priority: {
    id: 'priority',
    question: "Valentine's Day takes priority",
    description: "Clear your schedule. This is more important.",
    position: { x: 900, y: 150 },
    options: [
      { label: "Continue", next: 'success', variant: 'primary' }
    ]
  },
  rotting: {
    id: 'rotting',
    question: "Do you enjoy rotting in silence?",
    position: { x: 900, y: 400 },
    options: [
      { label: "Yes", next: 'lies', variant: 'danger' },
      { label: "No", next: 'reconsider', variant: 'primary' }
    ]
  },
  lies: {
    id: 'lies',
    question: "LIES",
    description: "I knew you were going to click that.",
    position: { x: 450, y: 600 },
    options: [
      { label: "Try again", next: 'start', variant: 'primary' }
    ]
  },
  reconsider: {
    id: 'reconsider',
    question: "Would you like to reconsider?",
    position: { x: 1350, y: 400 },
    options: [
      { label: "Yes", next: 'success', variant: 'primary' },
      { label: "No (I'm Broke)", next: 'have_job', variant: 'secondary' }
    ]
  },
  have_job: {
    id: 'have_job',
    question: "Do you have a job?",
    position: { x: 1800, y: 400 },
    options: [
      { label: "Yes", next: 'true_love', variant: 'primary' },
      { label: "No", next: 'lies', variant: 'danger' }
    ]
  },
  true_love: {
    id: 'true_love',
    question: "Valentine's is not about spending anyway...",
    description: "It's about celebrating true love. Money doesn't matter.",
    position: { x: 2250, y: 400 },
    options: [
      { label: "Continue", next: 'resources', variant: 'primary' }
    ]
  },
  resources: {
    id: 'resources',
    question: "Now you have the time, resources and want to make me your valentine...",
    position: { x: 2700, y: 400 },
    options: [
      { label: "Reconsider?", next: 'reconsider', variant: 'primary' }
    ]
  },
  success: {
    id: 'success',
    question: "YAY! Happy Valentine's Day! ❤️",
    description: "I knew you couldn't resist. Let's make it a day to remember!",
    position: { x: 1350, y: -100 },
    options: [
      { label: "Start Over", next: 'start', variant: 'secondary' }
    ]
  }
};
