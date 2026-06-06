export interface TrainingPlan {
    id:        number;
    filePath:  string;
    imagePath: string;
    fileUrl:   string;
    imageUrl:  string;
    addDate:   Date;
    addBy:     number;
    deletedAt: null;
    isActive:  boolean;
    account:   Account;
}

export interface Account {
    id:        number;
    firstName: string;
    lastName:  string;
    userName:  string;
    email:     string;
}

