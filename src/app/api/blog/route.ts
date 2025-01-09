import { Blogtypes } from "@/components/types";
import { client } from "@/sanity/lib/client";
import { groq } from "next-sanity";
import { NextResponse } from "next/server";

export async function GET() {
  try {
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

    blogs.forEach(blog => {
      if (!categoryMap[blog.category]) {
        categoryMap[blog.category] = blog;
      }
    });

    // Get an array of the first blog from each category
    const filteredBlogs = Object.values(categoryMap);

    return NextResponse.json(
      { blogs: filteredBlogs },
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
