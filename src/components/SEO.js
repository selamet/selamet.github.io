import React from 'react'
import { Helmet } from 'react-helmet'

import config from '../utils/config'

export const SEO = ({ postNode, postPath, postSEO, customDescription, pagePath }) => {
  let title = config.siteTitle
  let description = customDescription || config.description
  let image = config.siteLogo
  let postURL

  if (postSEO) {
    const postMeta = postNode.frontmatter
    title = postMeta.title
    description = postNode.excerpt

    if (postMeta.thumbnail) {
      image = postMeta.thumbnail.childImageSharp.gatsbyImageData.src
    }

    postURL = `${config.siteUrl}${postPath}`
  }

  image = `${config.siteUrl}${image}`
  const schemaOrgJSONLD = [
    {
      '@context': 'http://schema.org',
      '@type': 'WebSite',
      url: config.siteUrl,
      name: title,
      alternateName: title,
    },
  ]

  if (postSEO) {
    schemaOrgJSONLD.push(
      {
        '@context': 'http://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: [
          {
            '@type': 'ListItem',
            position: 1,
            item: {
              '@id': postURL,
              name: title,
              image,
            },
          },
        ],
      },
      {
        '@context': 'http://schema.org',
        '@type': 'BlogPosting',
        url: config.siteUrl,
        name: title,
        alternateName: title,
        headline: title,
        image: {
          '@type': 'ImageObject',
          url: image,
        },
        description,
      }
    )
  }

  const canonicalURL = postSEO ? postURL : (pagePath ? `${config.siteUrl}${pagePath}` : config.siteUrl)

  return (
    <Helmet>
      <html lang="tr" />
      <link rel="canonical" href={canonicalURL} />
      
      <meta name="description" content={description} />
      <meta name="image" content={image} />

      <script type="application/ld+json">
        {JSON.stringify(schemaOrgJSONLD)}
      </script>

      <meta property="og:url" content={canonicalURL} />
      <meta property="og:site_name" content={config.siteTitle} />
      <meta property="og:locale" content="tr_TR" />
      {postSEO && <meta property="og:type" content="article" />}
      {!postSEO && <meta property="og:type" content="website" />}
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content="@selametsamli" />
      <meta name="twitter:creator" content="@selametsamli" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />
    </Helmet>
  )
}
