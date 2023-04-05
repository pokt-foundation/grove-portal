/**
 * @type {import('@remix-run/dev').AppConfig}
 */
module.exports = {
  serverBuildTarget: "vercel",
  // When running locally in development mode, we use the built in remix
  // server. This does not understand the vercel lambda module format,
  // so we default back to the standard build output.
  server: process.env.NODE_ENV === "development" ? undefined : "./server.js",
  ignoredRouteFiles: ["**/.*"],
  serverDependenciesToBundle: [
    /^rehype.*/,
    /^remark.*/,
    /^unified.*/,
    /^micromark.*/,
    /\bgfm\b/i,
    /^markdown.*/,
    /^mdast.*/,
    /^unist.*/,
    "react-markdown",
    /^vfile.*/,
    /^hast.*/,
    "character-entities",
    "web-namespaces",
    "hastscript",
    "space-separated-tokens",
    "comma-separated-tokens",
    "html-void-elements",
    "zwitch",
    "bail",
    "hast-util-whitespace",
    "vfile-message",
    "trough",
    "decode-named-character-reference",
    "trim-lines",
    "ccount",
    "property-information",
  ],
  // appDirectory: "app",
  // assetsBuildDirectory: "public/build",
  // serverBuildPath: "api/index.js",
  // publicPath: "/build/",
}
