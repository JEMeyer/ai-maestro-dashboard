import React from "react";
import { Model } from "../../types/database";
import styled from "styled-components";

const Container = styled.div`
  border: 1px solid lightgray;
  border-radius: 2px;
  padding: 8px;
  margin-bottom: 8px;
`;

type Props = {
  model: Model;
};

export const ModelItem: React.FC<Props> = ({ model }) => {
  return <Container>{model.name}</Container>;
};
