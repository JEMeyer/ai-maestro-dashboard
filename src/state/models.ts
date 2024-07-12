import { atom, useRecoilState, useSetRecoilState } from "recoil";
import { Model } from "../types";
import { useFetchAllModelTypes } from "../services/database";
import { useEffect, useMemo } from "react";

const allModelsAtom = atom<Model[] | null>({
  key: "allModelsAtom",
  default: null,
});

// TODO remove this when separate 'db' and 'local' stores setup for computers/models/etc
export const useSetModels = () => {
  const setModels = useSetRecoilState(allModelsAtom);

  return setModels;
};

export const useAllModelsGroupedByType = () => {
  const [models, setModels] = useRecoilState(allModelsAtom);
  const fetchAllModels = useFetchAllModelTypes<Model>("models");

  useEffect(() => {
    const fetchData = async () => {
      if (models == null) {
        try {
          const data = await fetchAllModels();
          setModels(
            data.map((model) => {
              return {
                ...model,
                size: Number(model.size),
              };
            })
          );
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

    return { llms, diffusors, speechModels };
  }, [models]);

  return state;
};
