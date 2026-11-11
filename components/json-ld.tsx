/* Renders a schema.org JSON-LD graph. Per the Next.js JSON-LD guide, `<` is
   escaped so no string in the payload can close the <script> tag. */
export function JsonLd({ graph }: { graph: object[] }) {
  const data = { "@context": "https://schema.org", "@graph": graph };
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(data).replace(/</g, "\\u003c"),
      }}
    />
  );
}
