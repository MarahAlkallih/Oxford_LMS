import { toast } from "react-toastify";

export class ErrorHandler {
  static getMessage(error: any): string {
    if (!error) return "Something went wrong";

   
    if (error?.data?.message) {
      return Array.isArray(error.data.message)
        ? error.data.message.join("\n")
        : error.data.message;
    }

   
    if (error?.message) {
      return error.message;
    }

    return "Something went wrong";
  }

  static show(error: any) {
    toast.error(this.getMessage(error));
  }
}
