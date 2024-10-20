'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

const BlogSection = ({ blogs, title, category }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const router = useRouter();

  // Filter blogs by the provided category
  const filteredBlogs = blogs.filter(blog => blog.category === title);

  const handlePrevious = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? Math.ceil(filteredBlogs.length / blogsToShow()) - 1 : prevIndex - 1
    );
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === Math.ceil(filteredBlogs.length / blogsToShow()) - 1 ? 0 : prevIndex + 1
    );
  };

  const blogsToShow = () => {
    if (typeof window !== 'undefined') {
      if (window.innerWidth >= 1024) {
        return 4; // Large screens
      } else if (window.innerWidth >= 768) {
        return 2; // Medium screens
      } else {
        return 1; // Small screens
      }
    }
    return 4; // Default to 4 blogs per view in SSR or large screens
  };

  const handleBlogClick = (blog) => {
    // Navigate to the blog details page
    router.push(`/customer/pages/blog/${blog.id}`);
  };

  return (
    <div className="relative flex flex-col bg-white h-full justify-center items-center w-full px-4">
      <h2 className="text-2xl bg-[#06089B] font-bold mb-4 p-2 text-white w-full">{title}</h2>
      <button
        onClick={handlePrevious}
        className="text-white p-2 absolute z-50 bg-yellow-400 left-5 rounded-full hover:scale-110 transition duration-300"
        >
          <span className='text-white font-bold hover:scale-110'>&#10094;</span>
      </button>
      <button
        onClick={handleNext}
        className="text-white p-2 absolute z-50 bg-yellow-400 right-5 rounded-full hover:scale-110 transition duration-300"
        >
          <span className='text-white font-bold hover:scale-110'>&#10095;</span>
      </button>
      <div className="relative overflow-hidden rounded-lg w-full">
        <div
          className="flex transition-transform duration-700 space-x-4 ease-in-out py-10"
          style={{ transform: `translateX(-${currentIndex * (100 / blogsToShow())}%)` }}
        >
          {filteredBlogs.map((blog, index) => (
            <div
              key={index}
              className="flex-shrink-0 cursor-pointer"
              style={{ flexBasis: `${100 / blogsToShow()}%` }}
              onClick={() => handleBlogClick(blog)} // Handle click to navigate to blog details
            >
              <div className="bg-white rounded-lg shadow-lg hover:shadow-2xl transition duration-300 transform hover:-translate-y-2 h-full flex flex-col">
                <div className="relative pb-56 flex-shrink-0">
                  <img
                    src={`https://murshadpkdata.advanceaitool.com/uploads/${blog.image}`}
                    alt={blog.title}
                    className="absolute inset-0 w-full h-full object-cover rounded-t-lg"
                  />
                </div>
                <div className="p-4 flex-grow">
                  <h3 className="text-lg font-semibold mb-2 text-gray-900">
                    {blog.title}
                  </h3>
                  <div className="text-gray-700 text-sm overflow-hidden text-ellipsis"
                  style={{
                    display: '-webkit-box',
                    WebkitLineClamp: 3, // Limit to 3 lines
                    WebkitBoxOrient: 'vertical',
                  }}
                  dangerouslySetInnerHTML={{ __html: blog.description }}
                  >

                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BlogSection;
