// import { Form } from "@remix-run/react"

// export default function Login() {
//   return (
//     <Form action="/api/auth/auth0" method="post">
//       <button>Login with Auth0</button>
//     </Form>
//   )
// }

import {
  CHAIN_NAMESPACES,
  SafeEventEmitterProvider,
  WALLET_ADAPTERS,
} from "@web3auth/base"
// import { Web3AuthCore } from "@web3auth/core"
import { Web3Auth } from "@web3auth/modal"
import { OpenloginAdapter } from "@web3auth/openlogin-adapter"
import { useEffect, useState } from "react"
// import "./App.css"

const clientId =
  "BBYZ-2e42qY2lPUPiSncn5yv0txG2qOzh3GbuGAkWz2O9zaICIi_FsBLzY5s6yZxmt-WCI4PmbL56KaQHlzWjvU" // get from https://dashboard.web3auth.io

function App() {
  const [web3auth, setWeb3auth] = useState<Web3Auth | null>(null)
  const [provider, setProvider] = useState<SafeEventEmitterProvider | null>(null)

  // WEB3AUTH MODAL
  useEffect(() => {
    const init = async () => {
      try {
        const web3auth = new Web3Auth({
          clientId,
          web3AuthNetwork: "testnet", // mainnet, aqua, celeste, cyan or testnet
          chainConfig: {
            chainNamespace: CHAIN_NAMESPACES.EIP155,
            chainId: "0x1",
            rpcTarget: "https://eth-rpc.gateway.pokt.network", // This is the public RPC we have added, please pass on your own endpoint while creating an app
          },
        })

        const openloginAdapter = new OpenloginAdapter({
          adapterSettings: {
            uxMode: "popup",
            whiteLabel: {
              name: "Pocket Network Portal",
              logoLight: "https://web3auth.io/images/w3a-L-Favicon-1.svg",
              logoDark: "https://web3auth.io/images/w3a-D-Favicon-1.svg",
              defaultLanguage: "en",
              dark: true, // whether to enable dark mode. defaultValue: false
            },
            loginConfig: {
              jwt: {
                verifier: "pocket-network-auth0-testnet",
                typeOfLogin: "jwt",
                clientId: "TJykObV0ZyzCuggvsZXmcCpKARLtEblg",
              },
            },
          },
        })
        web3auth.configureAdapter(openloginAdapter)

        setWeb3auth(web3auth)

        await web3auth.initModal()

        if (web3auth.provider) {
          setProvider(web3auth.provider)
        }
      } catch (error) {
        console.error(error)
      }
    }

    init()
  }, [])

  const login = async () => {
    if (!web3auth) {
      console.log("web3auth not initialized yet")
      return
    }
    const web3authProvider = await web3auth.connect()
    setProvider(web3authProvider)
  }

  const logout = async () => {
    if (!web3auth) {
      console.log("web3auth not initialized yet")
      return
    }
    await web3auth.logout()
    setProvider(null)
  }

  // WEB3AUTH CORE
  // useEffect(() => {
  //   const init = async () => {
  //     try {
  //       const web3auth = new Web3AuthCore({
  //         clientId,
  //         web3AuthNetwork: "testnet", // mainnet, aqua, celeste, cyan or testnet
  //         chainConfig: {
  //           chainNamespace: CHAIN_NAMESPACES.EIP155,
  //           chainId: "0x1",
  //           rpcTarget: "https://eth-rpc.gateway.pokt.network",
  //         },
  //       })

  //       const openloginAdapter = new OpenloginAdapter({
  //         adapterSettings: {
  //           uxMode: "popup",
  //           whiteLabel: {
  //             name: "Pocket Network Portal",
  //             logoLight: "https://web3auth.io/images/w3a-L-Favicon-1.svg",
  //             logoDark: "https://web3auth.io/images/w3a-D-Favicon-1.svg",
  //             defaultLanguage: "en",
  //             dark: true, // whether to enable dark mode. defaultValue: false
  //           },
  //           loginConfig: {
  //             jwt: {
  //               name: "Pocket Network Portal Auth0",
  //               verifier: "pocket-network-auth0-testnet",
  //               typeOfLogin: "jwt",
  //               clientId: "TJykObV0ZyzCuggvsZXmcCpKARLtEblg",
  //             },
  //           },
  //         },
  //       })
  //       console.log(openloginAdapter)
  //       web3auth.configureAdapter(openloginAdapter)

  //       await web3auth.init()

  //       setWeb3auth(web3auth)

  //       if (web3auth.provider) {
  //         console.log(web3auth.provider)
  //         setProvider(web3auth.provider)
  //       }
  //     } catch (error) {
  //       console.error(error)
  //     }
  //   }

  //   init()
  // }, [])

  // const login = async () => {
  //   if (!web3auth) {
  //     console.log("web3auth not initialized yet")
  //     return
  //   }
  //   const web3authProvider = await web3auth.connectTo(WALLET_ADAPTERS.OPENLOGIN, {
  //     mfaLevel: "default",
  //     loginProvider: "jwt",
  //     extraLoginOptions: {
  //       verifierIdField: "sub",
  //       domain: "https://dev-f8fl5e69.us.auth0.com",
  //       scope: "read:current_user update:current_user_metadata openid profile email",
  //       audience: "https://ui.backend.pokt.network/",
  //     },
  //   })
  //   setProvider(web3authProvider)
  // }

  // const logout = async () => {
  //   if (!web3auth) {
  //     console.log("web3auth not initialized yet")
  //     return
  //   }
  //   await web3auth.logout()
  //   setProvider(null)
  // }

  const loggedInView = (
    <button className="card" onClick={logout}>
      Log Out
    </button>
  )

  const unloggedInView = (
    <button className="card" onClick={login}>
      Login
    </button>
  )

  return (
    <div className="container">
      <h1 className="title">Web3Auth & ReactJS Example</h1>
      <div className="grid">{provider ? loggedInView : unloggedInView}</div>
    </div>
  )
}

export default App
