import { NextResponse } from "next/server";
import { groq } from "next-sanity";
import { client } from "@/sanity/lib/client";
import { ProductType } from "@/components/types";

export async function GET(
  req: Request,
  { params }: { params: { category: string; subcategory: string } }
) {
  try {
    const { category, subcategory } = params;

    const validCategories = ["home_furniture", "office", "outdoor"];
    if (!validCategories.includes(category)) {
      return NextResponse.json(
        { error: "Invalid category" },
        { status: 400 }
      );
    }

    const query = groq`
      *[_type == "${category}" && subcategory == "${subcategory}"]{
        title,
        slug,
        sku,
        overview,
        productdetails,
        additionalInformation,
        images[] {
          asset->{
            _id,
            url
          },
          alt
        },
        price,
        salePrice,
        stockStatus,
        sizes,
        colors,
        totalReviews,
        productReviews {
          averageRating,
          totalReviews,
          reviews[] {
            reviewername,
            rating,
            comment
          }
        },
        specialTag,
        subcategory,
        category,
      }
    `;

    const fetchedProducts: ProductType[] = await client.fetch(query);

    if (!fetchedProducts || fetchedProducts.length === 0) {
      return NextResponse.json(
        { error: "No products found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ products: fetchedProducts });
  } catch (error) {
    console.error("Error fetching products:", error);
    return NextResponse.json(
      { error: "Failed to fetch product details." },
      { status: 500 }
    );
  }
}
