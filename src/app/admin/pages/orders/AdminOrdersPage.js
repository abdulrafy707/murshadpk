'use client';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useRouter, useParams } from 'next/navigation';

const AdminOrdersPage = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [order, setOrder] = useState(null);
  const { id } = useParams();
  const router = useRouter();

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const response = await axios.get(`/api/orders/${id}`);
        const orderData = response.data;
        setOrder(orderData);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching order:', error);
        setError('Failed to fetch order details');
        setLoading(false);
      }
    };

    if (id) {
      fetchOrder();
    }
  }, [id]);

  const handleStatusChange = async (newStatus) => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.put(`/api/orders/${id}`, {
        id,
        status: newStatus,
      });
      if (response.status === 200) {
        setOrder((prevOrder) => ({ ...prevOrder, status: newStatus }));
      } else {
        setError('Failed to update status. Please try again.');
      }
    } catch (error) {
      console.error('Error updating order status:', error);
      setError('Failed to update status. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleShippingSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const response = await axios.post('/api/shipping', {
        orderId: order.id,
        shippingMethod: order.shippingMethod,
        shippingTerms: order.shippingTerms,
        shipmentDate: order.shipmentDate,
        deliveryDate: order.deliveryDate,
      });
      if (response.status === 200) {
        setOrder((prevOrder) => ({
          ...prevOrder,
          shippingMethod: order.shippingMethod,
          shippingTerms: order.shippingTerms,
          shipmentDate: order.shipmentDate,
          deliveryDate: order.deliveryDate,
        }));
      } else {
        setError('Failed to update shipping information. Please try again.');
      }
    } catch (error) {
      console.error('Error updating shipping information:', error);
      setError('Failed to update shipping information. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="text-center py-8">Loading...</div>;
  }

  if (error) {
    return <div className="text-center text-red-500">{error}</div>;
  }

  // Calculate order amounts directly from order data
  // Updated Calculation
const subtotal = order.orderItems.reduce((acc, item) => acc + item.quantity * item.price, 0);
const subtotalLessDiscount = subtotal - (order.discount ?? 0);
const totalTax = order.tax ?? 0; // Directly use tax amount from order
const total = subtotalLessDiscount + totalTax + (order.deliveryCharge ?? 0) + (order.extraDeliveryCharge ?? 0) + (order.otherCharges ?? 0);

  return (
    <div className="p-6 bg-white min-h-screen">
      <h1 className="text-3xl font-bold mb-8 text-center">Order Details</h1>
      <div className="space-y-8">
        <div className="bg-white shadow-lg rounded-lg p-6 border border-gray-200">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div>
              <h3 className="text-lg font-bold text-gray-700">General</h3>
              <div className="mt-4 space-y-2 text-gray-600">
                <div>Date created: {new Date(order.createdAt).toLocaleString()}</div>
                <div>
                  Status:
                  <select
                    value={order.status}
                    onChange={(e) => handleStatusChange(e.target.value)}
                    className="ml-2 border p-2 rounded-md bg-gray-50"
                    disabled={loading}
                  >
                    <option value="PENDING">Pending</option>
                    <option value="PAID">Paid</option>
                    <option value="SHIPPED">Shipped</option>
                    <option value="COMPLETED">Completed</option>
                    <option value="CANCELLED">Cancelled</option>
                  </select>
                </div>
                <div>Customer: {order.userId}</div>
              </div>
            </div>
            <div className="bg-gray-50 rounded-lg p-4">
              <h3 className="text-lg font-bold text-gray-700">Shipping Address</h3>
              <div className="mt-4 space-y-2 text-gray-600">
                <div>Address: {order.streetAddress}, {order.apartmentSuite}, {order.city}, {order.state}, {order.zip}, {order.country}</div>
                <div>Email address: {order.email}</div>
              </div>
            </div>
          </div>

          {/* Shipping Information Section */}
          <div className="mt-8">
            <h3 className="text-lg text-center py-2 font-bold text-gray-700">Shipping Information</h3>
            <form onSubmit={handleShippingSubmit}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="shippingMethod" className="block text-sm font-medium text-gray-700">Shipping Method</label>
                  <input
                    type="text"
                    id="shippingMethod"
                    value={order.shippingMethod}
                    onChange={(e) => setOrder(prevOrder => ({ ...prevOrder, shippingMethod: e.target.value }))}
                    className="mt-1 p-2 border border-gray-300 rounded w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label htmlFor="shippingTerms" className="block text-sm font-medium text-gray-700">Shipping Terms</label>
                  <input
                    type="text"
                    id="shippingTerms"
                    value={order.shippingTerms}
                    onChange={(e) => setOrder(prevOrder => ({ ...prevOrder, shippingTerms: e.target.value }))}
                    className="mt-1 p-2 border border-gray-300 rounded w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label htmlFor="shipmentDate" className="block text-sm font-medium text-gray-700">Shipment Date</label>
                  <input
                    type="date"
                    id="shipmentDate"
                    value={new Date(order.shipmentDate).toISOString().substr(0, 10)}
                    onChange={(e) => setOrder(prevOrder => ({ ...prevOrder, shipmentDate: e.target.value }))}
                    className="mt-1 p-2 border border-gray-300 rounded w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label htmlFor="deliveryDate" className="block text-sm font-medium text-gray-700">Delivery Date</label>
                  <input
                    type="date"
                    id="deliveryDate"
                    value={new Date(order.deliveryDate).toISOString().substr(0, 10)}
                    onChange={(e) => setOrder(prevOrder => ({ ...prevOrder, deliveryDate: e.target.value }))}
                    className="mt-1 p-2 border border-gray-300 rounded w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
              <div className="mt-4">
                <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Update Shipping Information</button>
              </div>
            </form>
          </div>

          {/* Order Items Table */}
          <div className="mt-8">
            <h3 className="text-lg text-center py-2 font-bold text-gray-700">Items</h3>
            <div className="mt-4">
              <div className="overflow-x-auto max-h-96"> {/* Limit height to 96 units */}
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">HS Code</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Description</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Picture</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">QTY</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Unit Price</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Color</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Size</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {order.orderItems.map((item, index) => (
                      <tr key={item.id}>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{index + 1}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.product ? item.product.name : 'Unknown Product'}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {item.product && item.product.images && item.product.images.length > 0 ? (
                            <img
                              src={`https://murshadpkdata.advanceaitool.com/uploads/${item.product.images[0].url}`}
                              alt={item.product.name}
                              className="w-16 h-16 object-cover rounded-md"
                            />
                          ) : (
                            <img
                              src="https://murshadpkdata.advanceaitool.com/uploads/placeholder.jpg"
                              alt="Placeholder"
                              className="w-16 h-16 object-cover rounded-md"
                            />
                          )}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.quantity}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Rs.{item.price}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Rs.{item.quantity * item.price}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          <div className="flex items-center">
                            <span
                              className="inline-block w-4 h-4 rounded-full mr-2"
                              style={{ backgroundColor: item.selectedColor || '#ccc' }} // Fallback color if not available
                            ></span>
                            {item.selectedColor ? item.selectedColor : 'N/A'}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {item.selectedSize ? item.selectedSize : 'N/A'}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Order summary */}
            <div className="mt-8 grid grid-cols-1 gap-4">
              <div className="bg-gray-50 p-4 rounded-lg">
                <div className="flex justify-between">
                  <p className="text-md font-medium text-gray-700">Subtotal:</p>
                  <p className="text-xl text-gray-700">Rs.{subtotal.toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 0 })}</p>

                </div>
                <div className="flex justify-between">
                  <p className="text-md font-medium text-gray-700">Discount:</p>
                  <p className="text-md text-gray-700">Rs.{(order.discount ?? 0).toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 0 })}</p>
                </div>
                <hr className="my-2" />
                <div className="flex justify-between">
                  <p className="text-md font-medium text-gray-700">Subtotal after Discount:</p>
                  <p className="text-md text-gray-700">Rs.{subtotalLessDiscount.toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 0 })}</p>
                </div>
                <div className="flex justify-between">
  <p className="text-md font-medium text-gray-700">Tax:</p>
  <p className="text-md text-gray-700">Rs.{totalTax.toFixed(2)}</p>
</div>

                <div className="flex justify-between">
                  <p className="text-md font-medium text-gray-700">Delivery Charges:</p>
                  <p className="text-md text-gray-700">Rs.{(order.deliveryCharge ?? 0).toFixed(2)}</p>
                </div>
                <div className="flex justify-between">
                  <p className="text-md font-medium text-gray-700">Cash on Delivery Charges:</p>
                  <p className="text-md text-gray-700">Rs.{(order.extraDeliveryCharge ?? 0).toFixed(2)}</p>
                </div>
                <div className="flex justify-between">
                  <p className="text-md font-medium text-gray-700">Other:</p>
                  <p className="text-md text-gray-700">Rs.{(order.otherCharges ?? 0).toFixed(2)}</p>
                </div>
                <hr className="my-2" />
                <div className="flex justify-between mt-4">
                  <p className="text-xl font-bold text-gray-700">Total:</p>
                  <p className="text-xl text-gray-700">Rs.{total.toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 0 })}</p>
                </div>
              </div>
            </div>

            {order.shippingMethod && (
              <div className="mt-8">
                <h3 className="text-lg text-center py-2 font-bold text-gray-700">Shipping Information</h3>
                <div className="mt-4">
                  <div className="flex justify-between">
                    <p className="text-md font-medium text-gray-700">Shipping Method:</p>
                    <p className="text-md text-gray-700">{order.shippingMethod}</p>
                  </div>
                  <div className="flex justify-between">
                    <p className="text-md font-medium text-gray-700">Shipping Terms:</p>
                    <p className="text-md text-gray-700">{order.shippingTerms}</p>
                  </div>
                  <div className="flex justify-between">
                    <p className="text-md font-medium text-gray-700">Shipment Date:</p>
                    <p className="text-md text-gray-700">{new Date(order.shipmentDate).toLocaleDateString()}</p>
                  </div>
                  <div className="flex justify-between">
                    <p className="text-md font-medium text-gray-700">Delivery Date:</p>
                    <p className="text-md text-gray-700">{new Date(order.deliveryDate).toLocaleDateString()}</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminOrdersPage;
