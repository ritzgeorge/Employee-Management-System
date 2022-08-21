import { AddressData } from "./address-data-model";
import { NumberData } from "./number-data-model";

export class EmployeeData {
    id!: number;
    name: string | undefined;
    age: string | undefined;
    department: string | undefined;
    bloodgroup: string | undefined;
    address_array?: AddressData[] | undefined;
    number_array?: NumberData[] | undefined;
}