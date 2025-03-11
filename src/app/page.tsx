'use client';

import { useEffect, useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import Header from '@/components/Header';
import Link from 'next/link';
import Image from 'next/image';

// Sample course data
const featuredCourses = [
  {
    id: 1,
    title: 'Complete Web Development Bootcamp',
    instructor: 'Sarah Johnson',
    rating: 4.8,
    reviews: 1254,
    price: 12.99,
    originalPrice: 89.99,
    image: '/api/placeholder/400/2778464.jpg',
    tag: 'Bestseller'
  },
  {
    id: 2,
    title: 'Modern JavaScript for Beginners',
    instructor: 'Michael Chen',
    rating: 4.6,
    reviews: 842,
    price: 9.99,
    originalPrice: 59.99,
    image: '/api/placeholder/400/13513523.jpg'
  },
  {
    id: 3,
    title: 'Advanced React & Redux Techniques',
    instructor: 'Alex Rodriguez',
    rating: 4.9,
    reviews: 976,
    price: 14.99,
    originalPrice: 94.99,
    image: '/api/placeholder/400/2778464.jpg',
    tag: 'Highest Rated'
  },
  {
    id: 4,
    title: 'Mastering TypeScript',
    instructor: 'Emily Parker',
    rating: 4.7,
    reviews: 621,
    price: 11.99,
    originalPrice: 74.99,
    image: '/api/placeholder/400/13513523.jpg'
  }
];

// Popular topic categories
const categories = [
  'Web Development', 'JavaScript', 'React', 'Next.js',
  'TypeScript', 'Node.js', 'CSS', 'HTML', 'Full Stack',
  'Front End', 'Back End', 'API Development'
];

export default function HomePage() {
  const { user, isLoading, isAdmin } = useAuth();
  const router = useRouter();
  const [mounted, setMounted] = useState(false);

  // Set mounted after initial render for animations
  useEffect(() => {
    setMounted(true);
  }, []);

  // Redirect authenticated users to their appropriate dashboard
  useEffect(() => {
    if (!isLoading && user) {
      if (isAdmin) {
        router.push('/admin');
      } else {
        router.push('/profile');
      }
    }
  }, [user, isLoading, isAdmin, router]);

  // Star Rating Component
  const StarRating = ({ rating }: { rating: number }) => {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;

    return (
      <div className="flex items-center">
        {[...Array(5)].map((_, i) => (
          <svg key={i} className={`w-4 h-4 ${i < fullStars ? 'text-yellow-400' : (i === fullStars && hasHalfStar ? 'text-yellow-400' : 'text-gray-300')}`} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
        ))}
        <span className="ml-1 text-sm font-semibold text-gray-700">{rating}</span>
        <span className="ml-1 text-sm text-gray-500">({Math.floor(Math.random() * 1000) + 100})</span>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-white">
      <Header />

      {/* Hero Section */}
      <div className="relative bg-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20">
          <div className="md:flex items-center">
            <div className={`md:w-1/2 z-10 md:pr-12 
              ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}
              transition-all duration-700 ease-out`}>
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 leading-tight">
                Always something new to learn
              </h1>
              <p className="mt-4 text-lg text-gray-700">
                With courses added regularly to our catalog, you can gain access to the latest skills. Special offer: all courses from $9.99 ends today!
              </p>
              <div className="mt-8">
                <Link
                  href="/"
                  className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded text-white bg-indigo-600 hover:bg-indigo-700 transition-all duration-300"
                >
                  Browse Courses
                </Link>
              </div>
            </div>
            <div className={`md:w-1/2 mt-8 md:mt-0 
              ${mounted ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}
              transition-all duration-700 delay-200 ease-out`}>
              <div className="relative rounded-lg overflow-hidden shadow-xl">
                <Image
                  src="/api/placeholder/600/homepage-banner.jpg"
                  alt="Student learning online"
                  width={600}
                  height={400}
                  className="w-full h-auto"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Categories Section */}
      <div className="bg-gray-50 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-8">All the skills you need in one place</h2>
          <p className="text-lg text-gray-600 mb-8">From essential skills to technical topics, our platform supports your professional development.</p>

          <div className="flex overflow-x-auto pb-4 -mx-4 px-4 space-x-4 scrollbar-hide">
            {categories.map((category, index) => (
              <Link
                key={index}
                href={`/category/${category.toLowerCase().replace(/\s+/g, '-')}`}
                className={`whitespace-nowrap px-5 py-2 rounded-full text-sm font-medium 
                  ${index === 0 ? 'bg-gray-900 text-white' : 'bg-gray-200 text-gray-800 hover:bg-gray-300'} 
                  transition-all duration-300`}
              >
                {category}
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Featured Courses */}
      <div className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-8">Featured Courses</h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredCourses.map((course, index) => (
              <div
                key={course.id}
                className={`border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg transition-shadow duration-300
                  ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}
                  transition-all duration-500 ease-out`}
                style={{ transitionDelay: `${150 * index}ms` }}
              >
                <div className="relative">
                  <Image
                    src={course.image}
                    alt={course.title}
                    width={400}
                    height={225}
                    className="w-full h-40 object-cover"
                  />
                  {course.tag && (
                    <span className="absolute top-2 left-2 bg-yellow-100 text-yellow-800 text-xs font-semibold px-2 py-1 rounded">
                      {course.tag}
                    </span>
                  )}
                </div>
                <div className="p-4">
                  <h3 className="text-gray-600 font-semibold text-lg mb-1 line-clamp-2">{course.title}</h3>
                  <p className="text-sm text-gray-600 mb-2">{course.instructor}</p>
                  <StarRating rating={course.rating} />
                  <div className="mt-2 flex items-center">
                    <span className="text-gray-600 font-bold text-lg">${course.price}</span>
                    <span className="ml-2 text-gray-500 line-through text-sm">${course.originalPrice}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-10 text-center">
            <Link
              href="/"
              className="inline-flex items-center px-6 py-3 border border-gray-300 shadow-sm text-base font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              View all courses
            </Link>
          </div>
        </div>
      </div>

      {/* Testimonials Section */}
      <div className="bg-gray-900 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl font-bold text-white mb-8">What our students say</h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[1, 2, 3].map((item) => (
              <div
                key={item}
                className={`bg-gray-800 p-6 rounded-lg 
                  ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}
                  transition-all duration-700 ease-out`}
                style={{ transitionDelay: `${200 * item}ms` }}
              >
                <div className="flex justify-center mb-4">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} className="w-5 h-5 text-yellow-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <p className="text-white italic mb-4">"This platform transformed how I approach learning. The courses are comprehensive and the instructors are top-notch."</p>
                <p className="text-indigo-300 font-semibold">- Student Name</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-indigo-700 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl font-bold text-white mb-4">Ready to start learning?</h2>
          <p className="text-indigo-100 mb-8 max-w-2xl mx-auto">Join thousands of students already learning on our platform. Get unlimited access to all courses.</p>

          <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
            <Link
              href="/register"
              className="inline-flex justify-center items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-indigo-700 bg-white hover:bg-gray-50 transition-colors duration-300"
            >
              Sign up for free
            </Link>
            <Link
              href="/"
              className="inline-flex justify-center items-center px-6 py-3 border border-white text-base font-medium rounded-md text-white hover:bg-indigo-800 transition-colors duration-300"
            >
              Browse courses
            </Link>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-100 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider">Platform</h3>
              <ul className="mt-4 space-y-4">
                <li><Link href="#" className="text-base text-gray-600 hover:text-gray-900">About us</Link></li>
                <li><Link href="#" className="text-base text-gray-600 hover:text-gray-900">Contact us</Link></li>
                <li><Link href="#" className="text-base text-gray-600 hover:text-gray-900">Careers</Link></li>
                <li><Link href="#" className="text-base text-gray-600 hover:text-gray-900">Blog</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider">Courses</h3>
              <ul className="mt-4 space-y-4">
                <li><Link href="#" className="text-base text-gray-600 hover:text-gray-900">Web Development</Link></li>
                <li><Link href="#" className="text-base text-gray-600 hover:text-gray-900">JavaScript</Link></li>
                <li><Link href="#" className="text-base text-gray-600 hover:text-gray-900">React</Link></li>
                <li><Link href="#" className="text-base text-gray-600 hover:text-gray-900">Node.js</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider">Support</h3>
              <ul className="mt-4 space-y-4">
                <li><Link href="#" className="text-base text-gray-600 hover:text-gray-900">Help center</Link></li>
                <li><Link href="#" className="text-base text-gray-600 hover:text-gray-900">Pricing</Link></li>
                <li><Link href="#" className="text-base text-gray-600 hover:text-gray-900">Terms of service</Link></li>
                <li><Link href="#" className="text-base text-gray-600 hover:text-gray-900">Privacy policy</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider">Stay connected</h3>
              <p className="mt-4 text-base text-gray-600">Subscribe to our newsletter for latest updates.</p>
              <div className="mt-4">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                />
                <button className="mt-2 w-full inline-flex justify-center items-center px-4 py-2 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700">
                  Subscribe
                </button>
              </div>
            </div>
          </div>
          <div className="mt-12 border-t border-gray-200 pt-8">
            <p className="text-base text-gray-400 text-center">&copy; 2025 E-Learning Platform. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}