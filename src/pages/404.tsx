import { Button, Flex, Heading, Text, VStack } from "@chakra-ui/react";
import NextLink from "next/link";
import * as React from "react";
import { FaHome } from "react-icons/fa";

const NotFoundPage = () => {
  return (
    <Flex w="100vw" h="100vh" align="center" justify="center">
      <VStack>
        <Flex>
          <Text fontSize={"24"}>Ops... Algo deu errado</Text>
        </Flex>
        <NextLink href="/dashboard" passHref>
          <Button
            as="a"
            aria-label="Back to Home"
            leftIcon={<FaHome />}
            colorScheme="teal"
            size="lg"
          >
            Voltar para início
          </Button>
        </NextLink>
      </VStack>
    </Flex>
  );
};

export default NotFoundPage;
