'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import Header from '@/components/Header';
import { Course, CourseSection, CourseItem } from '../types';
import { allCourses } from '../data';

// Star Rating Component
const StarRating = ({ rating, reviews, showCount = true }: { rating: number, reviews: number, showCount?: boolean }) => {
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
      {showCount && <span className="ml-1 text-sm text-gray-500">({reviews} reviews)</span>}
    </div>
  );
};

export default function CourseDetailsPage() {
  const params = useParams();
  const courseId = params.courseId as string;
  
  const [course, setCourse] = useState<Course | null>(null);
  const [activeTab, setActiveTab] = useState('personal');
  const [expandedSections, setExpandedSections] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // In a real app, this would be an API call
    const foundCourse = allCourses.find((c: Course) => c.id.toString() === courseId);
    
    // Simulate API call delay
    setTimeout(() => {
      setCourse(foundCourse || {
        id: 1,
        title: 'Certified Kubernetes Application Developer | CKAD Exam 2025',
        instructor: 'TechLink Selenium | DevOps | GenAI',
        rating: 4.3,
        reviews: 384,
        price: 10.99,
        originalPrice: 49.99,
        image: '/api/placeholder/400/2778464.jpg',
        tag: 'Bestseller',
        category: 'IT & Software',
        level: 'All Levels',
        duration: '15.5 hours',
        lastUpdated: '01/2025',
        students: 22642,
        description: 'CKAD - Learn Concepts and Practice the Certified Kubernetes Application Developer (CKAD) Exam with Hand-On Labs',
        language: 'English',
        subtitles: ['English [Auto]', 'French [Auto]'],
        requirements: [
          'Docker Container (Basics)',
          'YAML Basics'
        ],
        fullDescription: `
          <p>Certified Kubernetes Application Developer | CKAD Certification can take your career to a whole new level. Learn, practice, and get certified on Kubernetes with hands-on labs.</p>
          <p>This course is specifically designed for the aspirants who intend to give the "Certified Kubernetes Application Developer" certification and the individuals who intend to gain a strong foundation on Kubernetes from absolute scratch.</p>
          <p>The journey of this course begins with Understanding the basics of Container Orchestration technologies, and then the deep dive journey into Kubernetes begins.</p>
          <p>Besides Developers, CKAD certification will add a good weightage to anyone working with Kubernetes - including Administrators, Engineers, and Architects. Also, for the beginners who want to get into the DevOps space.</p>
        `,
        whatYouWillLearn: [
          'Preparation for Certified Kubernetes Application Developer certification',
          'Learn "Easy-First-Strategy" to solve the tasks efficiently in the Certified Kubernetes Application Developer Exam',
          'Strong Fundamentals of Kubernetes',
          'Deploying Applications to Kubernetes',
          'CERTIFICATION PREPARATION: Goal is to help you prepare every CKAD individual topic thoroughly, including Demos, Practice Test, and more',
          'Once you complete the course, you will have the knowledge& confidence to pass the CKAD exam AND the good pay raise'
        ],
        courseContent: [
          {
            title: 'Kubernetes CKAD Certification Introduction',
            lectures: 8,
            duration: '40min',
            items: [
              { title: 'Introduction to the Course', duration: '07:18', preview: true },
              { title: 'Things to Know About CKAD Exam', duration: '05:56', preview: true },
              { title: 'Official CKAD Curriculum', duration: '06:55' },
              { title: 'My Motivating Factor!', duration: '00:28' },
              { title: 'GuideLines to Score 100% in Exam (Before Exam)', duration: '07:43' },
              { title: 'GuideLines to Score 100% in Exam (During Exam)', duration: '11:13', preview: true },
              { title: 'Course Chat with Students and Tech Community', duration: '00:23' },
              { title: 'Download Course Source Code From GIT', duration: '00:06' }
            ]
          },
          {
            title: 'Kubernetes Architecture & Installation (Important Concept to Learn)',
            lectures: 10,
            duration: '1hr 24min',
            items: []
          },
          {
            title: 'Application Design and Build (20%)',
            lectures: 36,
            duration: '4hr 36min',
            items: []
          },
          {
            title: 'Application Deployment (20%)',
            lectures: 20,
            duration: '2hr 37min',
            items: []
          }
        ],
        includes: [
          '15.5 hours on-demand video',
          'Assignments',
          '18 articles',
          '124 downloadable resources',
          'Access on mobile and TV',
          'Certificate of completion'
        ]
      });
      setIsLoading(false);
    }, 500);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params.courseId]);

  const toggleSection = (sectionTitle: string) => {
    setExpandedSections(prev => 
      prev.includes(sectionTitle) 
        ? prev.filter(title => title !== sectionTitle)
        : [...prev, sectionTitle]
    );
  };

  const isSectionExpanded = (sectionTitle: string) => {
    return expandedSections.includes(sectionTitle);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-white">
        <Header />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 rounded w-3/4 mb-4"></div>
            <div className="h-4 bg-gray-200 rounded w-1/2 mb-6"></div>
            <div className="flex flex-col md:flex-row gap-8">
              <div className="md:w-2/3">
                <div className="h-96 bg-gray-200 rounded mb-6"></div>
                <div className="h-4 bg-gray-200 rounded w-full mb-2"></div>
                <div className="h-4 bg-gray-200 rounded w-full mb-2"></div>
                <div className="h-4 bg-gray-200 rounded w-3/4 mb-6"></div>
              </div>
              <div className="md:w-1/3">
                <div className="h-64 bg-gray-200 rounded mb-4"></div>
                <div className="h-10 bg-gray-200 rounded mb-2"></div>
                <div className="h-10 bg-gray-200 rounded mb-4"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!course) {
    return (
      <div className="min-h-screen bg-white">
        <Header />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center py-12">
            <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <h3 className="mt-2 text-sm font-medium text-gray-900">Course not found</h3>
            <p className="mt-1 text-sm text-gray-500">The course you&apos;re looking for doesn&apos;t exist or has been removed.</p>
            <div className="mt-6">
              <Link href="/courses" className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                Back to courses
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

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
          <span className="font-semibold text-gray-900">New courses added regularly</span> | Refresh your skills in the latest topics. Courses start at $10.99.
          <span className="font-semibold text-gray-900 ml-2">Ends in 5h 58m 1s.</span>
        </p>
      </div>

      {/* Breadcrumbs */}
      <div className="bg-gray-900 text-white py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex text-sm">
            <Link href="/" className="text-gray-300 hover:text-white">IT & Software</Link>
            <span className="mx-2 text-gray-500">&gt;</span>
            <Link href="/" className="text-gray-300 hover:text-white">IT Certifications</Link>
            <span className="mx-2 text-gray-500">&gt;</span>
            <span className="text-gray-400">Certified Kubernetes Application Developer (CKAD)</span>
          </nav>
        </div>
      </div>

      {/* Course Header */}
      <div className="bg-gray-900 text-white pb-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row">
            <div className="md:w-2/3 pt-6">
              <h1 className="text-3xl font-bold text-white mb-4">{course.title}</h1>
              <p className="text-xl text-gray-200 mb-4">{course.description}</p>
              
              <div className="flex flex-wrap items-center gap-2 mb-4">
                <span className="bg-yellow-500 text-xs font-semibold text-gray-900 px-2 py-1 rounded">Bestseller</span>
                <div className="flex items-center">
                  <span className="text-yellow-400 font-bold">{course.rating}</span>
                  <StarRating rating={course.rating} reviews={course.reviews} />
                </div>
                <span className="text-sm text-gray-300">({course.reviews} ratings)</span>
                <span className="text-sm text-gray-300">{course.students} students</span>
              </div>
              
              <p className="text-sm text-gray-300 mb-4">
                Created by <Link href="/" className="text-blue-400 hover:text-blue-300 hover:underline">{course.instructor}</Link>
              </p>
              
              <div className="flex flex-wrap items-center gap-4 text-sm text-gray-300 mb-4">
                <div className="flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  Last updated {course.lastUpdated}
                </div>
                <div className="flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129" />
                  </svg>
                  English
                </div>
                <div className="flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" />
                  </svg>
                  English [Auto], French [Auto]
                </div>
              </div>
            </div>
            
            <div className="md:w-1/3 md:pl-8 mt-6 md:mt-0">
              <div className="bg-white rounded-lg shadow-lg overflow-hidden sticky top-4">
                <div className="relative">
                  <Image 
                    src={course.image} 
                    alt={course.title}
                    width={600}
                    height={338}
                    className="w-full h-auto"
                  />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <button className="bg-white bg-opacity-80 rounded-full p-4 shadow-lg">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </button>
                  </div>
                  <div className="absolute bottom-4 left-4 text-white font-medium">
                    Preview this course
                  </div>
                </div>
                
                <div className="p-6">
                  <div className="flex justify-between border-b pb-4">
                    <button 
                      className={`text-lg font-medium ${activeTab === 'personal' ? 'text-indigo-600 border-b-2 border-indigo-600' : 'text-gray-600'}`}
                      onClick={() => setActiveTab('personal')}
                    >
                      Personal
                    </button>
                    <button 
                      className={`text-lg font-medium ${activeTab === 'teams' ? 'text-indigo-600 border-b-2 border-indigo-600' : 'text-gray-600'}`}
                      onClick={() => setActiveTab('teams')}
                    >
                      Teams
                    </button>
                  </div>
                  
                  <div className="py-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-3xl font-bold text-gray-900">${course.price}</span>
                      <div className="flex flex-col items-end">
                        <span className="text-gray-500 line-through">${course.originalPrice}</span>
                        <span className="text-gray-700 font-medium">78% off</span>
                      </div>
                    </div>
                    
                    <div className="text-red-600 flex items-center mb-4">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <span>5 hours left at this price!</span>
                    </div>
                    
                    <button className="w-full bg-indigo-600 text-white py-3 rounded-md font-medium mb-2 hover:bg-indigo-700 transition-colors">
                      Add to cart
                    </button>
                    
                    <button className="w-full border border-gray-300 text-gray-700 py-3 rounded-md font-medium mb-4 hover:bg-gray-50 transition-colors">
                      Buy now
                    </button>
                    
                    <p className="text-center text-gray-600 text-sm mb-2">30-Day Money-Back Guarantee</p>
                    <p className="text-center text-gray-600 text-sm mb-4">Full Lifetime Access</p>
                    
                    <div className="flex justify-between text-sm text-gray-600">
                      <button className="hover:text-gray-900">Share</button>
                      <button className="hover:text-gray-900">Gift this course</button>
                      <button className="hover:text-gray-900">Apply Coupon</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Course Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col md:flex-row">
          <div className="md:w-2/3 pr-0 md:pr-8">
            {/* What you'll learn */}
            <div className="border border-gray-200 rounded-lg p-6 mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">What you&apos;ll learn</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                {course.whatYouWillLearn.map((item: string, index: number) => (
                  <div key={index} className="flex">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-gray-700 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    <span className="text-gray-800">{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Course content */}
            <div className="mb-8">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-bold text-gray-900">Course content</h2>
                <button className="text-indigo-600 hover:text-indigo-800">
                  Expand all sections
                </button>
              </div>
              
              <div className="text-sm text-gray-600 mb-4">
                {course.courseContent.reduce((total: number, section: CourseSection) => total + section.lectures, 0)} lectures • {course.duration} total length
              </div>
              
              <div className="border border-gray-200 rounded-lg overflow-hidden">
                {course.courseContent.map((section: CourseSection, index: number) => (
                  <div key={index} className="border-b border-gray-200 last:border-b-0">
                    <button 
                      className="w-full flex justify-between items-center p-4 hover:bg-gray-50 transition-colors"
                      onClick={() => toggleSection(section.title)}
                    >
                      <div className="flex items-center">
                        <svg 
                          xmlns="http://www.w3.org/2000/svg" 
                          className={`h-5 w-5 mr-2 text-gray-500 transition-transform ${isSectionExpanded(section.title) ? 'transform rotate-180' : ''}`} 
                          fill="none" 
                          viewBox="0 0 24 24" 
                          stroke="currentColor"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                        <span className="font-medium text-gray-800">{section.title}</span>
                      </div>
                      <div className="text-sm text-gray-600">
                        {section.lectures} lectures • {section.duration}
                      </div>
                    </button>
                    
                    {isSectionExpanded(section.title) && section.items && section.items.length > 0 && (
                      <div className="bg-gray-50 border-t border-gray-200">
                        {section.items.map((item: CourseItem, itemIndex: number) => (
                          <div key={itemIndex} className="flex justify-between items-center p-4 hover:bg-gray-100 transition-colors">
                            <div className="flex items-center">
                              {item.preview ? (
                                <button className="text-indigo-600 hover:text-indigo-800 mr-2">
                                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                  </svg>
                                </button>
                              ) : (
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                                </svg>
                              )}
                              <span className="text-gray-700">{item.title}</span>
                              {item.preview && (
                                <span className="ml-2 text-indigo-600 text-sm">Preview</span>
                              )}
                            </div>
                            <span className="text-sm text-gray-600">{item.duration}</span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Requirements */}
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Requirements</h2>
              <ul className="list-disc pl-5 space-y-2 text-gray-700">
                {course.requirements.map((req: string, index: number) => (
                  <li key={index}>{req}</li>
                ))}
              </ul>
            </div>

            {/* Description */}
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Description</h2>
              <div className="prose prose-lg max-w-none text-gray-700" dangerouslySetInnerHTML={{ __html: course.fullDescription }} />
            </div>

            {/* This course includes */}
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">This course includes</h2>
              <ul className="space-y-2">
                {course.includes.map((item: string, index: number) => (
                  <li key={index} className="flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-gray-800">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
