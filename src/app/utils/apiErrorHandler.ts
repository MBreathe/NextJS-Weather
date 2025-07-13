function apiErrorHandler(message: string, status = 400) {
    return new Response(JSON.stringify({ error: message }), {status});
}

export default apiErrorHandler;