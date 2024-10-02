// src/app/api/reviews/route.js

import { NextResponse } from 'next/server';
import prisma from '@/app/util/prisma';

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const productId = searchParams.get('productId'); // Extract productId from query parameters

  if (!productId) {
    return NextResponse.json({ message: 'Product ID is required' }, { status: 400 });
  }

  try {
    const reviews = await prisma.review.findMany({
      where: {
        productId: Number(productId),
      },
      include: {
        product: true,
      },
    });

    return NextResponse.json({ reviews });
  } catch (error) {
    console.error('Error fetching reviews:', error);
    return NextResponse.json({ message: 'Failed to fetch reviews' }, { status: 500 });
  }
}
