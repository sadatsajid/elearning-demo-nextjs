'use client';

import { useState, useEffect } from 'react';
import Header from '@/components/Header';
import Image from 'next/image';
import Link from 'next/link';

// Sample course data - in a real app, this would come from an API
const allCourses = [
  {
    id: 1,
    title: 'Complete Web Development Bootcamp',
    instructor: 'Sarah Johnson',
    rating: 4.8,
    reviews: 1254,
    price: 12.99,
    originalPrice: 89.99,
    image: '/api/placeholder/400/2778464.jpg',
    tag: 'Bestseller',
    category: 'Web Development',
    level: 'All Levels',
    duration: '15.5 hours',
    lastUpdated: '01/2025'
  },
  {
    id: 2,
    title: 'Modern JavaScript for Beginners',
    instructor: 'Michael Chen',
    rating: 4.6,
    reviews: 842,
    price: 9.99,
    originalPrice: 59.99,
    image: '/api/placeholder/400/13513523.jpg',
    category: 'JavaScript',
    level: 'Beginner',
    duration: '12 hours',
    lastUpdated: '02/2025'
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
    tag: 'Highest Rated',
    category: 'React',
    level: 'Advanced',
    duration: '18 hours',
    lastUpdated: '03/2025'
  },
  {
    id: 4,
    title: 'Mastering TypeScript',
    instructor: 'Emily Parker',
    rating: 4.7,
    reviews: 621,
    price: 11.99,
    originalPrice: 74.99,
    image: '/api/placeholder/400/13513523.jpg',
    category: 'TypeScript',
    level: 'Intermediate',
    duration: '10 hours',
    lastUpdated: '12/2024'
  },
  {
    id: 5,
    title: 'Node.js - The Complete Guide',
    instructor: 'David Wilson',
    rating: 4.8,
    reviews: 1120,
    price: 13.99,
    originalPrice: 84.99,
    image: '/api/placeholder/400/2778464.jpg',
    tag: 'Bestseller',
    category: 'Node.js',
    level: 'All Levels',
    duration: '20 hours',
    lastUpdated: '01/2025'
  },
  {
    id: 6,
    title: 'CSS Flexbox and Grid Mastery',
    instructor: 'Sophia Lee',
    rating: 4.5,
    reviews: 732,
    price: 10.99,
    originalPrice: 69.99,
    image: '/api/placeholder/400/13513523.jpg',
    category: 'CSS',
    level: 'Intermediate',
    duration: '8 hours',
    lastUpdated: '02/2025'
  },
  {
    id: 7,
    title: 'Full Stack MERN Development',
    instructor: 'Robert Johnson',
    rating: 4.9,
    reviews: 845,
    price: 15.99,
    originalPrice: 99.99,
    image: '/api/placeholder/400/2778464.jpg',
    tag: 'Bestseller',
    category: 'Full Stack',
    level: 'Advanced',
    duration: '24 hours',
    lastUpdated: '03/2025'
  },
  {
    id: 8,
    title: 'HTML5 for Beginners',
    instructor: 'Jennifer Smith',
    rating: 4.4,
    reviews: 512,
    price: 8.99,
    originalPrice: 49.99,
    image: '/api/placeholder/400/13513523.jpg',
    category: 'HTML',
    level: 'Beginner',
    duration: '6 hours',
    lastUpdated: '01/2025'
  },
  {
    id: 9,
    title: 'API Development with Express.js',
    instructor: 'Thomas Brown',
    rating: 4.7,
    reviews: 689,
    price: 12.99,
    originalPrice: 79.99,
    image: '/api/placeholder/400/2778464.jpg',
    category: 'API Development',
    level: 'Intermediate',
    duration: '14 hours',
    lastUpdated: '02/2025'
  },
  {
    id: 10,
    title: 'Frontend Development with Vue.js',
    instructor: 'Lisa Wang',
    rating: 4.6,
    reviews: 578,
    price: 11.99,
    originalPrice: 69.99,
    image: '/api/placeholder/400/13513523.jpg',
    category: 'Front End',
    level: 'All Levels',
    duration: '16 hours',
    lastUpdated: '12/2024'
  },
  {
    id: 11,
    title: 'Backend Development with Django',
    instructor: 'Mark Davis',
    rating: 4.8,
    reviews: 723,
    price: 13.99,
    originalPrice: 89.99,
    image: '/api/placeholder/400/2778464.jpg',
    category: 'Back End',
    level: 'Intermediate',
    duration: '18 hours',
    lastUpdated: '01/2025'
  },
  {
    id: 12,
    title: 'GraphQL Fundamentals',
    instructor: 'Anna Martinez',
    rating: 4.5,
    reviews: 492,
    price: 10.99,
    originalPrice: 64.99,
    image: '/api/placeholder/400/13513523.jpg',
    category: 'API Development',
    level: 'Intermediate',
    duration: '10 hours',
    lastUpdated: '03/2025'
  }
];

// Categories for filtering
const categories = [
  'All Categories',
  'Web Development',
  'JavaScript',
  'React',
  'TypeScript',
  'Node.js',
  'CSS',
  'HTML',
  'Full Stack',
  'Front End',
  'Back End',
  'API Development'
];

// Levels for filtering
const levels = [
  'All Levels',
  'Beginner',
  'Intermediate',
  'Advanced'
];

// Sort options
const sortOptions = [
  { value: 'most-popular', label: 'Most Popular' },
  { value: 'highest-rated', label: 'Highest Rated' },
  { value: 'newest', label: 'Newest' },
  { value: 'price-low-to-high', label: 'Price: Low to High' },
  { value: 'price-high-to-low', label: 'Price: High to Low' }
];

export default function CoursesPage() {
  const [courses, setCourses] = useState(allCourses);
  const [selectedCategory, setSelectedCategory] = useState('All Categories');
  const [selectedLevel, setSelectedLevel] = useState('All Levels');
  const [sortBy, setSortBy] = useState('most-popular');
  const [priceRange, setPriceRange] = useState([0, 100]);
  const [searchQuery, setSearchQuery] = useState('');
  const [mounted, setMounted] = useState(false);
  const [showFilters, setShowFilters] = useState(false);

  // Set mounted after initial render for animations
  useEffect(() => {
    setMounted(true);
  }, []);

  // Filter and sort courses when filters change
  useEffect(() => {
    let filteredCourses = [...allCourses];

    // Filter by category
    if (selectedCategory !== 'All Categories') {
      filteredCourses = filteredCourses.filter(course => course.category === selectedCategory);
    }

    // Filter by level
    if (selectedLevel !== 'All Levels') {
      filteredCourses = filteredCourses.filter(course => course.level === selectedLevel);
    }

    // Filter by price range
    filteredCourses = filteredCourses.filter(
      course => course.price >= priceRange[0] && course.price <= priceRange[1]
    );

    // Filter by search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filteredCourses = filteredCourses.filter(
        course => 
          course.title.toLowerCase().includes(query) || 
          course.instructor.toLowerCase().includes(query) ||
          course.category.toLowerCase().includes(query)
      );
    }

    // Sort courses
    switch (sortBy) {
      case 'highest-rated':
        filteredCourses.sort((a, b) => b.rating - a.rating);
        break;
      case 'newest':
        filteredCourses.sort((a, b) => new Date(b.lastUpdated).getTime() - new Date(a.lastUpdated).getTime());
        break;
      case 'price-low-to-high':
        filteredCourses.sort((a, b) => a.price - b.price);
        break;
      case 'price-high-to-low':
        filteredCourses.sort((a, b) => b.price - a.price);
        break;
      default: // most-popular
        filteredCourses.sort((a, b) => b.reviews - a.reviews);
    }

    setCourses(filteredCourses);
  }, [selectedCategory, selectedLevel, sortBy, priceRange, searchQuery]);

  // Star Rating Component
  const StarRating = ({ rating, reviews }: { rating: number, reviews: number }) => {
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
        <span className="ml-1 text-sm text-gray-500">({reviews})</span>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-white">
      <Header />

      {/* Announcement Banner */}
      <div className="bg-blue-100 text-center py-3 px-4 relative">
        <button className="absolute right-4 top-3 text-gray-600" aria-label="Close">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
          </svg>
        </button>
        <p className="text-gray-800">
          <span className="font-semibold">New courses added regularly</span> | Refresh your skills in the latest topics. Courses start at $10.99.
          <span className="font-semibold ml-2">Ends in 5h 58m 1s.</span>
        </p>
      </div>
      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col md:flex-row">
          {/* Sidebar Filters - Desktop */}
          <div className="hidden md:block md:w-1/4 pr-8">
            <div className="sticky top-4">
              <h2 className="text-black text-xl font-bold mb-4">Filter Courses</h2>
              
              {/* Category Filter */}
              <div className="mb-6">
                <h3 className="text-gray-700 font-semibold mb-2">Category</h3>
                <div className="space-y-2">
                  {categories.map((category) => (
                    <div key={category} className="flex items-center">
                      <input
                        type="radio"
                        id={`category-${category}`}
                        name="category"
                        checked={selectedCategory === category}
                        onChange={() => setSelectedCategory(category)}
                        className="h-4 w-4 text-indigo-600 focus:ring-indigo-500"
                      />
                      <label htmlFor={`category-${category}`} className="ml-2 text-sm text-gray-700">
                        {category}
                      </label>
                    </div>
                  ))}
                </div>
              </div>

              {/* Level Filter */}
              <div className="mb-6">
                <h3 className="text-gray-700 font-semibold mb-2">Level</h3>
                <div className="space-y-2">
                  {levels.map((level) => (
                    <div key={level} className="flex items-center">
                      <input
                        type="radio"
                        id={`level-${level}`}
                        name="level"
                        checked={selectedLevel === level}
                        onChange={() => setSelectedLevel(level)}
                        className="h-4 w-4 text-indigo-600 focus:ring-indigo-500"
                      />
                      <label htmlFor={`level-${level}`} className="ml-2 text-sm text-gray-700">
                        {level}
                      </label>
                    </div>
                  ))}
                </div>
              </div>

              {/* Price Range Filter */}
              <div className="mb-6">
                <h3 className="text-gray-700 font-semibold mb-2">Price</h3>
                <div className="space-y-2">
                  <div className="flex items-center">
                    <input
                      type="radio"
                      id="price-all"
                      name="price"
                      checked={priceRange[0] === 0 && priceRange[1] === 100}
                      onChange={() => setPriceRange([0, 100])}
                      className="h-4 w-4 text-indigo-600 focus:ring-indigo-500"
                    />
                    <label htmlFor="price-all" className="ml-2 text-sm text-gray-700">
                      All Prices
                    </label>
                  </div>
                  <div className="flex items-center">
                    <input
                      type="radio"
                      id="price-free"
                      name="price"
                      checked={priceRange[0] === 0 && priceRange[1] === 0}
                      onChange={() => setPriceRange([0, 0])}
                      className="h-4 w-4 text-indigo-600 focus:ring-indigo-500"
                    />
                    <label htmlFor="price-free" className="ml-2 text-sm text-gray-700">
                      Free
                    </label>
                  </div>
                  <div className="flex items-center">
                    <input
                      type="radio"
                      id="price-paid"
                      name="price"
                      checked={priceRange[0] === 0.01 && priceRange[1] === 100}
                      onChange={() => setPriceRange([0.01, 100])}
                      className="h-4 w-4 text-indigo-600 focus:ring-indigo-500"
                    />
                    <label htmlFor="price-paid" className="ml-2 text-sm text-gray-700">
                      Paid
                    </label>
                  </div>
                  <div className="flex items-center">
                    <input
                      type="radio"
                      id="price-under10"
                      name="price"
                      checked={priceRange[0] === 0 && priceRange[1] === 10}
                      onChange={() => setPriceRange([0, 10])}
                      className="h-4 w-4 text-indigo-600 focus:ring-indigo-500"
                    />
                    <label htmlFor="price-under10" className="ml-2 text-sm text-gray-700">
                      Under $10
                    </label>
                  </div>
                  <div className="flex items-center">
                    <input
                      type="radio"
                      id="price-10to20"
                      name="price"
                      checked={priceRange[0] === 10 && priceRange[1] === 20}
                      onChange={() => setPriceRange([10, 20])}
                      className="h-4 w-4 text-indigo-600 focus:ring-indigo-500"
                    />
                    <label htmlFor="price-10to20" className="ml-2 text-sm text-gray-700">
                      $10 - $20
                    </label>
                  </div>
          </div>
        </div>
      </div>
    </div>
          {/* Main Content */}
          <div className="w-full md:w-3/4">
            {/* Search and Sort Controls */}
            <div className="mb-6">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4">
                <h1 className="text-black text-2xl font-bold mb-2 sm:mb-0">All Courses</h1>
                <div className="flex items-center">
                  <button 
                    className="md:hidden flex items-center mr-4 px-3 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
                    onClick={() => setShowFilters(!showFilters)}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M3 3a1 1 0 011-1h12a1 1 0 011 1v3a1 1 0 01-.293.707L12 11.414V15a1 1 0 01-.293.707l-2 2A1 1 0 018 17v-5.586L3.293 6.707A1 1 0 013 6V3z" clipRule="evenodd" />
                    </svg>
                    Filter
                  </button>
                  <div className="relative">
                    <select
                      value={sortBy}
                      onChange={(e) => setSortBy(e.target.value)}
                      className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-sm text-gray-600"
                    >
                      {sortOptions.map((option) => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </select>
                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                      <svg className="h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search courses..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full px-4 py-2 pl-10 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500 placeholder-indigo-400 text-gray-600"
                />
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg className="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
                  </svg>
                </div>
              </div>
            </div>

            {/* Mobile Filters */}
            {showFilters && (
              <div className="md:hidden bg-white p-4 mb-6 border border-gray-200 rounded-lg">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="font-bold">Filters</h3>
                  <button onClick={() => setShowFilters(false)}>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                  </button>
                </div>

                {/* Category Filter - Mobile */}
                <div className="mb-4">
                  <h4 className="font-semibold mb-2">Category</h4>
                  <select
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded-md"
                  >
                    {categories.map((category) => (
                      <option key={category} value={category}>
                        {category}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Level Filter - Mobile */}
                <div className="mb-4">
                  <h4 className="font-semibold mb-2">Level</h4>
                  <select
                    value={selectedLevel}
                    onChange={(e) => setSelectedLevel(e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded-md"
                  >
                    {levels.map((level) => (
                      <option key={level} value={level}>
                        {level}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Price Filter - Mobile */}
                <div>
                  <h4 className="font-semibold mb-2">Price</h4>
                  <select
                    value={`${priceRange[0]}-${priceRange[1]}`}
                    onChange={(e) => {
                      const [min, max] = e.target.value.split('-').map(Number);
                      setPriceRange([min, max]);
                    }}
                    className="w-full p-2 border border-gray-300 rounded-md"
                  >
                    <option value="0-100">All Prices</option>
                    <option value="0-0">Free</option>
                    <option value="0.01-100">Paid</option>
                    <option value="0-10">Under $10</option>
                    <option value="10-20">$10 - $20</option>
                  </select>
                </div>

                <button
                  onClick={() => setShowFilters(false)}
                  className="mt-4 w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700"
                >
                  Apply Filters
                </button>
              </div>
            )}

            {/* Results Count */}
            <p className="text-sm text-gray-600 mb-6">{courses.length} results</p>

            {/* Course Grid */}
            {courses.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {courses.map((course, index) => (
                  <Link
                    href={`/courses/${course.id}`}
                    key={course.id}
                    className={`block border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg transition-shadow duration-300
                      ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}
                      transition-all duration-500 ease-out`}
                    style={{ transitionDelay: `${150 * (index % 6)}ms` }}
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
                      <div className="flex items-center">
                        <StarRating rating={course.rating} reviews={course.reviews} />
                        <span className="ml-1 text-sm text-gray-500">({course.reviews})</span>
                      </div>
                      <div className="mt-2 flex items-center">
                        <span className="text-gray-600 font-bold text-lg">${course.price}</span>
                        <span className="ml-2 text-gray-500 line-through text-sm">${course.originalPrice}</span>
                      </div>
                      <div className="mt-2 text-xs text-gray-500">
                        {course.duration} • {course.level} • Updated {course.lastUpdated}
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <h3 className="mt-2 text-sm font-medium text-gray-900">No courses found</h3>
                <p className="mt-1 text-sm text-gray-500">Try adjusting your search or filter to find what you&apos;re looking for.</p>
                <div className="mt-6">
                  <button
                    onClick={() => {
                      setSelectedCategory('All Categories');
                      setSelectedLevel('All Levels');
                      setPriceRange([0, 100]);
                      setSearchQuery('');
                    }}
                    className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  >
                    Clear all filters
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )

}
