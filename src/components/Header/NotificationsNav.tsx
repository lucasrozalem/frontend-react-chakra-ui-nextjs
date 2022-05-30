import { HStack, Icon } from "@chakra-ui/react";
import { RiNotificationLine } from "react-icons/ri";
import { ColorModeSwitcher } from "components/ColorModeSwtich";

export function NotificationsNav() {
  return (
    <HStack
      spacing={["6", "8"]}
      mx={["6", "8"]}
      pr={["6", "8"]}
      py="1"
      color="gray.300"
      borderRightWidth={1}
      borderColor="grau.700"
    >
      <Icon as={RiNotificationLine} fontSize="20" />
      <ColorModeSwitcher />
    </HStack>
  );
}
