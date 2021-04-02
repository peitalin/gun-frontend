import React from 'react';
import Head from 'next/head';
// ENV variables
import getConfig from 'next/config'


const HeaderPage: React.FC<HeaderPageProps> = (props) => (
  <Head>
    <meta
      name="viewport"
      content="minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no"
    />
    {
      props.title &&
      <title>{props.title}</title>
    }
    {
      props.description &&
      <meta name="description" content={props.description}/>
    }
    {
      props.keywords &&
      <meta name="keywords" content={props.keywords}
        // not used for Google anymore
      />
    }
    {
      // skip indexing on fileworks.net
      // but allow relay.shop to index
      process.env.NODE_ENV === "development"
        ? <meta name="robots" content={"noindex"}/>
        : <meta name="robots" content={props.robots || "all"}/>
        // https://moz.com/learn/seo/robots-meta-directives
    }
    {
      props.ogType &&
      <meta property="og:type" content={props.ogType} />
    }
    {
      props.ogTitle &&
      <meta property="og:title" content={props.ogTitle} />
    }
    {
      props.ogDescription &&
      <meta property="og:description" content={props.ogDescription} />
    }
    {
      props.ogImage
      ? <meta property="og:image" content={props.ogImage} />
      : <meta property="og:image"
          // content={
          //   EFC_ENV === "development"
          //   ? "https://image-content.fileworks.net/og-img-relay-default.png"
          //   : "https://image-content.relaydownloads.com/og-img-relay-default.png"
          // }
        />
    }
    {
      props.ogUrl &&
      <meta property="og:url" content={props.ogUrl} />
    }
    {
      props.ogSiteName &&
      <meta property="og:site_name" content={props.ogSiteName} />
    }

    <meta property="fb:app_id" content={"240857820473181"} />
  </Head>
)

// <meta name="robots" content="noindex, nofollow"> – Means not to index or not to follow this web page.
// <meta name="robots" content="index, follow"> – Means index and follow this web page.



interface HeaderPageProps {
  title?: string;
  description?: string;
  keywords?: string;
  robots?: string;
  ogType?: string;
  ogTitle?: string;
  ogDescription?: string;
  ogImage?: string;
  ogUrl?: string;
  ogSiteName?: string;
  [keyword: string]: string;
};


export default HeaderPage;

