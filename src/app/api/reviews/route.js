import { NextResponse } from 'next/server';
import prisma from '@/app/util/prisma'; // Ensure your Prisma client is initialized correctly

// POST - Add a new review
export async function POST(request) {
    try {
      const data = await request.json();
      const { productId, reviewer, rating, comment } = data;
  
      // Input validation
      if (!productId || !reviewer || !rating || rating < 1 || rating > 5) {
        return NextResponse.json({ message: 'Invalid input' }, { status: 400 });
      }
  
      // Create a new review in the database
      const newReview = await prisma.review.create({
        data: {
          productId: Number(productId),
          reviewer,
          rating: Number(rating),
          comment,
        },
      });
  
      return NextResponse.json({
        status: 201,
        message: 'Review added successfully',
        data: newReview,
      });
    } catch (error) {
      console.error('Error creating review:', error); // Log full error message
      return NextResponse.json(
        { message: 'Failed to create review', error: error.message },
        { status: 500 }
      );
    }
  }
  

// GET - Fetch all reviews
export async function GET() {
  try {
    const reviews = await prisma.review.findMany({
      include: {
        product: true, // Including related product information
      },
    });

    return NextResponse.json(reviews);
  } catch (error) {
    console.error('Error fetching reviews:', error);
    return NextResponse.json(
      { message: 'Failed to fetch reviews', error: error.message },
      { status: 500 }
    );
  }
}

// DELETE - Delete a review by ID
export async function DELETE(request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json({ message: 'Review ID is required' }, { status: 400 });
    }

    const deletedReview = await prisma.review.delete({
      where: { id: Number(id) },
    });

    return NextResponse.json({
      status: 200,
      message: 'Review deleted successfully',
      data: deletedReview,
    });
  } catch (error) {
    console.error('Error deleting review:', error);
    return NextResponse.json(
      { message: 'Failed to delete review', error: error.message },
      { status: 500 }
    );
  }
}
