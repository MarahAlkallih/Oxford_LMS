export interface AssignmentUser {
    data: Datum[];
    meta: Meta;
}

export interface Datum {
    id:                  number;
    createdAt:           Date;
    updatedAt:           Date;
    examEventId:         number;
    traineeId:           number;
    user:                User;
    startTime:           null;
    endTime:             null;
    correctAnswersCount: number;
    wrongAnswersCount:   number;
    grade:               number;
    success:             boolean;
    status:              string;
}

export interface User {
    id:        number;
    createdAt: Date;
    updatedAt: Date;
    accountId: number;
    googleId:  null;
    url:       null;
    account:   Account;
}

export interface Account {
    id:           number;
    firstName:    string;
    lastName:     string;
    userName:     string;
    email:        string;
    birthDate:    null;
    aboutMe:      null;
    phoneNumber:  string;
    languageId:   number;
    languageName: string;
    gender:       string;
    isActive:     boolean;
}

export interface Meta {
    totalRecords: number;
    currentPage:  number;
    limit:        number;
    totalPages:   number;
}
//////////////////////////////////////////////////////////////////////////
