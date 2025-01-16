import jwt, { JwtPayload } from "jsonwebtoken";
import { NextRequest } from "next/server";

export const getData = (request: NextRequest) => {
    try {
        const token = request.cookies.get("token")?.value || "";

        const decodedToken = jwt.verify(token, process.env.TOKEN_SECRET!) as JwtPayload;

        if (!decodedToken || typeof decodedToken !== "object" || !("id" in decodedToken)) {
            throw new Error("Invalid token");
        }

        return decodedToken.id;
    } catch (error) {
        if (error instanceof Error) {
            throw new Error(error.message);
        }
        throw new Error("An unexpected error occurred");
    }
};
