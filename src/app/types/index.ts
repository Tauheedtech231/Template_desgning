export interface College {
  id: string;
  name: string;
  description: string;
  logo?: string;
  coverImage?: string;
  contact: {
    email: string;
    phone: string;
    address: string;
  };
}

export interface Faculty {
  id: string;
  name: string;
  position: string;
  department: string;
  image?: string;
  bio: string;
  email: string;
}

export interface Event {
  id: string;
  title: string;
  description: string;
  date: string;
  image?: string;
  location: string;
  type: 'event' | 'announcement';
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  date: string;
  image?: string;
  category: 'award' | 'certificate' | 'recognition';
}

export interface Course {
  id: string;
  name: string;
  description: string;
  duration: string;
  department: string;
  image?: string;
  syllabus?: string;
  feeStructure?: string;
  credits: number;
}

export interface PortfolioData {
  college: College;
  about: {
    description: string;
    mission: string;
    vision: string;
    faculty: Faculty[];
  };
  events: Event[];
  gallery: Achievement[];
  courses: Course[];
}

export type SectionType = 'about' | 'events' | 'gallery' | 'courses';