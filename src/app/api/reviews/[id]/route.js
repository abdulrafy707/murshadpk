import { NextResponse } from 'next/server';
import prisma from '@/app/util/prisma';

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
  
  
  // PUT - Approve or update a review by ID
export async function PUT(request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json({ message: 'Review ID is required' }, { status: 400 });
    }

    const data = await request.json();

    const updatedReview = await prisma.review.update({
      where: { id: Number(id) },
      data: {
        rating: data.rating,
        comment: data.comment,
        productId: data.productId,
        status: data.status,
      },
    });

    return NextResponse.json({
      status: 200,
      message: 'Review updated successfully',
      data: updatedReview,
    });
  } catch (error) {
    console.error('Error updating review:', error);
    return NextResponse.json(
      { message: 'Failed to update review', error: error.message },
      { status: 500 }
    );
  }
}
