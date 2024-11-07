import styled from "styled-components";

const Button = styled.button<{ theme: "white" | "blue", $isSelected: boolean }>`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;  
  font-size: ${({ theme }) => theme === "white" ? "14px" : "12px"};
  font-weight: 600;
  background-color: ${({ theme }) => theme === "white" ? "white" : "#023B78"};
  color: ${({ theme }) => theme === "white" ? "#77818C" : "white"};
  border: 1px solid #D8DFE6;
  border: ${({ theme }) => theme === "white" ? "1px solid #D8DFE6" : "none"};
  padding: 6px 16px;
  border-radius: 4px;
  cursor: pointer;
  box-shadow: ${({ $isSelected }) => $isSelected ? "0 0 0 2px #2188FF" : "none"};

  :first-child {
    height: ${({ theme }) => theme === "white" ? "16px" : "14px"};
    width: ${({ theme }) => theme === "white" ? "16px" : "14px"};
  }
`;

export { Button };