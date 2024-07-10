import React from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

const UnauthenticatedContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100vh;
  text-align: center;
  background-color: #f0f0f0;
  padding: 20px;
`;

const Title = styled.h1`
  font-size: 3em;
  margin-bottom: 20px;
  color: #333;
`;

const Text = styled.p`
  font-size: 1.5em;
  margin-bottom: 20px;
  color: #666;
`;

const Button = styled.button`
  font-size: 1em;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  background-color: #007bff;
  color: white;
  cursor: pointer;
  margin-bottom: 10px;
  &:hover {
    background-color: #0056b3;
  }
`;

const Unauthenticated: React.FC = () => {
  const navigate = useNavigate();

  return (
    <UnauthenticatedContainer>
      <Title>Unauthenticated</Title>
      <Text>Please log in to view this page.</Text>
      <Button
        onClick={() => {
          document.getElementById("loginLogoutButton")?.click();
        }}
      >
        Go to Login
      </Button>
      <Button onClick={() => navigate("/")}>Go Home</Button>
    </UnauthenticatedContainer>
  );
};

export default Unauthenticated;
