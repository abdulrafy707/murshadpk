'use client';
import React, { useState, useEffect } from 'react';
import { MagnifyingGlassIcon, PlusIcon } from '@heroicons/react/24/outline';

const FilterableSocialMediaTable = () => {
  const [filter, setFilter] = useState('');
  const [socialMediaLinks, setSocialMediaLinks] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [isSearchVisible, setIsSearchVisible] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [newSocialMedia, setNewSocialMedia] = useState({
    id: null,
    facebook: '',
    instagram: '',
    twitter: '',
    tiktok: '',
    pinterest: '',
  });

  const fetchSocialMediaLinks = async () => {
    setIsLoading(true);
    try {
      const response = await fetch('/api/socialmedia');
      const data = await response.json();
      if (data.status) {
        setSocialMediaLinks(data.data);
        setFilteredData(data.data); // Initialize filtered data
      }
    } catch (error) {
      console.error('Error fetching social media links:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchSocialMediaLinks();
  }, []);

  useEffect(() => {
    // Ensure socialMediaLinks is an array
    if (Array.isArray(socialMediaLinks)) {
      setFilteredData(
        socialMediaLinks.filter((item) =>
          Object.values(item).some((val) =>
            String(val).toLowerCase().includes(filter.toLowerCase())
          )
        )
      );
    } else {
      setFilteredData([]);
    }
  }, [filter, socialMediaLinks]);

  const handleAddOrUpdateItem = async () => {
    setIsModalOpen(false);
    setIsLoading(true);
    try {
      const method = newSocialMedia.id ? 'PUT' : 'POST'; // Determine method based on ID presence
      const endpoint = newSocialMedia.id ? `/api/socialmedia/${newSocialMedia.id}` : '/api/socialmedia';
  
      const response = await fetch(endpoint, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newSocialMedia),
      });
  
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
  
      const responseData = await response.json();
      console.log('Response from server:', responseData);
      setNewSocialMedia({
        id: null,
        facebook: '',
        instagram: '',
        twitter: '',
        tiktok: '',
        pinterest: '',
      });
      // Reload the data after adding or updating
      await fetchSocialMediaLinks(); 
    } catch (error) {
      console.error('Error adding or updating item:', error);
    }
    setIsLoading(false);
  };

  const handleEditItem = (item) => {
    setNewSocialMedia(item);
    setIsModalOpen(true);
  };

  const handleDeleteItem = async (id) => {
    setIsLoading(true);
    try {
      await fetch(`/api/socialmedia/${id}`, {
        method: 'DELETE',
      });
      // Reload the data after deleting
      await fetchSocialMediaLinks(); 
    } catch (error) {
      console.error('Error deleting item:', error);
    }
    setIsLoading(false);
  };

  return (
    <div className=" bg-gray-100 min-h-screen">
      {isLoading && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="text-white text-xl">Loading...</div>
        </div>
      )}
      <div className="bg-white shadow rounded-lg p-4 relative">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-gray-800">Social Media Links</h2>
          <div className="flex space-x-2">
            <button
              className="text-gray-600 hover:text-gray-900 focus:outline-none"
              onClick={() => setIsSearchVisible(!isSearchVisible)}
            >
              <MagnifyingGlassIcon className="h-6 w-6" />
            </button>
            <button
              className="text-gray-600 hover:text-gray-900 focus:outline-none"
              onClick={() => {
                setNewSocialMedia({
                  id: null,
                  facebook: '',
                  instagram: '',
                  twitter: '',
                  tiktok: '',
                  pinterest: '',
                });
                setIsModalOpen(true);
              }}
            >
              <PlusIcon className="h-6 w-6" />
            </button>
          </div>
        </div>
        {isSearchVisible && (
          <div className="mb-4">
            <input
              type="text"
              placeholder="Search..."
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              className="p-2 border border-gray-300 rounded w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        )}
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Facebook</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Instagram</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Twitter</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">TikTok</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Pinterest</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {Array.isArray(filteredData) && filteredData.length > 0 ? (
                filteredData.map((item) => (
                  <tr key={item.id}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{item.id}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.facebook}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.instagram}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.twitter}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.tiktok}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.pinterest}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                      <button
                        onClick={() => handleEditItem(item)}
                        className="text-indigo-600 hover:text-indigo-900 transition duration-150 ease-in-out"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDeleteItem(item.id)}
                        className="text-red-600 hover:text-red-900 transition duration-150 ease-in-out"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="7" className="px-6 py-4 text-center text-gray-500">No data available</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-4 w-[500px] rounded shadow-lg">
            <h2 className="text-xl mb-4">{newSocialMedia.id ? 'Edit Social Media Link' : 'Add New Social Media Link'}</h2>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">Facebook URL</label>
              <input
                type="text"
                value={newSocialMedia.facebook}
                onChange={(e) => setNewSocialMedia({ ...newSocialMedia, facebook: e.target.value })}
                className="mt-1 p-2 border border-gray-300 rounded w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">Instagram URL</label>
              <input
                type="text"
                value={newSocialMedia.instagram}
                onChange={(e) => setNewSocialMedia({ ...newSocialMedia, instagram: e.target.value })}
                className="mt-1 p-2 border border-gray-300 rounded w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">Twitter URL</label>
              <input
                type="text"
                value={newSocialMedia.twitter}
                onChange={(e) => setNewSocialMedia({ ...newSocialMedia, twitter: e.target.value })}
                className="mt-1 p-2 border border-gray-300 rounded w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">TikTok URL</label>
              <input
                type="text"
                value={newSocialMedia.tiktok}
                onChange={(e) => setNewSocialMedia({ ...newSocialMedia, tiktok: e.target.value })}
                className="mt-1 p-2 border border-gray-300 rounded w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">Pinterest URL</label>
              <input
                type="text"
                value={newSocialMedia.pinterest}
                onChange={(e) => setNewSocialMedia({ ...newSocialMedia, pinterest: e.target.value })}
                className="mt-1 p-2 border border-gray-300 rounded w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="flex justify-end space-x-2">
              <button
                onClick={() => setIsModalOpen(false)}
                className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded"
              >
                Cancel
              </button>
              <button
                onClick={handleAddOrUpdateItem}
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              >
                {newSocialMedia.id ? 'Update' : 'Add'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default FilterableSocialMediaTable;
