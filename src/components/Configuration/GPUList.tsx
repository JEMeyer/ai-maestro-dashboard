import styled from "styled-components";
import { getGpuId, GPU as GPUType } from "../../types";
import { Draggable, Droppable } from "@hello-pangea/dnd";

const Container = styled.div<{ $isDragging: boolean }>`
  border: 1px solid lightgray;
  border-radius: 2px;
  padding: 8px;
  margin-bottom: 8px;
  background-color: ${(props) => (props.$isDragging ? "lightGreen" : "white")};
`;

const List = styled.div<{ $isDraggingOver: boolean }>`
  padding: 8px;
  overflow: hidden;
  transition: max-height 0.3s ease;
  background-color: ${(props) => (props.$isDraggingOver ? "skyblue" : "white")};
`;

type GpuListProps = {
  gpus: GPUType[];
};

export const GPUList: React.FC<GpuListProps> = ({ gpus }) => {
  return (
    <Droppable droppableId={"gpus_for" + gpus[0].computer_id}>
      {(provided, snapshot) => (
        <List
          ref={provided.innerRef}
          {...provided.droppableProps}
          $isDraggingOver={snapshot.isDraggingOver}
        >
          {gpus.map((gpu, index) => {
            return <GPU key={getGpuId(gpu, index)} gpu={gpu} index={index} />;
          })}
        </List>
      )}
    </Droppable>
  );
};

type GpuProps = {
  gpu: GPUType;
  index: number;
};

const GPU: React.FC<GpuProps> = ({ gpu, index }) => {
  return (
    <Draggable draggableId={getGpuId(gpu, index)} index={index}>
      {(provided, snapshot) => (
        <Container
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
          $isDragging={snapshot.isDragging}
        >
          {gpu.name} - {gpu.vram_size} GB
        </Container>
      )}
    </Draggable>
  );
};
