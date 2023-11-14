import { JobDetailsPayload } from "../../API/Payload/job-details-payload";

export class JobDetailsPayloadInitializer{
static init(jobTitleId , locationId): JobDetailsPayload{
    let jobDetails:JobDetailsPayload = {
        joinedDate: null,
        jobTitleId: jobTitleId,
        locationId: locationId
    }
    return jobDetails
}
}