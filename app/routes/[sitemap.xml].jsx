export const loader = () => {
  const content = `
      <urlset
            xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
            xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
            xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9
                  http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd">
      <url>
        <loc>https://portal.pokt.network/</loc>
        <lastmod>2023-07-24T11:58:59+00:00</lastmod>
        <priority>1.00</priority>
      </url>
      <url>
        <loc>https://portal.pokt.network/rpc-pricing</loc>
        <lastmod>2023-07-24T11:58:59+00:00</lastmod>
        <priority>0.80</priority>
      </url>
      <url>
        <loc>https://portal.pokt.network/about-us</loc>
        <lastmod>2023-07-24T11:58:59+00:00</lastmod>
        <priority>0.80</priority>
      </url>
      <url>
        <loc>https://portal.pokt.network/portal-rpc</loc>
        <lastmod>2023-07-24T11:58:59+00:00</lastmod>
        <priority>0.80</priority>
      </url>
      <url>
        <loc>https://portal.pokt.network/rpc-gaming-defi-kingdoms</loc>
        <lastmod>2023-07-24T11:58:59+00:00</lastmod>
        <priority>0.80</priority>
      </url>
      <url>
        <loc>https://portal.pokt.network/rpc-wallets-omni</loc>
        <lastmod>2023-07-24T11:58:59+00:00</lastmod>
        <priority>0.80</priority>
      </url>
      <url>
        <loc>https://portal.pokt.network/rpc-wallets</loc>
        <lastmod>2023-07-24T11:58:59+00:00</lastmod>
        <priority>0.80</priority>
      </url>
      <url>
        <loc>https://portal.pokt.network/rpc-gaming</loc>
        <lastmod>2023-07-24T11:58:59+00:00</lastmod>
        <priority>0.80</priority>
      </url>
      </urlset>
    `
  return new Response(content, {
    status: 200,
    headers: {
      "Content-Type": "application/xml",
      "xml-version": "1.0",
      encoding: "UTF-8",
    },
  })
}
