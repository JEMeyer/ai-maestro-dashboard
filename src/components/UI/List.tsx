import styled from "styled-components";

export const List = styled.div<{
  $isDraggingOver: boolean;
  $isDraggingOverLegalItem: boolean;
}>`
  position: relative;
  padding: 8px;
  transition: background-color 0.3s ease;
  background-color: ${(props) => (props.$isDraggingOver ? "skyblue" : "white")};

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 100;
    background-color: rgba(255, 0, 0, 0.5); /* Red overlay with opacity */
    pointer-events: none; /* Make the overlay non-interactive */
    display: ${({ $isDraggingOverLegalItem, $isDraggingOver }) =>
      $isDraggingOverLegalItem || !$isDraggingOver ? "none" : "block"};
    transition: display 0.3s ease;
  }
`;

export const CollapsibleList = styled(List)<{
  $isCollapsed: boolean;
}>`
  max-height: ${({ $isCollapsed }) => ($isCollapsed ? "0" : "400px")};
  padding: ${({ $isCollapsed }) => ($isCollapsed ? "0" : "initial")};
  overflow: scroll;
  transition: max-height 0.5s ease-in-out, background-color 0.3s ease;
`;
