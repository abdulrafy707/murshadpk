// pages/blog.js
'use client'
import { useState, useEffect } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import BlogCategorySlider from './components/BlogSlider';
import Subscribe from './components/Subcribe';
import BlogSection from './components/Blogsection';

export default function Blog() {
  const [featuredPost, setFeaturedPost] = useState(null);
  const [blogs, setBlogs] = useState([]);
  const [visibleBlogs, setVisibleBlogs] = useState(6); // Number of blogs to display initially

  useEffect(() => {
    // Fetch blogs from API
    const fetchBlogs = async () => {
      const response = await fetch('/api/blog');
      const data = await response.json();
      setBlogs(data);
      setFeaturedPost(data[0]);
    };

    fetchBlogs();
  }, []);

  const handleRelatedPostClick = (post) => {
    setFeaturedPost(post);
  };

  const showMoreBlogs = () => {
    setVisibleBlogs((prev) => prev + 6); // Show 6 more blogs each time button is clicked
  };

  return (
   
      <div className=" bg-white">
        <main className="container mx-auto px-4 py-4">
          <h1 className='text-4xl font-bold text-center '>Blog Page</h1>
          {blogs.length > 0 && (
            <BlogCategorySlider category="ecommerece technology" blogs={blogs} />
          )}
          <BlogPosts blogs={blogs.slice(0, visibleBlogs)} /> {/* Show only visible blogs */}
          {visibleBlogs < blogs.length && ( // Show "Show More" button only if there are more blogs to show
            <div className="text-center mt-8">
              <button
                onClick={showMoreBlogs}
                className="bg-[#06089B] text-white w-40 h-10 text-sm font-semibold px-4 py-2 rounded-lg hover:bg-yellow-600"
              >
                Show More Blogs
              </button>
            </div>
          )}
        </main>
        <BlogSection blogs={blogs} title="Fashion" />
        <Subscribe />
      </div>

  );
}

function BlogPosts({ blogs }) {
  return (
    <div className="mt-12">
      <h2 className="text-3xl font-bold mb-8">Latest Blog Posts</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {blogs.map((post, index) => (
          <div key={index} className="bg-white rounded-lg shadow-md overflow-hidden">
            <img
              src={`https://murshadpkdata.advanceaitool.com/uploads/${post.image} `}
              alt={post.title}
              width={400}
              height={300}
              className="w-full h-48 object-cover"
            />
            <div className="p-6">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-gray-500">{post.createdAt}</span>
                <span className="text-sm bg-green-500 rounded-full px-2 py-1 text-white">{post.category}</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">{post.title}</h3>
              <div
                className="text-gray-700 text-sm overflow-hidden text-ellipsis"
                style={{
                  display: '-webkit-box',
                  WebkitLineClamp: 3, // Limit to 3 lines
                  WebkitBoxOrient: 'vertical',
                }}
                dangerouslySetInnerHTML={{ __html: post.description }}
              >
              </div>
              <Link href={`/pages/blog/${post.id}`} className="text-blue-600 hover:underline">
                Read more
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
