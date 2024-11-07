import React from 'react'

import SearchIcon from '@/public/search.png'
import * as Styled from './styles'
import Image from 'next/image'
import { IComponents, ITreeNode } from '@/store/types'
import AssetNode from '@/components/atoms/AssetNode'

interface IAssetsTreeProps {
  assetTree: ITreeNode[],
  selectComponent: (component: IComponents) => void,
  onSearch: (search: string) => void
}

function AssetsTree({ assetTree, selectComponent, onSearch }: IAssetsTreeProps) {
  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const search = new FormData(event.currentTarget).get('Busca') as string;

    onSearch(search);
  }
  return (
    <Styled.Container>
      <Styled.SearchField onSubmit={onSubmit}>
        <input type="text" name="Busca" placeholder="Buscar Ativo ou Local"/>
        <button type='submit'>
          <Image src={SearchIcon} alt="Search Icon" height={18} width={18} />
        </button>
      </Styled.SearchField>

      <hr />

      <Styled.Tree>
        {assetTree.map((asset: ITreeNode) => (
          <AssetNode key={asset.id} asset={asset} onClick={(component: IComponents) => selectComponent(component)} />
        ))}
      </Styled.Tree>
    </Styled.Container>
  )
}

export default AssetsTree