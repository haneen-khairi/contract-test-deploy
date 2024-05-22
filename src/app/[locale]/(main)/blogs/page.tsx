"use client"
import React, { useEffect, useState } from 'react'
import BlogCard from '@/components/blogs/BlogCard'
import { Grid } from '@chakra-ui/react'
import ResponsivePagination from 'react-responsive-pagination'

import 'react-responsive-pagination/themes/classic.css';
import { CustomAxios } from '@/utils/CustomAxios';
export default function Page() {
    const blog = {
        image: "/images/blog1.svg",
        title: "asdsadas",
        content: "asdasdas",
        id: 1
    }
    const totalPages = 10;
    const [currentPage, setCurrentPage] = useState(1);
    const [blogs, setBlogs] = useState<any[]>([])
    const [recentBlogs, setRecentBlogs] = useState<any[]>([])
    function handlePageChange(page: any) {
      setCurrentPage(page);
      // ... do something with `page`
    }
    async function getBlogs(){
        const res = await CustomAxios(`get`, `${process.env.NEXT_PUBLIC_API_KEY}landingpage/blog`, {})
        console.log("res in blogs", res)
        setBlogs(res.data)
    }
    async function getRecentBlogs(){
        const res = await CustomAxios(`get`, `${process.env.NEXT_PUBLIC_API_KEY}landingpage/blog?recent=true`, {})
        console.log("res in recent blogs", res)
        setRecentBlogs(res.data)
    }
    useEffect(() => {
        getBlogs()
        getRecentBlogs()
      return () => {
        
      }
    }, [])
    
    return <section className=''>
        <section className="blogs__section">
            <h2 className="blogs__header">Recent blog posts</h2>
            <Grid templateColumns='repeat(2, 1fr)' rowGap={'32px'} columnGap={'48px'}>
                {blogs.length > 0 && recentBlogs.filter((_, index) => index === 0).map((blog) => <BlogCard key={blog.id} blog={blog} />)}
                <div>
                    {blogs.length > 0 && recentBlogs.slice(1).map((blog) => <BlogCard reverse key={blog.id} blog={blog} />)}

                </div>
            </Grid>
        </section>
        <section className="blogs__section">
            <h2 className="blogs__header">All blogs</h2>
            <Grid templateColumns='repeat(3, 1fr)' rowGap={'32px'} columnGap={'48px'}>
                {blogs.length > 0 && blogs.map((blog) => <BlogCard key={blog.id} blog={blog} />)}
            </Grid>
            
                <ResponsivePagination
      total={totalPages}
      current={currentPage}
      onPageChange={page => handlePageChange(page)}
    />
        </section>
    </section>
}
