import { createContext, ReactNode, useEffect, useState } from "react";
import { setCookie, parseCookies, destroyCookie } from "nookies";
import Router from "next/router";
import { signInService, verifySessionService } from 'services/auth.service';
import { IUserLogin } from 'models/userLogin.model';

type AuthContextData = {
  signIn: (credentials: IUserLogin) => Promise<void>;
  signOut: () => void;
  user: User;
  isAuthenticated: boolean;
  loading: boolean;
};

type AuthProviderProps = {
  children: ReactNode;
};

type User = {
  email: string;
  permissions: string[];
  roles: string[];
  name?: string;
};

export const AuthContext = createContext({} as AuthContextData);

let authChannel: BroadcastChannel;

export function signOut(broadcast: boolean = true) {
  destroyCookie(undefined, "nextauth.token");
  destroyCookie(undefined, "nextauth.refreshToken");

  if (broadcast) {
    authChannel.postMessage("signOut");
  }

  Router.push("/");
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User>();
  const [loading, setLoading] = useState<boolean>(false);
  const isAuthenticated = !!user;

  useEffect(() => {
    authChannel = new BroadcastChannel("auth");
    authChannel.onmessage = (message) => {
      switch (message.data) {
        case "signOut":
          signOut(false);
          break;
        default:
          break;
      }
    };
  }, []);

  useEffect(() => {
    const { "nextauth.token": token } = parseCookies();

    async function verifySession () {
      const response = await verifySessionService();

      if (response) {
        const { email, permissions, roles, name } = response;
    
        setUser({ email, permissions, roles, name });

        return;
      }

      signOut();
    }

    if (token) {
      verifySession();
    }
  }, []);

  async function signIn({ email, password }: IUserLogin) {
    setLoading(true);

    const response = await signInService({email, password});
    
    setLoading(false);

    if (response) {
      const { token, refreshToken, permissions, roles, name } = response;
  
      setCookie(undefined, "nextauth.token", token, {
        maxAge: 60 * 60 * 24 * 30, //30 dias
        path: "/",
      });
      
      setCookie(undefined, "nextauth.refreshToken", refreshToken, {
        maxAge: 60 * 60 * 24 * 30, //30 dias
        path: "/",
      });
  
      setUser({
        email,
        permissions,
        roles,
        name,
      });

      Router.push("/dashboard");
    }
  }

  return (
    <AuthContext.Provider value={{ signIn, signOut, isAuthenticated, user, loading }}>
      {children}
    </AuthContext.Provider>
  );
}
