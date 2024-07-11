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
  const fetchAllModels = useFetchAllModelTypes<Assignment>("gpus");

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

export const useAssignmentsForGpus = (gpuIds: string[]) => {
  const assignments = useAllAssignments();

  return useMemo(() => {
    return assignments?.filter((assignment) =>
      gpuIds.some((id) => assignment.gpu_ids.includes(id))
    );
  }, [assignments, gpuIds]);
};
