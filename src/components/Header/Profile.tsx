import {
  Avatar,
  Box,
  Button,
  Flex,
  Icon,
  IconButton,
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import React, { useContext } from "react";
import { RiMore2Fill } from "react-icons/ri";
import { AuthContext } from "../../contexts/AuthContext";

interface ProfileProps {
  showProfileData?: boolean;
}

export function Profile({ showProfileData = true }: ProfileProps) {
  const { user, signOut } = useContext(AuthContext);

  console.log("user", user);
  return (
    <Flex align="center">
      {showProfileData && (
        <Box mr="4" textAlign="right">
          <Text color="gray.900" _dark={{ color: "gray.100" }}>
            {user?.name}
          </Text>
          <Text color="gray.400" _dark={{ color: "gray.300" }} fontSize="small">
            {user?.email}
          </Text>
        </Box>
      )}
      <Avatar size="md" name={user?.name} />
      <Menu isLazy>
        <MenuButton
          as={IconButton}
          icon={<Icon as={RiMore2Fill} />}
          fontSize="24"
          variant="unstyled"
          _focus={{
            outline: "none",
          }}
        />

        <MenuList>
          {/* MenuItems are not rendered unless Menu is open */}
          <MenuItem>New Window</MenuItem>
          <MenuItem>Open Closed Tab</MenuItem>
          <MenuDivider />
          <MenuItem onClick={signOut}>Sair</MenuItem>
        </MenuList>
      </Menu>
    </Flex>
  );
}
