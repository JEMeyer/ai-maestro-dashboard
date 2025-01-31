import React, { useState, useCallback } from "react";
import { DragDropContext, DropResult } from "@hello-pangea/dnd";
import {
  useDragUpdateHandler,
  useDragEndHandler,
} from "../../hooks/useDragHandlers";
import { useModels } from "../../state/models";
import { DroppableIdPrefix } from "../../types/draggable";
import CreateAssignmentModal from "./CreateConfigurationModal";
import { Model } from "../../types";

interface AssignmentControllerProps {
  children: React.ReactNode;
}

const AssignmentController: React.FC<AssignmentControllerProps> = ({
  children,
}) => {
  const [assignmentModal, setAssignmentModal] = useState<{
    isOpen: boolean;
    gpuId: number | null;
    model: Model | null;
  }>({
    isOpen: false,
    gpuId: null,
    model: null,
  });

  const { llms, diffusors, stts, ttss } = useModels();
  const handleDragUpdate = useDragUpdateHandler();
  const baseDragEndHandler = useDragEndHandler();

  const handleDragEnd = useCallback(
    async (result: DropResult) => {
      const { destination, draggableId } = result;

      // Check if we're dropping a model onto a GPU's assignment list
      if (
        destination?.droppableId.startsWith(DroppableIdPrefix.ASSIGNMENT_LIST)
      ) {
        const gpuId = Number(
          destination.droppableId.replace(DroppableIdPrefix.ASSIGNMENT_LIST, "")
        );

        // Find the model being dragged
        const modelId = draggableId.replace("draggable_model_", "");
        const allModels = [
          ...(llms || []),
          ...(diffusors || []),
          ...(stts || []),
          ...(ttss || []),
        ];
        const model = allModels.find((m) => m.name === modelId);

        if (model) {
          setAssignmentModal({
            isOpen: true,
            gpuId,
            model,
          });
          return;
        }
      }

      // Handle all other drag operations normally
      await baseDragEndHandler(result);
    },
    [baseDragEndHandler, llms, diffusors, stts, ttss]
  );

  const handleCloseModal = () => {
    setAssignmentModal({
      isOpen: false,
      gpuId: null,
      model: null,
    });
  };

  return (
    <>
      <DragDropContext
        onDragEnd={handleDragEnd}
        onDragUpdate={handleDragUpdate}>
        {children}
      </DragDropContext>

      <CreateAssignmentModal
        isOpen={assignmentModal.isOpen}
        onClose={handleCloseModal}
        model={assignmentModal.model}
        gpuId={assignmentModal.gpuId ?? 0   }
      />
    </>
  );
};

export default AssignmentController;
