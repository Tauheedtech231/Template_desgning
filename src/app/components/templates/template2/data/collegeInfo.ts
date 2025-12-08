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

// Default placeholder data - In production, this would come from localStorage/API
export const defaultCollegeInfo: CollegeInfo = {
  name: "Kips College",
  tagline: "Excellence in Intermediate Education, Foundation for Future Success",
  description: "A premier intermediate college dedicated to academic excellence and comprehensive student development. We provide strong foundations for higher education through quality teaching and modern learning experiences.",
  
  programs: [
    {
      id: "1",
      title: "Pre-Medical",
      description: "Comprehensive program in Biology, Chemistry, and Physics preparing students for medical fields.",
      duration: "2 years",
      degree: "F.Sc Pre-Medical",
      icon: "🧬"
    },
    {
      id: "2",
      title: "Pre-Engineering",
      description: "Rigorous program in Mathematics, Physics, and Chemistry for engineering aspirants.",
      duration: "2 years",
      degree: "F.Sc Pre-Engineering",
      icon: "⚡"
    },
    {
      id: "3",
      title: "Computer Science",
      description: "Modern curriculum covering programming, IT, and computer applications.",
      duration: "2 years",
      degree: "F.Sc Computer Science",
      icon: "💻"
    },
    {
      id: "4",
      title: "Commerce",
      description: "Comprehensive business education with accounting, economics, and business studies.",
      duration: "2 years",
      degree: "I.Com",
      icon: "📊"
    }
  ],

  events: [
    {
      id: "1",
      title: "Annual Science Exhibition",
      description: "Showcasing innovative science projects and experiments by our students.",
      date: "2024-03-15",
      time: "10:00 AM",
      location: "College Science Block",
      image: "https://images.unsplash.com/photo-1532094349884-543bc11b234d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
    },
    {
      id: "2",
      title: "Career Guidance Seminar",
      description: "Expert guidance on career choices and higher education opportunities.",
      date: "2024-03-20",
      time: "2:00 PM",
      location: "College Auditorium",
      image: "https://images.unsplash.com/photo-1553877522-43269d4ea984?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
    },
    {
      id: "3",
      title: "Sports Gala 2024",
      description: "Annual inter-class sports competition and athletic events.",
      date: "2024-03-25",
      time: "9:00 AM",
      location: "College Sports Ground",
      image: "https://images.unsplash.com/photo-1546519638-68e109498ffc?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
    }
  ],

  faculty: [
    {
      id: "1",
      name: "Dr. Ahmed Raza",
      position: "Senior Physics Professor",
      department: "Pre-Engineering",
      bio: "Expert in Physics with 12 years of teaching experience, specializing in modern physics concepts.",
      image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
      qualifications: ["M.Phil Physics", "MSc Physics", "BEd"]
    },
    {
      id: "2",
      name: "Dr. Saima Khan",
      position: "Biology Department Head",
      department: "Pre-Medical",
      bio: "Specialized in Biology and Biochemistry with extensive experience in medical entrance preparation.",
      image: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
      qualifications: ["PhD Biology", "MSc Zoology", "BEd"]
    },
    {
      id: "3",
      name: "Mr. Ali Hassan",
      position: "Computer Science Coordinator",
      department: "Computer Science",
      bio: "IT expert with industry experience, focusing on programming and computer applications.",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
      qualifications: ["MSc Computer Science", "CCNA Certified", "Web Development Expert"]
    }
  ],

  gallery: [
    {
      id: "1",
      title: "Modern Campus",
      description: "Our state-of-the-art college building and infrastructure",
      imageUrl: "https://images.unsplash.com/photo-1562774053-701939374585?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
      category: "campus"
    },
    {
      id: "2",
      title: "Science Laboratories",
      description: "Well-equipped labs for Physics, Chemistry, and Biology",
      imageUrl: "https://images.unsplash.com/photo-1532094349884-543bc11b234d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
      category: "facilities"
    },
    {
      id: "3",
      title: "Computer Lab",
      description: "Modern computer lab with latest technology",
      imageUrl: "https://images.unsplash.com/photo-1592424002053-21fccadb2a1c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
      category: "facilities"
    },
    {
      id: "4",
      title: "Library",
      description: "Well-stocked library with vast collection of books",
      imageUrl: "https://images.unsplash.com/photo-1521587760476-6c12a4b040da?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
      category: "facilities"
    },
    {
      id: "5",
      title: "Annual Function",
      description: "Cultural events and annual celebrations",
      imageUrl: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
      category: "events"
    },
    {
      id: "6",
      title: "Sports Activities",
      description: "Students participating in various sports",
      imageUrl: "https://images.unsplash.com/photo-1546519638-68e109498ffc?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
      category: "student-life"
    }
  ],

  contact: {
    address: "123 College Road, Main Boulevard, Lahore, Pakistan",
    phone: "+92 42 123 4567",
    email: "admissions@kips.edu.pk",
    socialMedia: {
      facebook: "https://facebook.com/kipscollege",
      twitter: "https://twitter.com/kips_college",
      instagram: "https://instagram.com/kips.college",
      linkedin: "https://linkedin.com/school/kips-college"
    }
  }
};