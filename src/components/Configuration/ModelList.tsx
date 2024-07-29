import React, { useState } from "react";
import { ModelItem } from "./ModelItem";
import styled from "styled-components";
import { Droppable } from "@hello-pangea/dnd";
import { DroppableIdPrefix, DroppableType } from "../../types/draggable";
import { CollapsibleList } from "../UI/List";
import { useModels } from "../../state/models";

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

const Arrow = styled.span<{ $isCollapsed: boolean }>`
  display: inline-block;
  margin-left: 8px;
  transform: ${({ $isCollapsed }) =>
    $isCollapsed ? "rotate(-90deg)" : "rotate(0)"};
  transition: transform 0.5s ease;
`;

export const ModelList: React.FC = () => {
  const { llms, diffusors, stts, ttss } = useModels();
  const [isLLMsCollapsed, setIsLLMsCollapsed] = useState(false);
  const [isDiffusorsCollapsed, setIsDiffusorsCollapsed] = useState(false);
  const [isSttsCollapsed, setIsSttsCollapsed] = useState(false);
  const [isTtssCollapsed, setIsTtssCollapsed] = useState(false);

  if (llms == null || diffusors == null || stts == null || ttss == null) {
    return <span>Loading models...</span>;
  }

  return (
    <>
      <Container>
        <Title onClick={() => setIsLLMsCollapsed(!isLLMsCollapsed)}>
          LLMs
          <Arrow $isCollapsed={isLLMsCollapsed}>▼</Arrow>
        </Title>
        <Droppable
          droppableId={DroppableIdPrefix.LLM_LIST}
          type={DroppableType.MODEL}
        >
          {(provided, snapshot) => (
            <CollapsibleList
              ref={provided.innerRef}
              {...provided.droppableProps}
              $isCollapsed={isLLMsCollapsed}
              $isDraggingOver={snapshot.isDraggingOver}
              $isDraggingOverLegalItem={
                snapshot.isDraggingOver && snapshot.draggingFromThisWith != null
              }
            >
              {llms!.map((model, index) => (
                <ModelItem
                  key={`llm_${model.name}`}
                  model={model}
                  index={index}
                />
              ))}
              {provided.placeholder}
            </CollapsibleList>
          )}
        </Droppable>
      </Container>

      <Container>
        <Title onClick={() => setIsDiffusorsCollapsed(!isDiffusorsCollapsed)}>
          Image Generators
          <Arrow $isCollapsed={isDiffusorsCollapsed}>▼</Arrow>
        </Title>
        <Droppable
          droppableId={DroppableIdPrefix.DIFFUSOR_LIST}
          type={DroppableType.MODEL}
        >
          {(provided, snapshot) => (
            <CollapsibleList
              ref={provided.innerRef}
              {...provided.droppableProps}
              $isCollapsed={isDiffusorsCollapsed}
              $isDraggingOver={snapshot.isDraggingOver}
              $isDraggingOverLegalItem={
                snapshot.isDraggingOver && snapshot.draggingFromThisWith != null
              }
            >
              {diffusors!.map((model, index) => (
                <ModelItem
                  key={`diffusor_${model.name}`}
                  model={model}
                  index={index}
                />
              ))}
              {provided.placeholder}
            </CollapsibleList>
          )}
        </Droppable>
      </Container>

      <Container>
        <Title onClick={() => setIsSttsCollapsed(!isSttsCollapsed)}>
          STT Models
          <Arrow $isCollapsed={isSttsCollapsed}>▼</Arrow>
        </Title>
        <Droppable
          droppableId={DroppableIdPrefix.STT_LIST}
          type={DroppableType.MODEL}
        >
          {(provided, snapshot) => (
            <CollapsibleList
              ref={provided.innerRef}
              {...provided.droppableProps}
              $isCollapsed={isSttsCollapsed}
              $isDraggingOver={snapshot.isDraggingOver}
              $isDraggingOverLegalItem={
                snapshot.isDraggingOver && snapshot.draggingFromThisWith != null
              }
            >
              {stts!.map((model, index) => (
                <ModelItem
                  key={`stt_${model.name}`}
                  model={model}
                  index={index}
                />
              ))}
              {provided.placeholder}
            </CollapsibleList>
          )}
        </Droppable>
      </Container>

      <Container>
        <Title onClick={() => setIsTtssCollapsed(!isTtssCollapsed)}>
          TTS Models
          <Arrow $isCollapsed={isTtssCollapsed}>▼</Arrow>
        </Title>
        <Droppable
          droppableId={DroppableIdPrefix.TTS_LIST}
          type={DroppableType.MODEL}
        >
          {(provided, snapshot) => (
            <CollapsibleList
              ref={provided.innerRef}
              {...provided.droppableProps}
              $isCollapsed={isTtssCollapsed}
              $isDraggingOver={snapshot.isDraggingOver}
              $isDraggingOverLegalItem={
                snapshot.isDraggingOver && snapshot.draggingFromThisWith != null
              }
            >
              {ttss!.map((model, index) => (
                <ModelItem
                  key={`tts_${model.name}`}
                  model={model}
                  index={index}
                />
              ))}
              {provided.placeholder}
            </CollapsibleList>
          )}
        </Droppable>
      </Container>
    </>
  );
};
