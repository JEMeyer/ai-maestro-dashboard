import styled from "styled-components";

export const List = styled.div<{ $isDraggingOver: boolean }>`
  padding: 8px;
  transition: background-color 0.3s ease;
  background-color: ${(props) => (props.$isDraggingOver ? "skyblue" : "white")};
`;
