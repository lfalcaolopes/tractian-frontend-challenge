import styled from "styled-components";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  border-radius: 2px;
  border: 1px solid #D8DFE6;

  hr {
    margin: 0;
    border: 0;
    border-bottom: 1px solid #D8DFE6;
  }
`;

const Empty = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  font-size: 16px;
  color: #88929C;
`;

const Title = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 9px 16px;

  h2 {
    font-size: 18px;
    font-weight: 600;
    line-height: 28px;
    color: #24292F;
  }
`;

const Status = styled.div<{ status: 'operating' | 'alert' | undefined }>`
  display: ${({ status }) => status ? 'block' : 'none'};
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background-color: ${({ status }) => status === 'operating' ? '#52C41A' : '#ED3833'};
`;

const Body = styled.div`
  padding: 24px;
  display: flex;
  flex-direction: column;
  gap: 48px;

  hr {
    margin: 0;
    border: 0;
    border-bottom: 1px solid #E3EAEF;
  }
`;

const Asset = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;

  h3 {
    font-size: 16px;
    font-weight: 600;
    line-height: 24px;
    color: #24292F;
  }
`;

const ImageUpload = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 486px;
  height: 324px;
  padding: 24px;
  gap: 8px;
  background-color: #F2F8FF;
  border: 1px dashed #55A6FF;
  border-radius: 12px;


  span {
    font-size: 14px;
    font-weight: 400;
    line-height: 24px;
    color: #2188FF;
  }
`;  

const AssetDetail = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 8px;

  span {
    font-size: 14px;
    font-weight: 400;
    line-height: 24px;
    color: #88929C;
  }
`;

const Sensors = styled.div`
  display: flex;
  gap: 24px;
`;

const Sensor = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 8px;

  h3 {
    font-size: 16px;
    font-weight: 600;
    line-height: 24px;
    color: #24292F;
  }
`;

const SensorInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;

  span {
    font-size: 14px;
    font-weight: 400;
    line-height: 24px;
    color: #88929C;
  }
`;

export { Container, Title, Status, Body, Asset, ImageUpload, AssetDetail, Sensors, Sensor, SensorInfo, Empty };