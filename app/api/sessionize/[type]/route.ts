import { NextResponse } from "next/server";

const CACHE_DURATION = 60 * 60 * 1000; // Cache duration (1 Hour)

let cachedData: {
    [sessionId: string]: { [type: string]: { data: any; timestamp: number } };
} = {}; // Cache for each sessionId & type

const DEFAULT_SESSION_ID = "jl4ktls0"; // Default session ID if not provided
const VALID_TYPES = ["Speakers", "GridSmart"]; // Valid types

export async function GET(req: Request, { params }: { params: { type: string } }) {
    const { searchParams } = new URL(req.url);
    const sessionId = searchParams.get("sessionId") ?? DEFAULT_SESSION_ID; // Use query param or default
    const fetchFresh = searchParams.get("fresh") === "true"; // Force fresh fetch
    const type = params.type; // Route param (Speakers or GridSmart)

    // Validate request type (Case-sensitive)
    if (!VALID_TYPES.includes(type)) {
        return NextResponse.json({ error: "Invalid request type." }, { status: 400 });
    }

    const apiEndpoint = `https://sessionize.com/api/v2/${sessionId}/view/${type}`;

    // Ensure cache exists for this sessionId & type
    if (!cachedData[sessionId]) cachedData[sessionId] = {};

    // Serve from cache if valid and `fresh=false`
    if (!fetchFresh && cachedData[sessionId][type] && Date.now() - cachedData[sessionId][type].timestamp < CACHE_DURATION) {
        console.log(`Serving cached ${type} data for session ${sessionId}`);
        return NextResponse.json({ fromCache: true, data: cachedData[sessionId][type].data, cachedAt: cachedData[sessionId][type].timestamp });
    }

    try {
        const response = await fetch(apiEndpoint);
        if (!response.ok) {
            return NextResponse.json({ error: `Failed to fetch ${type} data` }, { status: 500 });
        }

        const data = await response.json();

        // Cache the response
        cachedData[sessionId][type] = { data, timestamp: Date.now() };

        console.log(`Fetched fresh ${type} data for session ${sessionId}`);

        return NextResponse.json({ fromCache: false, data });
    } catch (error) {
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
