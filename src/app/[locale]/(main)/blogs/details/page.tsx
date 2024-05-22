"use client"
import BlogCard from '@/components/blogs/BlogCard'
import { Grid, GridItem } from '@chakra-ui/react'
import Image from 'next/image'
import React from 'react'

export default function Page() {
    const blog = {
        image: "/images/blog1.svg",
        id: 1
    }
    return <section className='blogs__page'>
        <Grid templateColumns='repeat(4, 1fr)' rowGap={'32px'} columnGap={'48px'}>
            <GridItem
                colSpan={3}>
                <span className="blogs__details--time">{`Best Practices • 1 Jan 2024`}</span>
                <h2 className="blogs__details--header">{`Maximizing Collaboration in Contract Management with CaDas`}</h2>
                <Image className='blogs__details--image' src={blog.image} width={250} height={633} alt='blog image' />
            </GridItem>
            <GridItem
                colSpan={1}
            >
                <h2 className="blogs__header">More Blog Posts</h2>

                <Grid templateColumns='repeat(1, 1fr)' flexDirection={'column'} gap={'32px'}>
                    <BlogCard blog={blog} />
                    <BlogCard blog={blog} />
                    <BlogCard blog={blog} />
                </Grid>
            </GridItem>
        </Grid>

    </section>
}
