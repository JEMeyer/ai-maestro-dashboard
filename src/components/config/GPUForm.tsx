import React, { useState } from "react";
import { GPUBox } from "./GPUBox";
import { GPU, Model } from "../../types/database";
import { ModelList } from "./ModelList";

type Props = {
  onSave: (gpu: GPU) => void;
};

export const GPUForm: React.FC<Props> = () => {
  const [models, setModels] = useState<Model[]>([]);

  const handleGPUBoxModelsChange = (newModels: Model[]) => {
    setModels(newModels);
  };

  return (
    <div>
      <ModelList />
      <GPUBox models={models} onModelsChange={handleGPUBoxModelsChange} />
    </div>
  );
};
