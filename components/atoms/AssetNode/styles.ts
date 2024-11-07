import styled from "styled-components";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-left: 16px;
`;

const Node = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
  font-size: 14px;
  cursor: pointer;
`;

const Caret = styled.div<{ $showChildren: boolean }>`
  transform: ${({ $showChildren }) => $showChildren ? 'rotate(90deg)' : 'rotate(0)'};
  transition: transform 0.2s;
  margin-left: -16px;
`;

const Status = styled.div<{ status: 'operating' | 'alert' | null }>`
  display: ${({ status }) => status ? 'block' : 'none'};
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background-color: ${({ status }) => status === 'operating' ? '#52C41A' : '#ED3833'};
`;

const Branch = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 24px;
`;

export { Container, Status, Branch, Node, Caret };