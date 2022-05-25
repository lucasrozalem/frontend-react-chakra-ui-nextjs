import {
  FormControl,
  FormLabel,
  Input as ChakraInput,
  InputProps as ChakraInputProps,
  FormErrorMessage,
  useColorModeValue,
} from "@chakra-ui/react";
import { FieldError } from "react-hook-form";
import { forwardRef, ForwardRefRenderFunction } from "react";

interface InputProps extends ChakraInputProps {
  name: string;
  label?: string;
  error?: FieldError;
}

const InputBase: ForwardRefRenderFunction<HTMLInputElement, InputProps> = (
  { name, label, error = null, ...rest },
  ref
) => {
  // const bg = useColorModeValue("gray.50", "gray.900");
  // const color = useColorModeValue("gray.900", "gray.50");

  return (
    <FormControl isInvalid={!!error}>
      {!!label && (
        <FormLabel htmlFor={name} color="gray.900" _dark={{ color: "gray.50" }}>
          {label}
        </FormLabel>
      )}
      <ChakraInput
        name={name}
        id={name}
        //focusBorderColor="pink.500"
        //bgColor={bg}
        variant="filled"
        // _hover={{
        //   bgColor: { bg },
        // }}
        ref={ref}
        size="lg"
        {...rest}
      />
      {!!error && <FormErrorMessage>{error.message}</FormErrorMessage>}
    </FormControl>
  );
};

export const Input = forwardRef(InputBase);
