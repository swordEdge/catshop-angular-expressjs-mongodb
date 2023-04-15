import { throwError } from 'rxjs';

export const handleError = (error: any) => {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      errorMessage = error.error.message;
    } else if (error.error && error.error.error) {
      errorMessage = error.error.error;
    } else {
      errorMessage = 'An unexpected error occurred.';
    }

    return throwError(() => {
      return errorMessage;
    });
}
