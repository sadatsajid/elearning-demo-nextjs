export interface CourseItem {
  title: string;
  duration: string;
  preview?: boolean;
}

export interface CourseSection {
  title: string;
  lectures: number;
  duration: string;
  items: CourseItem[];
}

export interface Course {
  id: number;
  title: string;
  instructor: string;
  rating: number;
  reviews: number;
  price: number;
  originalPrice: number;
  image: string;
  tag?: string;
  category: string;
  level: string;
  duration: string;
  lastUpdated: string;
  students: number;
  description: string;
  language: string;
  subtitles: string[];
  requirements: string[];
  fullDescription: string;
  whatYouWillLearn: string[];
  courseContent: CourseSection[];
  includes: string[];
}
