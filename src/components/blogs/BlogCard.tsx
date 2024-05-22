import React from 'react'
import Image from "next/image"
import { Grid } from '@chakra-ui/react'
import Link from 'next/link'
import { dateConverter } from '@/utils/functions'
export default function BlogCard({
  blog,
  reverse = false
}: IBlogCardProps) {
  return <div className="blogs__card">
    <Link href={`blogs/details?blogId=${blog?.id}`}>
      {(() => {
        if (reverse) {
          return <Grid templateColumns='repeat(2, 1fr)' alignItems={'center'} gap={'24px'}>
            <Image className='blogs__card--image' src={blog?.image || ""} width={250} height={240} alt='blog image' />
            <div className="">
              <span className="blogs__card--time">{`Best Practices • ${dateConverter(blog?.created_at || "")}`}</span>
              <h2 className="blogs__card--header">{blog?.title}</h2>
              <p className="blogs__card--description" dangerouslySetInnerHTML={{__html: blog?.content || ""}}></p>

            </div>
          </Grid>
        }
        return <>
          <Image className='blogs__card--image' src={blog?.image || ""} width={250} height={240} alt='blog image' />
          <span className="blogs__card--time">{`Best Practices • ${dateConverter(blog?.created_at || "")}`}</span>
          <h2 className="blogs__card--header">{blog?.title}</h2>
          <p className="blogs__card--description" dangerouslySetInnerHTML={{__html: blog?.content || ""}}></p>
        </>
      })()}
    </Link>

  </div>
}
