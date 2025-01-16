import { connect } from "@/db/dbConfig"
import User from "@/models/userModel"
import { NextRequest, NextResponse } from "next/server"
import { getData } from "@/helpers/getData"

connect()

export async function POST(request: NextRequest) {
    const userId = await getData(request)
    const user = await User.findOne({ _id: userId }).select("-password")

    return NextResponse.json({
        message: "User found",
        data: user
    })
}