import { atom, useRecoilState } from "recoil";
import { Assignment } from "../types";
import { useFetchAllModelTypes } from "../services/database";
import { useEffect, useMemo } from "react";

const allAssignmentsAtom = atom<Assignment[] | null>({
  key: "allAssignmentsAtom",
  default: null,
});

const useAllAssignments = () => {
  const [assignments, setAssignments] = useRecoilState(allAssignmentsAtom);
  const fetchAllModels = useFetchAllModelTypes<Assignment>("assignments");

  useEffect(() => {
    const fetchData = async () => {
      if (assignments == null) {
        try {
          const data = await fetchAllModels();
          setAssignments(data);
        } catch (error) {
          console.error("Failed to fetch models:", error);
        }
      }
    };

    fetchData();
  }, [assignments, fetchAllModels, setAssignments]);

  return assignments;
};

export const useAssignmentsForGpus = (gpuIds: number[]) => {
  const assignments = useAllAssignments();

  return useMemo(() => {
    // Create a map to store the assignments for each GPU
    const assignmentsByGpuId = new Map<number, Assignment[]>();

    gpuIds.forEach((gpuId) => {
      // Filter assignments that include the current GPU ID
      const filteredAssignments = assignments?.filter((assignment) => {
        return assignment.gpuIds.includes(gpuId);
      });

      if (filteredAssignments && filteredAssignments.length > 0) {
        // Store the filtered assignments in the map, associated with the GPU ID
        assignmentsByGpuId.set(gpuId, filteredAssignments);
      } else {
        assignmentsByGpuId.set(gpuId, []);
      }
    });

    return assignmentsByGpuId;
  }, [assignments, gpuIds]);
};
