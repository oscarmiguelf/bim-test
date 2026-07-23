export interface Result<T> {
    data: T | null;
    error: string | null;
    isSuccess: boolean;
}

export const success = <T>(data: T): Result<T> => ({
    data,
    error: null,
    isSuccess: true,
});

export const failure = <T>(error: string): Result<T> => ({
    data: null,
    error,
    isSuccess: false,
});
