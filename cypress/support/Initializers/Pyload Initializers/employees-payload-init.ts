import { EmployeePayload } from "../../API/Payload/employees-payload";

export class EmployeePayloadInitializer {
    static init(emp: Partial<EmployeePayload> = {}): EmployeePayload {
        let employee: EmployeePayload = {
            firstName: `nadian ${Math.floor(Math.random()*10)}`,
            middleName: "",
            lastName: `melhem ${Math.floor(Math.random()*10)}`,
            empPicture: null,
            employeeId: `${Math.floor(Math.random() * 10)}`,
            ...emp
        }
        return employee
    }
}
