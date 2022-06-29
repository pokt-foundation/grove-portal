import { render as rtlRender, RenderOptions } from "@testing-library/react"
import { RemixBrowser } from "@remix-run/react"
import userEvent from "@testing-library/user-event"

export { axe } from "jest-axe"
export * from "@testing-library/react"
export { userEvent }

export function render(ui: React.ReactElement, options?: RenderOptions) {
  function RootComponent() {
    return ui
  }

  window.__remixManifest = {
    routes: {
      root: {
        hasAction: false,
        hasCatchBoundary: false,
        hasErrorBoundary: false,
        hasLoader: false,
        id: "root",
        imports: [],
        module: "",
        path: "",
      },
    },
    entry: { imports: [], module: "" },
    url: "",
    version: "",
  }
  window.__remixRouteModules = { root: { default: RootComponent } }
  window.__remixContext = {
    matches: [],
    manifest: window.__remixManifest,
    routeModules: window.__remixRouteModules,
    routeData: {},
    appState: {
      catchBoundaryRouteId: null,
      loaderBoundaryRouteId: null,
      renderBoundaryRouteId: "root",
      trackBoundaries: false,
      trackCatchBoundaries: false,
    },
  }

  function Wrapper({ children }: { children: React.ReactNode }) {
    return <RemixBrowser>{children}</RemixBrowser>
  }
  return rtlRender(ui, {
    wrapper: Wrapper,
  })
}
