import { SalaryComponentPayload } from "../../API/Payload/salay-components-payload";

export class SalaryComponentPayloadInitializer {
    static init(): SalaryComponentPayload {
        let salaryComponent: SalaryComponentPayload = {
            salaryComponent: "test",
            salaryAmount: `${Math.floor(Math.random() * 5000)}`,
            currencyId: "JOD",
            comment: null,
            addDirectDeposit: false
        }
        return salaryComponent
    }
}
