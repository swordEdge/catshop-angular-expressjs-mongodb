import { throwError } from 'rxjs';

export const handleError = (error: any) => {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      errorMessage = error.error.message;
      console.log(errorMessage)
    } else if (error.error && error.error.error) {
      errorMessage = error.error.error;
      console.log(errorMessage)
    } else {
      errorMessage = 'An unexpected error occurred.';
      console.log(errorMessage);
    }

    return throwError(() => {
      return errorMessage;
    });
}
