import { User, Emojis } from "./types"
import hash from "hash.js"
import { useToast } from "vue-toastification"

export default class Api {
    private readonly toast = useToast()

    public readonly username: string
    public readonly hashedPassword: string

    constructor({ username, password }: User) {
        this.username = username
        this.hashedPassword = hash.sha512().update(password).digest("hex")
    }

    private makeError(message: string): Error {
        this.toast.error(message)
        return new Error(message)
    }

    private async call({ method, endpoint, body, forcedErrorMessage }: { method: string, endpoint: string, body?: FormData, forcedErrorMessage?: string }): Promise<Response> {
        if (body) {
            body.append("username", this.username)
            body.append("password", this.hashedPassword)
        }

        try {
            const response = await fetch(
                `https://emoji-worker.adzuki.workers.dev/${endpoint}`,
                { method, body }
            )
            if (response.status === 200) return response
        }

        catch (error) {
            throw this.makeError(forcedErrorMessage ?? String(error))
        }

        throw this.makeError(forcedErrorMessage ?? "Failed to fetch API")
    }

    public async auth(): Promise<void> {
        const body = new FormData
        await this.call({ method: "POST", endpoint: "auth", body, forcedErrorMessage: "Invalid username or password" })
    }

    public async list(): Promise<Emojis> {
        const result = await this.call({ method: "GET", endpoint: "list" })
        return JSON.parse(await result.text())
    }

    public async add(content: string): Promise<Emojis> {
        const body = new FormData
        body.append("content", content)
        
        const result = await this.call({ method: "POST", endpoint: "add", body })
        return JSON.parse(await result.text())
    }

    public async move(from: number, to: number): Promise<Emojis> {
        const body = new FormData
        body.append("from", String(from))
        body.append("to", String(to))
        
        const result = await this.call({ method: "POST", endpoint: "move", body })
        return JSON.parse(await result.text())
    }

    public async delete(index: number): Promise<Emojis> {
        const body = new FormData
        body.append("index", String(index))
        
        const result = await this.call({ method: "POST", endpoint: "delete", body })
        return JSON.parse(await result.text())
    }
}
