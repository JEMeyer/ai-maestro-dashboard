import { atom, useRecoilState } from "recoil";
import { GPU } from "../types";
import { useFetchAllModelTypes } from "../services/database";
import { useEffect } from "react";

const allGpusAtom = atom<GPU[] | null>({
  key: "allGpusAtom",
  default: null,
});

export const useAllGpus = () => {
  const [gpus, setGpus] = useRecoilState(allGpusAtom);
  const fetchAllModels = useFetchAllModelTypes<GPU>("gpus");

  useEffect(() => {
    const fetchData = async () => {
      if (gpus == null) {
        try {
          const data = await fetchAllModels();
          setGpus(data);
        } catch (error) {
          console.error("Failed to fetch models:", error);
        }
      }
    };

    fetchData();
  }, [gpus, fetchAllModels, setGpus]);

  return gpus;
};
