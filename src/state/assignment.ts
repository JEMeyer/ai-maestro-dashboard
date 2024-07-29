import {
  atom,
  useRecoilState,
  useRecoilValue,
  useSetRecoilState,
} from "recoil";
import { Assignment } from "../types";
import { useFetchAllModelTypes } from "../services/database";
import { useCallback, useEffect } from "react";
import { usePostAPIModel, usePutAPIModel } from "../services/apiService";
import { useComputers } from "./computers";
import { useGpus } from "./gpus";

const allAssignmentsAtom = atom<Assignment[] | null>({
  key: "allAssignmentsAtom",
  default: null,
});

export const useFetchAndSetAllAssignments = () => {
  const setAssignments = useSetRecoilState(allAssignmentsAtom);
  const fetchAllModels = useFetchAllModelTypes<Assignment>("assignments");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchAllModels();
        setAssignments(data);
      } catch (error) {
        console.error("Failed to fetch models:", error);
      }
    };

    fetchData();
  }, [setAssignments, fetchAllModels]);
};

export const useAssignmentsForGpu = (gpuId: number) => {
  const assignments = useRecoilValue(allAssignmentsAtom);

  return assignments
    ?.filter((assignment) => {
      return assignment.gpu_ids.includes(gpuId);
    })
    .sort((a, b) => a.display_order - b.display_order);
};

export const useReorderAssignments = () => {
  const [allAssignments, setAssignments] = useRecoilState(allAssignmentsAtom);
  const updateAPIModel = usePutAPIModel<Assignment>();

  return useCallback(
    async (sourceIndex: number, destinationIndex: number, gpuId: number) => {
      if (allAssignments == null) return;

      const assignments = allAssignments.filter((assignment) => {
        return assignment.gpu_ids.includes(gpuId);
      });

      if (assignments == null) {
        console.error(`No assignments to update for gpu ${gpuId}.`);
        return;
      }

      const newOrder = Array.from(assignments);
      const [movedItem] = newOrder.splice(sourceIndex, 1);
      newOrder.splice(destinationIndex, 0, movedItem);

      const assignmentIdsToUpdate: number[] = [];
      const updates = newOrder.reduce((acc, model, index) => {
        if (model.display_order !== index) {
          acc.push({ ...model, display_order: index });
          assignmentIdsToUpdate.push(model.id);
        }
        return acc;
      }, [] as Assignment[]);

      const optimisticState = allAssignments.map((a) => {
        if (assignmentIdsToUpdate.includes(a.id)) {
          return updates.find(({ id }) => id === a.id) || a;
        } else {
          return a;
        }
      });

      try {
        // Optimistic update
        setAssignments(optimisticState);

        await Promise.all(
          updates.map(async (model) => {
            try {
              await updateAPIModel("assignments", model);
            } catch (error) {
              console.error("Failed to update LLM model:", error);
            }
          })
        );
      } catch (error) {
        console.error("Failed to reorder LLM models:", error);
        // Rollback optimistic update
        setAssignments(allAssignments);
      }
    },
    [allAssignments, setAssignments, updateAPIModel]
  );
};

export const useAddAssignment = () => {
  const createAssignment = usePostAPIModel<Assignment>();
  const setAssignments = useSetRecoilState(allAssignmentsAtom);

  return useCallback(
    async (newAssignment: Omit<Assignment, "id">) => {
      // Call the post, then add it to state
      const createdAssignment = await createAssignment(
        "assignments",
        newAssignment
      );
      if (createdAssignment != null)
        setAssignments((prev) =>
          prev == null ? [createdAssignment] : prev.concat(createdAssignment)
        );
    },
    [createAssignment, setAssignments]
  );
};

export const useNextPortForComputer = () => {
  const [computers] = useComputers();
  const { allGpus } = useGpus();
  const assignments = useRecoilValue(allAssignmentsAtom);

  return useCallback(
    (computerId: number) => {
      const computer = computers?.find(({ id }) => id === computerId);
      if (computer != null) {
        const gpusOnComputer = allGpus?.filter(
          ({ computer_id }) => computer_id === computerId
        );
        const filteredAssignments = assignments?.filter((a) =>
          a.gpu_ids.some(
            (gpuid) => gpusOnComputer?.find(({ id }) => gpuid === id) != null
          )
        );
        return filteredAssignments;
      }
    },
    [allGpus, assignments, computers]
  );
};
