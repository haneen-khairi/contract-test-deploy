import { TestimonialsData } from "@/types/types";
import { NextApiRequest, NextApiResponse } from "next";

interface ErrorResponse {
    error: string;
}

async function fetchTestimonialsData(): Promise<TestimonialsData> {
    const response = await fetch("https://api.example.com/testimonials");
    const data = await response.json();
    return data;
}

export default async function handler(req: NextApiRequest, res: NextApiResponse<TestimonialsData | ErrorResponse>) {
    try {
        const testimonialsData = await fetchTestimonialsData();
        res.status(200).json(testimonialsData);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Failed to fetch data" });
    }
}
