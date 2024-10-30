import jwt_decode from "jwt-decode"
import type { ActionFunction, LoaderFunction } from "@remix-run/node"
import { authenticator } from "~/utils/auth.server"

// The loader handles the case where the page is loaded via a GET request.
// This is where a standard GET browser request for login or signup is handled.
export let loader: LoaderFunction = ({ request }) => {

  const url = new URL(request.url)
  url.searchParams.append("prompt", "login")

  if (url.searchParams.get("signup")) {
    url.searchParams.append("screen_hint", "signup")
    const signupRequest = new Request(url.toString(), request)
    return authenticator.authenticate("auth0", signupRequest, {
      successRedirect: "/account",
      failureRedirect: "/",
    })
  }

  const loginRequest = new Request(url.toString(), request)
  return authenticator.authenticate("auth0", loginRequest, {
    successRedirect: "/account",
    failureRedirect: "/",
  })
}

// The action handles the case where the page is loaded via a POST request.
// This is where the POST redirect from a GCP Marketplace signup is handled.
export let action: ActionFunction = async ({ request }) => {

  const formData = await request.formData();

  // Possible scenarios:

  // 1. GCP Marketplace signup - a POST redirect from the GCP Marketplace containing a JWT
  const gcpMarketplaceToken = formData.get("x-gcp-marketplace-token") as string | null;
  if (gcpMarketplaceToken) {
    return handleGCPMarketplaceSignup(request, gcpMarketplaceToken);
  }

  // 2. Logout
  if (formData.get("logout")) {
    return handleLogout(request);
  }

  // 3. Signup
  if (formData.get("signup")) {
    return handleSignup(request);
  }

  // 4. Login
  return handleLogin(request);
}

// In the case where the page is loaded via a POST request from a GCP Marketplace signup,
// we need to decode the JWT containing the GCP account ID and pass it to Auth0 as a URL query param.
// Auth0 will then add it to a custom claim and pass it back to the callback page in the ID token.
async function handleGCPMarketplaceSignup(request: Request, gcpMarketplaceToken: string) {
  const decodedToken = jwt_decode<{ sub: string }>(gcpMarketplaceToken);
  const url = new URL(request.url);
  url.searchParams.append("screen_hint", "signup");
  url.searchParams.append("prompt", "login");

  const gcpAccountID = decodedToken.sub;
  if (gcpAccountID) {
    url.searchParams.append("gcp_account_id", gcpAccountID);
  }

  const gcpSignupRequest = new Request(url.toString(), request);
  return authenticator.authenticate("auth0", gcpSignupRequest, {
    successRedirect: "/account",
    failureRedirect: "/",
  });
}

// handles the logout request from the client
async function handleLogout(request: Request) {
  const url = new URL(request.url);
  return authenticator.logout(request, {
    redirectTo: url.origin,
  });
}

// Handles a standard non-GCP Marketplace signup request from the client
async function handleSignup(request: Request) {
  const url = new URL(request.url);
  url.searchParams.append("screen_hint", "signup");
  url.searchParams.append("prompt", "login");
  const signupRequest = new Request(url.toString(), request);
  return authenticator.authenticate("auth0", signupRequest, {
    successRedirect: "/account",
    failureRedirect: "/",
  });
}

// Handles a standard login request from the client
async function handleLogin(request: Request) {
  const url = new URL(request.url);
  url.searchParams.append("prompt", "login");
  const loginRequest = new Request(url.toString(), request);
  return authenticator.authenticate("auth0", loginRequest, {
    successRedirect: "/dashboard",
    failureRedirect: url.origin,
  });
}
