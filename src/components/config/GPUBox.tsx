import React from "react";
import { Model } from "../../types/database";

type Props = {
  models: Model[];
  onModelsChange: (models: Model[]) => void;
};

export const GPUBox: React.FC<Props> = ({ models }) => {
  return <div>{models.join(", ")}</div>;
};
