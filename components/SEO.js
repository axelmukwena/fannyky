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
      <title>{`${title} | ${siteTitle}`}</title>
      <meta name="description" content={description} />
      <meta property="og:type" content="website" />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:site_name" content={siteTitle} />
      <meta property="twitter:card" content="summary" />
      <meta property="twitter:creator" content="" />
      <meta property="twitter:title" content={title} />
      <meta property="twitter:description" content={description} />
      <meta property="og:url" content={url} />
      {tempImage && <meta property="og:image" content={tempImage} />}
    </Head>
  );
};

export default SEO;
