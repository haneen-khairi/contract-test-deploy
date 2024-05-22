export { default as PricingView } from "./Pricing";
export type Plan = {
    id: number,
    description: string
    features: Feature[]
    name: string
    price: string
    time: string
  }
  
 export type Feature = {
    id: number
    name: string
  }
  