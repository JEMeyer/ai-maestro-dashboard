import React from "react";
import styled from "styled-components";

const ContactContainer = styled.div`
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

const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

const Label = styled.label`
  font-size: 1rem;
  color: #333;
  margin-bottom: 0.5rem;
`;

const Input = styled.input`
  padding: 0.5rem;
  font-size: 1rem;
  margin-bottom: 1rem;
  border: 1px solid #ccc;
  border-radius: 4px;
`;

const TextArea = styled.textarea`
  padding: 0.5rem;
  font-size: 1rem;
  margin-bottom: 1rem;
  border: 1px solid #ccc;
  border-radius: 4px;
  resize: vertical;
`;

const Button = styled.button`
  padding: 0.75rem 1.5rem;
  font-size: 1rem;
  color: white;
  background-color: #61dafb;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #21a1f1;
  }
`;

const Contact: React.FC = () => {
  return (
    <>
      <ContactContainer>
        <Title>Contact Us</Title>
        <Content>
          We would love to hear from you! Please fill out the form below to get
          in touch with us.
        </Content>
        <Form>
          <Label htmlFor="name">Name</Label>
          <Input type="text" id="name" name="name" required />

          <Label htmlFor="email">Email</Label>
          <Input type="email" id="email" name="email" required />

          <Label htmlFor="message">Message</Label>
          <TextArea id="message" name="message" rows={4} required />

          <Button type="submit">Submit</Button>
        </Form>
      </ContactContainer>
    </>
  );
};

export default Contact;
