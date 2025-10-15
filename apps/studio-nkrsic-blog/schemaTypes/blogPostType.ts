import { defineField, defineType } from 'sanity'

export const blogPostType = defineType({
    name: 'blogPost',
    title: 'Blog Post',
    type: 'document',
    fields: [
        defineField({
            name: 'title',
            type: 'string',
        }),
        defineField({
            name: 'slug',
            type: 'slug'
        }),
        defineField({
            name: 'headline',
            type: 'reference',
            to: [{ type: 'artist' }]
        }),
        defineField({
            name: 'image',
            type: 'image'
        }),
        defineField({
            name: 'details',
            type: 'array',
            of: [
                { type: 'block' },
                {
                    type: 'code',
                    title: 'Code Block',
                    options: {
                        withFilename: true,
                        language: 'javascript', // default language (optional)
                    },
                },
            ]
        }),
    ],
})