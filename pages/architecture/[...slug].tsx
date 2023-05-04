import { FrameworkProvider } from "components/framework"
import { useMDX } from "components/mdx-components"
import SEO from 'components/seo'
import type { Component } from "contentlayer/generated"
import DocsLayout from "layouts/docs"
import {
  extractParams,
  getArchitectureDocs,
  getArchitecturePaths,
} from "lib/contentlayer-utils"
import { Framework } from "lib/framework-utils"
import { GetStaticPaths, GetStaticProps } from "next"

type PageProps = {
  doc: Component
  framework: Framework
}

export default function ArchitecturePage({ doc, framework }: PageProps) {
  const mdx = useMDX(doc.body.code)
  return (
    <FrameworkProvider value={framework}>
      <SEO title={doc.title} description={doc.description} />
      <DocsLayout doc={doc}>{mdx}</DocsLayout>
    </FrameworkProvider>
  )
}

export const getStaticPaths: GetStaticPaths = async () => {
  return { paths: getArchitecturePaths(), fallback: false }
}

export const getStaticProps: GetStaticProps = async (ctx) => {
  const { framework, slug } = extractParams(ctx.params.slug as string[])
  const doc = getArchitectureDocs(slug)
  return { props: { doc, framework } }
}
