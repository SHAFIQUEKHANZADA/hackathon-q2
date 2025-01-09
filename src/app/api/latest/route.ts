 import { NextResponse } from "next/server";
import { client } from "@/sanity/lib/client";  
import { groq } from "next-sanity";
import { ProductType } from "@/components/types";

// interface Product {
//   title: string;
//   price: number;
//   salePrice: number;
//   images: {
//     asset: {
//       _ref: string;
//     };
//   };
//   slug: string;
//   productDetails: string[];
//   tags: string[];
//   stock: string;
//   subCategory: string;
// }

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const tag = searchParams.get("specialTag");

  console.log(`Selected tag: ${tag}`);   

  // Check if the tag parameter is valid
  if (!tag || !["newarrival", "bestSeller", "featured", "specialoffer"].includes(tag)) {
    return NextResponse.json(
      { error: "Invalid or missing tag parameter." },
      { status: 400 }
    );
  }

  try {
    // Query using the selected tag
    const query = groq`
      *[_type in ["outdoor", "home_furniture", "office"] && specialTag in ["${tag}"]] {
        title,
        slug,
        sku,
        overview,
        productdetails,
        additionalInformation,
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
        sizes,
        colors,
        productReviews,
        specialTag,
        subcategory,
        category,
      }
    `;

    console.log("Fetching products for tag:", tag); 

    const products: ProductType[] = await client.fetch(query);

    if (!products || products.length === 0) {
      console.log(`No products found for the tag: ${tag}`);  
    }

    return NextResponse.json(
      { products },
      {
        headers: {
          "Cache-Control": "no-store",
        },
      }
    );
  } catch (error) {
    console.error("Error fetching products:", error);
    return NextResponse.json(
      { error: "Failed to fetch products." },
      { status: 500 }
    );
  }
}