import { api } from "services/apiClient";
import endpoints from "constants/endpoints";
import { IUserLogin } from 'models/userLogin.model';

export const signInService = async ({email, password}: IUserLogin): Promise<any> => {
  const data = await api.post(`${endpoints.auth}`, {
    email,
    password,
  })
  .then((response) => {
    api.defaults.headers["Authorization"] = `Bearer ${response.data.token}`;
    return response.data;
  })
  .catch(() => {
    return null;
  });

  return data;
};

export const verifySessionService = async (): Promise<any> => {
  const data = await api.get("/me")
    .then((response) => {
      return response.data;
    })
    .catch(() => {
      return null;
    });

  return data
}