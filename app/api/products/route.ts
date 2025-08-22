import { NextResponse } from 'next/server';
import { client } from '../../lib/sanity';

export async function GET() {
    try {
        const query = `*[_type == "product"] | order(_createdAt desc){
            _id,
            price,
            name,
            "slug": slug.current,
            "categoryName": category->name,
            "imageUrl": images[0].asset->url
        }`;

        const products = await client.fetch(query);
        
        return NextResponse.json(products);
    } catch (error) {
        console.error('Error fetching products:', error);
        return NextResponse.json(
            { error: 'Failed to fetch products' },
            { status: 500 }
        );
    }
}
