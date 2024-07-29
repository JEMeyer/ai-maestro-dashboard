import { useCallback } from "react";
import { atom, useRecoilValue, useSetRecoilState } from "recoil";

const AUTH_TOKEN_KEY = "user_authToken";

const authTokenAtom = atom<string | null>({
  key: "authTokenAtom",
  default: localStorage.getItem(AUTH_TOKEN_KEY),
});

export const useAuthToken = () => useRecoilValue(authTokenAtom);

export const useSetAuthToken = () => {
  const setState = useSetRecoilState(authTokenAtom);

  return useCallback(
    (token: string | null) => {
      setState(token);
      if (token == null) localStorage.removeItem(AUTH_TOKEN_KEY);
      else localStorage.setItem(AUTH_TOKEN_KEY, token);
    },
    [setState]
  );
};
