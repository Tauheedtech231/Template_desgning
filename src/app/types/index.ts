export interface CollegeInfo {
  name: string;
  tagline: string;
  description: string;
  programs: Program[];
  events: Event[];
  faculty: FacultyMember[];
  gallery: GalleryImage[];
  contact: ContactInfo;
}

export interface Program {
  id: string;
  title: string;
  description: string;
  duration: string;
  degree: string;
  icon: string;
}

export interface Event {
  id: string;
  title: string;
  description: string;
  date: string;
  time: string;
  location: string;
  image: string;
}

export interface FacultyMember {
  id: string;
  name: string;
  position: string;
  department: string;
  bio: string;
  image: string;
  qualifications: string[];
}

export interface GalleryImage {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  category: string;
}

export interface ContactInfo {
  address: string;
  phone: string;
  email: string;
  socialMedia: {
    facebook?: string;
    twitter?: string;
    instagram?: string;
    linkedin?: string;
  };
}