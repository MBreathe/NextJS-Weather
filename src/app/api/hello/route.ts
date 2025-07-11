// testing capabilities

export function GET(res: Response) {
    return new Response(JSON.stringify({message: "Hello World"}));
}


// example of a POST req
export async function POST(req: Request) {
    // this checks if there is body
    let data;
    try {
        data = await req.json();
    }
    catch (e) {
        return new Response(JSON.stringify({ error: "Invalid or missing JSON" }), {status: 400});
    }

    // rest of the checks
    if (Object.keys(data).length > 1) return new Response(JSON.stringify({ error: "Too many keys" }), {status: 400});
    if (!data.query || data.query.length === 0) return new Response(JSON.stringify({ error: "Missing query" }), {status: 400});
    if (typeof data.query !== "string") return new Response(JSON.stringify({ error: "Invalid query" }), {status: 400});
    // send successful response
    return new Response(JSON.stringify({ dataReceived: data }));
}

