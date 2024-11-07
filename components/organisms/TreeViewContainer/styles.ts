import styled from "styled-components";

const Container = styled.div`
  height: calc(100vh - 74px);
  display: flex;
  flex-direction: column;
  background-color: white;
  margin: 8px;
  padding: 16px;

  border-radius: 4px;
  border: 1px solid #D8DFE6;
`;

const Empty = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  font-size: 16px;
  color: #88929C;
`;

const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 12px;
`;

const Title = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;

  :first-child {
    font-size: 20px;
    line-height: 28px;
    font-weight: 600;
    color: #24292F;
  }
`;

const CompanySpan = styled.span`
  font-size: 14px;
  line-height: 20px;
  font-weight: 400;
  color: #77818C;
`;

const Filters = styled.div`
  display: flex;
  gap: 8px;
`;

const Body = styled.div`
  display: flex;
  flex: 1;
  overflow: hidden;
  gap: 8px;
`;

export { Container, Header, Title, CompanySpan, Filters, Body, Empty };