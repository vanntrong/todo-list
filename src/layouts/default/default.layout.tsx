import Header from "@/components/header";
import Sidebar from "@/components/sidebar";
import { SEO } from "@/constants/seo";
import { ISEO } from "@/interfaces";
import clsx from "clsx";
import Head from "next/head";
import { useState } from "react";

interface DefaultLayoutProps {
  children: React.ReactNode;
  seo?: ISEO;
}

export default function DefaultLayout({
  children,
  seo = {},
}: DefaultLayoutProps) {
  const {
    title = SEO.title,
    description = SEO.description,
    image = SEO.image,
    keywords = SEO.keywords,
    locale = SEO.locale,
    site_name = SEO.site_name,
    type = SEO.type,
    url = SEO.url,
    twitter = SEO.twitter,
    facebook = SEO.facebook,
  } = seo;
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta name="keywords" content={keywords} />
        <meta name="robots" content="index, follow" />
        <meta name="googlebot" content="index, follow" />
        <meta name="google" content="nositelinkssearchbox" />
        <meta name="og:image" content={image} />
        <meta name="og:locale" content={locale} />
        <meta name="og:site_name" content={site_name} />
        <meta name="og:type" content={type} />
        <meta name="og:url" content={url} />
        <meta name="og:title" content={title} />
        <meta name="og:description" content={description} />
        <meta name="twitter:card" content={twitter?.card} />
        <meta name="twitter:site" content={twitter?.site} />
        <meta name="twitter:creator" content={twitter?.creator} />
        <meta name="twitter:title" content={title} />
        <meta name="twitter:description" content={description} />
        <meta name="twitter:image" content={image} />
        <link
          rel="icon"
          href="https://lktech.com.vn/wp-content/uploads/2020/04/cropped-logo-32x32.png"
          sizes="32x32"
        />
        <link
          rel="icon"
          href="https://lktech.com.vn/wp-content/uploads/2020/04/cropped-logo-192x192.png"
          sizes="192x192"
        />
      </Head>
      <div>
        <Header onToggleSidebar={() => setIsSidebarOpen((prev) => !prev)} />
        <main className="flex h-full min-h-screen">
          <Sidebar isOpen={isSidebarOpen} />

          {children}
        </main>
      </div>
    </>
  );
}
