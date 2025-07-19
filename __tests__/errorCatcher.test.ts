/**
 * @jest-environment node
 */

import apiErrorHandler from "@/app/utils/apiErrorHandler";
import errorCatcher from "@/app/utils/errorCatcher";

jest.mock("@/app/utils/apiErrorHandler", () => {
    return jest.fn((message, status) => ({
        message, status, mockedResponse: true
    }));
});

console.error = jest.fn();

describe('errorCatcher', () => {
    beforeEach(() => {
        jest.resetAllMocks();
    });

    it("should return function result when no error occurs", async () => {
        const mockFunc = jest.fn().mockResolvedValueOnce("success");
        const wrapper = errorCatcher(mockFunc, "Default error message");

        const result = await wrapper("test arg");

        expect(mockFunc).toHaveBeenCalledWith("test arg");
        expect(result).toBe("success");
        expect(apiErrorHandler).not.toHaveBeenCalled();
        expect(console.error).not.toHaveBeenCalled();
    });
    it("should call apiErrorHandler when an error occurs", async () => {
        const mockFunc = jest.fn().mockRejectedValueOnce(new Error("test error"));
        const wrapper = errorCatcher(mockFunc, "Default error message");

        await wrapper("test arg");

        expect(mockFunc).toHaveBeenCalledWith("test arg");
        expect(apiErrorHandler).toHaveBeenCalledWith("test error", undefined);
        expect(console.error).toHaveBeenCalledWith(new Error("test error"));
    });
    it("should pass status to apiErrorHandler if it was provided as an argument", async () => {
        const mockFunc = jest.fn().mockRejectedValueOnce("server error");
        const wrapper = errorCatcher(mockFunc, "Passed message", 999);

        await wrapper("test input");

        expect(mockFunc).toHaveBeenCalledWith("test input");
        expect(apiErrorHandler).toHaveBeenCalledWith("Passed message", 999);
    });
})