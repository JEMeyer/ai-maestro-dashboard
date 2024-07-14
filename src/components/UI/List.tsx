import styled from "styled-components";

export const List = styled.div<{ $isDraggingOver: boolean }>`
  padding: 8px;
  transition: background-color 0.3s ease;
  background-color: ${(props) => (props.$isDraggingOver ? "skyblue" : "white")};
`;

export const CollapsibleList = styled(List)<{
  $isCollapsed: boolean;
  $isDraggingOver: boolean;
}>`
  max-height: ${({ $isCollapsed }) => ($isCollapsed ? "0" : "auto")};
  overflow: hidden;
  transition: max-height background-color 0.3s ease;
`;
