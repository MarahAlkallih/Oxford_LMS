export interface CourseRequest {
  id: number;
  title: string;
  subTitle: string;
  description: string;
  hours: number | null;
  proposedFee: number | null;
  status: "PENDING" | "APPROVED" | "REJECTED" | string;
  img: string | null;
  startDate: string | null;
  endDate: string | null;
  requestDescription: string | null;
  category: {
    id: number;
    name: string;
  } | null;
  venue: string | null;
  location: string | null;
  language: {
    id: number;
    name: string;
  } | null;
  trainer: {
    id: number;
    name: string;
  } | null;
}