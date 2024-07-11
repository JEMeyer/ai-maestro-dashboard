import { atom, useRecoilState } from "recoil";
import { Computer } from "../types";
import { useFetchAllModelTypes } from "../services/database";
import { useEffect } from "react";

const allComputersAtom = atom<Computer[] | null>({
  key: "allComputersAtom",
  default: null,
});

export const useAllComputers = () => {
  const [computers, setComputers] = useRecoilState(allComputersAtom);
  const fetchAllModels = useFetchAllModelTypes<Computer>("computers");

  useEffect(() => {
    const fetchData = async () => {
      if (computers == null) {
        try {
          const data = await fetchAllModels();
          setComputers(data);
        } catch (error) {
          console.error("Failed to fetch models:", error);
        }
      }
    };

    fetchData();
  }, [fetchAllModels, computers, setComputers]);

  return computers;
};
