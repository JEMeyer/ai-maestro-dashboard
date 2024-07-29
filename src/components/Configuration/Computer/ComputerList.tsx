import React, { useState } from "react";
import styled from "styled-components";
import { Draggable, Droppable } from "@hello-pangea/dnd";
import { EditableTitle } from "./EditableTitle"; // Import the EditableTitle component
import { GPUList } from "./GPUList";
import {
  DraggableIdPrefix,
  DroppableIdPrefix,
  DroppableType,
} from "../../../types/draggable";
import { List } from "../../UI/List";
import { useComputers } from "../../../state/computers";

const Container = styled.div`
  margin: 8px;
  border: 1px solid lightgray;
  border-radius: 2px;
  background-color: #f9f9f9;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const TitleContainer = styled.div`
  padding: 8px;
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #eaeaea;
  border-bottom: 1px solid lightgray;
  border-radius: 2px 2px 0 0;
`;

export const ComputerList: React.FC = () => {
  const [computers] = useComputers();
  const [computerNames, setComputerNames] = useState<{ [key: string]: string }>(
    {}
  );

  const handleNameChange = (id: number, newName: string) => {
    setComputerNames((prev) => ({
      ...prev,
      [id]: newName,
    }));
    // Here you might want to call an API to update the computer name in the backend
  };

  if (computers == null) {
    return <span>Loading computers...</span>;
  }

  return (
    <>
      {computers.map((computer, index) => (
        <Draggable
          key={DraggableIdPrefix.COMPUTER + computer.id}
          draggableId={DraggableIdPrefix.COMPUTER + computer.id}
          index={index}
        >
          {(provided) => (
            <Container
              key={computer.name + computer.ip_addr}
              ref={provided.innerRef}
              {...provided.draggableProps}
              {...provided.dragHandleProps}
            >
              <TitleContainer>
                <EditableTitle
                  name={computerNames[computer.id] || computer.name}
                  onNameChange={(newName) =>
                    handleNameChange(computer.id, newName)
                  }
                />
              </TitleContainer>
              <Droppable
                type={DroppableType.GPU}
                droppableId={DroppableIdPrefix.GPU_LIST + computer.id}
              >
                {(provided, snapshot) => (
                  <List
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                    $isDraggingOver={snapshot.isDraggingOver}
                  >
                    <GPUList computerId={computer.id} />
                    {provided.placeholder}
                  </List>
                )}
              </Droppable>
            </Container>
          )}
        </Draggable>
      ))}
    </>
  );
};
