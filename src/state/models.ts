import { atom, useRecoilState } from "recoil";
import { Model } from "../types/database";
import { useFetchAllModelTypes } from "../services/database";
import { useEffect } from "react";

const allModelsAtom = atom<Model[] | null>({
  key: "allModelsAtom",
  default: null,
});

export const useAllModels = () => {
  const [models, setModels] = useRecoilState(allModelsAtom);
  const fetchAllModels = useFetchAllModelTypes<Model>("models");

  useEffect(() => {
    const fetchData = async () => {
      if (models == null) {
        try {
          const data = await fetchAllModels();
          setModels(data);
        } catch (error) {
          console.error("Failed to fetch models:", error);
        }
      }
    };

    fetchData();
  }, [models, fetchAllModels, setModels]);

  return models;
};
