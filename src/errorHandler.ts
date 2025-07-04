import type { Response } from 'express';

interface ErrorHandlingOptions {
  errorMessage?: string;
  errorCode?: number;
  error?: Error;
}

/**
 * @param res - The Express response object.
 * @param options - Options to customize the error message, status code, and error object.
 * @param options.errorMessage - Custom error message to return.
 * @param options.errorCode - HTTP status code to return (default: 500).
 * @param options.error - Custom error object to log.
 * 
 * @example
 * ```ts
 * import { errorHandling } from 'sun-lib';
 * 
 * app.get('/some-route', (req, res) => {
 *   try {
 *     // your logic here
 *   } catch (err) {
 *     errorHandling(res, {
 *       errorMessage: 'Failed to process request',
 *       errorCode: 400,
 *       error: err,
 *     });
 *   }
 * });
 * ```
 */
export function errorHandling(
  res: Response,
  options: ErrorHandlingOptions = {},
): void {
  const {
    errorMessage = 'An error has occurred',
    error = new Error(errorMessage),
    errorCode = 500,
  } = options;

  const errorTime = Date.now();
  console.error(JSON.stringify({
    timestamp: errorTime,
    message: error.message,
    stack: error.stack,
  }));

  res.status(errorCode).json({
    success: false,
    error: error.message,
    errorTime,
  });
}
