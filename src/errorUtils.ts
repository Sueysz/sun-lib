export function isError(obj: unknown): obj is Error {
  return (
    obj !== null
    && typeof obj === 'object'
    && obj instanceof Error
  );
}

export function isErrorLike(obj: unknown): obj is { message: string; stack?: string } {
  return (
    obj !== null
    && typeof obj === 'object'
    && 'message' in obj
    && typeof (obj as { message: string }).message === 'string'
    && ('stack' in obj ? typeof (obj as { stack?: string }).stack === 'string' : true)
  );
}

export function toError(obj: unknown): Error {
  if (isError(obj)) {
    return obj;
  }
  if (isErrorLike(obj)) {
    const error = new Error(obj.message);
    if (obj.stack) {
      error.stack = obj.stack;
    }
    return error;
  }
  if (typeof obj === 'string') {
    return new Error(obj);
  }
  console.error('toError: Received an unknown value:', obj);
  return new Error('Unknown error');
}
