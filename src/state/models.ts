import { atom, selector, useRecoilValue, useSetRecoilState } from "recoil";
import { Model } from "../types";
import {
  useDeleteAPIModel,
  useGetAllAPIModels,
  usePostAPIModel,
  usePutAPIModel,
} from "../services/apiService";
import { useCallback } from "react";

const modelsAtom = atom<Model[] | undefined>({
  key: "llmsAtom",
  default: undefined,
});

const llmModelsSelector = selector<Model[] | undefined>({
  key: "llmModelsSelector",
  get: ({ get }) => {
    const models = get(modelsAtom);
    return models?.filter((model) => model.model_type === "llm");
  },
});

const diffusorModelsSelector = selector<Model[] | undefined>({
  key: "diffusorModelsSelector",
  get: ({ get }) => {
    const models = get(modelsAtom);
    return models?.filter((model) => model.model_type === "diffusor");
  },
});

const sttModelsSelector = selector<Model[] | undefined>({
  key: "sttModelsSelector",
  get: ({ get }) => {
    const models = get(modelsAtom);
    return models?.filter((model) => model.model_type === "stt");
  },
});

const ttsModelsSelector = selector<Model[] | undefined>({
  key: "ttsModelsSelector",
  get: ({ get }) => {
    const models = get(modelsAtom);
    return models?.filter((model) => model.model_type === "tts");
  },
});

export const useFetchAndSetAllModels = () => {
  const fetchAllModels = useGetAllAPIModels<Model>();
  const setModels = useSetRecoilState(modelsAtom);

  return useCallback(async () => {
    const data = await fetchAllModels("models");
    setModels(data);
  }, [fetchAllModels, setModels]);
};

export const useModels = () => {
  const setModels = useSetRecoilState(modelsAtom);
  const llms = useRecoilValue(llmModelsSelector);
  const diffusors = useRecoilValue(diffusorModelsSelector);
  const stts = useRecoilValue(sttModelsSelector);
  const ttss = useRecoilValue(ttsModelsSelector);
  const createAPIModel = usePostAPIModel<Model>();
  const updateAPIModel = usePutAPIModel<Model>();
  const deleteAPIModel = useDeleteAPIModel();

  const addModel = async (newModel: Model) => {
    try {
      const createdModel = await createAPIModel("models", newModel);
      setModels((prev) => (prev ? [...prev, createdModel] : [createdModel]));
    } catch (error) {
      console.error("Failed to create LLM model:", error);
    }
  };

  const updateModel = async (updatedModel: Model) => {
    try {
      const updated = await updateAPIModel("models", updatedModel);
      setModels((prev) =>
        prev?.map((llm) => (llm.id === updated.id ? updated : llm))
      );
    } catch (error) {
      console.error("Failed to update LLM model:", error);
    }
  };

  const deleteModel = async (id: number) => {
    try {
      await deleteAPIModel("models", id);
      setModels((prev) => prev?.filter((llm) => llm.id !== id));
    } catch (error) {
      console.error("Failed to delete LLM model:", error);
    }
  };

  const reorderModels = async (
    sourceIndex: number,
    destinationIndex: number
  ) => {
    if (llms == null) return;

    const newOrder = Array.from(llms);
    const [movedItem] = newOrder.splice(sourceIndex, 1);
    newOrder.splice(destinationIndex, 0, movedItem);

    setModels(newOrder); // Optimistic update

    const updates = newOrder.reduce((acc, model, index) => {
      if (model.display_order !== index) {
        acc.push({ ...model, display_order: index });
      }
      return acc;
    }, [] as Model[]);

    try {
      await Promise.all(updates.map((model) => updateModel(model)));
    } catch (error) {
      console.error("Failed to reorder LLM models:", error);
      // Optionally, rollback optimistic update
    }
  };

  return {
    llms,
    diffusors,
    stts,
    ttss,
    addModel,
    updateModel,
    deleteModel,
    reorderModels,
  };
};
