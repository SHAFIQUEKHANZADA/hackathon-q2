import { connect } from "@/db/dbConfig"
import { NextRequest, NextResponse } from "next/server"
 
connect()

export async function GET(request: NextRequest) {
    console.log(request)
    try {
        const response = NextResponse.json({
            message: "Logout successfully",
            success: true
        })

        response.cookies.set("token", "", {
            httpOnly: true,
            expires: new Date(0)
        })
        return response


    } catch (error) {
        if (error instanceof Error) {
            return NextResponse.json({ error: error.message }, { status: 500 });
        }
        return NextResponse.json({ error: "An unexpected error occurred" }, { status: 500 });
    }
}