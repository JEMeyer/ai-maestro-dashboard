import React, { useState } from "react";
import styled from "styled-components";

const EditableTitleContainer = styled.div`
  display: flex;
  align-items: center;
`;

const TitleInput = styled.input`
  font-size: 1.2em;
  font-weight: bold;
  border: none;
  outline: none;
  background: none;
  cursor: pointer;
  padding: 0;
  margin: 0;
`;

const EditButton = styled.button`
  margin-left: 8px;
  background: none;
  border: none;
  cursor: pointer;
  font-size: 1em;
`;

export const EditableTitle: React.FC<{
  name: string;
  onNameChange: (name: string) => void;
}> = ({ name, onNameChange }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [currentName, setCurrentName] = useState(name);

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCurrentName(e.target.value);
  };

  const handleBlur = () => {
    setIsEditing(false);
    onNameChange(currentName);
  };

  return (
    <EditableTitleContainer>
      {isEditing ? (
        <TitleInput
          value={currentName}
          onChange={handleNameChange}
          onBlur={handleBlur}
          autoFocus
        />
      ) : (
        <TitleInput as="div" onClick={() => setIsEditing(true)}>
          {currentName}
        </TitleInput>
      )}
      <EditButton onClick={() => setIsEditing(true)}>✏️</EditButton>
    </EditableTitleContainer>
  );
};
