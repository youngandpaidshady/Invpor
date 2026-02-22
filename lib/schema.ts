// ===========================================
// Schema.org Structured Data
// ===========================================

import { APP_NAME, COMPANY_INFO } from "./constants";

const BASE_URL = process.env.NEXT_PUBLIC_APP_URL || "https://braxleynevim.com";

// ===========================================
// Organization Schema
// ===========================================

export function getOrganizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: COMPANY_INFO.name,
    alternateName: APP_NAME,
    url: BASE_URL,
    logo: `${BASE_URL}/logo.png`,
    sameAs: [
      COMPANY_INFO.social.twitter,
      COMPANY_INFO.social.discord,
      COMPANY_INFO.social.telegram,
    ],
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "customer service",
      email: COMPANY_INFO.support_email,
      availableLanguage: ["English"],
    },
    address: {
      "@type": "PostalAddress",
      addressLocality: "London",
      addressCountry: "UK",
    },
    foundingDate: COMPANY_INFO.founded.toString(),
  };
}

// ===========================================
// Website Schema
// ===========================================

export function getWebsiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: APP_NAME,
    url: BASE_URL,
    potentialAction: {
      "@type": "SearchAction",
      target: `${BASE_URL}/faq?q={search_term_string}`,
      "query-input": "required name=search_term_string",
    },
  };
}

// ===========================================
// Product Schema (for pricing pages)
// ===========================================

interface ProductSchemaProps {
  name: string;
  description: string;
  price: number;
  currency?: string;
  accountSize: number;
}

export function getProductSchema({
  name,
  description,
  price,
  currency = "USD",
  accountSize,
}: ProductSchemaProps) {
  return {
    "@context": "https://schema.org",
    "@type": "Product",
    name: `${APP_NAME} ${name} - $${accountSize.toLocaleString()} Account`,
    description,
    brand: {
      "@type": "Brand",
      name: APP_NAME,
    },
    offers: {
      "@type": "Offer",
      price: price.toString(),
      priceCurrency: currency,
      availability: "https://schema.org/InStock",
      seller: {
        "@type": "Organization",
        name: COMPANY_INFO.name,
      },
    },
  };
}

// ===========================================
// FAQ Schema
// ===========================================

interface FAQItem {
  question: string;
  answer: string;
}

export function getFAQSchema(items: FAQItem[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };
}

// ===========================================
// Breadcrumb Schema
// ===========================================

interface BreadcrumbItem {
  name: string;
  url: string;
}

export function getBreadcrumbSchema(items: BreadcrumbItem[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
}

// ===========================================
// Review Schema (for testimonials)
// ===========================================

interface ReviewSchemaProps {
  author: string;
  rating: number;
  reviewBody: string;
  datePublished?: string;
}

export function getReviewSchema({
  author,
  rating,
  reviewBody,
  datePublished = new Date().toISOString(),
}: ReviewSchemaProps) {
  return {
    "@context": "https://schema.org",
    "@type": "Review",
    author: {
      "@type": "Person",
      name: author,
    },
    reviewRating: {
      "@type": "Rating",
      ratingValue: rating.toString(),
      bestRating: "5",
    },
    reviewBody,
    datePublished,
    itemReviewed: {
      "@type": "Organization",
      name: APP_NAME,
    },
  };
}

// ===========================================
// Aggregate Rating Schema
// ===========================================

export function getAggregateRatingSchema(
  ratingValue: number,
  reviewCount: number
) {
  return {
    "@context": "https://schema.org",
    "@type": "AggregateRating",
    ratingValue: ratingValue.toString(),
    bestRating: "5",
    ratingCount: reviewCount.toString(),
    itemReviewed: {
      "@type": "Organization",
      name: APP_NAME,
    },
  };
}

// ===========================================
// How-To Schema
// ===========================================

interface HowToStep {
  name: string;
  text: string;
  image?: string;
}

export function getHowToSchema(
  name: string,
  description: string,
  steps: HowToStep[]
) {
  return {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name,
    description,
    step: steps.map((step, index) => ({
      "@type": "HowToStep",
      position: index + 1,
      name: step.name,
      text: step.text,
      ...(step.image && { image: step.image }),
    })),
  };
}
