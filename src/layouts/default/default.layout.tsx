import Header from "@/components/header";
import Sidebar from "@/components/sidebar";
import { SEO } from "@/constants/seo";
import { SEO as SEO_INTERFACE } from "@/interfaces";
import Head from "next/head";

interface DefaultLayoutProps {
  children: React.ReactNode;
  seo?: SEO_INTERFACE;
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
        <Header />
        <main className="flex items-start">
          {/* <Sidebar /> */}
          {children}
        </main>
      </div>
    </>
  );
}
