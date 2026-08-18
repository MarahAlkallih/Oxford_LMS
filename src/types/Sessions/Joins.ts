export interface Joins {
    message: string;
    count:   number;
    data:    Datum[];
}

export interface Datum {
    id:                  number;
    sessionId:           number;
    attendedTraineeId:   number;
    requestedAt:         Date;
    status:              string;
    reviewedByAdminId:   number;
    reviewedByTrainerId: null;
    reviewedAt:          Date;
    createdAt:           Date;
    trainee:             Trainee;
    reviewedByAdmin:     ReviewedByAdmin;
    reviewedByTrainer:   null;
}

export interface ReviewedByAdmin {
    id:        number;
    accountId: number;
    createdAt: Date;
    updatedAt: Date;
}

export interface Trainee {
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
    email:     string;
}
