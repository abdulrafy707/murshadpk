import { NextResponse } from 'next/server';
import prisma from '../../../util/prisma';
const generateSlug = (name) => {
  return name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
};

// Get subcategories by category slug
export async function GET(request, { params }) {
  try {
    console.log('Request parameters:', params); // Log the parameters

    const { slug } = params;

    if (!slug) {
      return NextResponse.json(
        { message: 'Slug is required', status: false },
        { status: 400 }
      );
    }

    // Fetch subcategory by slug
    const subcategory = await prisma.subcategory.findUnique({
      where: { slug },
    });

    if (!subcategory) {
      return NextResponse.json(
        { message: `Subcategory with slug "${slug}" not found`, status: false },
        { status: 404 }
      );
    }

    return NextResponse.json({ status: true, data: subcategory });
  } catch (error) {
    console.error('Error in fetching subcategory:', error.message);
    return NextResponse.json(
      { message: 'Failed to fetch subcategory', status: false, error: error.message },
      { status: 500 }
    );
  }
}

export async function PUT(request, { params }) {
  try {
    const { slug } = params;
    const { name, categoryId, imageUrl, meta_title, meta_description, meta_keywords } = await request.json();

    // Update subcategory by slug
    const updatedSubcategory = await prisma.subcategory.update({
      where: { slug },
      data: {
        name,
        slug: generateSlug(name),  // Update slug
        categoryId: parseInt(categoryId, 10),
        imageUrl,
        meta_title,
        meta_description,
        meta_keywords,
        updatedAt: new Date(),
      },
    });

    return NextResponse.json({
      status: true,
      message: 'Subcategory updated successfully',
      data: updatedSubcategory,
    });
  } catch (error) {
    console.error('Error updating subcategory:', error);
    return NextResponse.json(
      {
        message: 'Failed to update subcategory',
        status: false,
        error: error.message,
      },
      { status: 500 }
    );
  }
}

export async function DELETE(request, { params }) {
  try {
    const { slug } = params;

    if (!slug) {
      return NextResponse.json(
        { message: 'Slug is required', status: false },
        { status: 400 }
      );
    }

    // Delete subcategory by slug
    const deletedSubcategory = await prisma.subcategory.delete({
      where: { slug },
    });

    return NextResponse.json({
      status: 200,
      message: 'Subcategory deleted successfully',
      data: deletedSubcategory,
    });
  } catch (error) {
    console.error('Error deleting subcategory:', error);
    return NextResponse.json(
      {
        message: 'Failed to delete subcategory',
        status: false,
        error: error.message,
      },
      { status: 500 }
    );
  }
}