import {Overlay} from '@angular/cdk/overlay';
import {Component, OnInit} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {ActivatedRoute, Router} from '@angular/router';
import {BehaviorSubject, Observable, Subject} from 'rxjs';
import {map} from 'rxjs/operators';
import {Employee, EmployeeService} from 'src/app/core';
import {CoreService} from 'src/app/core/services/core.service';
import {ConfirmationService, MenuItem, MessageService} from "primeng/api";
import {FileUpload} from "primeng/fileupload";
import EmployeeEdit from "./EmployeeEditModel";
import EmployeeToBeUpdated from "./EmployeeToBeUpdatedModel";

@Component({
    selector: 'crm-employee-detail',
    templateUrl: './employee-detail.component.html',
    styleUrls: ['./employee-detail.component.scss'],
    providers: [ConfirmationService, MessageService]
})
export class EmployeeDetailComponent implements OnInit {
    genders: string[] = ["Male", "Female", "Non-binary", "N/A"]
    currentEmployeeId: string;
    currentEmployeeImage$: Observable<string>;
    isEmployeeUploadTouched: boolean = false;

    maxDate: Date = new Date();
    birthDay: Date;
    issueDate: Date;

    employee$: Observable<Employee>;
    currentEmp: Employee;

    empEdit: EmployeeEdit = new EmployeeEdit();
    empUpdated: EmployeeToBeUpdated = new EmployeeToBeUpdated();

    isLoading$ = new BehaviorSubject<boolean>(true);
    breadcrumbItems: MenuItem[];

    constructor(private route: ActivatedRoute,
                private router: Router,
                private employeeService: EmployeeService,
                private coreService: CoreService,
                private dialog: MatDialog,
                private overlay: Overlay,
                private confirmService: ConfirmationService,
                private messageService: MessageService) {
        this.breadcrumbItems = [
            {icon: 'pi pi-home', label: `Dashboard`, routerLink: '/', visible: true},
            {icon: 'pi pi-user', label: `My Profile`},
        ];

        this.birthDay = new Date();
        this.issueDate = new Date();
        this.currentEmp = {id: ""};
        this.currentEmployeeId = window.localStorage.getItem("id") ?? "";
        this.currentEmployeeImage$ = this.employeeService.getEmployeeProfileImage(this.currentEmployeeId);
        this.employee$ = this.employeeService.getEmployee(this.currentEmployeeId);
        this.employee$.subscribe(() => {
            this.isLoading$.next(false);
        });
    }

    ngOnInit(): void {
    }

    alert(file: FileUpload) {
        alert(file);
    }

    isEmpInfoAbleToUpdate(): boolean {
        return Object.keys(this.currentEmp).length > 1;
    }

    urltoFile(url: string, mimeType = "image/png") {
        return (fetch(url)
                .then(function (res) {
                    return res.arrayBuffer();
                })
                .then(function (buf) {
                    return new File([buf], "", {type: mimeType});
                })
        );
    }

    updateProfile() {
        this.currentEmp.id = this.currentEmployeeId;
        if (this.currentEmp.image && this.isEmployeeUploadTouched) {
            this.urltoFile(document.getElementById("image")?.getAttribute("src") ?? "").then(url => {
                const formData: FormData = new FormData();
                formData.append("id", this.currentEmployeeId);
                formData.append("imageFile", url);
                this.employeeService.uploadEmployeeProfileImage(formData).subscribe(() => {
                    this.messageService.addAll([
                        {
                            severity: 'success', summary: 'Personal Information Status',
                            detail: 'Your Profile Picture has been updated successfully!'
                        }
                    ]);
                });
            })
        }
        this.employeeService.updateEmployee(this.currentEmp.id, this.currentEmp = {...this.currentEmp, image: undefined})
            .pipe((emp) => {
                this.currentEmp = {id: ""}
                return emp;
            })
            .subscribe(() => {
                this.messageService.addAll([
                    {
                        severity: 'success', summary: 'Personal Information Status',
                        detail: 'Your personal information has been updated successfully!'
                    }
                ]);
            });
    }


    toggleEmpFullnameUpdate(fullName: string) {
        this.currentEmp.fullName = fullName;
        this.empEdit.isFullNameEditShown = true;
    }

    updateEmpFullname() {
        this.empUpdated.isFullNameUpdated = true;
        this.empEdit.isFullNameEditShown = false;
        this.employee$ = this.employee$.pipe(map(emp => {
            emp.fullName = this.currentEmp.fullName;
            return emp;
        }))
    }

    toggleEmpPlaceOfBirthUpdate(placeOfBirth: string) {
        this.currentEmp.placeOfBirth = placeOfBirth;
        this.empEdit.isPlaceOfBirthEditShown = true;
    }

    updateEmpPlaceOfBirth() {
        this.empUpdated.isPlaceOfBirthUpdated = true;
        this.empEdit.isPlaceOfBirthEditShown = false;
        this.employee$ = this.employee$.pipe(map(emp => {
            emp.placeOfBirth = this.currentEmp.placeOfBirth;
            return emp;
        }));
    }

    keyPress(e: KeyboardEvent, id: string) {
        if (e.key == "Enter") {
            this.updateEmpFullname();
            this.updateEmpPlaceOfBirth();
            this.updateEmpBirthday();
            this.updateEmpReligion();
            this.updateEmpRace();
            this.updateEmpDegree();
            this.updateEmpMarriedStatus();
            this.updateEmpGender();
            this.updateEmpIssueDate();
            this.updateEmpMajor();
        }
    }

    confirmUpdate() {
        this.confirmService.confirm({
            message: 'Are you sure want to update this personal profile?',
            accept: () => {
                this.updateProfile();
            }
        })
    }

    toggleEmpBirthdayUpdate(birthDay: string) {
        this.currentEmp.birthDay = birthDay;
        this.birthDay = new Date(this.currentEmp.birthDay);
        this.empEdit.isBirthDayEditShown = true;
    }

    toggleEmpReligion(religion: string): void {
        this.currentEmp.religion = religion;
        this.empEdit.isReligionEditShown = true;
    }

    updateEmpReligion() {
        this.empUpdated.isReligionUpdated = true;
        this.empEdit.isReligionEditShown = false;
        this.employee$ = this.employee$.pipe(map(emp => {
            emp.religion = this.currentEmp.religion;
            return emp;
        }));
    }

    updateEmpBirthday() {
        this.empUpdated.isBirthDayUpdated = true;
        this.empEdit.isBirthDayEditShown = false;
        this.employee$ = this.employee$.pipe(map(emp => {
            this.currentEmp.birthDay = this.birthDay.toISOString();
            emp.birthDay = this.birthDay.toISOString();
            return emp;
        }));
    }

    toggleEmpGenderUpdate(gender: string) {
        this.currentEmp.gender = gender;
        this.empEdit.isGenderEditShown = true;
    }

    updateEmpGender() {
        this.empUpdated.isGenderUpdated = true;
        this.empEdit.isGenderEditShown = false;
        this.employee$ = this.employee$.pipe(map(emp => {
            emp.gender = this.currentEmp.gender;
            return emp;
        }));
    }

    updateEmpDegree() {
        this.empUpdated.isDegreeUpdated = true;
        this.empEdit.isDegreeEditShown = false;
        this.employee$ = this.employee$.pipe(map(emp => {
            emp.degree = this.currentEmp.degree;
            return emp;
        }));
    }

    toggleEmpDegreeUpdate(degree: string) {
        this.currentEmp.degree = degree;
        this.empEdit.isDegreeEditShown = true;
    }

    toggleEmpRaceUpdate(race: string) {
        this.currentEmp.race = race;
        this.empEdit.isRaceEditShown = true;
    }

    updateEmpRace() {
        this.empUpdated.isRaceUpdated = true;
        this.empEdit.isRaceEditShown = false;
        this.employee$ = this.employee$.pipe(map(emp => {
            emp.race = this.currentEmp.race;
            return emp;
        }));
    }

    toggleEmpMarriedStatusUpdate(marriedStatus: string) {
        this.currentEmp.marriedStatus = marriedStatus;
        this.empEdit.isMarriedStatusEditShown = true;
    }

    updateEmpMarriedStatus() {
        this.empUpdated.isMarriedStatusUpdated = true;
        this.empEdit.isMarriedStatusEditShown = false;
        this.employee$ = this.employee$.pipe(map(emp => {
            emp.marriedStatus = this.currentEmp.marriedStatus;
            return emp;
        }));
    }

    updateEmpMajor() {
        this.empUpdated.isMajorStatusUpdated = true;
        this.empEdit.isMajorEditShown = false;
        this.employee$ = this.employee$.pipe(map(emp => {
            emp.major = this.currentEmp.major;
            return emp;
        }));
    }

    toggleEmpMajorUpdate(major: string) {
        this.currentEmp.major = major;
        this.empEdit.isMajorEditShown = true;
    }

    updateEmpIssueDate() {
        this.empUpdated.isIssueDateUpdated = true;
        this.empEdit.isIssueDateEditShown = false;
        this.employee$ = this.employee$.pipe(map(emp => {
            this.currentEmp.issueDate = this.issueDate.toISOString();
            emp.issueDate = this.issueDate.toISOString();
            return emp;
        }));
    }

    toggleEmpIssueDateUpdate(issueDate: string) {
        this.currentEmp.issueDate = issueDate;
        this.issueDate = new Date(this.currentEmp.issueDate);
        this.empEdit.isIssueDateEditShown = true;
    }

    activeFileChooser() {
        document.getElementById("fileChooser")?.click();
    }

    replaceImage($event: any) {
        if ($event.target.files && $event.target.files[0]) {
            const reader = new FileReader();
            reader.onloadend = function () {
                document.getElementById("image")?.setAttribute("src", String(reader.result))

            };
            reader.readAsDataURL($event.target.files[0]);
            this.currentEmp.image = document.getElementById("image")?.getAttribute("src") ?? "";
            this.isEmployeeUploadTouched = true;
        }

    }
}
