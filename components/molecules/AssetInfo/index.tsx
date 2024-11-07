import React from 'react'

import Image from 'next/image'
import energySensorIcon from '@/public/energySensor.png'
import routerIcon from '@/public/router.png'
import inboxIcon from '@/public/Inbox.png'

import * as Styled from './styles'
import { IComponents } from '@/store/types'

interface IAssetInfoProps {
  selectedComponent: IComponents | null;
}

function AssetInfo({ selectedComponent }: IAssetInfoProps) {
  return (
    <Styled.Container>
      {selectedComponent === null ? (
        <Styled.Empty>
          <h2>Selecione um Ativo para visualizar as informações</h2>
        </Styled.Empty>
      ) : (
        <>
        <Styled.Title>
          <h2>{selectedComponent?.name}</h2>
          <Styled.Status status={selectedComponent?.status} />
        </Styled.Title>

        <hr />

          <Styled.Body>
            <Styled.Asset>
              <Styled.ImageUpload>
                <Image src={inboxIcon} alt="Inbox Icon" height={40} width={40} />
                <span>Adicionar imagem do Ativo</span>
              </Styled.ImageUpload>

              <Styled.AssetDetail>
                <h3>Tipo de Equipamento</h3>
                <span>{selectedComponent?.sensorType === 'energy' ? 'Motor Elétrico' : 'Motor de Agitação'}</span>
              </Styled.AssetDetail>
            </Styled.Asset>
            
            <hr />

            <Styled.Sensors>
              <Styled.Sensor>
                <h3>Sensor</h3>
                <Styled.SensorInfo>
                  <Image src={energySensorIcon} alt="Energy Sensor Icon" height={18} width={18} />
                  <span>{selectedComponent?.sensorId}</span>
                </Styled.SensorInfo>
              </Styled.Sensor>

              <Styled.Sensor>
                <h3>Receptor</h3>
                <Styled.SensorInfo>
                  <Image src={routerIcon} alt="Router Icon" height={18} width={18} />
                  <span>{selectedComponent?.gatewayId}</span>
                </Styled.SensorInfo>
              </Styled.Sensor>
            </Styled.Sensors>
          </Styled.Body>
        </>
      )}
    </Styled.Container>
  )
}

export default AssetInfo