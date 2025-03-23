// Sample course data - in a real app, this would come from an API
import { Course } from './types';

export const allCourses: Course[] = [
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
    lastUpdated: '01/2025',
    students: 1254,
    description: 'Learn web development from scratch with HTML, CSS, JavaScript, React, Node.js and more',
    language: 'English',
    subtitles: ['English', 'Spanish', 'French'],
    requirements: [
      'Basic computer knowledge',
      'No prior programming experience needed'
    ],
    fullDescription: `
      <p>This comprehensive web development bootcamp covers everything you need to know to become a full-stack web developer.</p>
      <p>Starting with the fundamentals of HTML, CSS, and JavaScript, you'll progress to advanced topics like React, Node.js, and database integration.</p>
      <p>By the end of this course, you'll have built several real-world projects and gained the skills needed to start a career in web development.</p>
    `,
    whatYouWillLearn: [
      'Build responsive websites with HTML, CSS, and JavaScript',
      'Create dynamic web applications with React',
      'Develop backend services with Node.js and Express',
      'Work with databases like MongoDB and MySQL',
      'Deploy your applications to the web',
      'Implement authentication and authorization'
    ],
    courseContent: [
      {
        title: 'Introduction to Web Development',
        lectures: 5,
        duration: '45min',
        items: [
          { title: 'Course Overview', duration: '10:15', preview: true },
          { title: 'Setting Up Your Development Environment', duration: '15:30', preview: true },
          { title: 'Web Development Basics', duration: '08:45' },
          { title: 'How the Internet Works', duration: '12:20' },
          { title: 'Introduction to HTML', duration: '08:10' }
        ]
      },
      {
        title: 'HTML Fundamentals',
        lectures: 8,
        duration: '1hr 30min',
        items: []
      },
      {
        title: 'CSS Styling',
        lectures: 10,
        duration: '2hr 15min',
        items: []
      },
      {
        title: 'JavaScript Essentials',
        lectures: 12,
        duration: '3hr 20min',
        items: []
      }
    ],
    includes: [
      '15.5 hours on-demand video',
      '25 coding exercises',
      '10 articles',
      '15 downloadable resources',
      'Access on mobile and TV',
      'Certificate of completion'
    ]
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
    lastUpdated: '02/2025',
    students: 842,
    description: 'Master JavaScript fundamentals and modern ES6+ features',
    language: 'English',
    subtitles: ['English', 'German'],
    requirements: [
      'Basic HTML and CSS knowledge',
      'No prior JavaScript experience required'
    ],
    fullDescription: `
      <p>This course is designed to take you from zero to hero in modern JavaScript programming.</p>
      <p>You'll learn all the fundamentals of JavaScript along with the latest ES6+ features that make coding in JavaScript more efficient and enjoyable.</p>
      <p>Through practical examples and projects, you'll gain hands-on experience that will prepare you for real-world JavaScript development.</p>
    `,
    whatYouWillLearn: [
      'JavaScript fundamentals including variables, data types, and functions',
      'Working with arrays, objects, and DOM manipulation',
      'Modern ES6+ features like arrow functions, destructuring, and modules',
      'Asynchronous JavaScript with Promises and async/await',
      'Error handling and debugging techniques',
      'Building interactive web applications'
    ],
    courseContent: [
      {
        title: 'JavaScript Basics',
        lectures: 6,
        duration: '1hr 15min',
        items: [
          { title: 'Introduction to JavaScript', duration: '12:30', preview: true },
          { title: 'Variables and Data Types', duration: '15:45', preview: true },
          { title: 'Operators and Expressions', duration: '10:20' },
          { title: 'Control Flow: Conditionals', duration: '14:35' },
          { title: 'Control Flow: Loops', duration: '12:50' },
          { title: 'Functions Basics', duration: '09:00' }
        ]
      },
      {
        title: 'Working with Data Structures',
        lectures: 5,
        duration: '1hr 20min',
        items: []
      },
      {
        title: 'DOM Manipulation',
        lectures: 7,
        duration: '2hr 10min',
        items: []
      },
      {
        title: 'Modern JavaScript (ES6+)',
        lectures: 8,
        duration: '2hr 30min',
        items: []
      }
    ],
    includes: [
      '12 hours on-demand video',
      '20 coding exercises',
      '8 articles',
      '12 downloadable resources',
      'Access on mobile and TV',
      'Certificate of completion'
    ]
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
    lastUpdated: '03/2025',
    students: 976,
    description: 'Take your React skills to the next level with advanced patterns and Redux',
    language: 'English',
    subtitles: ['English'],
    requirements: [
      'Solid understanding of JavaScript',
      'Basic knowledge of React',
      'Familiarity with ES6 syntax'
    ],
    fullDescription: `
      <p>This advanced course is designed for developers who already have a basic understanding of React and want to master advanced techniques.</p>
      <p>You'll learn complex state management with Redux, performance optimization, advanced hooks, and modern architectural patterns.</p>
      <p>By the end of this course, you'll be able to build sophisticated, high-performance React applications using best practices.</p>
    `,
    whatYouWillLearn: [
      'Advanced React patterns and best practices',
      'Complex state management with Redux and Redux Toolkit',
      'Performance optimization techniques',
      'Custom hooks and advanced hook patterns',
      'Testing React applications',
      'Server-side rendering and Next.js',
      'TypeScript integration with React'
    ],
    courseContent: [
      {
        title: 'Advanced React Concepts',
        lectures: 7,
        duration: '2hr 10min',
        items: [
          { title: 'Course Overview', duration: '08:45', preview: true },
          { title: 'React Component Patterns', duration: '18:30', preview: true },
          { title: 'Advanced Hooks', duration: '22:15' },
          { title: 'Context API Deep Dive', duration: '19:40' },
          { title: 'Render Props and HOCs', duration: '15:20' },
          { title: 'Error Boundaries', duration: '12:30' },
          { title: 'React Performance Optimization', duration: '23:00' }
        ]
      },
      {
        title: 'Redux Fundamentals',
        lectures: 6,
        duration: '2hr 30min',
        items: []
      },
      {
        title: 'Redux Toolkit and Modern Redux',
        lectures: 8,
        duration: '3hr 15min',
        items: []
      },
      {
        title: 'Testing React Applications',
        lectures: 5,
        duration: '1hr 45min',
        items: []
      }
    ],
    includes: [
      '18 hours on-demand video',
      '15 coding exercises',
      '12 articles',
      '20 downloadable resources',
      'Access on mobile and TV',
      'Certificate of completion'
    ]
  }
];
