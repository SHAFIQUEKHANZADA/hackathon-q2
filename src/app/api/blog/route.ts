import { Blogtypes } from "@/components/types";
import { client } from "@/sanity/lib/client";
import { groq } from "next-sanity";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    // Query to fetch all blogs
    const query = groq`
      *[_type == "blog" && category in ["handmade", "crafts", "wood", "interior", "design"]]
      | order(publishingDate desc)
      {
        category,
        title,
        slug,
        overview,
        content,
        mainImage {
          asset,
          alt
        },
        authorName,
        authorImage {
          asset,
          alt
        },
        publishingDate
      }
    `;
    
    // Fetch all blogs
    const blogs: Blogtypes[] = await client.fetch(query);

    // Create a map to hold the first blog of each category
    const categoryMap: { [key: string]: Blogtypes } = {};
    
    // Creating a count map for blog lengths per category
    const categoryCounts: { [key: string]: number } = {};

    blogs.forEach(blog => {
      // Map first blog for each category
      if (!categoryMap[blog.category]) {
        categoryMap[blog.category] = blog;
      }

      // Count blogs for each category
      categoryCounts[blog.category] = (categoryCounts[blog.category] || 0) + 1;
    });

    // Get the unique blogs for each category
    const filteredBlogs = Object.values(categoryMap);

    // Return both the blogs and their category counts
    return NextResponse.json(
      { blogs: filteredBlogs, blogLength: categoryCounts },
      {
        headers: {
          "Cache-Control": "no-store",
        },
      }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to fetch blogs." },
      { status: 500 }
    );
  }
}
