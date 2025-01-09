import { NextResponse } from "next/server";
import { groq } from "next-sanity";
import { client } from "@/sanity/lib/client";
import { ProductType } from "@/components/types";



export async function GET(req: Request, { params }: { params: { category: string; subcategory: string; product: string } }) {
    try {
        const { category, subcategory, product: productSlug } = params;

        console.log(`Fetching product for category: ${category} and slug: ${productSlug}`);

        const query = groq`
      *[_type == "${category}"  ${subcategory} && slug.current == "${productSlug}"][0]{
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
        productReviews : {
        averageRating,
        totalReviews,
        reviews[]{
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

        // Fetch the product data from Sanity
        const fetchedProduct: ProductType = await client.fetch(query);

        // Debugging: log the fetched product data
        console.log('Fetched product data:', fetchedProduct);

        if (!fetchedProduct) {
            console.error('Product not found');
            return NextResponse.json(
                { error: "Product not found" },
                { status: 404 }
            );
        }

        return NextResponse.json({ product: fetchedProduct });
    } catch (error) {
        console.error('Error fetching product:', error);
        return NextResponse.json(
            { error: "Failed to fetch product details." },
            { status: 500 }
        );
    }
}