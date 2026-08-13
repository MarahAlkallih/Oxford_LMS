export interface Tasks {
    data: Datum[];
    meta: Meta;
}

export interface Datum {
    id:          number;
    filePath:    string;
    grade:       null;
    feedback:    null;
    submittedAt: Date;
    taskId:      number;
    studentId:   number;
    student:     Student;
}

export interface Student {
    id:        number;
    accountId: number;
    googleId:  null;
    url:       null;
    createdAt: Date;
    updatedAt: Date;
    account:   Account;
}

export interface Account {
    firstName: string;
    lastName:  string;
}

export interface Meta {
    total:    number;
    page:     number;
    lastPage: number;
}
