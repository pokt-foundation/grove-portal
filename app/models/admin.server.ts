import { getRequiredServerEnvVar } from "~/utils/environment"

export type Admin = { id: string; email: string }
export type Password = { password: string }

export function getAdminUser() {
  return {
    id: "admin",
    email: getRequiredServerEnvVar("ADMIN_EMAIL"),
  }
}

export async function verifyLogin(email: Admin["email"], password: Password["password"]) {
  const adminEmail = getRequiredServerEnvVar("ADMIN_EMAIL")
  if (email !== adminEmail) {
    return undefined
  }

  const adminPassword = getRequiredServerEnvVar("ADMIN_PASSWORD")
  if (password !== adminPassword) {
    return undefined
  }

  return getAdminUser()
}
