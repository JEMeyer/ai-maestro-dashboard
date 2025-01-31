import React, { useState } from "react";
import styled from "styled-components";
import { useModels } from "../../state/models";
import { useAddAssignment } from "../../state/assignment";
import { useGpus } from "../../state/gpus";

const Button = styled.button`
  padding: 8px 16px;
  background-color: #61dafb;
  border: none;
  border-radius: 4px;
  color: white;
  cursor: pointer;
  &:hover {
    background-color: #21a1f1;
  }
`;

const Modal = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: white;
  padding: 24px;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  width: 90%;
  max-width: 500px;
  z-index: 1000;
`;

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  z-index: 999;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const Field = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const Label = styled.label`
  font-weight: 500;
`;

const Select = styled.select`
  padding: 8px;
  border: 1px solid #ddd;
  border-radius: 4px;
`;

const Input = styled.input`
  padding: 8px;
  border: 1px solid #ddd;
  border-radius: 4px;
`;

const ButtonGroup = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 12px;
  margin-top: 16px;
`;

const AddAssignmentButton = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedModel, setSelectedModel] = useState<string>("");
  const [selectedGpu, setSelectedGpu] = useState<number | "">("");
  const [port, setPort] = useState<string>("");
  const [name, setName] = useState<string>("");

  const { llms, diffusors, stts, ttss } = useModels();
  const { allGpus } = useGpus();
  const addAssignment = useAddAssignment();

  const allModels = [
    ...(llms || []),
    ...(diffusors || []),
    ...(stts || []),
    ...(ttss || []),
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedModel || !selectedGpu || !port || !name) return;

    const newAssignment = {
      name,
      model_name: selectedModel,
      gpu_ids: [selectedGpu],
      port: parseInt(port),
      display_order: 0,
    };

    await addAssignment(newAssignment);
    setIsOpen(false);
    resetForm();
  };

  const resetForm = () => {
    setSelectedModel("");
    setSelectedGpu("");
    setPort("");
    setName("");
  };

  return (
    <>
      <Button onClick={() => setIsOpen(true)}>Add New Assignment</Button>

      {isOpen && (
        <>
          <Overlay onClick={() => setIsOpen(false)} />
          <Modal>
            <h2>Create New Assignment</h2>
            <Form onSubmit={handleSubmit}>
              <Field>
                <Label>Name</Label>
                <Input
                  type='text'
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder='Assignment name'
                  required
                />
              </Field>

              <Field>
                <Label>Model</Label>
                <Select
                  value={selectedModel}
                  onChange={(e) => setSelectedModel(e.target.value)}
                  required>
                  <option value=''>Select a model</option>
                  {allModels.map((model) => (
                    <option key={model.name} value={model.name}>
                      {model.name}
                    </option>
                  ))}
                </Select>
              </Field>

              <Field>
                <Label>GPU</Label>
                <Select
                  value={selectedGpu}
                  onChange={(e) => setSelectedGpu(Number(e.target.value))}
                  required>
                  <option value=''>Select a GPU</option>
                  {allGpus?.map((gpu) => (
                    <option key={gpu.id} value={gpu.id}>
                      {gpu.name}
                    </option>
                  ))}
                </Select>
              </Field>

              <Field>
                <Label>Port</Label>
                <Input
                  type='number'
                  value={port}
                  onChange={(e) => setPort(e.target.value)}
                  placeholder='Port number'
                  required
                />
              </Field>

              <ButtonGroup>
                <Button type='button' onClick={() => setIsOpen(false)}>
                  Cancel
                </Button>
                <Button type='submit'>Create Assignment</Button>
              </ButtonGroup>
            </Form>
          </Modal>
        </>
      )}
    </>
  );
};

export default AddAssignmentButton;
