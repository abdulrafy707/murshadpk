'use client';

import React, { useState, useEffect } from 'react';
import RelatedBlogs from '../../../components/RelatedBlogs';
import { ThreeDots } from 'react-loader-spinner';

const BlogDetailPage = ({ id }) => {
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (id) {
      const fetchBlog = async () => {
        try {
          const response = await fetch(`/api/blog/${id}`); // Replace with your API endpoint
          if (!response.ok) {
            throw new Error('Failed to fetch blog details');
          }
          const data = await response.json();
          setBlog(data);
        } catch (error) {
          setError(error.message);
        } finally {
          setLoading(false);
        }
      };

      fetchBlog();
    }
  }, [id]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <ThreeDots
          height="80"
          width="80"
          radius="9"
          color="#3498db"
          ariaLabel="three-dots-loading"
          visible={true}
        />
      </div>
    );
  }

  if (error) {
    return <div className="text-center text-red-500">{error}</div>;
  }

  if (!blog) {
    return <div className="text-center text-red-500">Blog not found</div>;
  }

  return (
    <div className="container bg-white h-full mx-auto py-4 px-4 sm:px-6 lg:px-8">
      <h1 className="text-3xl sm:text-4xl lg:text-5xl font-semibold mb-4 lg:mb-10">
        {blog.title}
      </h1>
      <div className="lg:flex lg:space-x-8">
        {/* Main blog content */}
        <div className="lg:w-3/4">
          <img
            src={`https://murshadpkdata.advanceaitool.com/uploads/${blog.image}`}
            alt={blog.title}
            className="w-full h-[200px] sm:h-[300px] lg:h-[400px] object-cover mb-4"
          />

          <div
            className="text-lg sm:text-base text-gray-700 mt-4"
            dangerouslySetInnerHTML={{ __html: blog.description }}
          ></div>

          <div className="mt-4 lg:mt-8 text-sm sm:text-base text-gray-700">
            <div>{blog.content}</div>
          </div>
        </div>

        {/* Related blogs sidebar */}
        <div className="lg:w-1/4 mt-8 lg:mt-0">
          <RelatedBlogs category={blog.category} currentBlogId={blog.id} />
        </div>
      </div>
    </div>
  );
};

export default BlogDetailPage;
