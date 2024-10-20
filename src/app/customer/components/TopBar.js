'use client';

import React, { useEffect, useState } from 'react';
import { FiChevronRight, FiPhone, FiFacebook, FiInstagram } from 'react-icons/fi';
import { FaTiktok, FaPinterest } from 'react-icons/fa'; // Import Pinterest icon
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';

const TopBar = () => {
  const router = useRouter();
  const [socialMediaLinks, setSocialMediaLinks] = useState({
    facebook: '',
    instagram: '',
    twitter: '',
    tiktok: '',
    pinterest: '' // Added pinterest link
  });
  const [loading, setLoading] = useState(true); // Loading state

  useEffect(() => {
    // Fetch social media links from the database
    const fetchSocialMediaLinks = async () => {
      try {
        const response = await fetch('/api/socialfirstrecodlink', { cache: 'no-store' });
        const data = await response.json();

        if (data.status) {
          setSocialMediaLinks(data.data); // Set the links state with fetched data
        } else {
          console.error('Failed to fetch social media links');
        }
      } catch (error) {
        console.error('Error fetching social media links:', error);
      } finally {
        setLoading(false); // Stop loading after fetch
      }
    };

    fetchSocialMediaLinks(); // Call the function to fetch links
  }, []);

  const handleViewDetailsClick = () => {
    router.push('/customer/pages/discounted-products');
  };

  return (
    <div className="hidden w-full md:flex bg-white py-2 border-b border-gray-300 text-gray-800">
      <div className="container w-full flex flex-col md:flex-row justify-between items-center px-4">
        <div className="flex flex-col md:flex-row md:space-x-4 text-sm w-full">
          <div className="flex space-x-4 mb-2 md:mb-0">
            <a href="/customer/pages/contactus" className="hover:underline">Contact Us</a>
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
            {loading ? (
              <p>Loading...</p> // Show loading while fetching data
            ) : (
              <>
                <a href={socialMediaLinks.facebook || '#'} target="_blank" rel="noopener noreferrer" className="hover:text-blue-500">
                  <FiFacebook className="text-blue-600" />
                </a>
                <a href={socialMediaLinks.instagram || '#'} target="_blank" rel="noopener noreferrer" className="hover:text-pink-500">
                  <FiInstagram className="text-pink-500" />
                </a>
                <a href={socialMediaLinks.tiktok || '#'} target="_blank" rel="noopener noreferrer" className="hover:text-black">
                  <FaTiktok className="text-black" />
                </a>
                <a href={socialMediaLinks.pinterest || '#'} target="_blank" rel="noopener noreferrer" className="hover:text-red-500">
                  <FaPinterest className="text-red-600" /> {/* Pinterest Red */}
                </a>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TopBar;
