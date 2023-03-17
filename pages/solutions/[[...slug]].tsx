import { useMDX } from "components/mdx-components"
import { Solutions } from "contentlayer/generated"
import DocsLayout from "layouts/docs"
import { getSolutionsDoc, getSolutionsPaths } from "lib/contentlayer-utils"
import { generateShareImageUrl } from 'lib/seo'
import { GetStaticPaths, GetStaticProps } from "next"
import { NextSeo } from "next-seo"

export default function SolutionsPages({ doc }: { doc: Solutions }) {
  const Component = useMDX(doc.body.code)
  const imageUrl = generateShareImageUrl({ title: doc.title, description: doc.description })
  return (
    <>
      <NextSeo title={doc.title} description={doc.description} openGraph={{
        title: doc.title,
        description: doc.description,
        images: [{ url: imageUrl }]
      }} />
      <DocsLayout doc={doc}>{Component}</DocsLayout>
    </>
  )
}

export const getStaticPaths: GetStaticPaths = async () => {
  return { paths: getSolutionsPaths(), fallback: false }
}

export const getStaticProps: GetStaticProps<{ doc: Solutions }> = async (
  ctx,
) => {
  const params = ctx.params as any
  const pagePath = params.slug?.join("/") ?? ""
  return { props: { doc: getSolutionsDoc(pagePath) } }
}
