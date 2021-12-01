export interface BaseItemArray {
    "data": DataItem[],
    "lastIndex": number;
}

export interface BaseDataItem {
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
    id: number;
}