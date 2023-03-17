import { HStack, Icon, Stack, Text, SimpleGrid } from "@chakra-ui/react"
import Link from "next/link"
import { ArrowForwardIcon } from "@chakra-ui/icons"
import { integrationGuidesConfig } from "../../lib/contentlayer-utils"

export const WebFrameworksCards = (props: any) => {
  return (
    <SimpleGrid columns={[1, null, 3]} spacing="5" {...props}>
      {integrationGuidesConfig.languages
        .filter((l) => ["js", "rust"].includes(l.normalizedName))
        .map((language, i) => (
          <Link key={i} href={`/integration/${language.normalizedName}`}>
            <Stack
              align={"flex-start"}
              spacing={3}
              p={4}
              rounded="12px"
              cursor="pointer"
              transition="all 0.2s ease-in"
              _hover={{
                bg: "flatButtonHoverBg",
                shadow: "focused",
                textDecoration: "none",
              }}
              borderColor="searchTriggerRingColor"
              borderWidth="1px"
              borderStyle="solid"
            >
              <HStack cursor="pointer" color="textLink">
                <Icon as={language.icon} fontSize={"1.2em"} />
                <Text fontSize="lg" fontWeight="extrabold">
                  {language.name}
                </Text>
              </HStack>

              <Text fontSize={"0.8em"}>
                Get started with the {language.name} SDK&nbsp;
                <Icon as={ArrowForwardIcon} fontSize={"1.2em"} />
              </Text>
            </Stack>
          </Link>
        ))}
    </SimpleGrid>
  )
}
