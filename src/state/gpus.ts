import {
  atom,
  useRecoilState,
  useRecoilValue,
  useSetRecoilState,
} from "recoil";
import { GPU } from "../types";
import { useFetchAllModelTypes } from "../services/database";
import { useCallback, useEffect, useMemo } from "react";
import { usePutAPIModel } from "../services/apiService";

const allGpusAtom = atom<GPU[] | null>({
  key: "allGpusAtom",
  default: null,
});

export const useFetchAndSetAllGpus = () => {
  const setGpus = useSetRecoilState(allGpusAtom);
  const fetchAllModels = useFetchAllModelTypes<GPU>("gpus");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchAllModels();
        setGpus(
          data.map((gpu) => {
            return {
              ...gpu,
              vram_size: Number(gpu.vram_size),
              weight: Number(gpu.weight),
            };
          })
        );
      } catch (error) {
        console.error("Failed to fetch models:", error);
      }
    };

    fetchData();
  }, [fetchAllModels, setGpus]);
};

export const useGpusForComputer = (computerId: number) => {
  const gpus = useRecoilValue(allGpusAtom);

  const filteredGpus = useMemo(
    () =>
      gpus
        ?.filter((gpu) => gpu.computer_id === computerId)
        .sort((a, b) => a.display_order - b.display_order),
    [computerId, gpus]
  );

  return filteredGpus;
};

export const useGpus = () => {
  const [allGpus, setAllGpus] = useRecoilState(allGpusAtom);
  const updateGpu = usePutAPIModel<GPU>();

  const reorderGpus = useCallback(
    async (
      sourceIndex: number,
      destinationIndex: number,
      computerId: number
    ) => {
      if (allGpus == null) return;

      const gpusForComputer = allGpus
        .filter(({ computer_id }) => computer_id === computerId)
        .sort((a, b) => a.display_order - b.display_order);

      if (!gpusForComputer) {
        console.error(`No gpus to re-order for computer ${computerId}.`);
        return;
      }

      const newOrder = Array.from(gpusForComputer);
      const [movedItem] = newOrder.splice(sourceIndex, 1);
      newOrder.splice(destinationIndex, 0, movedItem);

      const gpuIdsToUpdate: number[] = [];
      const updates = newOrder.reduce((acc, gpu, index) => {
        if (gpu.display_order !== index) {
          acc.push({ ...gpu, display_order: index });
          gpuIdsToUpdate.push(gpu.id);
        }
        return acc;
      }, [] as GPU[]);

      const newGpus = allGpus.map((gpu) => {
        if (gpuIdsToUpdate.includes(gpu.id)) {
          return updates.find((innerGpu) => gpu.id === innerGpu.id) || gpu;
        } else {
          return gpu;
        }
      });

      try {
        setAllGpus(newGpus);
        await Promise.all(updates.map((model) => updateGpu("gpus", model)));
      } catch (error) {
        console.error("Failed to reorder models:", error);
        setAllGpus(() => allGpus);
      }
    },
    [allGpus, setAllGpus, updateGpu]
  );

  return { allGpus, reorderGpus };
};
