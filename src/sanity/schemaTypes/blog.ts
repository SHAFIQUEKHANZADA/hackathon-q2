import { defineField, defineType } from "sanity";

export const blog = defineType({
    name: "blog",
    type: "document",
    title: "Blog",
    fields: [

        defineField({
            name: "title",
            type: "string",
            title: "Blog Title",
            validation: (Rule) => Rule.required().max(100).warning("Keep the title concise."),
        }),

        defineField({
            name: "slug",
            type: "slug",
            title: "Slug",
            options: {
                source: (doc) => `${doc.title}-${Math.floor(Math.random() * 100000)}`,
                maxLength: 96,
            },
            validation: (Rule) => Rule.required().error("Slug is required."),
        }),

        defineField({
            name: "overview",
            type: "string",
            title: "Overview",
        }),


        defineField({
            name: 'content',
            type: 'array',
            of: [{ type: 'block' }, { type: 'image' }],
        }),

        defineField({
            name: "mainImage",
            type: "image",
            title: "Main Image",
            options: {
                hotspot: true,
            },
        }),

        defineField({
            name: "authorName",
            type: "string",
            title: "Author Name",
            validation: (Rule) => Rule.required().error("Author name is required."),
        }),

        defineField({
            name: "authorImage",
            type: "image",
            title: "Author Image",
            options: {
                hotspot: true,
            },
        }),

        defineField({
            name: "publishingDate",
            type: "datetime",
            title: "Publishing Date",
            validation: (Rule) => Rule.required().error("Publishing date is required."),
        }),

        // Category
        defineField({
            name: "category",
            type: "string",
            title: "Category",
            options: {
                list: [
                    { title: "Crafts", value: "crafts" },
                    { title: "Design", value: "design" },
                    { title: "Hand Made", value: "handmade" },
                    { title: "Interior", value: "interior" },
                    { title: "Wood", value: "wood" },
                ],
            },
        }),
    ],
});