import { client } from "@/sanity/lib/client";
import { groq } from "next-sanity";
import { NextResponse } from "next/server";

export async function GET(req: Request, { params }: { params: { category: string } }) {
  const { category } = params;

  try {
    const query = groq`
      *[_type == "blog" && category == $category] {
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

    const blogs = await client.fetch(query, { category });

    if (blogs.length === 0) {
      return NextResponse.json(
        { message: `No blogs found for category: ${category}` },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { blogs },
      {
        headers: {
          "Cache-Control": "no-store",
        },
      }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to fetch blogs for category." },
      { status: 500 }
    );
  }
}
