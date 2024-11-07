import React, { useEffect, useState } from 'react'

import _ from 'lodash'
import Button from '@/components/atoms/Button'
import energySensorIcon from '@/public/energySensor.png'
import criticIcon from '@/public/critic.png'
import * as Styled from './styles'
import AssetsTree from '@/components/molecules/AssetsTree'
import AssetInfo from '@/components/molecules/AssetInfo'
import { IComponents, IGeneralAssets, IGeneralLocation, ITreeNode } from '@/store/types'
import { useAtom } from 'jotai'
import { SelectedCompanyAtom } from '@/components/molecules/Header'

function TreeViewContainer() {
  const [selectedCompany] = useAtom(SelectedCompanyAtom);

  const [assetTree, setAssetTree] = useState<ITreeNode[]>([]);
  const [filteredAssetTree, setFilteredAssetTree] = useState<ITreeNode[]>([]);
  const [selectedComponent, setSelectedComponent] = useState<IComponents | null>(null);
  const [selectedFilter, setSelectedFilter] = useState<'energy' | 'critical' | 'search' | null>(null);

  const getLocations = async (companyId: string) => {
    const data = await fetch(`https://fake-api.tractian.com/companies/${companyId}/locations`);
    const response = await data.json() as IGeneralLocation[];
  
    return response;
  };

  const getAssets = async (companyId: string) => {
    const data = await fetch(`https://fake-api.tractian.com/companies/${companyId}/assets`);
    const response = await data.json() as IGeneralAssets[];
  
    return response;
  };

  const separateLocationsAndSubLocations = (allLocations: IGeneralLocation[]) => {
    const locations: ITreeNode[] = [];
    const subLocations: ITreeNode[] = [];

    allLocations.forEach((location) => {
      if (location.parentId) {
        subLocations.push({
          id: location.id,
          name: location.name,
          type: 'sublocation',
          parentId: location.parentId,
          children: []
        });
      } else {
        locations.push({
          id: location.id,
          name: location.name,
          type: 'location',
          children: []
        });
      }
    });

    return { locations, subLocations };
  };

  const separateAssetsSubAssetsAndComponents = (allAssets: IGeneralAssets[]) => {
    const assets: ITreeNode[] = [];
    const subAssets: ITreeNode[] = [];
    const components: ITreeNode[] = [];

    allAssets.forEach((asset) => {
      if (asset.sensorType) {
        components.push({
          id: asset.id,
          name: asset.name,
          type: 'component',
          locationId: asset.locationId,
          parentId: asset.parentId,
          status: asset.status,
          gatewayId: asset.gatewayId,
          sensorId: asset.sensorId,
          sensorType: asset.sensorType,
          children: []
        });
      } else if (asset.parentId) {
        subAssets.push({
          id: asset.id,
          name: asset.name,
          type: 'subasset',
          parentId: asset.parentId,
          children: []
        });
      } else {
        assets.push({
          id: asset.id,
          name: asset.name,
          type: 'asset',
          locationId: asset.locationId,
          children: []
        });
      }
    });

    return { assets, subAssets, components };
  };

  const buildTree = (allLocations: IGeneralLocation[], allAssets: IGeneralAssets[]) => {
    const locationTree: ITreeNode[] = [];

    const { locations, subLocations } = separateLocationsAndSubLocations(allLocations);
    const { assets, subAssets, components } = separateAssetsSubAssetsAndComponents(allAssets);

    for (const component of components) {
      if (component.parentId) {
        const assetParent = assets.find((asset) => asset.id === component.parentId) 
          || subAssets.find((subAsset) => subAsset.id === component.parentId);
    
        if (assetParent) {
          assetParent.children.push(component);
        }

        continue;
      }
    
      if (component.locationId) {
        const parentLocation = locations.find((loc) => loc.id === component.locationId) 
          || subLocations.find((subLoc) => subLoc.id === component.locationId);
    
        if (parentLocation) {
          parentLocation.children.push(component);
        }

        continue;
      }

      locationTree.push(component);
    }
    
    for (const subAsset of subAssets) {
      if (subAsset.parentId) {
        const assetParent = assets.find((asset) => asset.id === subAsset.parentId);
    
        if (assetParent) {
          assetParent.children.push(subAsset);
        }

        continue;
      }
      
      if (subAsset.locationId) {
        const parentLocation = locations.find((loc) => loc.id === subAsset.locationId) 
          || subLocations.find((subLoc) => subLoc.id === subAsset.locationId);
    
        if (parentLocation) {
          parentLocation.children.push(subAsset);
        }

        continue;
      }

      locationTree.push(subAsset);
    }
    
    for (const asset of assets) {
      if (asset.locationId) {
        const parentLocation = locations.find((loc) => loc.id === asset.locationId) 
          || subLocations.find((subLoc) => subLoc.id === asset.locationId);
    
        if (parentLocation) {
          parentLocation.children.push(asset);
        }

        continue;
      }

      locationTree.push(asset);
    }
    
    for (const subLocation of subLocations) {
      if (subLocation.parentId) {
        const parentLocation = locations.find((loc) => loc.id === subLocation.parentId);
    
        if (parentLocation) {
          parentLocation.children.push(subLocation);
        }

        continue;
      }
      
      locationTree.push(subLocation);
    }
    

    locationTree.push(...locations);

    return locationTree;
  };

  const matchSearch = (node: ITreeNode, searchTerm?: string) => {
    if (!searchTerm) return false;

    return node.name.toLowerCase().includes(searchTerm.toLowerCase());
  };


  const walk = (node: ITreeNode, filterType: 'energy' | 'critical' | 'search', searchTerm?: string) => {
    if (
      (filterType === 'energy' && node.sensorType === 'energy')
      || (filterType === 'critical' && node.status === 'alert')
      || (filterType === 'search' && matchSearch(node, searchTerm))
    ) {
      return true;
    }

    let isInFilter = false;

    for (let i = 0; i < node.children.length; i++) {
      if (walk(node.children[i], filterType, searchTerm)) {
        isInFilter = true;
      }
    }

    if (!isInFilter) {
      node.children = [];
      node.shouldHide = true;
    }

    return isInFilter;
  }

  const filterAssets = (filter: 'energy' | 'critical' | 'search', searchTerm?: string) => {
    if ((filter === 'search' && !searchTerm) || (selectedFilter !== 'search' && selectedFilter === filter)) {
      setSelectedFilter(null);
      setFilteredAssetTree(assetTree);
      return;
    }

    const treeClone = _.cloneDeep(assetTree);

    for (let i = 0; i < treeClone.length; i++) {
      walk(treeClone[i], filter, searchTerm);
    }

    const treeCloneFiltered = treeClone.filter((node) => (
      node.children.length > 0
      || (filter === 'energy' && node.sensorType === 'energy')
      || (filter === 'critical' && node.status === 'alert')
      || (filter === 'search' && matchSearch(node, searchTerm))
  ));

    setSelectedFilter(filter);
    setFilteredAssetTree(treeCloneFiltered);
  }

  useEffect(() => {
    (async () => {
      if (!selectedCompany) return;

      const allLocations = await getLocations(selectedCompany.id);
      const allAssets = await getAssets(selectedCompany.id);

      const tree = buildTree(allLocations, allAssets);

      setAssetTree(tree);
      setSelectedFilter(null);
      setFilteredAssetTree(tree);
    })();
  }, [selectedCompany]);

  return (
    <Styled.Container>
      {selectedCompany === null ? (
        <Styled.Empty>
          <h2>Selecione uma Empresa para visualizar os Ativos</h2>
        </Styled.Empty>
      ) : (
        <>
          <Styled.Header>
            <Styled.Title>
              <h2>Ativos</h2>
              {selectedCompany &&
                <Styled.CompanySpan>{`/ ${selectedCompany?.name} Unit`}</Styled.CompanySpan>
              }
            </Styled.Title>

            <Styled.Filters>
              <Button
                name="Sensor de Energia"
                onClick={() => filterAssets('energy')}
                theme='white'
                isSelected={selectedFilter === 'energy'}
                icon={energySensorIcon}
              />
              <Button
                name="Crítico"
                onClick={() => filterAssets('critical')}
                theme='white'
                isSelected={selectedFilter === 'critical'}
                icon={criticIcon}
              />
            </Styled.Filters>
          </Styled.Header>

          <Styled.Body>
            <AssetsTree
              assetTree={filteredAssetTree}
              selectComponent={(component: IComponents) => setSelectedComponent(component)}
              onSearch={(searchTerm) => filterAssets('search', searchTerm)}
            />
            <AssetInfo selectedComponent={selectedComponent} />
          </Styled.Body>
        </>
      )}
    </Styled.Container>
  )
}

export default TreeViewContainer