'use client';
import { useState } from 'react';
import Cookies from 'js-cookie';
import { 
  FaUsers, 
  FaSignOutAlt, 
  FaChevronDown, 
  FaCube, 
  FaShoppingCart, 
  FaTags, 
  FaPaintBrush, 
  FaRuler, 
  FaCogs, 
  FaTicketAlt, 
  FaImages, 
  FaStar, 
  FaBlog // Import FaBlog for blog icon (can be adjusted)
} from 'react-icons/fa';

const Sidebar = ({ setActiveComponent }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState({
    customers: false,
    products: false,
    orders: false,
    categories: false,
    size: false,
    color: false,
    settings: false,
    coupons: false,
    sliders: false, 
    socialmedia: false, 
    blog: false // Added blog state
  });

  const toggleDropdown = (key) => {
    setIsDropdownOpen((prevState) => ({
      ...prevState,
      [key]: !prevState[key],
    }));
  };

  const handleLogout = () => {
    Cookies.remove('token');
    window.location.href = '/admin';
  };

  return (
    <div className="bg-gray-700 text-white min-h-screen flex flex-col text-sm" style={{ width: '250px' }}>
      <div className="p-4 text-center">
        <img width={100} height={100} src="/murshadlogo.png" alt="Profile" className="rounded-full mx-auto mb-2" />
        <h2 className="text-lg font-semibold">Murshapk</h2>
        <p className="text-green-400">● Online</p>
      </div>
      <div className="p-4 border-t border-gray-700">
        <ul className="mt-4 space-y-2">
          <li>
            <button
              className="flex items-center w-full p-2 hover:bg-blue-700 rounded focus:outline-none"
              onClick={() => toggleDropdown('customers')}
            >
              <FaUsers className="h-5 w-5" />
              <span className="ml-2">Customers Data</span>
              <FaChevronDown className="h-3 w-3 ml-auto" />
            </button>
            {isDropdownOpen.customers && (
              <ul className="ml-8 mt-2 space-y-2">
                <li>
                  <a href='/admin/pages/customer'>
                    <button className="flex items-center p-2 hover:bg-blue-700 rounded">
                      <span className="ml-2">Customers</span>
                    </button>
                  </a>
                </li>
              </ul>
            )}
          </li>
          
          <li>
            <button
              className="flex items-center w-full p-2 hover:bg-blue-700 rounded focus:outline-none"
              onClick={() => toggleDropdown('products')}
            >
              <FaCube className="h-5 w-5" />
              <span className="ml-2">Products</span>
              <FaChevronDown className="h-3 w-3 ml-auto" />
            </button>
            {isDropdownOpen.products && (
              <ul className="ml-8 mt-2 space-y-2">
                <li>
                  <a href='/admin/pages/Products'>
                    <button className="flex items-center p-2 hover:bg-blue-700 rounded">
                      <span className="ml-2 text-md">All Products</span>
                    </button>
                  </a>
                </li>
                <li>
                  <a href='/admin/pages/add-product'>
                    <button className="flex items-center p-2 hover:bg-blue-700 rounded">
                      <span className="ml-2">Add Products</span>
                    </button>
                  </a>
                </li>
              </ul>
            )}
          </li>

          <li>
            <button
              className="flex items-center w-full p-2 hover:bg-blue-700 rounded focus:outline-none"
              onClick={() => toggleDropdown('orders')}
            >
              <FaShoppingCart className="h-5 w-5" />
              <span className="ml-2">Orders</span>
              <FaChevronDown className="h-3 w-3 ml-auto" />
            </button>
            {isDropdownOpen.orders && (
              <ul className="ml-8 mt-2 space-y-2">
                <li>
                  <a href='/admin/pages/orders'>
                    <button className="flex items-center p-2 hover:bg-blue-700 rounded">
                      <span className="ml-2">View Orders</span>
                    </button>
                  </a>
                </li>
              </ul>
            )}
          </li>

          <li>
            <button
              className="flex items-center w-full p-2 hover:bg-blue-700 rounded focus:outline-none"
              onClick={() => toggleDropdown('categories')}
            >
              <FaTags className="h-5 w-5" />
              <span className="ml-2">Categories</span>
              <FaChevronDown className="h-3 w-3 ml-auto" />
            </button>
            {isDropdownOpen.categories && (
              <ul className="ml-8 mt-2 space-y-2">
                <li>
                  <a href='/admin/pages/categories'>
                    <button className="flex items-center p-2 hover:bg-blue-700 rounded">
                      <span className="ml-2">Categories</span>
                    </button>
                  </a>
                </li>
                <li>
                  <a href='/admin/pages/subcategories'>
                    <button className="flex items-center p-2 hover:bg-blue-700 rounded">
                      <span className="ml-2">SubCategory</span>
                    </button>
                  </a>
                </li>
              </ul>
            )}
          </li>

          <li>
            <button
              className="flex items-center w-full p-2 hover:bg-blue-700 rounded focus:outline-none"
              onClick={() => toggleDropdown('size')}
            >
              <FaRuler className="h-5 w-5" />
              <span className="ml-2">Size</span>
              <FaChevronDown className="h-3 w-3 ml-auto" />
            </button>
            {isDropdownOpen.size && (
              <ul className="ml-8 mt-2 space-y-2">
                <li>
                  <a href='/admin/pages/size'>
                    <button className="flex items-center p-2 hover:bg-blue-700 rounded">
                      <span className="ml-2">Sizes</span>
                    </button>
                  </a>
                </li>
              </ul>
            )}
          </li>

          <li>
            <button
              className="flex items-center w-full p-2 hover:bg-blue-700 rounded focus:outline-none"
              onClick={() => toggleDropdown('color')}
            >
              <FaPaintBrush className="h-5 w-5" />
              <span className="ml-2">Color</span>
              <FaChevronDown className="h-3 w-3 ml-auto" />
            </button>
            {isDropdownOpen.color && (
              <ul className="ml-8 mt-2 space-y-2">
                <li>
                  <a href='/admin/pages/color'>
                    <button className="flex items-center p-2 hover:bg-blue-700 rounded">
                      <span className="ml-2">Colors</span>
                    </button>
                  </a>
                </li>
              </ul>
            )}
          </li>

          <li>
            <button
              className="flex items-center w-full p-2 hover:bg-blue-700 rounded focus:outline-none"
              onClick={() => toggleDropdown('settings')}
            >
              <FaCogs className="h-5 w-5" />
              <span className="ml-2">Settings</span>
              <FaChevronDown className="h-3 w-3 ml-auto" />
            </button>
            {isDropdownOpen.settings && (
              <ul className="ml-8 mt-2 space-y-2">
                <li>
                  <a href='/admin/pages/settings'>
                    <button className="flex items-center p-2 hover:bg-blue-700 rounded">
                      <span className="ml-2">Settings</span>
                    </button>
                  </a>
                </li>
                <li>
                  <a href='/admin/pages/facebook-pixel'>
                    <button className="flex items-center p-2 hover:bg-blue-700 rounded">
                      <span className="ml-2">Facebook Pixel</span>
                    </button>
                  </a>
                </li>
              </ul>
            )}
          </li>

          <li>
            <button
              className="flex items-center w-full p-2 hover:bg-blue-700 rounded focus:outline-none"
              onClick={() => toggleDropdown('coupons')}
            >
              <FaTicketAlt className="h-5 w-5" />
              <span className="ml-2">Coupons</span>
              <FaChevronDown className="h-3 w-3 ml-auto" />
            </button>
            {isDropdownOpen.coupons && (
              <ul className="ml-8 mt-2 space-y-2">
                <li>
                  <a href='/admin/pages/coupons'>
                    <button className="flex items-center p-2 hover:bg-blue-700 rounded">
                      <span className="ml-2">Coupons</span>
                    </button>
                  </a>
                </li>
              </ul>
            )}
          </li>

          <li>
            <button
              className="flex items-center w-full p-2 hover:bg-blue-700 rounded focus:outline-none"
              onClick={() => toggleDropdown('sliders')} // Toggle for sliders
            >
              <FaImages className="h-5 w-5" />
              <span className="ml-2">Slider</span>
              <FaChevronDown className="h-3 w-3 ml-auto" />
            </button>
            {isDropdownOpen.sliders && (
              <ul className="ml-8 mt-2 space-y-2">
                <li>
                  <a href='/admin/pages/slider'>
                    <button className="flex items-center p-2 hover:bg-blue-700 rounded">
                      <span className="ml-2">View Sliders</span>
                    </button>
                  </a>
                </li>
              </ul>
            )}
          </li>

          <li>
            <button
              className="flex items-center w-full p-2 hover:bg-blue-700 rounded focus:outline-none"
              onClick={() => toggleDropdown('socialmedia')} // Toggle for social media
            >
              <FaUsers className="h-5 w-5" />
              <span className="ml-2">Social Media</span>
              <FaChevronDown className="h-3 w-3 ml-auto" />
            </button>
            {isDropdownOpen.socialmedia && (
              <ul className="ml-8 mt-2 space-y-2">
                <li>
                  <a href='/admin/pages/socialmedia'>
                    <button className="flex items-center p-2 hover:bg-blue-700 rounded">
                      <span className="ml-2">Manage Social Media</span>
                    </button>
                  </a>
                </li>
              </ul>
            )}
          </li>

          {/* Blog Dropdown */}
          <li>
            <button
              className="flex items-center w-full p-2 hover:bg-blue-700 rounded focus:outline-none"
              onClick={() => toggleDropdown('blog')} // Toggle for blog
            >
              <FaBlog className="h-5 w-5" />
              <span className="ml-2">Blog</span>
              <FaChevronDown className="h-3 w-3 ml-auto" />
            </button>
            {isDropdownOpen.blog && (
              <ul className="ml-8 mt-2 space-y-2">
                <li>
                  <a href='/admin/pages/Blogs'>
                    <button className="flex items-center p-2 hover:bg-blue-700 rounded">
                      <span className="ml-2">Add Blog</span>
                    </button>
                  </a>
                </li>
                <li>
                  <a href='/admin/pages/BlogCategory'>
                    <button className="flex items-center p-2 hover:bg-blue-700 rounded">
                      <span className="ml-2">Blog Categories</span>
                    </button>
                  </a>
                </li>
              </ul>
            )}
          </li>

          <li>
            <button
              className="flex items-center w-full p-2 hover:bg-blue-700 rounded focus:outline-none"
              onClick={() => toggleDropdown('reviews')}
            >
              <FaStar className="h-5 w-5" />
              <span className="ml-2">Customer Reviews</span>
              <FaChevronDown className="h-3 w-3 ml-auto" />
            </button>
            {isDropdownOpen.reviews && (
              <ul className="ml-8 mt-2 space-y-2">
                <li>
                  <a href='/admin/pages/reviews'>
                    <button className="flex items-center p-2 hover:bg-blue-700 rounded">
                      <span className="ml-2">View Reviews</span>
                    </button>
                  </a>
                </li>
              </ul>
            )}
          </li>
          
          <li>
            <button
              className="flex items-center w-full p-2 hover:bg-blue-700 rounded focus:outline-none"
              onClick={handleLogout}
            >
              <FaSignOutAlt className="h-5 w-5" />
              <span className="ml-2">Logout</span>
            </button>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
