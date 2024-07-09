import { atom, useRecoilState } from "recoil";
import { Assignment } from "../types/database";
import { useFetchAllModelTypes } from "../services/database";
import { useEffect } from "react";

const allAssignmentsAtom = atom<Assignment[] | null>({
  key: "allAssignmentsAtom",
  default: null,
});

export const useAllAssignments = () => {
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
