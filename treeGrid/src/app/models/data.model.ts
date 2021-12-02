export interface BaseItemArray {
  "data": BaseDataItem[],
  "lastIndex": number;
}


export interface BaseDataItem {
  id: number;
  code: string;
  isActive: boolean;
  balance: number;
  picture: string;
  age: number;
  eyeColor: string;
  name: string;
  gender: string;
  company: string;
  email: string;
  phone: string;
  address: string;
  about: string;
  registered: string;
  latitude: number;
  longitude: number;
  tags: string[];
  children: BaseDataItem[];

}

export interface DataItem extends BaseDataItem {
}
