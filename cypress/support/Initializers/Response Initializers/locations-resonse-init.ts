import { LocationsResponse } from "../../API/Response/locations-response";

export class LocationsResponseInitializer{
    static init(data): LocationsResponse{
        let response: LocationsResponse = {
            address: data.address,
            city: data.city,
            countryCode: data.countryCode,
            name: data.name,
            id: data.id,
            noOfEmployees: data.number,
        }
        return response
    }
}