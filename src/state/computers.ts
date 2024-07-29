import { atom, useRecoilState, useSetRecoilState } from "recoil";
import { Computer } from "../types";
import { useFetchAllModelTypes } from "../services/database";
import { useCallback, useEffect } from "react";
import { usePutAPIModel } from "../services/apiService";

const allComputersAtom = atom<Computer[] | null>({
  key: "allComputersAtom",
  default: null,
});

export const useFetchAndSetAllComputers = () => {
  const setComputers = useSetRecoilState(allComputersAtom);
  const fetchAllModels = useFetchAllModelTypes<Computer>("computers");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchAllModels();
        setComputers(data);
      } catch (error) {
        console.error("Failed to fetch models:", error);
      }
    };

    fetchData();
  }, [fetchAllModels, setComputers]);
};

export const useComputers = () => useRecoilState(allComputersAtom);

export const useReorderComputers = () => {
  const [computers, setComputers] = useComputers();
  const updateAPIModel = usePutAPIModel<Computer>();

  return useCallback(
    async (sourceIndex: number, destinationIndex: number) => {
      if (computers == null) {
        console.error(`No computers to reorder`);
        return;
      }
      const newOrder = Array.from(computers);
      const [movedItem] = newOrder.splice(sourceIndex, 1);
      newOrder.splice(destinationIndex, 0, movedItem);

      const assignmentIdsToUpdate: number[] = [];
      const updates = newOrder.reduce((acc, model, index) => {
        if (model.display_order !== index) {
          acc.push({ ...model, display_order: index });
          assignmentIdsToUpdate.push(model.id);
        }
        return acc;
      }, [] as Computer[]);

      try {
        // Optimisitic update
        setComputers(newOrder);

        await Promise.all(
          updates.map(async (model) => {
            try {
              await updateAPIModel("computers", model);
            } catch (error) {
              console.error("Failed to update LLM model:", error);
            }
          })
        );
      } catch (error) {
        console.error("Failed to reorder LLM models:", error);
        // Rollback optimistic update
        setComputers(computers);
      }
    },
    [computers, setComputers, updateAPIModel]
  );
};
