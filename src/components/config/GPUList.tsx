import styled from "styled-components";
import { getGpuId, GPU as GPUType } from "../../types/database";
import { Draggable, Droppable } from "@hello-pangea/dnd";

const Container = styled.div`
  border: 1px solid lightgray;
  border-radius: 2px;
  padding: 8px;
  margin-bottom: 8px;
  background-color: white;
`;

const List = styled.div`
  padding: 8px;
  overflow: hidden;
  transition: max-height 0.3s ease;
`;

type GpuListProps = {
  gpus: GPUType[];
};

export const GPUList: React.FC<GpuListProps> = ({ gpus }) => {
  console.log(gpus);
  return (
    <Droppable droppableId={"gpus_for" + gpus[0].computer_id}>
      {(provided) => (
        <List ref={provided.innerRef} {...provided.droppableProps}>
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
      {(provided) => (
        <Container
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
        >
          {gpu.name} - {gpu.vram_size} GB
        </Container>
      )}
    </Draggable>
  );
};
