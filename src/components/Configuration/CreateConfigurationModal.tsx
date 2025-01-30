import React, { useState } from 'react';
import styled from 'styled-components';
import { Model } from '../../types';
import { useAddAssignment } from '../../state/assignment';

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
`;

const ModalContent = styled.div`
  background: white;
  padding: 2rem;
  border-radius: 8px;
  width: 100%;
  max-width: 425px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
`;

const Title = styled.h2`
  font-size: 1.5rem;
  color: #333;
  margin-bottom: 1rem;
`;

const Description = styled.p`
  color: #666;
  margin-bottom: 1.5rem;
`;

const FormGroup = styled.div`
  margin-bottom: 1rem;
`;

const Label = styled.label`
  display: block;
  margin-bottom: 0.5rem;
  color: #333;
  font-size: 0.875rem;
`;

const Input = styled.input`
  width: 100%;
  padding: 0.5rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 1rem;

  &:focus {
    outline: none;
    border-color: #61dafb;
    box-shadow: 0 0 0 2px rgba(97, 218, 251, 0.2);
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 1rem;
  margin-top: 2rem;
`;

const Button = styled.button<{ $primary?: boolean }>`
  padding: 0.5rem 1rem;
  border-radius: 4px;
  font-size: 0.875rem;
  cursor: pointer;
  border: none;
  background-color: ${props => props.$primary ? '#61dafb' : '#f0f0f0'};
  color: ${props => props.$primary ? 'white' : '#333'};

  &:hover {
    background-color: ${props => props.$primary ? '#21a1f1' : '#e0e0e0'};
  }

  &:disabled {
    background-color: #ccc;
    cursor: not-allowed;
  }
`;

interface CreateAssignmentModalProps {
  isOpen: boolean;
  onClose: () => void;
  model: Model | null;
  gpuId: number;
}

const CreateAssignmentModal: React.FC<CreateAssignmentModalProps> = ({
  isOpen,
  onClose,
  model,
  gpuId
}) => {
  const [name, setName] = useState('');
  const [port, setPort] = useState('');
  const addAssignment = useAddAssignment();

  if (!isOpen) return null;

  const handleSubmit = async () => {
    if (!model || !name || !port) return;

    const newAssignment = {
      name,
      model_name: model.name,
      gpu_ids: [gpuId],
      port: parseInt(port),
      display_order: 0 // Will be adjusted by backend
    };

    await addAssignment(newAssignment);
    onClose();
  };

  return (
    <ModalOverlay onClick={onClose}>
      <ModalContent onClick={e => e.stopPropagation()}>
        <Title>Assign Model to GPU</Title>
        <Description>
          Create a new assignment for {model?.name}
        </Description>

        <FormGroup>
          <Label>Assignment Name</Label>
          <Input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter assignment name"
          />
        </FormGroup>

        <FormGroup>
          <Label>Port Number</Label>
          <Input
            type="number"
            value={port}
            onChange={(e) => setPort(e.target.value)}
            placeholder="Enter port number"
          />
        </FormGroup>

        <ButtonGroup>
          <Button onClick={onClose}>
            Cancel
          </Button>
          <Button
            $primary
            onClick={handleSubmit}
            disabled={!name || !port}
          >
            Create Assignment
          </Button>
        </ButtonGroup>
      </ModalContent>
    </ModalOverlay>
  );
};

export default CreateAssignmentModal;
