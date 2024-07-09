import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

const NotFoundContainer = styled.div`
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

const Image = styled.img`
  max-width: 100%;
  height: auto;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  margin-bottom: 20px;
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

const webps = [
  "/404_webps/1.webp",
  "/404_webps/2.webp",
  "/404_webps/3.webp",
  "/404_webps/4.webp",
  "/404_webps/5.webp",
  "/404_webps/6.webp",
];

const NotFound = () => {
  const navigate = useNavigate();
  const [selectedWebp, setSelectedWebp] = useState("");

  useEffect(() => {
    const randomIndex = Math.floor(Math.random() * webps.length);
    setSelectedWebp(webps[randomIndex]);
  }, []);

  const handleNav = (param: string | number) => {
    navigate(param);
  };

  return (
    <NotFoundContainer>
      <Title>404 - Page Not Found</Title>
      <Text>What the sigma! It seems like you've hit a dead end.</Text>
      {selectedWebp && <Image src={selectedWebp} alt="Funny 404" />}{" "}
      <Button onClick={() => handleNav(-1)}>Go Back</Button>
      <Button onClick={() => handleNav("/")}>Go Home</Button>
    </NotFoundContainer>
  );
};

export default NotFound;
