import type { APIRequestGeneric } from "@/types/api"
import type { UserType } from "@/types/user"

type AuthLoginFunctionResponse = {
  token: string
  user: UserType
}


export const authLoginFunction = async (username: string, password: string) => {
  const request = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/users/login`, {
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    },
    body: JSON.stringify({ username, password }),
    method: 'POST'
  })
  const response: APIRequestGeneric<AuthLoginFunctionResponse> = await request.json()

  return response
}