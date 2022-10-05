import { AddressModel } from "./address.model"

export interface User {
    uid : string
    key : string
    name: string
    surname:string
    phone : string
    mail : string
    password : string
    gender : string
    address : AddressModel[]
}