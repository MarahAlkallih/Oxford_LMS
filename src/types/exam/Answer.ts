export interface Answers {
    data: Datum[];
    meta: Meta;
}

export interface Datum {
    id:               number;
    createdAt:        Date;
    updatedAt:        Date;
    assignmentUserId: number;
    questionId:       number;
    questionFieldId:  number;
    dueGrade:         number;
    question:         Question;
    questionField:    QuestionField;
    assignmentUser:   AssignmentUser;
}

export interface AssignmentUser {
    id:                  number;
    createdAt:           Date;
    updatedAt:           Date;
    examEventId:         number;
    traineeId:           number;
    user:                User;
    startTime:           Date;
    endTime:             Date;
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
    phoneNumber:  null;
    languageId:   number;
    languageName: string;
    gender:       string;
    isActive:     boolean;
}

export interface Question {
    id:                 number;
    createdAt:          Date;
    updatedAt:          Date;
    examInstanceId:     number;
    questionTypeId:     number;
    questionText:       string;
    questionNumber:     number;
    correctAnswerGrade: number;
    wrongAnswerGrade:   number;
    hint:               string;
    showGrade:          boolean;
}

export interface QuestionField {
    id:         number;
    createdAt:  Date;
    updatedAt:  Date;
    questionId: number;
    field:      string;
    isCorrect:  boolean;
}

export interface Meta {
    totalRecords: number;
    currentPage:  number;
    limit:        number;
    totalPages:   number;
}
