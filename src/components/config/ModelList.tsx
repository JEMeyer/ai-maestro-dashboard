import React, { useState } from "react";
import { ModelItem } from "./ModelItem";
import { useAllModels } from "../../state/models";
import styled from "styled-components";
import { Droppable } from "react-beautiful-dnd";
import { getModelId } from "../../types/database";

const Container = styled.div`
  margin: 8px;
  border: 1px solid lightgray;
  border-radius: 2px;
`;

const Title = styled.h3`
  padding: 8px;
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const List = styled.div<{ isCollapsed: boolean }>`
  padding: 8px;
  max-height: ${({ isCollapsed }) => (isCollapsed ? "0" : "1000px")};
  overflow: hidden;
  transition: max-height 0.3s ease;
`;

const Arrow = styled.span<{ isCollapsed: boolean }>`
  display: inline-block;
  margin-left: 8px;
  transform: ${({ isCollapsed }) =>
    isCollapsed ? "rotate(-90deg)" : "rotate(0)"};
  transition: transform 0.3s ease;
`;

export const ModelList: React.FC = () => {
  const { llms, diffusors, speechModels } = useAllModels();
  const [isLLMsCollapsed, setIsLLMsCollapsed] = useState(false);
  const [isDiffusorsCollapsed, setIsDiffusorsCollapsed] = useState(false);
  const [isSpeechModelsCollapsed, setIsSpeechModelsCollapsed] = useState(false);

  if (llms == null || diffusors == null || speechModels == null) {
    return <span>Loading models...</span>;
  }

  return (
    <>
      <Container>
        <Title onClick={() => setIsLLMsCollapsed(!isLLMsCollapsed)}>
          LLMs
          <Arrow isCollapsed={isLLMsCollapsed}>▼</Arrow>
        </Title>
        <Droppable droppableId={"llm_list"}>
          {(provided) => (
            <List
              ref={provided.innerRef}
              {...provided.droppableProps}
              isCollapsed={isLLMsCollapsed}
            >
              {llms!.map((model, index) => (
                <ModelItem
                  key={getModelId(model)}
                  model={model}
                  index={index}
                />
              ))}
              {provided.placeholder}
            </List>
          )}
        </Droppable>
      </Container>

      <Container>
        <Title onClick={() => setIsDiffusorsCollapsed(!isDiffusorsCollapsed)}>
          Image Generators
          <Arrow isCollapsed={isDiffusorsCollapsed}>▼</Arrow>
        </Title>
        <Droppable droppableId={"diffusor_list"}>
          {(provided) => (
            <List
              ref={provided.innerRef}
              {...provided.droppableProps}
              isCollapsed={isDiffusorsCollapsed}
            >
              {diffusors!.map((model, index) => (
                <ModelItem
                  key={getModelId(model)}
                  model={model}
                  index={index}
                />
              ))}
              {provided.placeholder}
            </List>
          )}
        </Droppable>
      </Container>

      <Container>
        <Title
          onClick={() => setIsSpeechModelsCollapsed(!isSpeechModelsCollapsed)}
        >
          Speech Models
          <Arrow isCollapsed={isSpeechModelsCollapsed}>▼</Arrow>
        </Title>
        <Droppable droppableId={"speech_model_list"}>
          {(provided) => (
            <List
              ref={provided.innerRef}
              {...provided.droppableProps}
              isCollapsed={isSpeechModelsCollapsed}
            >
              {speechModels!.map((model, index) => (
                <ModelItem
                  key={getModelId(model)}
                  model={model}
                  index={index}
                />
              ))}
              {provided.placeholder}
            </List>
          )}
        </Droppable>
      </Container>
    </>
  );
};
