import { ReactNode } from "react";
import { Box, Stack, Text } from "@chakra-ui/react";

interface NavSectionsProps {
  title: string;
  children: ReactNode;
}

export function NavSection({ title, children }: NavSectionsProps) {
  return (
    <Box>
      <Text
        fontWeight="bold"
        fontSize="small"
        color="gray.800"
        _dark={{ color: "gray.400" }}
      >
        {title}
      </Text>
      <Stack
        spacing="4"
        mt="8"
        align="stretch"
        color="gray.600"
        _dark={{ color: "gray.50" }}
      >
        {children}
      </Stack>
    </Box>
  );
}
