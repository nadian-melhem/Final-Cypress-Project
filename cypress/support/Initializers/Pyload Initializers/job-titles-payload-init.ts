import { JobTitlePayload } from "../../API/Payload/job-titles-payload";

export class JobTitlesPayloadInitializer {
    static init(): JobTitlePayload {
        let jobTitle: JobTitlePayload = {
            description: `Junior QA Position ${Math.floor(Math.random() * 100)}`,
            note: "",
            specification: null,
            title: `Junior QA ${Math.floor(Math.random() * 100)}`
        }
        return jobTitle
    }

}