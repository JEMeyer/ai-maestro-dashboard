import React from "react";
import { ModelItem } from "./ModelItem";
import { useAllModels } from "../../state/models";
import styled from "styled-components";

const Container = styled.div`
  margin: 8px;
  border: 1px solid lightgray;
  border-radius: 2px;
`;
const Title = styled.h3`
  padding: 8px;
`;
const List = styled.div`
  padding: 8px;
`;

export const ModelList: React.FC = () => {
  const models = useAllModels();

  if (models == null) return <span>Loading models...</span>;

  return (
    <Container>
      <Title>Models</Title>
      <List>
        {models.map((model) => (
          <ModelItem key={model.name + model.size} model={model} />
        ))}
      </List>
    </Container>
  );
};
