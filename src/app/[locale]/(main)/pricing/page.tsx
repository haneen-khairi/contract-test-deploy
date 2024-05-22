"use client";
import React , {useEffect, useState} from 'react'
import { CustomAxios } from "@/utils/CustomAxios";
import { Plan, PricingView } from "@/views/pricing";
import { useRouter, useSearchParams } from 'next/navigation';

export default async function Pricing() {
  const router = useRouter()
  const query = useSearchParams()
  const id = query.get("id")
    const [plans, setPlans] = useState<Plan[]>([])
    async function getPlans() {
        const res = await CustomAxios(`get`, `${process.env.NEXT_PUBLIC_API_KEY}subscription/plans`, {})
        console.log("res in plans", res)
        setPlans(res)
      } 
      useEffect(() => {
        getPlans()
        // if(id){
        //   router.push(`/en/dashboard/contracts`)
        // }
      }, [id])
      
    return <PricingView plans={plans} />;
}
