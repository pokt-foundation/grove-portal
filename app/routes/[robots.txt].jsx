export const loader = () => {
  const robotText = `
    Sitemap: https://portal.pokt.network/sitemap.xml
    `
  return new Response(robotText, {
    status: 200,
    headers: {
      "Content-Type": "text/plain",
    },
  })
}
