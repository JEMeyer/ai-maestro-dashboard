import React from "react";
import styled from "styled-components";
import { Droppable } from "@hello-pangea/dnd";
import { useAllComputers } from "../../state/computers";
import { useAllGpus } from "../../state/gpus";
import { GPUList } from "./GPUList";

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

const List = styled.div`
  padding: 8px;
  overflow: hidden;
  transition: max-height 0.3s ease;
  flex: 1 0 auto; // grow up to its maximum content width
  max-width: 450px;
`;

export const ComputerList: React.FC = () => {
  const computers = useAllComputers();
  const gpus = useAllGpus();

  if (computers == null || gpus == null) {
    return <span>Loading computers...</span>;
  }

  const a = gpus.filter(({ computer_id }) => computers[0].id === computer_id);
  console.log(gpus);
  console.log("filtered:", a);

  return (
    <>
      {computers.map((computer) => (
        <Container key={computer.id ?? computer.name + computer.ip_addr}>
          <Title>{computer.name}</Title>
          <Droppable droppableId={`computer_${computer.name}_${computer.id}`}>
            {(provided) => (
              <List ref={provided.innerRef} {...provided.droppableProps}>
                <GPUList
                  gpus={gpus.filter(
                    ({ computer_id }) => computer.id === computer_id
                  )}
                />
                {provided.placeholder}
              </List>
            )}
          </Droppable>
        </Container>
      ))}
    </>
  );
};
