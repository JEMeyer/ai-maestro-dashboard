import React from "react";
import { useAllComputers } from "../../state/computers";
import { useAllGpus } from "../../state/gpus";
import { ComputerList } from "./ComputerList";
import { ModelList } from "./ModelList";

export const ConfigurationVisualizer: React.FC = () => {
  const computers = useAllComputers();
  const gpus = useAllGpus();

  if (computers == null || gpus == null) {
    return <span>Loading data...</span>;
  }

  return (
    <>
      <ComputerList />
      <ModelList />
    </>
  );
};
