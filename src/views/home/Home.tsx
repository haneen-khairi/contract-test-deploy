import { BlogsIntro } from "@/components/blogs-intro";
import { FAQs } from "@/components/faq";
import { Features } from "@/components/features";
import { Hero } from "@/components/hero";
import { Promo } from "@/components/promo";
import { Testimonials } from "@/components/testimonials";
import { Box, Flex } from "@chakra-ui/react";
import { useTranslations } from "next-intl";

export default function Home() {
  const t = useTranslations("Home");

  const HeroData = {
    title: t("Hero.title"),
    text1: t("Hero.text1"),
    text2: t("Hero.text2"),
  };

  const FeaturesData = {
    title: t("Features.title"),
    description: t("Features.description"),
    featureList: [
      {
        icon: "/icons/file-lock.svg",
        featureName: t("Features.FeaturesList.Secure.name"),
        featureDescription: t("Features.FeaturesList.Secure.description"),
      },
      {
        icon: "/icons/dataflow.svg",
        featureName: t("Features.FeaturesList.Intuitive.name"),
        featureDescription: t("Features.FeaturesList.Intuitive.description"),
      },
      {
        icon: "/icons/edit.svg",
        featureName: t("Features.FeaturesList.Collaboration.name"),
        featureDescription: t(
          "Features.FeaturesList.Collaboration.description"
        ),
      },
      {
        icon: "/icons/bar-chart.svg",
        featureName: t("Features.FeaturesList.Insights.name"),
        featureDescription: t("Features.FeaturesList.Insights.description"),
      },
    ],
  };

  const BlogIntroData = {
    title: t("Blog.title"),
    sideText: t("Blog.sideText"),
    description: t("Blog.description"),
    blogInsightsList: [
      {
        icon: "/images/star-purple.svg",
        title: t("Blog.blogInsights.One.name"),
        description: t("Blog.blogInsights.One.description"),
      },
      {
        icon: "/images/star-blue.svg",
        title: t("Blog.blogInsights.Two.name"),
        description: t("Blog.blogInsights.Two.description"),
      },
      {
        icon: "/images/star-orange.svg",
        title: t("Blog.blogInsights.Three.name"),
        description: t("Blog.blogInsights.Three.description"),
      },
    ],
  };

  const TestimonialsData = {
    title: t("Testimonial.title"),
    description: t("Testimonial.description"),
    testimonialsList: [
      {
        title: t("Testimonial.testimonialsList.One.name"),
        subTitle: t("Testimonial.testimonialsList.One.subTitle"),
        description: t("Testimonial.testimonialsList.One.description"),
      },
      {
        title: t("Testimonial.testimonialsList.Two.name"),
        subTitle: t("Testimonial.testimonialsList.Two.subTitle"),
        description: t("Testimonial.testimonialsList.Two.description"),
      },
      {
        title: t("Testimonial.testimonialsList.Three.name"),
        subTitle: t("Testimonial.testimonialsList.Three.subTitle"),
        description: t("Testimonial.testimonialsList.Three.description"),
      },
    ],
  };

  const PromoData = {
    title: t("Promo.title"),
    description: t("Promo.description"),
  };



  return (
    <Flex flexDirection={"column"} bg={"#F6F6F6"}>
      <Hero {...HeroData} />
      <Features {...FeaturesData} />
      <BlogsIntro {...BlogIntroData} />
      <Flex direction={"column"} gap={{base: "48px"}} padding={{lg: "60px", md: "48px", sm: "36px 24px"}}>
        <Testimonials {...TestimonialsData} />
        <Promo {...PromoData} />
        <FAQs />
      </Flex>
    </Flex>
  );
}
