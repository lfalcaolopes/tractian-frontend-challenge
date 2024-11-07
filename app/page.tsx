'use client'

import Header from "@/components/molecules/Header";
import TreeViewContainer from "@/components/organisms/TreeViewContainer";
import styled from "styled-components";

export default function Home() {

  return (
    <Container>
      <Header />
      <TreeViewContainer />
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
`;