'use client';

import React, { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import axios from 'axios';
import { motion } from 'framer-motion';
import { ThreeDots } from 'react-loader-spinner'; // Import the loading spinner

// Function to fetch subcategories by category slug
const fetchSubcategoriesByCategorySlug = async (categorySlug) => {
  try {
    const response = await axios.get(`/api/subcategories/${categorySlug}`);
    console.log('Full API response:', response); // Log the full API response
    return response.data.data; // Return the subcategories data
  } catch (error) {
    console.error('Error fetching subcategories:', error);
    return []; // Return an empty array if there is an error
  }
};

const CategoryPage = ({ categoryData }) => {
  const { slug } = useParams(); // Get slug from the URL parameters
  const router = useRouter(); // Hook to navigate between pages
  const [subcategories, setSubcategories] = useState([]); // State to hold subcategories
  const [isLoading, setIsLoading] = useState(true); // Loading state
  const [error, setError] = useState(null); // Error state

  useEffect(() => {
    console.log("Category Data in CategoryPage:", categoryData); // Log to ensure categoryData is passed correctly

    const fetchSubcategories = async () => {
      try {
        const subcategoriesData = await fetchSubcategoriesByCategorySlug(slug); // Fetch subcategories by slug
        console.log("Subcategories Data before setting state:", subcategoriesData); // Log the fetched subcategories
        setSubcategories(subcategoriesData); // Set the fetched subcategories
        console.log("Subcategories State after setting:", subcategories); // Log after setting the state
      } catch (err) {
        setError('Failed to fetch subcategories');
        console.error(err);
      } finally {
        setIsLoading(false); // Always stop loading
      }
    };

    if (slug) {
      fetchSubcategories(); // Fetch subcategories when slug is available
    }
  }, [slug, categoryData]); // Dependency array includes slug and categoryData

  // Handle subcategory click to navigate to the subcategory's page
  const handleSubcategoryClick = (subcategorySlug) => {
    router.push(`/customer/pages/subcategories/${subcategorySlug}`);
  };
  
  // Background colors for subcategory cards
  const backgroundColors = ['bg-red-100', 'bg-green-100', 'bg-blue-100', 'bg-pink-100', 'bg-gray-100', 'bg-yellow-100'];

  // Display loading spinner when data is still being fetched
  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <ThreeDots height="80" width="80" radius="9" color="#3498db" ariaLabel="three-dots-loading" visible={true} />
      </div>
    );
  }

  if (error) {
    return <div>Error: {error}</div>; // Show error message if fetching fails
  }

  // Log subcategories to ensure they are being set in the state
  console.log("Subcategories State in render:", subcategories);

  return (
    <div className="container mx-auto px-4 py-8 bg-white">
      <h2 className="text-2xl font-semibold mb-6">{categoryData?.name || 'Category'} Subcategories</h2>
      
      {subcategories && subcategories.length > 0 ? ( // Check if subcategories array exists and has length
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {subcategories.map((subcategory, index) => (
            <motion.div
              key={subcategory.id}
              className={`${backgroundColors[index % backgroundColors.length]} shadow-lg overflow-hidden text-center p-2 cursor-pointer`}
              onClick={() => handleSubcategoryClick(subcategory.slug)}
              whileHover={{ scale: 1.05, boxShadow: '0px 10px 20px rgba(0, 0, 0, 0.1)' }}
              transition={{ duration: 0.3 }}
              style={{ minHeight: '200px' }}
            >
              {subcategory.imageUrl ? (
                <motion.img
                  src={`https://murshadpkdata.advanceaitool.com/uploads/${subcategory.imageUrl}`}
                  alt={subcategory.name}
                  className="w-full h-40 object-cover mb-2 rounded"
                  whileHover={{ scale: 1.1 }}
                  transition={{ duration: 0.3 }}
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = '/fallback-image.jpg'; // Use fallback image on error
                  }}
                />
              ) : (
                <img
                  src="/fallback-image.jpg"
                  alt={subcategory.name}
                  className="w-full h-40 object-cover mb-2 rounded"
                />
              )}
              <p className="text-lg font-normal">{subcategory.name}</p>
            </motion.div>
          ))}
        </div>
      ) : (
        <p className="text-gray-500">No subcategories available for this category.</p> // Message if no subcategories found
      )}
    </div>
  );
};

export default CategoryPage;
