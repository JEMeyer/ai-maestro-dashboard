import { useFetchAndSetAllModels } from "./models";
import { useFetchAndSetAllGpus } from "./gpus";
import { useFetchAndSetAllComputers } from "./computers";
import { useFetchAndSetAllAssignments } from "./assignment";

export const useFetchAndSetAllData = () => {
  useFetchAndSetAllGpus();
  useFetchAndSetAllModels();
  useFetchAndSetAllComputers();
  useFetchAndSetAllAssignments();
};
