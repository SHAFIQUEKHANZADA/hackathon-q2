import { NextRequest, NextResponse } from "next/server";
import { groq } from "next-sanity";
import { client } from "@/sanity/lib/client";

export async function GET(req: NextRequest) {
  console.log(req)
    try {
      const query = groq`
      *[_type in ["outdoor", "home_furniture"]]{
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
        category
      }
      `;
  
      const fetchedProducts = await client.fetch(query);
  
      console.log('Fetched product data:', fetchedProducts);
  
      if (!fetchedProducts || !Array.isArray(fetchedProducts)) {
        console.error('No products found');
        return NextResponse.json(
          { error: "No products found" },
          { status: 404 }
        );
      }
  
      return NextResponse.json({ products: fetchedProducts });
    } catch (error) {
      console.error('Error fetching product:', error);
      return NextResponse.json(
        { error: "Failed to fetch product details." },
        { status: 500 }
      );
    }
  }
  