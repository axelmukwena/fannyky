import Head from "next/head";

const SEO = function SEO({ description, title, siteTitle, image, url }) {
  let tempImage = image;

  if (image === "1") {
    tempImage = "https://budafans.com/static/assets/backgrounds/300-buda.png";
  } else if (image === "2") {
    tempImage = "https://budafans.com/static/assets/backgrounds/300-fanny.png";
  } else if (!image) {
    tempImage = "https://budafans.com/favicon.ico";
  }

  return (
    <Head>
      {/* HTML Meta Tags */}
      <title>{`${title} | ${siteTitle}`}</title>
      <meta name="description" content={description} />

      {/* Google / Search Engine Tags */}
      <meta itemProp="name" content={`${title} | ${siteTitle}`} />
      <meta itemProp="description" content={description} />
      <meta itemProp="image" content={tempImage} />

      {/* Facebook Meta Tags */}
      <meta property="og:url" content={url} />
      <meta property="og:type" content="website" />
      <meta property="og:title" content={`${title} | ${siteTitle}`} />
      <meta property="og:site_name" content={siteTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={tempImage} />

      {/* Twitter Meta Tags */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={`${title} | ${siteTitle}`} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={tempImage} />
    </Head>
  );
};

export default SEO;
