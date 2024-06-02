"use client"
import BlogCard from '@/components/blogs/BlogCard'
import { CustomAxios } from '@/utils/CustomAxios'
import { dateConverter } from '@/utils/functions'
import { Grid, GridItem } from '@chakra-ui/react'
import Image from 'next/image'
import { useSearchParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'

export default function Page() {
    const [blogDetails, setBlogDetails] = useState<any>()
    const [recentBlogs, setRecentBlogs] = useState<any[]>([])
    const blog = {
        image: "/images/blog1.svg",
        id: 1
    }
    const query = useSearchParams()
    const blogId = query.get("blogId")
    async function getBlogDetails(){
        const res = await CustomAxios(`get`, `${process.env.NEXT_PUBLIC_API_KEY}landingpage/blog/${blogId}`, {})
        console.log("res in blog", res)
        setBlogDetails(res.blog)
        setRecentBlogs(res.related_blogs)
    }
   
    useEffect(() => {
        getBlogDetails()
      return () => {
        
      }
    }, []) 
    return <section className='blogs__page'>
        <Grid templateColumns='repeat(4, 1fr)' rowGap={'32px'} columnGap={'48px'}>
            <GridItem
                colSpan={3}>
                <span className="blogs__details--time">{`Best Practices • ${dateConverter(blogDetails?.created_at || "")}`}</span>
                <h2 className="blogs__details--header">{blogDetails?.title}</h2>
                {/* <Image className='blogs__details--image' src={blogDetails?.image} width={250} height={633} alt='blog image' /> */}
                <p className="blogs__details--paragraph" dangerouslySetInnerHTML={{__html: blogDetails?.content}}></p>

            </GridItem>
            <GridItem
                colSpan={1}
            >
                <h2 className="blogs__header">More Blog Posts</h2>

                <Grid templateColumns='repeat(1, 1fr)' flexDirection={'column'} gap={'32px'}>
                    {recentBlogs?.length ? recentBlogs.map((blogRecent: any) =><BlogCard key={blogRecent.id} blog={blogRecent} /> ): ""}
                </Grid>
            </GridItem>
        </Grid>

    </section>
}
