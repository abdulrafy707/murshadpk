import { NextResponse } from 'next/server';
import prisma from '@/app/util/prisma';

// POST - Add a new review
export async function POST(request) {
  try {
    const data = await request.json();
    const { productId, reviewer, rating, comment } = data;

    // Input validation
    if (!productId || !reviewer || !rating || rating < 1 || rating > 5) {
      return NextResponse.json({ message: 'Invalid input' }, { status: 400 });
    }

    // Create a new review in the database with 'pending' status
    const newReview = await prisma.review.create({
      data: {
        productId: Number(productId),
        reviewer,
        rating: Number(rating),
        comment,
        status: 'pending', // Set the default status as 'pending'
      },
    });

    return NextResponse.json({
      status: 201,
      message: 'Review added successfully and is pending approval',
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


// PUT - Approve a review (set status to active)
export async function PUT(request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json({ message: 'Review ID is required' }, { status: 400 });
    }

    const updatedReview = await prisma.review.update({
      where: { id: Number(id) },
      data: {
        status: 'active', // Update the status to active
      },
    });

    return NextResponse.json({
      status: 200,
      message: 'Review approved successfully',
      data: updatedReview,
    });
  } catch (error) {
    console.error('Error approving review:', error);
    return NextResponse.json(
      { message: 'Failed to approve review', error: error.message },
      { status: 500 }
    );
  }
}