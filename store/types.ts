export interface ITreeNode {
  id: string;
  name: string;
  type: 'location' | 'sublocation' | 'asset' | 'subasset' | 'component';
  children: ITreeNode[];
  status?: 'operating' | 'alert' | null;
  locationId?: string;
  parentId?: string;
  gatewayId?: string;
  sensorId?: string;
  sensorType?: string;
  shouldHide?: boolean;
}

export interface ICompany {
  id: string;
  name: string;
}

export interface IGeneralLocation {
  id: string;
  name: string;
  parentId?: string;
}

export interface ILocation {
  id: string;
  name: string;
}

export interface ISubLocation {
  id: string;
  name: string;
  parentId: string;
}

export interface IGeneralAssets {
  id: string;
  name: string;
  locationId?: string;
  parentId?: string;
  status?: 'operating' | 'alert';
  gatewayId?: string;
  sensorId?: string;
  sensorType?: string;
}

export interface IAssets {
  id: string;
  name: string;
  locationId?: string; 
}

export interface ISubAssets {
  id: string;
  name: string;
  parentId: string; 
}

export interface IComponents {
  id: string;
  name: string;
  status: 'operating' | 'alert';
  gatewayId: string;
  sensorId: string;
  sensorType: string;
  locationId?: string;
  parentId?: string;
}

