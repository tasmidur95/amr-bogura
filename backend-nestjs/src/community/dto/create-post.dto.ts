export class CreatePostDto {
  category: 'blood' | 'tuition' | 'rent' | 'jobs' | 'business';
  name: string;
  group?: string;
  role?: string;
  badge?: string;
  upazila: string;
  detail: string;
  phone: string;
}

