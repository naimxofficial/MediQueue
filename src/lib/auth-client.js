import { createAuthClient } from "better-auth/react"
export const authClient = createAuthClient({
    baseURL: "http://localhost:3000"
})

export const { signIn, signUp, signOut, useSession } = createAuthClient()
// https://qurbanihat-kappa.vercel.app
// http://localhost:3000