import { BaseDataItem } from "../models/data.model";

export class ObjecMapper<T extends BaseDataItem>{
    about: string;
    address: string;
    age: number;
    balance: number;
    children: BaseDataItem[];
    code: string;
    company: string;
    email: string;
    eyeColor: string;
    gender: string;
    id: number;
    isActive: boolean;
    latitude: number;
    longitude: number;
    name: string;
    phone: string;
    picture: string;
    registered: string; 
    tags: string[]

    constructor(object: T){
        this.about = object.about;
        this.address = object.address;
        this.age = object.age;
        this.balance = object.balance;
        this.children = object.children;
        this.company = object.company;
        this.code = object.code;
        this.email = object.email;
        this.eyeColor = object.eyeColor;
        this.gender = object.gender;
        this.id = object.id;
        this.isActive = object.isActive;
        this.latitude = object.latitude;
        this.longitude = object.longitude;
        this.name = object.name;
        this.phone = object.phone;
        this.picture = object.picture;
        this.registered = object.registered;
        this.tags = object.tags;
    }
}