import { atom, selectorFamily, useRecoilState } from "recoil";
import { Model } from "../types";
import { useDeleteAPIModel, useGetAllAPIModels } from "../services/apiService";
import { useEffect } from "react";

export const llmsAtom = atom<Model[] | undefined>({
  key: "llmsAtom",
  default: undefined,
});

export const modelsSelectorFamily = selectorFamily({
  key: "modelsSelectorFamily",
  get:
    (modelType: ModelType) =>
    ({ get }) => {
      const allModels = get(modelsAtom);
      return allModels[modelType];
    },
});

export const diffusorsAtom = atom<Model[] | undefined>({
  key: "diffusorsAtom",
  default: undefined,
});

export const sttsAtom = atom<Model[] | undefined>({
  key: "sttsAtom",
  default: undefined,
});

export const ttssAtom = atom<Model[] | undefined>({
  key: "ttssAtom",
  default: undefined,
});

export const useLlms = () => {
  const [llms, setLlms] = useRecoilState(llmsAtom);
  const fetchAllModels = useGetAllAPIModels<Model>();

  useEffect(() => {
    const fetchData = async () => {
      if (llms === null) {
        try {
          const data = await fetchAllModels("models");
          setLlms(data);
        } catch (error) {
          console.error("Failed to fetch LLM models:", error);
        }
      }
    };

    fetchData();
  }, [fetchAllModels, llms, setLlms]);

  const addLlm = async (newLlm: Model) => {
    try {
      const createdLlm = await createModel("llms", newLlm);
      setLlms((prev) => (prev ? [...prev, createdLlm] : [createdLlm]));
    } catch (error) {
      console.error("Failed to create LLM model:", error);
    }
  };

  const updateLlm = async (updatedLlm: Model) => {
    try {
      const updated = await updateModel("llms", updatedLlm);
      setLlms((prev) =>
        prev?.map((llm) => (llm.id === updated.id ? updated : llm))
      );
    } catch (error) {
      console.error("Failed to update LLM model:", error);
    }
  };

  const deleteLlm = async (id: number) => {
    const deleteAPIModel = useDeleteAPIModel();
    try {
      await deleteAPIModel("models", id);
      setLlms((prev) => prev?.filter((llm) => llm.id !== id));
    } catch (error) {
      console.error("Failed to delete LLM model:", error);
    }
  };

  const reorderLlms = async (newOrder: Model[]) => {
    setLlms(newOrder); // Optimistic update

    try {
      await bulkUpdateModels("llms", newOrder);
    } catch (error) {
      console.error("Failed to reorder LLM models:", error);
      // Optionally, rollback optimistic update
    }
  };

  return { llms, addLlm, updateLlm, deleteLlm, reorderLlms };
};
