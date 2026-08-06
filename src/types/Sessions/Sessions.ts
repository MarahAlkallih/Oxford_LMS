export interface MySession {
    assignmentId: number;
    sessionId:    number;
    sessionTitle: string;
    date:         Date;
    startTime:    Date;
    endTime:      Date;
    joinUrl:      string;
    status:       string;
    courseId:     number;
    courseTitle:  string;
    courseCode:   string;
}
export interface WeekSessions {
    id:              number;
    title:           string;
    date:            Date;
    startTime:       Date;
    endTime:         Date;
    status:          string;
    trainerName:     string;
    trainerEmail:    string;
    trainerPhone:    string;
    actualStartTime: null;
    actualEndTime:   null;
    startUrl:        string;
}
