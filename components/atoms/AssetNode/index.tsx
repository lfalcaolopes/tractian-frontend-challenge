import React from 'react'

import Image, { StaticImageData } from 'next/image'
import locationIcon from '@/public/location.png'
import assetIcon from '@/public/asset.png'
import componentIcon from '@/public/component.png'
import caretIcon from '@/public/caret.png'

import * as Styled from './styles'
import { IComponents, ITreeNode } from '@/store/types'

interface IAssetNodeProps {
  asset: ITreeNode;
  onClick: (component: IComponents) => void;
}

function AssetNode({ asset, onClick }: IAssetNodeProps) {
  const [icon, setIcon] = React.useState<StaticImageData>(locationIcon);
  const [showChildren, setShowChildren] = React.useState<boolean>(false);

  const onNodeClick = () => {
    if (asset.type === 'component') {
      onClick(asset as IComponents);
    } else {
      setShowChildren((prev) => !prev);
    }
  }

  React.useEffect(() => {
    switch (asset.type) {
      case 'location':
      case 'sublocation':
        setIcon(locationIcon);
        break;
      case 'asset':
      case 'subasset':
        setIcon(assetIcon);
        break;
      case 'component':
        setIcon(componentIcon);
        break;
      default:
        break;
    }
  }, [asset.type]);

  if (asset.shouldHide) return null;

  return (
    <Styled.Container>
      <Styled.Node onClick={onNodeClick}>
        {asset?.children && asset?.children.length > 0 && (
          <Styled.Caret $showChildren={showChildren}>
            <Image src={caretIcon} alt="Caret Icon" height={12} width={12} />
          </Styled.Caret> 
        )}
        <Image src={icon} alt="Location Icon" height={22} width={22} />
        <span>{asset.name}</span>
        <Styled.Status status={asset.status!} />
      </Styled.Node>

      <Styled.Branch>
        {showChildren && asset?.children?.map((child) => (
          <AssetNode key={child.id} asset={child} onClick={(component: IComponents) => onClick(component)} />
        ))}
      </Styled.Branch>
    </Styled.Container>
  )
}

export default AssetNode