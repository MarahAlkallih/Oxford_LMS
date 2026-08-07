export interface ExamSession {
    data: Datum[];
    meta: Meta;
}

export interface Datum {
    id:          number;
    createdAt:   Date;
    updatedAt:   Date;
    sessionId:   number;
    examEventId: number;
    exam:        Exam;
    course:      Course;
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

export interface Meta {
    totalRecords: number;
    currentPage:  number;
    limit:        number;
    totalPages:   number;
}
