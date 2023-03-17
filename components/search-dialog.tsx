import Icon from "@chakra-ui/icon"
import { Box, Flex, HStack, Text } from "@chakra-ui/layout"
import { Stack } from "@chakra-ui/react"
import { chakra } from "@chakra-ui/system"
import Portal from "@reach/portal"
import { useSearch } from "lib/use-search"
import Link from "next/link"
import { BiSearch } from "react-icons/bi"
import { GrReturn } from "react-icons/gr"
import { HiDocument, HiHashtag } from "react-icons/hi"
import { SearchTrigger } from "./search-trigger"

export function Search() {
  const { dialog_api, combobox_api, results } = useSearch()

  return (
    <>
      <SearchTrigger {...dialog_api.triggerProps} />
      {dialog_api.isOpen && (
        <Portal>
          <Box
            position="fixed"
            inset="0"
            bg="topNavBody"
            zIndex="modal"
            {...dialog_api.backdropProps}
          />
          <Flex
            direction="column"
            align="center"
            height="100vh"
            width="100vw"
            position="fixed"
            zIndex="modal"
            inset="0"
            {...dialog_api.underlayProps}
          >
            <Box
              mt="90px"
              width="full"
              maxW="600px"
              rounded="md"
              bg="searchTriggerBg"
              position="relative"
              pointerEvents="auto"
              {...dialog_api.contentProps}
            >
              <chakra.h2 srOnly {...dialog_api.titleProps}>
                Search the docs
              </chakra.h2>

              <Box
                display="flex"
                flexDirection="column"
                {...combobox_api.rootProps}
              >
                <Flex
                  height="64px"
                  align="center"
                  borderBottomWidth="1px"
                  position="relative"
                  fontSize="lg"
                  px="4"
                >
                  <Icon
                    as={BiSearch}
                    color="textLink"
                    mr="4"
                    fontSize="1.3em"
                  />
                  <chakra.input
                    width="full"
                    outline="0"
                    bg="searchTriggerBg"
                    {...combobox_api.inputProps}
                  />
                </Flex>
                <Box
                  as="ul"
                  flex="1"
                  listStyleType="none"
                  maxHeight="340px"
                  overflowY="auto"
                  px="1"
                  {...combobox_api.listboxProps}
                >
                  {results.map((item) => {
                    const isLvl1 = item.type === "lvl1"
                    return (
                      <Link key={item.id} href={item.url} passHref>
                        <a>
                          <chakra.li
                            px="3"
                            py="1"
                            _selected={{ bg: "topNavButtonLayoutHover" }}
                            display="flex"
                            alignItems="center"
                            minHeight="14"
                            key={item.url}
                            {...combobox_api.getOptionProps({
                              value: item.url,
                              label: JSON.stringify(item),
                            })}
                          >
                            <Icon
                              as={isLvl1 ? HiDocument : HiHashtag}
                              opacity={0.4}
                            />

                            <Box flex="1" ml="4">
                              {!isLvl1 && (
                                <Box
                                  fontWeight="medium"
                                  fontSize="xs"
                                  opacity={0.7}
                                >
                                  {item.hierarchy.lvl1}
                                </Box>
                              )}
                              <Stack spacing={0} py={1}>
                                <Box fontWeight="semibold">{item.content}</Box>
                                <Box
                                  fontWeight="thin"
                                  fontSize={"0.8em"}
                                  opacity={0.6}
                                >
                                  {item.url}
                                </Box>
                              </Stack>
                            </Box>

                            <Icon as={GrReturn} opacity={0.4} />
                          </chakra.li>
                        </a>
                      </Link>
                    )
                  })}
                </Box>

                <HStack
                  px="4"
                  align="center"
                  userSelect="none"
                  minHeight="8"
                  fontSize="xs"
                  lineHeight="1"
                  color="gray.500"
                  spacing="5"
                  borderTopWidth={combobox_api.isOpen ? "1px" : undefined}
                >
                  <HStack>
                    <Box as="span">↑↓</Box>
                    <Text>Select</Text>
                  </HStack>
                  <HStack>
                    <Box as="span">↵</Box>
                    <Text>Open</Text>
                  </HStack>
                </HStack>
              </Box>
              <div />
            </Box>
          </Flex>
        </Portal>
      )}
    </>
  )
}
