import { atom, useRecoilState, useSetRecoilState } from "recoil";
import { Model, ModelType } from "../types";
import { useDeleteAPIModel, usePutAPIModel } from "../services/apiService";
import { useCallback, useEffect } from "react";
import { useFetchAllModelTypes } from "../services/database";

const modelsAtom = atom<Model[] | undefined>({
  key: "modelsAtom",
  default: undefined,
});

export const useFetchAndSetAllModels = () => {
  const setModels = useSetRecoilState(modelsAtom);
  const fetchAllModels = useFetchAllModelTypes<Model>("models");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchAllModels();
        setModels(data);
      } catch (error) {
        console.error("Failed to fetch models:", error);
      }
    };

    fetchData();
  }, [fetchAllModels, setModels]);
};

const useModelsOfType = (modelType: ModelType) => {
  const [models, setModels] = useRecoilState(modelsAtom);

  const filteredModels = models
    ?.filter((model) => model.model_type === modelType)
    .sort((a, b) => a.display_order - b.display_order);

  const updateFilteredModels = (updaterFn: (models: Model[]) => Model[]) => {
    const updatedFilteredModels = updaterFn(filteredModels ?? []);

    const newModels = models?.map((model) => {
      if (model.model_type === modelType) {
        return updatedFilteredModels.shift() || model;
      } else {
        return model;
      }
    });

    setModels(newModels);
  };

  return [filteredModels, updateFilteredModels] as const;
};

export const useModels = () => {
  const setModels = useSetRecoilState(modelsAtom);
  const [llms, setLlms] = useModelsOfType("llm");
  const [diffusors, setDiffusors] = useModelsOfType("diffusor");
  const [stts, setStts] = useModelsOfType("stt");
  const [ttss, setTtss] = useModelsOfType("tts");
  const updateAPIModel = usePutAPIModel<Model>();
  const deleteAPIModel = useDeleteAPIModel();

  const updateModel = useCallback(
    async (updatedModel: Model) => {
      try {
        await updateAPIModel("models", updatedModel);
      } catch (error) {
        console.error("Failed to update model:", error);
      }
    },
    [updateAPIModel]
  );

  const deleteModel = useCallback(
    async (name: string) => {
      try {
        await deleteAPIModel("models", name);
        setModels((prev) => prev?.filter((model) => model.name !== name));
      } catch (error) {
        console.error("Failed to delete model:", error);
      }
    },
    [deleteAPIModel, setModels]
  );

  const reorderModels = useCallback(
    async (
      sourceIndex: number,
      destinationIndex: number,
      modelType: ModelType
    ) => {
      let droppableModels: Model[] | undefined;
      let setDroppableModels: (
        updaterFn: (models: Model[]) => Model[]
      ) => void | undefined;

      switch (modelType) {
        case "llm":
          droppableModels = llms;
          setDroppableModels = setLlms;
          break;
        case "tts":
          droppableModels = ttss;
          setDroppableModels = setTtss;
          break;
        case "stt":
          droppableModels = stts;
          setDroppableModels = setStts;
          break;
        case "diffusor":
          droppableModels = diffusors;
          setDroppableModels = setDiffusors;
          break;
        default:
          console.error(`Invalid modelType: ${modelType}`);
          return;
      }

      if (!droppableModels || !setDroppableModels) {
        console.error(`No models to re-order for ${modelType}.`);
        return;
      }

      const newOrder = Array.from(droppableModels);
      const [movedItem] = newOrder.splice(sourceIndex, 1);
      newOrder.splice(destinationIndex, 0, movedItem);

      const updates = newOrder.reduce((acc, model, index) => {
        if (model.display_order !== index) {
          acc.push({ ...model, display_order: index });
        }
        return acc;
      }, [] as Model[]);

      let fallback: Model[] = [];

      try {
        await Promise.all(updates.map((model) => updateModel(model)));
        setDroppableModels((oldState) => {
          fallback = oldState;
          return newOrder;
        });
      } catch (error) {
        console.error("Failed to reorder models:", error);
        setDroppableModels(() => fallback);
      }
    },
    [
      diffusors,
      llms,
      setDiffusors,
      setLlms,
      setStts,
      setTtss,
      stts,
      ttss,
      updateModel,
    ]
  );

  return {
    llms,
    diffusors,
    stts,
    ttss,
    updateModel,
    deleteModel,
    reorderModels,
  };
};
