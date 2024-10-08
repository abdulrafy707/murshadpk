// pages/api/productsBySubcategorySlug.js

import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req, res) {
  const { slug } = req.query; // Get the slug from the query parameters

  if (!slug) {
    return res.status(400).json({ error: 'Subcategory slug is required.' });
  }

  try {
    // Fetch the subcategory using the slug
    const subcategory = await prisma.subcategory.findUnique({
      where: {
        slug: slug,
      },
      include: {
        products: true, // Include associated products
      },
    });

    if (!subcategory) {
      return res.status(404).json({ error: 'Subcategory not found.' });
    }

    // Return the products associated with the found subcategory
    return res.status(200).json(subcategory.products);
  } catch (error) {
    console.error('Error fetching products:', error);
    return res.status(500).json({ error: 'Internal Server Error' });
  } finally {
    await prisma.$disconnect(); // Disconnect from the database
  }
}
