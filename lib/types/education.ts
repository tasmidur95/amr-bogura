export interface EducationalInstitute {
  id: string;
  name: string;
  enName: string;
  eiin: string;
  rank?: number;
  category: 'college' | 'university' | 'medical' | 'polytechnic' | 'technical' | 'vocational' | 'school-college' | 'madrasah' | 'school' | 'kindergarten';
  categoryBn: string;
  upazila: string;
  location: string;
  established: string;
  management: string;
  educationLevel: string;
  board: string;
  coverImage: string;
  logo?: string;
  phone: string;
  email?: string;
  website?: string;
  principal?: string;
  stats: {
    appeared?: string;
    passed?: string;
    gpa5?: string;
    passRate?: string;
  };
  facilities: string[];
  courses: string[];
  shortDesc: string;
  history?: string;
  mapUrl?: string;
  isFeatured?: boolean;
  status: 'approved' | 'pending';
}

