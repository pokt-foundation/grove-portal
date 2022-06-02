import { installGlobals } from "@remix-run/node/globals"
import "@testing-library/jest-dom/extend-expect"
import { getClientEnv } from "~/utils/environment.server"

installGlobals()
global.ENV = getClientEnv()
