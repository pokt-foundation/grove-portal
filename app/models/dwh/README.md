# Install CLI

- https://openapi-generator.tech/docs/installation

# Run Command

- run from root of repo
- `openapi-generator generate -i ./app/models/dwh/openapi.yaml -g typescript-fetch -o ./app/models/dwh/sdk`

# Environment

- DWH_API_URL
- DWH_API_KEY

# Usage

```
    import { Configuration, ResponseDataInner, UserApi } from "~/models/dwh/sdk"

    const dwh = new UserApi(
        new Configuration({
            basePath: getRequiredServerEnvVar("DWH_API_URL"),
            apiKey: getRequiredServerEnvVar("DWH_API_KEY")
        }),
    )

    const relays = await dwh.analyticsRelaysCategoryGet({
      accountId: [accountId],
      category: "transactions",
      from: dayjs().subtract(1, "day").toDate(),
      to: dayjs().toDate(),
    })
```

# Reasources

- https://openapi-generator.tech/docs/generators/typescript-fetch
