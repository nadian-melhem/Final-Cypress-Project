import { JobTitlesResponse } from "../../API/Response/job-titles-response";

export class JobTitlesResponseInitializer {
    static init(data): JobTitlesResponse {
        let response: JobTitlesResponse = {
            description: data.description,
            id: data.id,
            note: data.note,
            title: data.title
        }
        return response
    }
}