export interface User {
    uid : string,
    key : string,
    name: string,
    surname:string,
    phone : string,
    mail : string,
    password : string,
    gender : string,
    address : {
        ad : string,
        soyad : string,
        il : string,
        ilce : string,
        adres : string,
        telefon : string,
        baslik : string
    },
}