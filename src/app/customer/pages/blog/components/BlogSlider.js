'use client';
import { useState } from 'react';

export default function BlogCategorySlider({ category, blogs }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const blogsToShow = 1; // Show 1 blog at a time in the slider

  // Filter blogs based on the provided category
  const filteredBlogs = blogs.filter((blog) => blog.category === category);

  const handlePrevious = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? filteredBlogs.length - 1 : prevIndex - 1
    );
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === filteredBlogs.length - 1 ? 0 : prevIndex + 1
    );
  };

  return (
    <div className="w-full bg-white p-6 shadow-md">
      <h2 className="text-2xl font-bold text-blue-500 mb-4">{category}</h2>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Left column: Slider */}
        <div className="relative items-center flex col-span-1 lg:col-span-2">
          <button
            onClick={handlePrevious}
            className="text-white p-2 absolute z-50 bg-yellow-400 left-5 rounded-full hover:scale-110 transition duration-300"
          >
            <span className="text-white font-bold hover:scale-110">&#10094;</span>
          </button>
          <button
            onClick={handleNext}
            className="text-white p-2 absolute z-50 bg-yellow-400 right-5 rounded-full hover:scale-110 transition duration-300"
          >
            <span className="text-white font-bold hover:scale-110">&#10095;</span>
          </button>
          <div className="relative w-full overflow-hidden rounded-lg shadow-xl">
            <div
              className="flex transition-transform duration-700 ease-in-out"
              style={{ transform: `translateX(-${currentIndex * 100}%)` }}
            >
              {filteredBlogs.map((blog, index) => (
                <div
                  key={index}
                  className="w-full flex-shrink-0"
                  style={{ flexBasis: '100%' }} // Ensures each slide takes full width
                >
                  <a href={`/pages/blog/${blog.id}`}>
                    <div className="relative w-full h-64 sm:h-80 lg:h-[700px]">
                      <img
                        src={`https://murshadpkdata.advanceaitool.com/uploads/${blog.image}`}
                        alt={blog.title}
                        className="absolute inset-0 w-full h-full object-cover rounded-lg"
                      />
                      <div className="absolute bottom-0 bg-black bg-opacity-50 text-white p-4 w-full rounded-b-lg">
                        <h3 className="text-lg font-semibold">{blog.title}</h3>
                      </div>
                    </div>
                  </a>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right column: Remaining blogs */}
        <div className="flex flex-col h-screen overflow-hidden space-y-4">
          {filteredBlogs
            .slice(currentIndex + 1)
            .concat(filteredBlogs.slice(0, currentIndex))
            .map((blog, index) => (
              <div key={index} className="flex items-center space-x-4">
                <div className="w-1/3">
                  <img
                    src={`https://murshadpkdata.advanceaitool.com/uploads/${blog.image}`}
                    alt={blog.title}
                    className="w-full h-20 sm:h-24 object-cover rounded-lg"
                  />
                </div>
                <div className="flex-1">
                  <a href={`/pages/blog/${blog.id}`}>
                    <h3 className="text-lg font-semibold text-gray-900 hover:underline">
                      {blog.title}
                    </h3>
                  </a>
                  <div
    className="text-gray-700  text-sm overflow-hidden text-ellipsis"
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
            ))}
        </div>
      </div>
    </div>
  );
}
