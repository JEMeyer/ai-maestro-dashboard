import React from "react";
import { ComputerList } from "./Computer/ComputerList";
import { ModelList } from "./ModelList";
import styled from "styled-components";

const Wrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
`;

export const ConfigurationVisualizer: React.FC = () => {
  return (
    <Wrapper>
      <ComputerList />
      <ModelList />
    </Wrapper>
  );
};
