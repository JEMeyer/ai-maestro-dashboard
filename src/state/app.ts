import { useCallback } from "react";
import { atom, useRecoilValue, useSetRecoilState } from "recoil";
import { User } from "../types";

interface StateObject {
  isBusy?: boolean;
  user?: User | null;
}

const appStateAtom = atom<StateObject | undefined>({
  key: "appStateAtom",
  default: undefined,
});

export const useIsBusy = () => {
  const appState = useRecoilValue(appStateAtom);

  return appState?.isBusy;
};

export const useSetIsBusy = () => {
  const setState = useSetRecoilState(appStateAtom);

  const setIsBusy = useCallback(
    (newIsBusy: boolean) => {
      console.log("isbusy");
      setState((prev) => {
        return { ...prev, isBusy: newIsBusy };
      });
    },
    [setState]
  );
  return setIsBusy;
};

export const useUserValue = () => {
  const appState = useRecoilValue(appStateAtom);

  return appState?.user;
};

export const useSetUser = () => {
  const setState = useSetRecoilState(appStateAtom);

  const setUser = useCallback(
    (newUser?: User | null) => {
      setState((prev) => {
        return { ...prev, user: newUser };
      });
    },
    [setState]
  );
  return setUser;
};
