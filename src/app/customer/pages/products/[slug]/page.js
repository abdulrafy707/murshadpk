// app/customer/pages/products/[slug]/page.js

import ProductPage from './product'; // Import your ProductPage component
import { notFound } from 'next/navigation';

// Fetch product data server-side using async function
async function getProductData(slug) {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';

  try {
    const res = await fetch(`${apiUrl}/api/products/${slug}`, { cache: 'no-store' });

    if (!res.ok) {
      console.error('Failed to fetch product data:', res.status);
      return null;
    }

    const data = await res.json();
    return data.data.product;
  } catch (error) {
    console.error('Error fetching product data:', error);
    return null;
  }
}

// Metadata generation
export async function generateMetadata({ params }) {
  const { slug } = params; // Changed from 'id' to 'slug'
  const product = await getProductData(slug); // Fetch using 'slug'

  if (!product) {
    return {
      title: 'Product not found',
      description: 'No product information available',
    };
  }

  return {
    title: product.meta_title || product.name || 'Product Title',
    description: product.meta_description || 'Product Description',
    keywords: product.meta_keywords || 'Product Keywords',
  };
}

const ProductDetailsPage = async ({ params }) => {
  const { slug } = params; // Changed from 'id' to 'slug'

  // Fetch the product data using 'slug'
  const product = await getProductData(slug);

  // Handle product not found
  if (!product) {
    return notFound(); // Use Next.js built-in 404 handling
  }

  // Return the ProductPage component with the fetched product data
  return <ProductPage productData={product} />;
};

export default ProductDetailsPage;
