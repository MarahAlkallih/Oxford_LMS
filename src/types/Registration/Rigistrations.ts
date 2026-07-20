export interface AllRegistration {
    id:               number;
    registrationDate: Date;
    status:           string;
    user:             User;
    course:           Course;
}

export interface Course {
    id:    number;
    title: string;
}

export interface User {
    id:        number;
    firstName: string;
    lastName:  string;
    email:     string;
}
export interface Pendining {
    id:               number;
    registrationDate: Date;
    status:           string;
    user:             User;
    course:           Course;
}

export interface Course {
    id:    number;
    title: string;
}

export interface User {
    id:        number;
    firstName: string;
    lastName:  string;
    email:     string;
}
export interface Accepted {
    id:                   number;
    userId:               number;
    courseId:             number;
    courseRegistrationId: number;
    studentName:          string;
    courseName:           string;
}
export interface OneRegisteration {
    id:               number;
    registrationDate: Date;
    status:           string;
    dateReview:       Date;
    reviewedById:     number;
    user:             User;
    course:           Course;
    invoices:         Invoice[];
}

export interface Course {
    id:                   number;
    title:                string;
    subTitle:             string;
    fee:                  number;
    hours:                number;
    description:          string;
    startDate:            Date;
    endDate:              Date;
    registrationDeadline: Date;
    paymentDeadline:      Date;
    status:               string;
    isActive:             boolean;
}

export interface Invoice {
    id:             number;
    registrationId: number;
    totalAmount:    number;
    paymentMethod:  string;
    paymentStatus:  string;
    transactionId:  null;
    receiptUrl:     string;
    createdAt:      Date;
    updatedAt:      Date;
}

export interface User {
    id:          number;
    firstName:   string;
    lastName:    string;
    email:       string;
    phoneNumber: string;
}

