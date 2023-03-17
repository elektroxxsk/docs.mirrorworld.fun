import { Stack } from "@chakra-ui/layout"
import { chakra } from "@chakra-ui/system"
import { useScrollSpy } from "./use-scrollspy"
import NextLink from "next/link"
import { useEffect, useMemo, createRef } from "react"

type TOC = Array<{
  content: string
  slug: string
  lvl: number
}>

export function TableOfContents({
  data = [],
  title = "On this page",
  getSlug = (slug) => `#${slug}`,
}: {
  data: TOC
  title?: string
  getSlug?: (slug: string) => string
}) {
  const activeId = useScrollSpy(data.map((item) => `[id="${item.slug}"]`))

  const allSelectors = useMemo(
    () => data.map((item) => `[id="${item.slug}"]`),
    [data],
  )
  const allSelectorIds = useMemo(() => data.map((item) => item.slug), [data])

  return (
    <div className="toc">
      <chakra.h5 fontSize="sm" fontWeight="bold" className="toc__heading">
        {title}
      </chakra.h5>

      <Stack as="ul" fontSize="0.8rem" listStyleType="none" mt="3">
        {data.map((item, index) => (
          <chakra.li
            ref={createRef()}
            data-selected={activeId === item.slug || undefined}
            key={item.slug + index}
            paddingLeft={item.lvl > 2 ? `${2 ** item.lvl * 2}px` : undefined}
            _selected={{
              textDecoration: "underline",
              textUnderlineOffset: "2px",
            }}
          >
            <NextLink href={getSlug(item.slug)} passHref>
              <a>
                <chakra.span mr="1">{item.lvl > 2 ? "—" : null}</chakra.span>
                {""}
                {item.content}
              </a>
            </NextLink>
          </chakra.li>
        ))}
      </Stack>
    </div>
  )
}
