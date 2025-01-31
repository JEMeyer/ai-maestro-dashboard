import styled from "styled-components";

export const List = styled.div<{
  $isDraggingOver: boolean;
  $isDraggingOverLegalItem: boolean;
}>`
  position: relative;
  padding: 8px;
  transition: all 0.2s ease;
  background-color: ${(props) => (props.$isDraggingOver ? "#e3f2fd" : "white")};
  border: 2px dashed
    ${(props) =>
      props.$isDraggingOver
        ? props.$isDraggingOverLegalItem
          ? "#2196f3"
          : "#ff5252"
        : "transparent"};
  border-radius: 4px;
  min-height: 50px;

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 100;
    background-color: ${(props) =>
      !props.$isDraggingOverLegalItem && props.$isDraggingOver
        ? "rgba(255, 82, 82, 0.1)"
        : "transparent"};
    pointer-events: none;
    transition: all 0.2s ease;
  }
`;

export const CollapsibleList = styled(List)<{
  $isCollapsed: boolean;
}>`
  max-height: ${({ $isCollapsed }) => ($isCollapsed ? "0" : "400px")};
  padding: ${({ $isCollapsed }) => ($isCollapsed ? "0" : "initial")};
  overflow: scroll;
  transition: max-height 0.5s ease-in-out, background-color 0.2s ease;
`;
