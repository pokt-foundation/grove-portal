/* tslint:disable */
/* eslint-disable */
/**
 * Portal DWH Service API
 * Service that provides data from DWH to the Portal
 *
 * The version of the OpenAPI document: 1.0
 *
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */

import * as runtime from "../runtime"
import type { Response } from "../models/index"
import { ResponseFromJSON, ResponseToJSON } from "../models/index"

export interface AnalyticsRelaysAggragatedCategoryGetRequest {
  from: Date
  to: Date
  categoryValue: Array<string>
  category: AnalyticsRelaysAggragatedCategoryGetCategoryEnum
}

export interface AnalyticsRelaysCategoryGetRequest {
  from: Date
  to: Date
  category: AnalyticsRelaysCategoryGetCategoryEnum
  accountId: Array<string>
  portalApplicationId?: Array<string>
  chainId?: Array<string>
  chainMethod?: Array<string>
}

export interface AnalyticsRelaysDailyCategoryGetRequest {
  from: Date
  to: Date
  categoryValue: Array<string>
  category: AnalyticsRelaysDailyCategoryGetCategoryEnum
}

export interface LogsGetRequest {
  portalApplicationId: Array<string>
}

/**
 *
 */
export class UserApi extends runtime.BaseAPI {
  /**
   * Relays analytics retrieve aggregated values of a chosen metric category between selected dates.
   */
  async analyticsRelaysAggragatedCategoryGetRaw(
    requestParameters: AnalyticsRelaysAggragatedCategoryGetRequest,
    initOverrides?: RequestInit | runtime.InitOverrideFunction,
  ): Promise<runtime.ApiResponse<Response>> {
    if (requestParameters.from === null || requestParameters.from === undefined) {
      throw new runtime.RequiredError(
        "from",
        "Required parameter requestParameters.from was null or undefined when calling analyticsRelaysAggragatedCategoryGet.",
      )
    }

    if (requestParameters.to === null || requestParameters.to === undefined) {
      throw new runtime.RequiredError(
        "to",
        "Required parameter requestParameters.to was null or undefined when calling analyticsRelaysAggragatedCategoryGet.",
      )
    }

    if (
      requestParameters.categoryValue === null ||
      requestParameters.categoryValue === undefined
    ) {
      throw new runtime.RequiredError(
        "categoryValue",
        "Required parameter requestParameters.categoryValue was null or undefined when calling analyticsRelaysAggragatedCategoryGet.",
      )
    }

    if (requestParameters.category === null || requestParameters.category === undefined) {
      throw new runtime.RequiredError(
        "category",
        "Required parameter requestParameters.category was null or undefined when calling analyticsRelaysAggragatedCategoryGet.",
      )
    }

    const queryParameters: any = {}

    if (requestParameters.from !== undefined) {
      queryParameters["from"] = (requestParameters.from as any)
        .toISOString()
        .substring(0, 10)
    }

    if (requestParameters.to !== undefined) {
      queryParameters["to"] = (requestParameters.to as any).toISOString().substring(0, 10)
    }

    if (requestParameters.categoryValue) {
      queryParameters["category_value"] = requestParameters.categoryValue
    }

    const headerParameters: runtime.HTTPHeaders = {}

    if (this.configuration && this.configuration.apiKey) {
      headerParameters["Portal-DWH-Service-Api-Key"] = this.configuration.apiKey(
        "Portal-DWH-Service-Api-Key",
      ) // apiKey authentication
    }

    const response = await this.request(
      {
        path: `/analytics/relays/aggragated/{category}`.replace(
          `{${"category"}}`,
          encodeURIComponent(String(requestParameters.category)),
        ),
        method: "GET",
        headers: headerParameters,
        query: queryParameters,
      },
      initOverrides,
    )

    return new runtime.JSONApiResponse(response, (jsonValue) =>
      ResponseFromJSON(jsonValue),
    )
  }

  /**
   * Relays analytics retrieve aggregated values of a chosen metric category between selected dates.
   */
  async analyticsRelaysAggragatedCategoryGet(
    requestParameters: AnalyticsRelaysAggragatedCategoryGetRequest,
    initOverrides?: RequestInit | runtime.InitOverrideFunction,
  ): Promise<Response> {
    const response = await this.analyticsRelaysAggragatedCategoryGetRaw(
      requestParameters,
      initOverrides,
    )
    return await response.value()
  }

  /**
   * Relays analytics retrieve aggregated values of a chosen metric category between selected dates.
   */
  async analyticsRelaysCategoryGetRaw(
    requestParameters: AnalyticsRelaysCategoryGetRequest,
    initOverrides?: RequestInit | runtime.InitOverrideFunction,
  ): Promise<runtime.ApiResponse<Response>> {
    if (requestParameters.from === null || requestParameters.from === undefined) {
      throw new runtime.RequiredError(
        "from",
        "Required parameter requestParameters.from was null or undefined when calling analyticsRelaysCategoryGet.",
      )
    }

    if (requestParameters.to === null || requestParameters.to === undefined) {
      throw new runtime.RequiredError(
        "to",
        "Required parameter requestParameters.to was null or undefined when calling analyticsRelaysCategoryGet.",
      )
    }

    if (requestParameters.category === null || requestParameters.category === undefined) {
      throw new runtime.RequiredError(
        "category",
        "Required parameter requestParameters.category was null or undefined when calling analyticsRelaysCategoryGet.",
      )
    }

    if (
      requestParameters.accountId === null ||
      requestParameters.accountId === undefined
    ) {
      throw new runtime.RequiredError(
        "accountId",
        "Required parameter requestParameters.accountId was null or undefined when calling analyticsRelaysCategoryGet.",
      )
    }

    const queryParameters: any = {}

    if (requestParameters.from !== undefined) {
      queryParameters["from"] = (requestParameters.from as any)
        .toISOString()
        .substring(0, 10)
    }

    if (requestParameters.to !== undefined) {
      queryParameters["to"] = (requestParameters.to as any).toISOString().substring(0, 10)
    }

    if (requestParameters.accountId) {
      queryParameters["account_id"] = requestParameters.accountId
    }

    if (requestParameters.portalApplicationId) {
      queryParameters["portal_application_id"] = requestParameters.portalApplicationId
    }

    if (requestParameters.chainId) {
      queryParameters["chain_id"] = requestParameters.chainId
    }

    if (requestParameters.chainMethod) {
      queryParameters["chain_method"] = requestParameters.chainMethod
    }

    const headerParameters: runtime.HTTPHeaders = {}

    if (this.configuration && this.configuration.apiKey) {
      headerParameters["Portal-DWH-Service-Api-Key"] = this.configuration.apiKey(
        "Portal-DWH-Service-Api-Key",
      ) // apiKey authentication
    }

    const response = await this.request(
      {
        path: `/analytics/relays/{category}`.replace(
          `{${"category"}}`,
          encodeURIComponent(String(requestParameters.category)),
        ),
        method: "GET",
        headers: headerParameters,
        query: queryParameters,
      },
      initOverrides,
    )

    return new runtime.JSONApiResponse(response, (jsonValue) =>
      ResponseFromJSON(jsonValue),
    )
  }

  /**
   * Relays analytics retrieve aggregated values of a chosen metric category between selected dates.
   */
  async analyticsRelaysCategoryGet(
    requestParameters: AnalyticsRelaysCategoryGetRequest,
    initOverrides?: RequestInit | runtime.InitOverrideFunction,
  ): Promise<Response> {
    const response = await this.analyticsRelaysCategoryGetRaw(
      requestParameters,
      initOverrides,
    )
    return await response.value()
  }

  /**
   * Relays analytics retrieve aggregated values of a chosen metric category between selected dates.
   */
  async analyticsRelaysDailyCategoryGetRaw(
    requestParameters: AnalyticsRelaysDailyCategoryGetRequest,
    initOverrides?: RequestInit | runtime.InitOverrideFunction,
  ): Promise<runtime.ApiResponse<Response>> {
    if (requestParameters.from === null || requestParameters.from === undefined) {
      throw new runtime.RequiredError(
        "from",
        "Required parameter requestParameters.from was null or undefined when calling analyticsRelaysDailyCategoryGet.",
      )
    }

    if (requestParameters.to === null || requestParameters.to === undefined) {
      throw new runtime.RequiredError(
        "to",
        "Required parameter requestParameters.to was null or undefined when calling analyticsRelaysDailyCategoryGet.",
      )
    }

    if (
      requestParameters.categoryValue === null ||
      requestParameters.categoryValue === undefined
    ) {
      throw new runtime.RequiredError(
        "categoryValue",
        "Required parameter requestParameters.categoryValue was null or undefined when calling analyticsRelaysDailyCategoryGet.",
      )
    }

    if (requestParameters.category === null || requestParameters.category === undefined) {
      throw new runtime.RequiredError(
        "category",
        "Required parameter requestParameters.category was null or undefined when calling analyticsRelaysDailyCategoryGet.",
      )
    }

    const queryParameters: any = {}

    if (requestParameters.from !== undefined) {
      queryParameters["from"] = (requestParameters.from as any)
        .toISOString()
        .substring(0, 10)
    }

    if (requestParameters.to !== undefined) {
      queryParameters["to"] = (requestParameters.to as any).toISOString().substring(0, 10)
    }

    if (requestParameters.categoryValue) {
      queryParameters["category_value"] = requestParameters.categoryValue
    }

    const headerParameters: runtime.HTTPHeaders = {}

    if (this.configuration && this.configuration.apiKey) {
      headerParameters["Portal-DWH-Service-Api-Key"] = this.configuration.apiKey(
        "Portal-DWH-Service-Api-Key",
      ) // apiKey authentication
    }

    const response = await this.request(
      {
        path: `/analytics/relays/daily/{category}`.replace(
          `{${"category"}}`,
          encodeURIComponent(String(requestParameters.category)),
        ),
        method: "GET",
        headers: headerParameters,
        query: queryParameters,
      },
      initOverrides,
    )

    return new runtime.JSONApiResponse(response, (jsonValue) =>
      ResponseFromJSON(jsonValue),
    )
  }

  /**
   * Relays analytics retrieve aggregated values of a chosen metric category between selected dates.
   */
  async analyticsRelaysDailyCategoryGet(
    requestParameters: AnalyticsRelaysDailyCategoryGetRequest,
    initOverrides?: RequestInit | runtime.InitOverrideFunction,
  ): Promise<Response> {
    const response = await this.analyticsRelaysDailyCategoryGetRaw(
      requestParameters,
      initOverrides,
    )
    return await response.value()
  }

  /**
   * Retrieve application error messages by given timestamp range.
   */
  async logsGetRaw(
    requestParameters: LogsGetRequest,
    initOverrides?: RequestInit | runtime.InitOverrideFunction,
  ): Promise<runtime.ApiResponse<Response>> {
    if (
      requestParameters.portalApplicationId === null ||
      requestParameters.portalApplicationId === undefined
    ) {
      throw new runtime.RequiredError(
        "portalApplicationId",
        "Required parameter requestParameters.portalApplicationId was null or undefined when calling logsGet.",
      )
    }

    const queryParameters: any = {}

    if (requestParameters.portalApplicationId) {
      queryParameters["portal_application_id"] = requestParameters.portalApplicationId
    }

    const headerParameters: runtime.HTTPHeaders = {}

    if (this.configuration && this.configuration.apiKey) {
      headerParameters["Portal-DWH-Service-Api-Key"] = this.configuration.apiKey(
        "Portal-DWH-Service-Api-Key",
      ) // apiKey authentication
    }

    const response = await this.request(
      {
        path: `/logs`,
        method: "GET",
        headers: headerParameters,
        query: queryParameters,
      },
      initOverrides,
    )

    return new runtime.JSONApiResponse(response, (jsonValue) =>
      ResponseFromJSON(jsonValue),
    )
  }

  /**
   * Retrieve application error messages by given timestamp range.
   */
  async logsGet(
    requestParameters: LogsGetRequest,
    initOverrides?: RequestInit | runtime.InitOverrideFunction,
  ): Promise<Response> {
    const response = await this.logsGetRaw(requestParameters, initOverrides)
    return await response.value()
  }
}

/**
 * @export
 */
export const AnalyticsRelaysAggragatedCategoryGetCategoryEnum = {
  AccountId: "account_id",
  ApplicationId: "application_id",
} as const
export type AnalyticsRelaysAggragatedCategoryGetCategoryEnum =
  (typeof AnalyticsRelaysAggragatedCategoryGetCategoryEnum)[keyof typeof AnalyticsRelaysAggragatedCategoryGetCategoryEnum]
/**
 * @export
 */
export const AnalyticsRelaysCategoryGetCategoryEnum = {
  Transactions: "transactions",
  Errors: "errors",
} as const
export type AnalyticsRelaysCategoryGetCategoryEnum =
  (typeof AnalyticsRelaysCategoryGetCategoryEnum)[keyof typeof AnalyticsRelaysCategoryGetCategoryEnum]
/**
 * @export
 */
export const AnalyticsRelaysDailyCategoryGetCategoryEnum = {
  AccountId: "account_id",
  ApplicationId: "application_id",
} as const
export type AnalyticsRelaysDailyCategoryGetCategoryEnum =
  (typeof AnalyticsRelaysDailyCategoryGetCategoryEnum)[keyof typeof AnalyticsRelaysDailyCategoryGetCategoryEnum]
