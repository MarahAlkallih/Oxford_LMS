export interface Course {
    id:                   number;
    categoryId:           number;
    venueId:              number | null;
    locationId:           number | null;
    code:                 string;
    title:                string;
    subTitle:             string | null;
    fee:                  number;
    registrationDeadline: Date;
    paymentDeadline:      Date;
    status:               string;
    hours:                number;
    description:          string | null;
    languageId:           number;
    startDate:            Date | null;
    endDate:              Date | null;
    img:                  string;
    createdById:          number;
    isAdd:                boolean;
    isActive:             boolean;
    categoryName:         string;
    venueName:            null | string;
    locationName:         string;
    expectedSessions :number | null;
    hasTasks:boolean,
    tasksPercentage:number | null,
    isTasksGraded:boolean
}
export interface CourseesResponse{
    
}

export interface CourseTrainers{
     
        id: number,
        courseId: number,
        trainerId: number,
        assignedAt: Date,
        assignedById: number,
        trainerName: string
    
}
