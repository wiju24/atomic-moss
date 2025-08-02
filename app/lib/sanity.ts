import {createClient} from 'next-sanity';
import imageUrlBuilder from '@sanity/image-url'

export const client = createClient({
    projectId: "y4vc6asb",
    dataset: "production",
    apiVersion: "2022-03-25",
    useCdn: true,
});

const builder = imageUrlBuilder(client)

export function urlFor(source: unknown) {
    return builder.image(source as { asset: { _ref: string } });
}