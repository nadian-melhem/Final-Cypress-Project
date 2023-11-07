import { EmployeeResponse } from "../../API/Response/employees-response";

export class EmployeesResponseInitializer{
    static init(data): EmployeeResponse{
        let response: EmployeeResponse = {
            empNumber: data.empNumber,
            employeeId: data.employeeId,
            firstName: data.firstName,
            lastName: data.lastName,
            middleName: data.middleName,
            terminationId: data.terminationId
        }
        return response
    }
}