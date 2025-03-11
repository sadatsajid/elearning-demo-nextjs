'use client';

import { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import Header from '@/components/Header';
import RoleGuard from '@/components/RoleGuard';

export default function ProfilePage() {
  const { user } = useAuth();
  const [firstName, setFirstName] = useState(user?.username?.split(' ')[0] || '');
  const [lastName, setLastName] = useState(user?.username?.split(' ')[1] || '');
  const [headline, setHeadline] = useState('');
  const [website, setWebsite] = useState('');
  const [twitter, setTwitter] = useState('');
  
  // Get initials for the avatar
  const getInitials = () => {
    if (!user?.username) return '';
    const names = user.username.split(' ');
    if (names.length === 1) return names[0].charAt(0).toUpperCase();
    return (names[0].charAt(0) + names[names.length - 1].charAt(0)).toUpperCase();
  };

  return (
    <RoleGuard allowedRole="any">
      <div className="min-h-screen bg-white">
        <Header />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="border border-gray-200 rounded-lg overflow-hidden">
            {/* Profile Header */}
            <div className="px-6 py-4 border-b border-gray-200">
              <h1 className="text-xl font-bold text-gray-900">Public profile</h1>
              <p className="text-sm text-gray-600">Add information about yourself</p>
            </div>

            <div className="flex flex-col md:flex-row">
              {/* Left Sidebar */}
              <div className="w-full md:w-64 border-b md:border-b-0 md:border-r border-gray-200">
                <div className="p-6 flex flex-col items-center">
                  <div className="w-24 h-24 rounded-full bg-gray-800 flex items-center justify-center text-white text-2xl font-bold mb-3">
                    {getInitials()}
                  </div>
                  <h2 className="text-lg font-medium text-gray-900 text-center">{user?.username}</h2>
                  <button className="text-sm text-indigo-600 mt-2">View public profile</button>
                </div>

                <nav className="px-3 py-2">
                  <ul>
                    <li className="cursor-pointer py-1 px-3 text-gray-900 bg-gray-200 rounded font-medium">Profile</li>
                    <li className="cursor-pointer py-1 px-3 text-gray-700 hover:bg-gray-100 rounded mt-1">Photo</li>
                    <li className="cursor-pointer py-1 px-3 text-gray-700 hover:bg-gray-100 rounded mt-1">Account Security</li>
                    <li className="cursor-pointer py-1 px-3 text-gray-700 hover:bg-gray-100 rounded mt-1">Subscriptions</li>
                    <li className="cursor-pointer py-1 px-3 text-gray-700 hover:bg-gray-100 rounded mt-1">Payment methods</li>
                    <li className="cursor-pointer py-1 px-3 text-gray-700 hover:bg-gray-100 rounded mt-1">Privacy</li>
                    <li className="cursor-pointer py-1 px-3 text-gray-700 hover:bg-gray-100 rounded mt-1">Notification Preferences</li>
                    <li className="cursor-pointer py-1 px-3 text-gray-700 hover:bg-gray-100 rounded mt-1">API clients</li>
                    <li className="cursor-pointer py-1 px-3 text-gray-700 hover:bg-gray-100 rounded mt-1">Close account</li>
                  </ul>
                </nav>
              </div>

              {/* Main Content */}
              <div className="flex-1 p-6">
                <div className="mb-8">
                  <h3 className="text-base font-medium text-gray-700 mb-3">Basics:</h3>
                  <div className="space-y-4">
                    <div>
                      <input
                        type="text"
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                        className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                        placeholder="First Name"
                      />
                    </div>
                    <div>
                      <input
                        type="text"
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                        className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                        placeholder="Last Name"
                      />
                    </div>
                    <div className="relative">
                      <input
                        type="text"
                        value={headline}
                        onChange={(e) => setHeadline(e.target.value)}
                        className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                        placeholder="Headline"
                      />
                      <div className="absolute right-3 top-2 text-gray-400 text-sm">60</div>
                      <p className="text-xs text-gray-500 mt-1">Add a professional headline like, &quot;Instructor at Udemy&quot; or &quot;Architect&quot;</p>
                    </div>
                    <div>
                      {/* Rich text editor toolbar - simplified */}
                      <div className="border border-gray-300 rounded-md">
                        <div className="flex items-center space-x-2 px-3 py-2 border-b border-gray-300">
                          <button className="font-bold">B</button>
                          <button className="italic">I</button>
                        </div>
                        <div className="p-3 min-h-32">
                          {/* Bio text area */}
                        </div>
                      </div>
                      <p className="text-xs text-gray-500 mt-1">Links and coupon codes are not permitted in this section.</p>
                    </div>
                    <div className="relative">
                      <div className="w-full border border-gray-300 rounded-md px-3 py-2 flex justify-between items-center">
                        <span>English (US)</span>
                        <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-base font-medium text-gray-700 mb-3">Links:</h3>
                  <div className="space-y-4">
                    <div>
                      <input
                        type="text"
                        value={website}
                        onChange={(e) => setWebsite(e.target.value)}
                        className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                        placeholder="Website (https://...)"
                      />
                    </div>
                    
                    <div className="flex">
                      <div className="flex-shrink-0 bg-gray-100 border border-gray-300 border-r-0 rounded-l-md px-3 py-2 text-gray-500">
                        http://twitter.com/
                      </div>
                      <input
                        type="text"
                        value={twitter}
                        onChange={(e) => setTwitter(e.target.value)}
                        className="flex-1 border border-gray-300 rounded-r-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                        placeholder="Twitter Profile"
                      />
                    </div>
                    <p className="text-xs text-gray-500 -mt-2">Add your Twitter username (e.g. johnsmith).</p>
                    
                    <button className="mt-6 px-6 py-2 bg-purple-600 text-white font-medium rounded-md hover:bg-purple-700 transition-colors">
                      Save
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </RoleGuard>
  );
}