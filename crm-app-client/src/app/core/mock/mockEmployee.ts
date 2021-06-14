export class MockEmployee {
    id: string | undefined;
    fullName: string | undefined;
    birthDay: string | undefined;
    placeOfBirth: string | undefined;
    gender: string | undefined;
    idNumber: number | undefined;
    issueDate: string | Date | undefined;
    race: string | undefined;
    religion: string | undefined;
    marriedStatus: string | undefined;
    cellPhone: number | string | undefined;
    taxID: number | string | undefined;
    insuranceBookNo: string | undefined;
    address: string | undefined;
    bankName: string | undefined;
    bankAccount: number | string | undefined;
    imagePath: string | undefined;
    degree: string | undefined;
    major: string | undefined;
    employeeID: string | undefined;
    startDate: string | Date | undefined;
    contractedDate: string | undefined;
    department: string | undefined;
    jobTitle: string | undefined;
    managerID: number | string | undefined;

    constructor(id: string, fullName: string, birthDay: string, placeOfBirth: string, gender: string,
                idNumber: number, issueDate: string | Date, race: string, religion: string,
                marriedStatus: string, cellPhone: number, taxID: number, insuranceBookNo: string,
                address: string, bankName: string, bankAccount: number, imagePath: string, degree: string,
                major: string, employeeID: string, startDate: string | Date, contractedDate: string,
                department: string, jobTitle: string, managerID: number) {
        this.id = id;
        this.fullName = fullName;
        this.birthDay = birthDay;
        this.placeOfBirth = placeOfBirth;
        this.gender = gender;
        this.idNumber = idNumber;
        this.issueDate = issueDate;
        this.race = race;
        this.religion = religion;
        this.marriedStatus = marriedStatus;
        this.cellPhone = cellPhone;
        this.taxID = taxID;
        this.insuranceBookNo = insuranceBookNo;
        this.address = address;
        this.bankName = bankName;
        this.bankAccount = bankAccount;
        this.imagePath = imagePath;
        this.degree = degree;
        this.major = major;
        this.employeeID = employeeID;
        this.startDate = startDate;
        this.contractedDate = contractedDate;
        this.department = department;
        this.jobTitle = jobTitle;
        this.managerID = managerID;
    }
}
