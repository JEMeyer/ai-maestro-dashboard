import React, { useState } from "react";
import Select, { MultiValue } from "react-select";

interface Option {
  value: string;
  label: string;
}

const options = ["LLMs", "Speech_Models", "Diffusors"].map((model) => ({
  value: model,
  label: model,
}));

const ModelSelect = () => {
  const [selectedOption, setSelectedOption] =
    useState<MultiValue<Option> | null>(null);

  return (
    <div>
      <Select
        isMulti
        defaultValue={selectedOption}
        onChange={setSelectedOption}
        options={options}
      />
    </div>
  );
};

export default ModelSelect;
