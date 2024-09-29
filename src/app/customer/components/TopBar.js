'use client';

import React, { useEffect, useState } from 'react'; // Import useEffect and useState
import { FiChevronRight, FiPhone, FiFacebook, FiInstagram } from 'react-icons/fi';
import { FaTiktok, FaEnvelope } from 'react-icons/fa'; // Importing necessary icons
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation'; // Importing useRouter

const TopBar = () => {
  const router = useRouter(); // Initializing useRouter
  const [socialMediaLinks, setSocialMediaLinks] = useState({ // Initialize state for social media links
    facebook: '',
    instagram: '',
    twitter: '',
    tiktok: ''
  });

  useEffect(() => {
    const fetchSocialMediaLinks = async () => {
      try {
        const response = await fetch('/api/socialfirstrecodlink'); // Fetch the first record
        const data = await response.json();

        if (data.status) {
          setSocialMediaLinks(data.data);
        } else {
          console.error('Failed to fetch social media links');
        }
      } catch (error) {
        console.error('Error fetching social media links:', error);
      }
    };

    fetchSocialMediaLinks(); // Call the function to fetch links
  }, []);

  const handleViewDetailsClick = () => {
    router.push('/customer/pages/discounted-products'); // Navigating to the discounted products page
  };

  return (
    <div className="hidden w-full md:flex bg-white py-2 border-b border-gray-300 text-gray-800">
      <div className="container w-full flex flex-col md:flex-row justify-between items-center px-4">
        <div className="flex flex-col md:flex-row md:space-x-4 text-sm w-full ">
          <div className="flex space-x-4 mb-2 md:mb-0">
            <a href="/customer/pages/contactus" className="hover:underline">Contact Us </a>
            <span>/</span>
            <a href="/customer/pages/aboutus" className="hover:underline">About Us</a>
          </div>
          <div className="hidden md:block w-[70vw] overflow-x-hidden">
            <motion.div
              className="flex items-center space-x-2 text-gray-600 whitespace-nowrap"
              initial={{ x: '100%' }}
              animate={{ x: '-100%' }}
              transition={{ repeat: Infinity, duration: 20, ease: 'linear' }}
            >
              <FiChevronRight />
              <span>Get great devices up to 50% off</span>
              <button onClick={handleViewDetailsClick} className="text-blue-500 hover:underline">
                View details
              </button>
            </motion.div>
          </div>
        </div>
        <div className="flex items-center space-x-4 text-sm">
          <div className="flex items-center space-x-2 text-lg">
            <a href={socialMediaLinks.facebook || '#'} target="_blank" rel="noopener noreferrer" className="hover:text-blue-500">
              <FiFacebook className="text-blue-600" /> {/* Facebook Blue */}
            </a>
            <a href="mailto:info@store2u.ca" className="hover:text-red-500">
              <FaEnvelope className="text-red-600" /> {/* Red for Envelope */}
            </a>
            <a href={socialMediaLinks.instagram || '#'} target="_blank" rel="noopener noreferrer" className="hover:text-pink-500">
              <FiInstagram className="text-pink-500" /> {/* Instagram Pink */}
            </a>
            <a href={socialMediaLinks.tiktok || '#'} target="_blank" rel="noopener noreferrer" className="hover:text-black">
              <FaTiktok className="text-black" /> {/* TikTok Black */}
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TopBar;
