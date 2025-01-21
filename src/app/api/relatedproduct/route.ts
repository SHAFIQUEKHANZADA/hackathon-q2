import { NextRequest, NextResponse } from "next/server";
import { groq } from "next-sanity";
import { client } from "@/sanity/lib/client";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const category = searchParams.get("category");
  const subcategory = searchParams.get("subcategory");
  const excludeSlug = searchParams.get("excludeSlug");

  if (!category || !subcategory) {
    return NextResponse.json(
      { error: "Category and subcategory are required." },
      { status: 400 }
    );
  }

  try {
    const query = groq`
      *[_type == $category && subcategory == $subcategory && slug.current != $excludeSlug]{
        title,
        slug,
        images[]{
          asset->{
            _id,
            url
          },
          alt
        },
        price,
        salePrice,
        stockStatus,
      }
    `;

    const products = await client.fetch(query, {
      category,
      subcategory,
      excludeSlug,
    });

    return NextResponse.json({ products }, { status: 200 });
  } catch (error) {
    console.error("Failed to fetch related products:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
