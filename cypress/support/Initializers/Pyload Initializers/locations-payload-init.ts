import { LocationPayload} from "../../API/Payload/locations-payload";

export class LocationsPayloadInitializer{
    static init() : LocationPayload {
        let location: LocationPayload = {
            address: `Anabta ${Math.floor(Math.random() *10)}`,
            city: `Tulkarm ${Math.floor(Math.random() *10)}`,
            countryCode: "PS" ,
            fax: `${Math.floor(Math.random() *10)}` ,
            name: `Anabta ${Math.floor(Math.random() *10)}`,
            note: "string",
            phone: `${Math.floor(Math.random() *100000)}` ,
            province: "string",
            zipCode: `${Math.floor(Math.random() *10)}` ,

        }
        return location
    }
}