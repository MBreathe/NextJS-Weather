import apiErrorHandler from "@/app/utils/apiErrorHandler";

type AsyncFunc<T, R> = (arg: T) => Promise<R>;

function errorCatcher<T, R>(func: AsyncFunc<T, R>, errorMessage: string, statusCode?: number) {
    return async (arg: T) => {
        try {
            return await func(arg);
        } catch (e) {
            console.error(e);
            return apiErrorHandler(e instanceof Error ? e.message : errorMessage, statusCode);
        }
    }
}

export default errorCatcher;