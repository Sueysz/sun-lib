import type { Response } from 'express';
import { isError, toError } from './errorUtils';

interface ErrorHandlingOptions {
  errorMessage?: string;
  errorCode?: number;
  error?: unknown;
}

/**
 * Log the error and send a JSON response with the error message and status code.
 * The real error message will always be in the logs, while the message in the response can be overwritten with options.errorMessage.
 * @param res - The Express response object.
 * @param options - Options to customize the error message, status code, and error object.
 * @param options.errorMessage - Custom error message to return in the response.
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
  let error: Error;
  const {
    errorMessage,
    errorCode = 500,
  } = options;

  if (isError(options.error)) {
    error = options.error;
  } else {
    error = toError(options.error);
  }

  const errorTime = Date.now();
  console.error(JSON.stringify({
    timestamp: errorTime,
    message: error.message,
    stack: error.stack,
  }));

  res.status(errorCode).json({
    success: false,
    error: errorMessage ?? error.message,
    errorTime,
  });
}
