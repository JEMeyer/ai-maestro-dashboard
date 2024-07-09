import { atom, useRecoilState } from "recoil";
import { Model } from "../types/database";
import { useFetchAllModelTypes } from "../services/database";
import { useEffect, useMemo } from "react";

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

  const state = useMemo(() => {
    const llms = models?.filter((model) => model.model_type === "llm");
    const diffusors = models?.filter(
      (model) => model.model_type === "diffusor"
    );
    const speechModels = models?.filter(
      (model) => model.model_type === "stt" || model.model_type === "tts"
    );

    // eslint-disable-next-line no-debugger
    debugger;

    return { llms, diffusors, speechModels };
  }, [models]);

  return state;
};
