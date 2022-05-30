import {
  Flex,
  Button,
  Stack
} from "@chakra-ui/react";
import { useForm, SubmitHandler } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { Input } from "components/Form/Input";
import { useContext } from "react";
import { AuthContext } from "contexts/AuthContext";
import { withSSRGuest } from "utils/withSSRGuest";
import { generalConstants } from "constants/general";

type SignInFormData = {
  email: string;
  password: string;
};

const signInFormSchema = yup.object().shape({
  email: yup.string().required("E-mail obrigatório").email("E-mail inválido"),
  password: yup.string().required("Senha obrigatória"),
});

export default function SignIn() {
  const { register, handleSubmit, formState } = useForm({
    resolver: yupResolver(signInFormSchema),
  });
  const { signIn, loading } = useContext(AuthContext);

  const handleSignIn: SubmitHandler<SignInFormData> = async (values) => {
    await signIn(values);
  };

  return (
    <Flex w="100vw" h="100vh" align="center" justify="center">
      <Flex
        as="form"
        width="100%"
        maxWidth={360}
        boxShadow="xl"
        rounded="md"
        bg="white"
        _dark={{ bg: "gray.900" }}
        p="8"
        // borderRadius={8}
        flexDir="column"
        onSubmit={handleSubmit(handleSignIn)}
      >
        <Stack spacing="4">
          <Input
            name="email"
            type="email"
            label="E-mail"
            isDisabled={loading}
            error={formState.errors.email}
            maxLength={generalConstants.limitShortText}
            {...register("email")}
          />
          <Input
            name="password"
            type="password"
            label="Senha"
            isDisabled={loading}
            error={formState.errors.password}
            maxLength={generalConstants.limitShortText}
            {...register("password")}
          />
        </Stack>
        <Button
          type="submit"
          mt="6"
          colorScheme="teal"
          size="lg"
          isLoading={loading}
          isDisabled={loading}
        >
          Entrar
        </Button>
      </Flex>
    </Flex>
  );
}

export const getServerSideProps = withSSRGuest(async (ctx) => {
  return {
    props: {},
  };
});
