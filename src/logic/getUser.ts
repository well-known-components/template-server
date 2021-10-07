import { PickComponents } from "../types"

export type UserData = {
  name: string
}

export async function getUserFromToken(_ctx: PickComponents<"config">, token: string): Promise<UserData | null> {
  // use ctx.component.config or database or any other component to get the user from the token
  if (token == "tester") {
    return {
      name: "beta-tester",
    }
  }

  // return null or throw in case of failure
  return null
}
