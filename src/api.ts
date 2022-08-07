import { User } from "./types/user"
import hash from "hash.js"

type Result<T = Response> =
    | { success: true, response: T }
    | { success: false, errorMessage: string }

export default class Api {
    public readonly username: string
    public readonly hashedPassword: string

    constructor({ username, password }: User) {
        this.username = username
        this.hashedPassword = hash.sha512().update(password).digest("hex")
    }

    private async call({ method, endpoint, body, forcedErrorMessage }: { method: string, endpoint: string, body?: FormData, forcedErrorMessage?: string }): Promise<Result> {
        if (body) {
            body.append("username", this.username)
            body.append("password", this.hashedPassword)
        }

        try {
            const response = await fetch(
                `https://emoji-worker.adzuki.workers.dev/${endpoint}`,
                { method, body }
            )
            if (response.status === 200) return { success: true, response }
        }

        catch (error) {
            return { success: false, errorMessage: forcedErrorMessage ?? String(error) }
        }

        return { success: false, errorMessage: forcedErrorMessage ?? "Failed to fetch API" }
    }

    public auth(): Promise<Result> {
        const body = new FormData
        body.append("username", this.username)
        body.append("password", this.hashedPassword)

        return this.call({ method: "POST", endpoint: "auth", body, forcedErrorMessage: "Invalid username or password" })
    }

    public async list(): Promise<Result<any>> {
        const result = await this.call({ method: "GET", endpoint: "list" })
        return result.success ? { success: true, response: JSON.parse(await result.response.text()) } : result
    }
}
