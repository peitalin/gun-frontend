import React from 'react';
import Head from 'next/head';


const HeaderPage: React.FC<HeaderPageProps> = (props) => (
  <Head>
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
      props.robots &&
      <meta name="robots" content={props.robots}/>
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
      props.ogImage &&
      <meta property="og:image" content={props.ogImage} />
    }
    {
      props.ogUrl &&
      <meta property="og:url" content={props.ogUrl} />
    }
    {
      props.ogSiteName &&
      <meta property="og:site_name" content={props.ogSiteName} />
    }
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

