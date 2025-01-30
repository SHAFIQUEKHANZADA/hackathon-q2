import { ProductType } from '@/components/types';
import { client } from '@/sanity/lib/client';
import { NextResponse } from 'next/server';
import { OpenAI } from 'openai';

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req: Request) {
    const { preferences } = await req.json();


    const products = await client.fetch(
        `*[_type in ["outdoor", "home_furniture", "office"]]{
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
    }`
    );


    const prompt = `Based on the user's preferences: ${preferences}, suggest some products from the following list:\n${products
        .map(
            (product : ProductType) => `- ${product.title}: ${product.sku}, Price: ${product.price}, Available colors: ${product.colors.join(', ')}`
        )
        .join('\n')}`;

    try {
        const response = await openai.chat.completions.create({
            model: 'gpt-3.5-turbo',
            messages: [{ role: 'user', content: prompt }],
        });

        const recommendations = response.choices[0].message.content;

        return NextResponse.json({ recommendations });
    } catch (error) {
        console.log(error)
        return NextResponse.json({ error: 'Error generating recommendations.' });
    }
}
