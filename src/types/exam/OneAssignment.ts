export interface TraineesInfo {
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
    exam:                Exam;
    examInstance:        ExamInstance;
    answers:             Answer[];
    certificateUrl:      null;
}

export interface Answer {
    id:               number;
    createdAt:        Date;
    updatedAt:        Date;
    assignmentUserId: number;
    questionId:       number;
    questionFieldId:  number;
    dueGrade:         number;
    selectedField:    Field;
    isCorrect:        boolean;
    correctField:     Field | null;
}

export interface Field {
    id:         number;
    createdAt:  Date;
    updatedAt:  Date;
    questionId: number;
    field:      string;
    isCorrect:  boolean;
}

export interface Exam {
    id:                    number;
    createdAt:             Date;
    updatedAt:             Date;
    code:                  string;
    ownerId:               number;
    title:                 string;
    subTitle:              string;
    image:                 null;
    gradePercentage:       number;
    languageId:            number;
    status:                string;
    categoryId:            number;
    examTypeId:            number;
    examTime:              number;
    showCorrection:        boolean;
    issuesCertificate:     boolean;
    certificateTemplateId: number;
    files:                 File[];
}

export interface File {
    id:          number;
    createdAt:   Date;
    updatedAt:   Date;
    examId?:     number;
    path:        string;
    questionId?: number;
}

export interface ExamInstance {
    id:                number;
    createdAt:         Date;
    updatedAt:         Date;
    startFormId:       number;
    endFormId:         number;
    name:              string;
    description:       string;
    numberOfQuestions: number;
    startForm:         Form;
    endForm:           Form;
    questions:         Question[];
}

export interface Form {
    id:                number;
    createdAt:         Date;
    updatedAt:         Date;
    title:             string;
    subTitle:          string;
    description:       string;
    showConfiguration: boolean;
    showCondition:     boolean;
    image:             null;
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
    files:              File[];
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
