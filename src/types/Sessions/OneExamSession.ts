export interface OneExamSession {
    id:             number;
    createdAt:      Date;
    updatedAt:      Date;
    sessionId:      number;
    examEventId:    number;
    session:        Session;
    examId:         number;
    examInstanceId: number;
    courseId:       number;
    startDate:      Date;
    endDate:        Date;
    exam:           Exam;
    course:         Course;
    examInstance:   ExamInstance;
}

export interface Course {
    id:                   number;
    categoryId:           number;
    venueId:              null;
    locationId:           null;
    code:                 string;
    title:                string;
    subTitle:             string;
    fee:                  number;
    registrationDeadline: null;
    paymentDeadline:      null;
    status:               string;
    hours:                number;
    description:          string;
    languageId:           number;
    startDate:            null;
    endDate:              null;
    img:                  string;
    createdById:          number;
    isAdd:                boolean;
    isActive:             boolean;
    categoryName:         string;
    venueName:            null;
    locationName:         null;
    expectedSessions:     number;
    hasTasks:             boolean;
    isTasksGraded:        boolean;
    tasksPercentage:      null;
}

export interface Exam {
    id:              number;
    createdAt:       Date;
    updatedAt:       Date;
    code:            string;
    ownerId:         number;
    title:           string;
    subTitle:        string;
    image:           string;
    gradePercentage: number;
    languageId:      number;
    status:          string;
    categoryId:      number;
    examTypeId:      number;
    examTime:        number;
    showCorrection:  boolean;
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
    image:             string;
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
    fields:             Field[];
    files:              File[];
}

export interface Field {
    id:         number;
    createdAt:  Date;
    updatedAt:  Date;
    questionId: number;
    field:      string;
    isCorrect:  boolean;
}

export interface File {
    id:         number;
    createdAt:  Date;
    updatedAt:  Date;
    questionId: number;
    path:       string;
}

export interface Session {
    id:              number;
    title:           string;
    date:            Date;
    startTime:       Date;
    endTime:         Date;
    status:          string;
    joinUrl:         string;
    locationId:      null;
    startUrl:        string;
    actualStartTime: null;
    actualEndTime:   null;
}
