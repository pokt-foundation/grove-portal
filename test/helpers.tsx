import { MantineProvider } from "@mantine/core"
import { RemixBrowser } from "@remix-run/react"
import { RenderOptions, render as rtlRender } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { portalTheme } from "~/root/portalTheme"

export { axe } from "jest-axe"
export * from "@testing-library/react"
export { userEvent }

export function render(ui: React.ReactElement, options?: RenderOptions) {
  function RootComponent() {
    return <MantineProvider theme={portalTheme}>{ui}</MantineProvider>
  }

  window.__remixManifest = {
    routes: {
      root: {
        hasAction: false,
        hasErrorBoundary: false,
        hasLoader: false,
        id: "root",
        imports: [],
        module: "",
        path: "",
        hasClientAction: false,
        hasClientLoader: false,
      },
    },
    entry: { imports: [], module: "" },
    url: "",
    version: "",
  }
  window.__remixRouteModules = { root: { default: RootComponent } }
  window.__remixContext = {
    url: "",
    state: {
      loaderData: undefined,
      actionData: null,
      errors: null,
    },
    isSpaMode: false,
    future: {
      v3_fetcherPersist: false,
      v3_relativeSplatPath: false,
    },
  }

  function Wrapper({ children }: { children: React.ReactNode }) {
    return <RemixBrowser>{children}</RemixBrowser>
  }

  const { rerender, ...rest } = rtlRender(ui, { wrapper: Wrapper, ...options })

  return {
    rerender: (ui: React.ReactElement) => {
      const RootComponent = () => ui
      if (window.__remixRouteModules && window.__remixRouteModules.root) {
        window.__remixRouteModules.root.default = RootComponent
      }
      rerender(ui)
    },
    ...rest,
  }
}
