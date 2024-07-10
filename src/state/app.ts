import { useCallback } from "react";
import { atom, useRecoilValue, useSetRecoilState } from "recoil";

interface StateObject {
  isBusy: boolean;
}

const appStateAtom = atom<StateObject>({
  key: "appStateAtom",
  default: {
    isBusy: false,
  },
});

export const useIsBusy = () => {
  const { isBusy } = useRecoilValue(appStateAtom);

  return isBusy;
};

export const useSetIsBusy = () => {
  const setState = useSetRecoilState(appStateAtom);

  const setIsBusy = useCallback((newIsBusy: boolean) => {
    setState((prev) => {
      return { ...prev, isBusy: newIsBusy };
    });
  }, []);
  return setIsBusy;
};
