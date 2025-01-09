import { client } from "@/sanity/lib/client";
import { groq } from "next-sanity";
import { NextResponse } from "next/server";

export async function GET(req: Request, { params }: { params: { category: string; slug: string } }) {
  const { category, slug } = params;

  try {
    // Query to fetch the current blog post
    const query = groq`
      *[_type == "blog" && category == $category && slug.current == $slug][0] {
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

    const blog = await client.fetch(query, { category, slug });

    if (!blog) {
      return NextResponse.json(
        { message: "Blog not found." },
        { status: 404 }
      );
    }

    const recentPostsQuery = groq`
      *[_type == "blog" && category == $category && slug.current != $slug] | order(publishingDate desc) [0..4] {
        category,
        title,
        slug,
        mainImage {
          asset,
          alt
        },
        publishingDate
      }
    `;

    const recentPosts = await client.fetch(recentPostsQuery, { category, slug });

    return NextResponse.json(
      { blog, recentPosts },
      {
        headers: {
          "Cache-Control": "no-store",
        },
      }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to fetch the blog." },
      { status: 500 }
    );
  }
}
