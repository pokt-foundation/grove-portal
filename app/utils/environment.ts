import type { getClientEnv } from "./environment.server"

function getRequiredEnvVarFromObj(
  obj: Record<string, string | undefined>,
  key: string,
  devValue?: string,
) {
  let value = devValue
  const envVal = obj[key]
  if (envVal) {
    value = envVal
  }
  if (!value) {
    throw new Error(`${key} is a required env variable`)
  }
  return value
}

function getRequiredServerEnvVar(key: string, devValue?: string) {
  return getRequiredEnvVarFromObj(process.env, key, devValue)
}

function getRequiredClientEnvVar(
  key: keyof ReturnType<typeof getClientEnv>,
  devValue?: string,
) {
  return getRequiredEnvVarFromObj(ENV, key, devValue)
}

export { getRequiredServerEnvVar, getRequiredClientEnvVar }
