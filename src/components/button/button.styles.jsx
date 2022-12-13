import styled from "styled-components"

export const BaseButton = styled.button`
  min-width: 165px;
  width: auto;
  height: 50px;
  letter-spacing: 0.5px;
  line-height: 50px;
  padding: 0 35px 0 35px;
  font-size: 15px;
  background-color: rgb(12, 182, 228);
  color: black;
  text-transform: uppercase;
  font-family: "Open Sans";
  font-weight: bolder;
  border: none;
  cursor: pointer;
  display: flex;
  justify-content: center;
  border: 2px solid black;

  &:hover {
    background-color: white;
    color: black;
    border: 2px solid black;
  }
`

export const GoogleSignInButton = styled(BaseButton)`
  background-color: rgba(255, 255, 0, 0.709);
  color: black;
  border: 2px solid black;

  &:hover {
    background-color: white;
    border: 2px solid black;
  }
`

export const InvertedButton = styled(BaseButton)`
  background-color: white;
  color: black;
  border: 2px solid black;

  &:hover {
    background-color: rgb(12, 182, 228);
    color: black;
    border: 2px solid black;
  }
`
