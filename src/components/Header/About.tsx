import React from "react";
import styled from "styled-components";

const AboutContainer = styled.div`
  padding: 2rem;
  background-color: #f5f5f5;
  min-height: 100vh;
`;

const Title = styled.h2`
  font-size: 2rem;
  color: #282c34;
  margin-bottom: 1rem;
`;

const Content = styled.p`
  font-size: 1rem;
  color: #333;
  line-height: 1.6;
`;

const About: React.FC = () => {
  return (
    <>
      <AboutContainer>
        <Title>About Maestro Dashboard</Title>
        <Content>
          Maestro Dashboard is a web-based application designed to monitor and
          manage AI deployments on GPUs. The main page provides a comprehensive
          dashboard displaying each GPU's status, including whether it is
          currently in use and the specific model utilizing it.
        </Content>
        <br />
        <Content>
          The Config page allows site owners to configure their setup by
          creating computers, adding GPUs within those computers, and assigning
          AI models (from 'LLMs', 'diffusors', 'TTS', and 'STT' model lists) to
          GPUs. This process updates the total VRAM used by each GPU. With a
          single click, all defined AI models can be spun up on the specified
          GPUs, making them ready for use.
        </Content>
        <br />
        <Content>
          Our application ensures a user-friendly interface with seamless
          navigation and adaptive design, providing a consistent experience
          across different devices. Leveraging modern web development practices,
          Maestro Dashboard maintains a clean and maintainable codebase.
        </Content>
      </AboutContainer>
    </>
  );
};

export default About;
