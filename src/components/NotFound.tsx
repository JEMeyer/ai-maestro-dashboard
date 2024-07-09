import React from "react";
import styled from "styled-components";

const NotFoundContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #f5f5f5;
`;

const NotFoundTitle = styled.h1`
  font-size: 4em;
  color: #333;
  margin-bottom: 16px;
`;

const NotFoundMessage = styled.p`
  font-size: 2em;
  color: #666;
`;

const NotFound: React.FC = () => {
  return (
    <NotFoundContainer>
      <div>
        <NotFoundTitle>404 Page not found</NotFoundTitle>
        <NotFoundMessage>
          What the sigma?! That page doesn't exist.
        </NotFoundMessage>
      </div>
    </NotFoundContainer>
  );
};

export default NotFound;
