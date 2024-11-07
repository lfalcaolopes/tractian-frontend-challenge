import styled from "styled-components";

const Container = styled.div`
  height: 100%;
  width: 550px;
  display: flex;
  flex-direction: column;
  border-radius: 2px;
  overflow: hidden;
  border: 1px solid #D8DFE6;

  hr {
    margin: 0;
    border: 0;
    border-bottom: 1px solid #D8DFE6;
  }
`;

const SearchField = styled.form`
  width: 100%;
  display: flex;
  align-items: center;
  padding: 10px;

  input {
    flex-grow: 1;
    padding: 4px 8px;
    border: none;
    border-bottom: 1px solid transparent;

    &:focus {
      box-shadow: none;
      border-bottom: 1px solid #D8DFE6;
    }
  }

  button {
    border: none;
    background-color: transparent;
    cursor: pointer;

    img {
      margin: 0 10px;
    }

    &:focus {
      box-shadow: none;
    }
  }
`;

const Tree = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  overflow-y: auto;
  padding: 10px;
`;

export { Container, SearchField, Tree };