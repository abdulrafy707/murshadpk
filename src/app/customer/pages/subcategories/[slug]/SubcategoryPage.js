// src/pages/subcategory/[slug].js

'use client';

import React, { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import axios from 'axios';
import { ThreeDots } from 'react-loader-spinner';
import { motion } from 'framer-motion';

const SubcategoryPage = () => {
  const { slug } = useParams(); // Get the subcategory slug from the URL
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [subcategory, setSubcategory] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(1000000); // Placeholder for default max value
  const [highestPrice, setHighestPrice] = useState(0); // Track the highest price
  const router = useRouter();

  useEffect(() => {
    const fetchProductsAndSubcategory = async () => {
      setIsLoading(true);
      try {
        // Fetch all products
        const productsResponse = await axios.get('/api/products'); // Ensure this endpoint is correct
        console.log('Products API response:', productsResponse.data); // Log the entire response

        // Validate the response structure
        if (!productsResponse.data || !Array.isArray(productsResponse.data)) {
          throw new Error('Invalid products data.');
        }

        // Set all products
        setProducts(productsResponse.data);

        // Filter products by subcategorySlug matching the slug from the URL
        const filtered = productsResponse.data.filter(product => product.subcategorySlug === slug);
        setFilteredProducts(filtered); // Set filtered products

        // Find the highest price in the filtered products and set it as the max price
        if (filtered.length > 0) {
          const maxProductPrice = Math.max(...filtered.map(product => product.price), 0);
          setMaxPrice(maxProductPrice);
          setHighestPrice(maxProductPrice); // Update highest price for display
        } else {
          setMaxPrice(0);
          setHighestPrice(0);
        }

        // Fetch subcategory details
        if (slug) {
          const subcategoryResponse = await axios.get(`/api/subcategories?slug=${slug}`);
          if (subcategoryResponse.data && subcategoryResponse.data.slug) {
            setSubcategory(subcategoryResponse.data); // Set subcategory details
          } else {
            setSubcategory(null);
          }
        }
      } catch (error) {
        console.error('Error fetching subcategory data:', error.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProductsAndSubcategory();
  }, [slug]);

  const formatPrice = (price) => {
    return price.toLocaleString('en-PK', { minimumFractionDigits: 0, maximumFractionDigits: 0 });
  };

  const handleFilter = () => {
    const filtered = products.filter(product =>
      product.price >= minPrice && product.price <= maxPrice && product.subcategorySlug === slug
    );
    setFilteredProducts(filtered);
  };

  const handleProductClick = (slug) => {
    router.push(`/customer/pages/products/${slug}`);
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <ThreeDots height="80" width="80" radius="9" color="#3498db" ariaLabel="three-dots-loading" visible={true} />
      </div>
    );
  }

  return (
    <div className="container mx-auto bg-white px-4 py-8">
      <h2 className="text-2xl font-bold mb-6">
        {subcategory ? subcategory.name : 'No subcategory found'}
      </h2>

      {/* Price Filter */}
      <div className="flex flex-col sm:flex-row sm:space-x-4 mb-6">
        <div className="mb-4 sm:mb-0">
          <label className="block text-sm font-medium text-gray-700">Min Price</label>
          <input
            type="number"
            value={minPrice}
            onChange={(e) => setMinPrice(parseFloat(e.target.value) || 0)}
            className="border border-gray-300 p-2 rounded w-full sm:w-auto"
            placeholder="Min"
            min="0"
            max={highestPrice}
          />
        </div>
        <div className="mb-4 sm:mb-0">
          <label className="block text-sm font-medium text-gray-700">Max Price</label>
          <input
            type="number"
            value={maxPrice}
            onChange={(e) => setMaxPrice(parseFloat(e.target.value) || 0)}
            className="border border-gray-300 p-2 rounded w-full sm:w-auto"
            placeholder="Max"
            min="0"
            max={highestPrice} // Set the max attribute to the highest product price
          />
        </div>
        <div className="flex items-end">
          <button
            onClick={handleFilter}
            className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
          >
            Apply Filter
          </button>
        </div>
      </div>

      {/* Products */}
      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
        {filteredProducts.length > 0 ? (
          filteredProducts.map((product) => {
            const discountedPrice = product.discount ? (product.price - (product.price * product.discount / 100)).toFixed(2) : null;
            return (
              <div
                key={product.id}
                className="bg-white shadow-md rounded-sm cursor-pointer border border-gray-300 relative h-[320px] w-full min-w-[150px]"
                onClick={() => handleProductClick(product.slug)} // Navigate using slug
              >
                {product.discount && (
                  <div className="absolute z-40 top-0 left-0 bg-red-100 text-red-600 font-normal text-sm px-1 py-0.5">
                    {product.discount.toFixed(2)}% OFF
                  </div>
                )}
                <div className="relative">
                  {product.images && product.images.length > 0 ? (
                    <motion.img
                      src={`https://murshadpkdata.advanceaitool.com/uploads/${product.images[0].url}`}
                      alt={product.name}
                      className="h-[220px] w-full object-cover mb-4 rounded bg-white"
                      whileHover={{ scale: 1.1 }}
                      transition={{ duration: 0.3 }}
                    />
                  ) : (
                    <div className="h-[220px] w-full bg-gray-200 mb-4 rounded flex items-center justify-center text-gray-500">
                      No Image
                    </div>
                  )}
                  <button
                    className="absolute bottom-2 right-2 bg-teal-500 text-white h-8 w-8 flex justify-center items-center rounded-full shadow-lg hover:bg-teal-600 transition-colors duration-300"
                    onClick={(e) => {
                      e.stopPropagation(); // Prevent triggering the card's click event
                      handleProductClick(product.slug);
                    }}
                  >
                    <span className="text-xl font-bold leading-none">+</span>
                  </button>
                </div>
                <div className="px-2">
                  <div className="flex items-center justify-between py-2">
                    <div className="flex items-center">
                      {product.discount ? (
                        <div className="flex items-center justify-center gap-3 flex-row-reverse">
                          <p className="text-xs font-normal text-gray-700 line-through">
                            Rs.{formatPrice(product.price)} {/* Original Price */}
                          </p>
                          <p className="text-md font-bold text-red-700">
                            Rs.{formatPrice(discountedPrice)} {/* Discounted Price */}
                          </p>
                        </div>
                      ) : (
                        <p className="text-md font-bold text-gray-700">
                          Rs.{formatPrice(product.price)} {/* Price without discount */}
                        </p>
                      )}
                    </div>
                  </div>
                  <h3
                    className="text-sm font-normal text-gray-800 overflow-hidden hover:underline hover:text-blue-400 cursor-pointer"
                    style={{
                      display: '-webkit-box',
                      WebkitBoxOrient: 'vertical',
                      WebkitLineClamp: 2, // Limits to 2 lines
                      maxHeight: '3em', // Approximate height for 2 lines
                    }}
                    onClick={() => handleProductClick(product.slug)}
                  >
                    {product.name.toUpperCase()}
                  </h3>
                </div>
              </div>
            );
          })
        ) : (
          <p>No products found for this subcategory.</p>
        )}
      </div>
    </div>
  );
};

export default SubcategoryPage;
