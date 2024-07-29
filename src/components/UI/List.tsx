import styled from "styled-components";

export const List = styled.div<{ $isDraggingOver: boolean }>`
  padding: 8px;
  transition: background-color 0.3s ease;
  background-color: ${(props) => (props.$isDraggingOver ? "skyblue" : "white")};
`;

export const CollapsibleList = styled(List)<{
  $isCollapsed: boolean;
}>`
  max-height: ${({ $isCollapsed }) => ($isCollapsed ? "0" : "400px")};
  padding: ${({ $isCollapsed }) => ($isCollapsed ? "0" : "initial")};
  overflow: scroll;
  transition: max-height 0.5s ease-in-out, background-color 0.3s ease;
`;
