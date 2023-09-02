import styled from "@emotion/styled";
import { color, background } from "styled-system";

export const PageHeader = styled.header`
  display: flex;
  align-items: center;
  gap: 20px;
  margin-bottom: 40px;
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const Card = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
`;

export const Input = styled.input`
  margin-left: 10px;
  font-size: 1.8rem;
  border: none;
  transition: 0.2s;

  &:focus {
    border-bottom: 0.5px solid #fff;
  }
`;

export const CardBody = styled.div`
  width: 100%;
  margin-top: 20px;
`;

export const Image = styled.img`
  box-shadow: 0 0 50px 0 #00000050;
  width: 300px;
  height: 300px;
  object-fit: contain;
  transition: 0.3s;

  &:hover {
    box-shadow: 0 0 50px 0 ${({ theme }) => theme.background.primary_light};
  }
`;

export const InputContainer = styled.div`
  display: flex;
  align-items: center;
  transition: 0.2s;
  padding: 10px;

  &:hover {
    ${background}
    border-radius: 10px;
  }

  label {
    opacity: 0.8;
    transition: 0.2s;
  }

  &:hover label {
    opacity: 1;
    color: ${({ theme }) => theme.background.secondary};
    cursor: pointer;
  }
`;

export const FileInput = styled.label`
  ${color}
  display: flex;
  align-items: center;
  padding: 10px;
  cursor: pointer;
  border-radius: 10px;
  transition: 0.2s;
  text-transform: capitalize;
  position: relative;
  margin-top: 10px;

  input[type="file"] {
    display: none;
  }

  > :first-of-type {
    margin-right: 10px;
  }

  &:hover {
    ${background}
  }
`;

export const SelectedAudio = styled.p`
  ${color}
  margin-left: 10px;
`;

export const SelectedAvatar = styled.p`
  ${color}
  margin-left: 10px;
`;

export const SubmitButton = styled.button`
  margin: 50px 0 0 10px;
  width: 100px;
  font-size: 1.8rem;

  &:hover {
    ${background}
    ${color}
  }
`;
