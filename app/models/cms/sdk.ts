import { GraphQLClient } from "graphql-request"
import * as Dom from "graphql-request/dist/types.dom"
import gql from "graphql-tag"
export type Maybe<T> = T | null
export type InputMaybe<T> = Maybe<T>
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] }
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]?: Maybe<T[SubKey]>
}
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]: Maybe<T[SubKey]>
}
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string
  String: string
  Boolean: boolean
  Int: number
  Float: number
  Date: any
  GraphQLBigInt: any
  GraphQLStringOrFloat: any
  Hash: any
  JSON: any
}

export type Mutation = {
  __typename?: "Mutation"
  create_contact_sales_forms_item?: Maybe<contact_sales_forms>
  create_contact_sales_forms_items: Array<contact_sales_forms>
  create_feedback_forms_item?: Maybe<Scalars["Boolean"]>
  create_feedback_forms_items?: Maybe<Scalars["Boolean"]>
  update_ecosystem_batch: Array<ecosystem>
  update_ecosystem_item?: Maybe<ecosystem>
  update_ecosystem_items: Array<ecosystem>
}

export type Mutationcreate_contact_sales_forms_itemArgs = {
  data: create_contact_sales_forms_input
}

export type Mutationcreate_contact_sales_forms_itemsArgs = {
  data?: InputMaybe<Array<create_contact_sales_forms_input>>
  filter?: InputMaybe<contact_sales_forms_filter>
  limit?: InputMaybe<Scalars["Int"]>
  offset?: InputMaybe<Scalars["Int"]>
  page?: InputMaybe<Scalars["Int"]>
  search?: InputMaybe<Scalars["String"]>
  sort?: InputMaybe<Array<InputMaybe<Scalars["String"]>>>
}

export type Mutationcreate_feedback_forms_itemArgs = {
  data: create_feedback_forms_input
}

export type Mutationcreate_feedback_forms_itemsArgs = {
  data?: InputMaybe<Array<create_feedback_forms_input>>
}

export type Mutationupdate_ecosystem_batchArgs = {
  data?: InputMaybe<Array<update_ecosystem_input>>
  filter?: InputMaybe<ecosystem_filter>
  limit?: InputMaybe<Scalars["Int"]>
  offset?: InputMaybe<Scalars["Int"]>
  page?: InputMaybe<Scalars["Int"]>
  search?: InputMaybe<Scalars["String"]>
  sort?: InputMaybe<Array<InputMaybe<Scalars["String"]>>>
}

export type Mutationupdate_ecosystem_itemArgs = {
  data: update_ecosystem_input
  id: Scalars["ID"]
}

export type Mutationupdate_ecosystem_itemsArgs = {
  data: update_ecosystem_input
  filter?: InputMaybe<ecosystem_filter>
  ids: Array<InputMaybe<Scalars["ID"]>>
  limit?: InputMaybe<Scalars["Int"]>
  offset?: InputMaybe<Scalars["Int"]>
  page?: InputMaybe<Scalars["Int"]>
  search?: InputMaybe<Scalars["String"]>
  sort?: InputMaybe<Array<InputMaybe<Scalars["String"]>>>
}

export type Query = {
  __typename?: "Query"
  articles: Array<articles>
  articles_aggregated: Array<articles_aggregated>
  articles_by_id?: Maybe<articles>
  articles_tags: Array<articles_tags>
  articles_tags_aggregated: Array<articles_tags_aggregated>
  articles_tags_by_id?: Maybe<articles_tags>
  articles_translations: Array<articles_translations>
  articles_translations_aggregated: Array<articles_translations_aggregated>
  articles_translations_by_id?: Maybe<articles_translations>
  comparison: Array<comparison>
  comparison_aggregated: Array<comparison_aggregated>
  comparison_by_id?: Maybe<comparison>
  contact_sales_forms: Array<contact_sales_forms>
  contact_sales_forms_aggregated: Array<contact_sales_forms_aggregated>
  contact_sales_forms_by_id?: Maybe<contact_sales_forms>
  dictionary: Array<dictionary>
  dictionary_aggregated: Array<dictionary_aggregated>
  dictionary_by_id?: Maybe<dictionary>
  dictionary_translations: Array<dictionary_translations>
  dictionary_translations_aggregated: Array<dictionary_translations_aggregated>
  dictionary_translations_by_id?: Maybe<dictionary_translations>
  documentation: Array<documentation>
  documentation_aggregated: Array<documentation_aggregated>
  documentation_by_id?: Maybe<documentation>
  documentation_tags: Array<documentation_tags>
  documentation_tags_aggregated: Array<documentation_tags_aggregated>
  documentation_tags_by_id?: Maybe<documentation_tags>
  documentation_translations: Array<documentation_translations>
  documentation_translations_aggregated: Array<documentation_translations_aggregated>
  documentation_translations_by_id?: Maybe<documentation_translations>
  ecosystem: Array<ecosystem>
  ecosystem_aggregated: Array<ecosystem_aggregated>
  ecosystem_by_id?: Maybe<ecosystem>
  ecosystem_files: Array<ecosystem_files>
  ecosystem_files_aggregated: Array<ecosystem_files_aggregated>
  ecosystem_files_by_id?: Maybe<ecosystem_files>
  ecosystem_tags: Array<ecosystem_tags>
  ecosystem_tags_aggregated: Array<ecosystem_tags_aggregated>
  ecosystem_tags_by_id?: Maybe<ecosystem_tags>
  ecosystem_translations: Array<ecosystem_translations>
  ecosystem_translations_aggregated: Array<ecosystem_translations_aggregated>
  ecosystem_translations_by_id?: Maybe<ecosystem_translations>
  flags: Array<flags>
  flags_aggregated: Array<flags_aggregated>
  flags_by_id?: Maybe<flags>
  legal: Array<legal>
  legal_aggregated: Array<legal_aggregated>
  legal_by_id?: Maybe<legal>
  legal_translations: Array<legal_translations>
  legal_translations_aggregated: Array<legal_translations_aggregated>
  legal_translations_by_id?: Maybe<legal_translations>
  personas: Array<personas>
  personas_aggregated: Array<personas_aggregated>
  personas_by_id?: Maybe<personas>
  plans: Array<plans>
  plans_aggregated: Array<plans_aggregated>
  plans_by_id?: Maybe<plans>
  plans_translations: Array<plans_translations>
  plans_translations_aggregated: Array<plans_translations_aggregated>
  plans_translations_by_id?: Maybe<plans_translations>
  questions: Array<questions>
  questions_aggregated: Array<questions_aggregated>
  questions_by_id?: Maybe<questions>
  questions_tags: Array<questions_tags>
  questions_tags_aggregated: Array<questions_tags_aggregated>
  questions_tags_by_id?: Maybe<questions_tags>
  questions_translations: Array<questions_translations>
  questions_translations_aggregated: Array<questions_translations_aggregated>
  questions_translations_by_id?: Maybe<questions_translations>
  reviews: Array<reviews>
  reviews_aggregated: Array<reviews_aggregated>
  reviews_by_id?: Maybe<reviews>
  tags: Array<tags>
  tags_aggregated: Array<tags_aggregated>
  tags_by_id?: Maybe<tags>
  tags_translations: Array<tags_translations>
  tags_translations_aggregated: Array<tags_translations_aggregated>
  tags_translations_by_id?: Maybe<tags_translations>
  testimonials: Array<testimonials>
  testimonials_aggregated: Array<testimonials_aggregated>
  testimonials_by_id?: Maybe<testimonials>
  testimonials_translations: Array<testimonials_translations>
  testimonials_translations_aggregated: Array<testimonials_translations_aggregated>
  testimonials_translations_by_id?: Maybe<testimonials_translations>
}

export type QueryarticlesArgs = {
  filter?: InputMaybe<articles_filter>
  limit?: InputMaybe<Scalars["Int"]>
  offset?: InputMaybe<Scalars["Int"]>
  page?: InputMaybe<Scalars["Int"]>
  search?: InputMaybe<Scalars["String"]>
  sort?: InputMaybe<Array<InputMaybe<Scalars["String"]>>>
}

export type Queryarticles_aggregatedArgs = {
  filter?: InputMaybe<articles_filter>
  groupBy?: InputMaybe<Array<InputMaybe<Scalars["String"]>>>
  limit?: InputMaybe<Scalars["Int"]>
  offset?: InputMaybe<Scalars["Int"]>
  page?: InputMaybe<Scalars["Int"]>
  search?: InputMaybe<Scalars["String"]>
  sort?: InputMaybe<Array<InputMaybe<Scalars["String"]>>>
}

export type Queryarticles_by_idArgs = {
  id: Scalars["ID"]
}

export type Queryarticles_tagsArgs = {
  filter?: InputMaybe<articles_tags_filter>
  limit?: InputMaybe<Scalars["Int"]>
  offset?: InputMaybe<Scalars["Int"]>
  page?: InputMaybe<Scalars["Int"]>
  search?: InputMaybe<Scalars["String"]>
  sort?: InputMaybe<Array<InputMaybe<Scalars["String"]>>>
}

export type Queryarticles_tags_aggregatedArgs = {
  filter?: InputMaybe<articles_tags_filter>
  groupBy?: InputMaybe<Array<InputMaybe<Scalars["String"]>>>
  limit?: InputMaybe<Scalars["Int"]>
  offset?: InputMaybe<Scalars["Int"]>
  page?: InputMaybe<Scalars["Int"]>
  search?: InputMaybe<Scalars["String"]>
  sort?: InputMaybe<Array<InputMaybe<Scalars["String"]>>>
}

export type Queryarticles_tags_by_idArgs = {
  id: Scalars["ID"]
}

export type Queryarticles_translationsArgs = {
  filter?: InputMaybe<articles_translations_filter>
  limit?: InputMaybe<Scalars["Int"]>
  offset?: InputMaybe<Scalars["Int"]>
  page?: InputMaybe<Scalars["Int"]>
  search?: InputMaybe<Scalars["String"]>
  sort?: InputMaybe<Array<InputMaybe<Scalars["String"]>>>
}

export type Queryarticles_translations_aggregatedArgs = {
  filter?: InputMaybe<articles_translations_filter>
  groupBy?: InputMaybe<Array<InputMaybe<Scalars["String"]>>>
  limit?: InputMaybe<Scalars["Int"]>
  offset?: InputMaybe<Scalars["Int"]>
  page?: InputMaybe<Scalars["Int"]>
  search?: InputMaybe<Scalars["String"]>
  sort?: InputMaybe<Array<InputMaybe<Scalars["String"]>>>
}

export type Queryarticles_translations_by_idArgs = {
  id: Scalars["ID"]
}

export type QuerycomparisonArgs = {
  filter?: InputMaybe<comparison_filter>
  limit?: InputMaybe<Scalars["Int"]>
  offset?: InputMaybe<Scalars["Int"]>
  page?: InputMaybe<Scalars["Int"]>
  search?: InputMaybe<Scalars["String"]>
  sort?: InputMaybe<Array<InputMaybe<Scalars["String"]>>>
}

export type Querycomparison_aggregatedArgs = {
  filter?: InputMaybe<comparison_filter>
  groupBy?: InputMaybe<Array<InputMaybe<Scalars["String"]>>>
  limit?: InputMaybe<Scalars["Int"]>
  offset?: InputMaybe<Scalars["Int"]>
  page?: InputMaybe<Scalars["Int"]>
  search?: InputMaybe<Scalars["String"]>
  sort?: InputMaybe<Array<InputMaybe<Scalars["String"]>>>
}

export type Querycomparison_by_idArgs = {
  id: Scalars["ID"]
}

export type Querycontact_sales_formsArgs = {
  filter?: InputMaybe<contact_sales_forms_filter>
  limit?: InputMaybe<Scalars["Int"]>
  offset?: InputMaybe<Scalars["Int"]>
  page?: InputMaybe<Scalars["Int"]>
  search?: InputMaybe<Scalars["String"]>
  sort?: InputMaybe<Array<InputMaybe<Scalars["String"]>>>
}

export type Querycontact_sales_forms_aggregatedArgs = {
  filter?: InputMaybe<contact_sales_forms_filter>
  groupBy?: InputMaybe<Array<InputMaybe<Scalars["String"]>>>
  limit?: InputMaybe<Scalars["Int"]>
  offset?: InputMaybe<Scalars["Int"]>
  page?: InputMaybe<Scalars["Int"]>
  search?: InputMaybe<Scalars["String"]>
  sort?: InputMaybe<Array<InputMaybe<Scalars["String"]>>>
}

export type Querycontact_sales_forms_by_idArgs = {
  id: Scalars["ID"]
}

export type QuerydictionaryArgs = {
  filter?: InputMaybe<dictionary_filter>
  limit?: InputMaybe<Scalars["Int"]>
  offset?: InputMaybe<Scalars["Int"]>
  page?: InputMaybe<Scalars["Int"]>
  search?: InputMaybe<Scalars["String"]>
  sort?: InputMaybe<Array<InputMaybe<Scalars["String"]>>>
}

export type Querydictionary_aggregatedArgs = {
  filter?: InputMaybe<dictionary_filter>
  groupBy?: InputMaybe<Array<InputMaybe<Scalars["String"]>>>
  limit?: InputMaybe<Scalars["Int"]>
  offset?: InputMaybe<Scalars["Int"]>
  page?: InputMaybe<Scalars["Int"]>
  search?: InputMaybe<Scalars["String"]>
  sort?: InputMaybe<Array<InputMaybe<Scalars["String"]>>>
}

export type Querydictionary_by_idArgs = {
  id: Scalars["ID"]
}

export type Querydictionary_translationsArgs = {
  filter?: InputMaybe<dictionary_translations_filter>
  limit?: InputMaybe<Scalars["Int"]>
  offset?: InputMaybe<Scalars["Int"]>
  page?: InputMaybe<Scalars["Int"]>
  search?: InputMaybe<Scalars["String"]>
  sort?: InputMaybe<Array<InputMaybe<Scalars["String"]>>>
}

export type Querydictionary_translations_aggregatedArgs = {
  filter?: InputMaybe<dictionary_translations_filter>
  groupBy?: InputMaybe<Array<InputMaybe<Scalars["String"]>>>
  limit?: InputMaybe<Scalars["Int"]>
  offset?: InputMaybe<Scalars["Int"]>
  page?: InputMaybe<Scalars["Int"]>
  search?: InputMaybe<Scalars["String"]>
  sort?: InputMaybe<Array<InputMaybe<Scalars["String"]>>>
}

export type Querydictionary_translations_by_idArgs = {
  id: Scalars["ID"]
}

export type QuerydocumentationArgs = {
  filter?: InputMaybe<documentation_filter>
  limit?: InputMaybe<Scalars["Int"]>
  offset?: InputMaybe<Scalars["Int"]>
  page?: InputMaybe<Scalars["Int"]>
  search?: InputMaybe<Scalars["String"]>
  sort?: InputMaybe<Array<InputMaybe<Scalars["String"]>>>
}

export type Querydocumentation_aggregatedArgs = {
  filter?: InputMaybe<documentation_filter>
  groupBy?: InputMaybe<Array<InputMaybe<Scalars["String"]>>>
  limit?: InputMaybe<Scalars["Int"]>
  offset?: InputMaybe<Scalars["Int"]>
  page?: InputMaybe<Scalars["Int"]>
  search?: InputMaybe<Scalars["String"]>
  sort?: InputMaybe<Array<InputMaybe<Scalars["String"]>>>
}

export type Querydocumentation_by_idArgs = {
  id: Scalars["ID"]
}

export type Querydocumentation_tagsArgs = {
  filter?: InputMaybe<documentation_tags_filter>
  limit?: InputMaybe<Scalars["Int"]>
  offset?: InputMaybe<Scalars["Int"]>
  page?: InputMaybe<Scalars["Int"]>
  search?: InputMaybe<Scalars["String"]>
  sort?: InputMaybe<Array<InputMaybe<Scalars["String"]>>>
}

export type Querydocumentation_tags_aggregatedArgs = {
  filter?: InputMaybe<documentation_tags_filter>
  groupBy?: InputMaybe<Array<InputMaybe<Scalars["String"]>>>
  limit?: InputMaybe<Scalars["Int"]>
  offset?: InputMaybe<Scalars["Int"]>
  page?: InputMaybe<Scalars["Int"]>
  search?: InputMaybe<Scalars["String"]>
  sort?: InputMaybe<Array<InputMaybe<Scalars["String"]>>>
}

export type Querydocumentation_tags_by_idArgs = {
  id: Scalars["ID"]
}

export type Querydocumentation_translationsArgs = {
  filter?: InputMaybe<documentation_translations_filter>
  limit?: InputMaybe<Scalars["Int"]>
  offset?: InputMaybe<Scalars["Int"]>
  page?: InputMaybe<Scalars["Int"]>
  search?: InputMaybe<Scalars["String"]>
  sort?: InputMaybe<Array<InputMaybe<Scalars["String"]>>>
}

export type Querydocumentation_translations_aggregatedArgs = {
  filter?: InputMaybe<documentation_translations_filter>
  groupBy?: InputMaybe<Array<InputMaybe<Scalars["String"]>>>
  limit?: InputMaybe<Scalars["Int"]>
  offset?: InputMaybe<Scalars["Int"]>
  page?: InputMaybe<Scalars["Int"]>
  search?: InputMaybe<Scalars["String"]>
  sort?: InputMaybe<Array<InputMaybe<Scalars["String"]>>>
}

export type Querydocumentation_translations_by_idArgs = {
  id: Scalars["ID"]
}

export type QueryecosystemArgs = {
  filter?: InputMaybe<ecosystem_filter>
  limit?: InputMaybe<Scalars["Int"]>
  offset?: InputMaybe<Scalars["Int"]>
  page?: InputMaybe<Scalars["Int"]>
  search?: InputMaybe<Scalars["String"]>
  sort?: InputMaybe<Array<InputMaybe<Scalars["String"]>>>
}

export type Queryecosystem_aggregatedArgs = {
  filter?: InputMaybe<ecosystem_filter>
  groupBy?: InputMaybe<Array<InputMaybe<Scalars["String"]>>>
  limit?: InputMaybe<Scalars["Int"]>
  offset?: InputMaybe<Scalars["Int"]>
  page?: InputMaybe<Scalars["Int"]>
  search?: InputMaybe<Scalars["String"]>
  sort?: InputMaybe<Array<InputMaybe<Scalars["String"]>>>
}

export type Queryecosystem_by_idArgs = {
  id: Scalars["ID"]
}

export type Queryecosystem_filesArgs = {
  filter?: InputMaybe<ecosystem_files_filter>
  limit?: InputMaybe<Scalars["Int"]>
  offset?: InputMaybe<Scalars["Int"]>
  page?: InputMaybe<Scalars["Int"]>
  search?: InputMaybe<Scalars["String"]>
  sort?: InputMaybe<Array<InputMaybe<Scalars["String"]>>>
}

export type Queryecosystem_files_aggregatedArgs = {
  filter?: InputMaybe<ecosystem_files_filter>
  groupBy?: InputMaybe<Array<InputMaybe<Scalars["String"]>>>
  limit?: InputMaybe<Scalars["Int"]>
  offset?: InputMaybe<Scalars["Int"]>
  page?: InputMaybe<Scalars["Int"]>
  search?: InputMaybe<Scalars["String"]>
  sort?: InputMaybe<Array<InputMaybe<Scalars["String"]>>>
}

export type Queryecosystem_files_by_idArgs = {
  id: Scalars["ID"]
}

export type Queryecosystem_tagsArgs = {
  filter?: InputMaybe<ecosystem_tags_filter>
  limit?: InputMaybe<Scalars["Int"]>
  offset?: InputMaybe<Scalars["Int"]>
  page?: InputMaybe<Scalars["Int"]>
  search?: InputMaybe<Scalars["String"]>
  sort?: InputMaybe<Array<InputMaybe<Scalars["String"]>>>
}

export type Queryecosystem_tags_aggregatedArgs = {
  filter?: InputMaybe<ecosystem_tags_filter>
  groupBy?: InputMaybe<Array<InputMaybe<Scalars["String"]>>>
  limit?: InputMaybe<Scalars["Int"]>
  offset?: InputMaybe<Scalars["Int"]>
  page?: InputMaybe<Scalars["Int"]>
  search?: InputMaybe<Scalars["String"]>
  sort?: InputMaybe<Array<InputMaybe<Scalars["String"]>>>
}

export type Queryecosystem_tags_by_idArgs = {
  id: Scalars["ID"]
}

export type Queryecosystem_translationsArgs = {
  filter?: InputMaybe<ecosystem_translations_filter>
  limit?: InputMaybe<Scalars["Int"]>
  offset?: InputMaybe<Scalars["Int"]>
  page?: InputMaybe<Scalars["Int"]>
  search?: InputMaybe<Scalars["String"]>
  sort?: InputMaybe<Array<InputMaybe<Scalars["String"]>>>
}

export type Queryecosystem_translations_aggregatedArgs = {
  filter?: InputMaybe<ecosystem_translations_filter>
  groupBy?: InputMaybe<Array<InputMaybe<Scalars["String"]>>>
  limit?: InputMaybe<Scalars["Int"]>
  offset?: InputMaybe<Scalars["Int"]>
  page?: InputMaybe<Scalars["Int"]>
  search?: InputMaybe<Scalars["String"]>
  sort?: InputMaybe<Array<InputMaybe<Scalars["String"]>>>
}

export type Queryecosystem_translations_by_idArgs = {
  id: Scalars["ID"]
}

export type QueryflagsArgs = {
  filter?: InputMaybe<flags_filter>
  limit?: InputMaybe<Scalars["Int"]>
  offset?: InputMaybe<Scalars["Int"]>
  page?: InputMaybe<Scalars["Int"]>
  search?: InputMaybe<Scalars["String"]>
  sort?: InputMaybe<Array<InputMaybe<Scalars["String"]>>>
}

export type Queryflags_aggregatedArgs = {
  filter?: InputMaybe<flags_filter>
  groupBy?: InputMaybe<Array<InputMaybe<Scalars["String"]>>>
  limit?: InputMaybe<Scalars["Int"]>
  offset?: InputMaybe<Scalars["Int"]>
  page?: InputMaybe<Scalars["Int"]>
  search?: InputMaybe<Scalars["String"]>
  sort?: InputMaybe<Array<InputMaybe<Scalars["String"]>>>
}

export type Queryflags_by_idArgs = {
  id: Scalars["ID"]
}

export type QuerylegalArgs = {
  filter?: InputMaybe<legal_filter>
  limit?: InputMaybe<Scalars["Int"]>
  offset?: InputMaybe<Scalars["Int"]>
  page?: InputMaybe<Scalars["Int"]>
  search?: InputMaybe<Scalars["String"]>
  sort?: InputMaybe<Array<InputMaybe<Scalars["String"]>>>
}

export type Querylegal_aggregatedArgs = {
  filter?: InputMaybe<legal_filter>
  groupBy?: InputMaybe<Array<InputMaybe<Scalars["String"]>>>
  limit?: InputMaybe<Scalars["Int"]>
  offset?: InputMaybe<Scalars["Int"]>
  page?: InputMaybe<Scalars["Int"]>
  search?: InputMaybe<Scalars["String"]>
  sort?: InputMaybe<Array<InputMaybe<Scalars["String"]>>>
}

export type Querylegal_by_idArgs = {
  id: Scalars["ID"]
}

export type Querylegal_translationsArgs = {
  filter?: InputMaybe<legal_translations_filter>
  limit?: InputMaybe<Scalars["Int"]>
  offset?: InputMaybe<Scalars["Int"]>
  page?: InputMaybe<Scalars["Int"]>
  search?: InputMaybe<Scalars["String"]>
  sort?: InputMaybe<Array<InputMaybe<Scalars["String"]>>>
}

export type Querylegal_translations_aggregatedArgs = {
  filter?: InputMaybe<legal_translations_filter>
  groupBy?: InputMaybe<Array<InputMaybe<Scalars["String"]>>>
  limit?: InputMaybe<Scalars["Int"]>
  offset?: InputMaybe<Scalars["Int"]>
  page?: InputMaybe<Scalars["Int"]>
  search?: InputMaybe<Scalars["String"]>
  sort?: InputMaybe<Array<InputMaybe<Scalars["String"]>>>
}

export type Querylegal_translations_by_idArgs = {
  id: Scalars["ID"]
}

export type QuerypersonasArgs = {
  filter?: InputMaybe<personas_filter>
  limit?: InputMaybe<Scalars["Int"]>
  offset?: InputMaybe<Scalars["Int"]>
  page?: InputMaybe<Scalars["Int"]>
  search?: InputMaybe<Scalars["String"]>
  sort?: InputMaybe<Array<InputMaybe<Scalars["String"]>>>
}

export type Querypersonas_aggregatedArgs = {
  filter?: InputMaybe<personas_filter>
  groupBy?: InputMaybe<Array<InputMaybe<Scalars["String"]>>>
  limit?: InputMaybe<Scalars["Int"]>
  offset?: InputMaybe<Scalars["Int"]>
  page?: InputMaybe<Scalars["Int"]>
  search?: InputMaybe<Scalars["String"]>
  sort?: InputMaybe<Array<InputMaybe<Scalars["String"]>>>
}

export type Querypersonas_by_idArgs = {
  id: Scalars["ID"]
}

export type QueryplansArgs = {
  filter?: InputMaybe<plans_filter>
  limit?: InputMaybe<Scalars["Int"]>
  offset?: InputMaybe<Scalars["Int"]>
  page?: InputMaybe<Scalars["Int"]>
  search?: InputMaybe<Scalars["String"]>
  sort?: InputMaybe<Array<InputMaybe<Scalars["String"]>>>
}

export type Queryplans_aggregatedArgs = {
  filter?: InputMaybe<plans_filter>
  groupBy?: InputMaybe<Array<InputMaybe<Scalars["String"]>>>
  limit?: InputMaybe<Scalars["Int"]>
  offset?: InputMaybe<Scalars["Int"]>
  page?: InputMaybe<Scalars["Int"]>
  search?: InputMaybe<Scalars["String"]>
  sort?: InputMaybe<Array<InputMaybe<Scalars["String"]>>>
}

export type Queryplans_by_idArgs = {
  id: Scalars["ID"]
}

export type Queryplans_translationsArgs = {
  filter?: InputMaybe<plans_translations_filter>
  limit?: InputMaybe<Scalars["Int"]>
  offset?: InputMaybe<Scalars["Int"]>
  page?: InputMaybe<Scalars["Int"]>
  search?: InputMaybe<Scalars["String"]>
  sort?: InputMaybe<Array<InputMaybe<Scalars["String"]>>>
}

export type Queryplans_translations_aggregatedArgs = {
  filter?: InputMaybe<plans_translations_filter>
  groupBy?: InputMaybe<Array<InputMaybe<Scalars["String"]>>>
  limit?: InputMaybe<Scalars["Int"]>
  offset?: InputMaybe<Scalars["Int"]>
  page?: InputMaybe<Scalars["Int"]>
  search?: InputMaybe<Scalars["String"]>
  sort?: InputMaybe<Array<InputMaybe<Scalars["String"]>>>
}

export type Queryplans_translations_by_idArgs = {
  id: Scalars["ID"]
}

export type QueryquestionsArgs = {
  filter?: InputMaybe<questions_filter>
  limit?: InputMaybe<Scalars["Int"]>
  offset?: InputMaybe<Scalars["Int"]>
  page?: InputMaybe<Scalars["Int"]>
  search?: InputMaybe<Scalars["String"]>
  sort?: InputMaybe<Array<InputMaybe<Scalars["String"]>>>
}

export type Queryquestions_aggregatedArgs = {
  filter?: InputMaybe<questions_filter>
  groupBy?: InputMaybe<Array<InputMaybe<Scalars["String"]>>>
  limit?: InputMaybe<Scalars["Int"]>
  offset?: InputMaybe<Scalars["Int"]>
  page?: InputMaybe<Scalars["Int"]>
  search?: InputMaybe<Scalars["String"]>
  sort?: InputMaybe<Array<InputMaybe<Scalars["String"]>>>
}

export type Queryquestions_by_idArgs = {
  id: Scalars["ID"]
}

export type Queryquestions_tagsArgs = {
  filter?: InputMaybe<questions_tags_filter>
  limit?: InputMaybe<Scalars["Int"]>
  offset?: InputMaybe<Scalars["Int"]>
  page?: InputMaybe<Scalars["Int"]>
  search?: InputMaybe<Scalars["String"]>
  sort?: InputMaybe<Array<InputMaybe<Scalars["String"]>>>
}

export type Queryquestions_tags_aggregatedArgs = {
  filter?: InputMaybe<questions_tags_filter>
  groupBy?: InputMaybe<Array<InputMaybe<Scalars["String"]>>>
  limit?: InputMaybe<Scalars["Int"]>
  offset?: InputMaybe<Scalars["Int"]>
  page?: InputMaybe<Scalars["Int"]>
  search?: InputMaybe<Scalars["String"]>
  sort?: InputMaybe<Array<InputMaybe<Scalars["String"]>>>
}

export type Queryquestions_tags_by_idArgs = {
  id: Scalars["ID"]
}

export type Queryquestions_translationsArgs = {
  filter?: InputMaybe<questions_translations_filter>
  limit?: InputMaybe<Scalars["Int"]>
  offset?: InputMaybe<Scalars["Int"]>
  page?: InputMaybe<Scalars["Int"]>
  search?: InputMaybe<Scalars["String"]>
  sort?: InputMaybe<Array<InputMaybe<Scalars["String"]>>>
}

export type Queryquestions_translations_aggregatedArgs = {
  filter?: InputMaybe<questions_translations_filter>
  groupBy?: InputMaybe<Array<InputMaybe<Scalars["String"]>>>
  limit?: InputMaybe<Scalars["Int"]>
  offset?: InputMaybe<Scalars["Int"]>
  page?: InputMaybe<Scalars["Int"]>
  search?: InputMaybe<Scalars["String"]>
  sort?: InputMaybe<Array<InputMaybe<Scalars["String"]>>>
}

export type Queryquestions_translations_by_idArgs = {
  id: Scalars["ID"]
}

export type QueryreviewsArgs = {
  filter?: InputMaybe<reviews_filter>
  limit?: InputMaybe<Scalars["Int"]>
  offset?: InputMaybe<Scalars["Int"]>
  page?: InputMaybe<Scalars["Int"]>
  search?: InputMaybe<Scalars["String"]>
  sort?: InputMaybe<Array<InputMaybe<Scalars["String"]>>>
}

export type Queryreviews_aggregatedArgs = {
  filter?: InputMaybe<reviews_filter>
  groupBy?: InputMaybe<Array<InputMaybe<Scalars["String"]>>>
  limit?: InputMaybe<Scalars["Int"]>
  offset?: InputMaybe<Scalars["Int"]>
  page?: InputMaybe<Scalars["Int"]>
  search?: InputMaybe<Scalars["String"]>
  sort?: InputMaybe<Array<InputMaybe<Scalars["String"]>>>
}

export type Queryreviews_by_idArgs = {
  id: Scalars["ID"]
}

export type QuerytagsArgs = {
  filter?: InputMaybe<tags_filter>
  limit?: InputMaybe<Scalars["Int"]>
  offset?: InputMaybe<Scalars["Int"]>
  page?: InputMaybe<Scalars["Int"]>
  search?: InputMaybe<Scalars["String"]>
  sort?: InputMaybe<Array<InputMaybe<Scalars["String"]>>>
}

export type Querytags_aggregatedArgs = {
  filter?: InputMaybe<tags_filter>
  groupBy?: InputMaybe<Array<InputMaybe<Scalars["String"]>>>
  limit?: InputMaybe<Scalars["Int"]>
  offset?: InputMaybe<Scalars["Int"]>
  page?: InputMaybe<Scalars["Int"]>
  search?: InputMaybe<Scalars["String"]>
  sort?: InputMaybe<Array<InputMaybe<Scalars["String"]>>>
}

export type Querytags_by_idArgs = {
  id: Scalars["ID"]
}

export type Querytags_translationsArgs = {
  filter?: InputMaybe<tags_translations_filter>
  limit?: InputMaybe<Scalars["Int"]>
  offset?: InputMaybe<Scalars["Int"]>
  page?: InputMaybe<Scalars["Int"]>
  search?: InputMaybe<Scalars["String"]>
  sort?: InputMaybe<Array<InputMaybe<Scalars["String"]>>>
}

export type Querytags_translations_aggregatedArgs = {
  filter?: InputMaybe<tags_translations_filter>
  groupBy?: InputMaybe<Array<InputMaybe<Scalars["String"]>>>
  limit?: InputMaybe<Scalars["Int"]>
  offset?: InputMaybe<Scalars["Int"]>
  page?: InputMaybe<Scalars["Int"]>
  search?: InputMaybe<Scalars["String"]>
  sort?: InputMaybe<Array<InputMaybe<Scalars["String"]>>>
}

export type Querytags_translations_by_idArgs = {
  id: Scalars["ID"]
}

export type QuerytestimonialsArgs = {
  filter?: InputMaybe<testimonials_filter>
  limit?: InputMaybe<Scalars["Int"]>
  offset?: InputMaybe<Scalars["Int"]>
  page?: InputMaybe<Scalars["Int"]>
  search?: InputMaybe<Scalars["String"]>
  sort?: InputMaybe<Array<InputMaybe<Scalars["String"]>>>
}

export type Querytestimonials_aggregatedArgs = {
  filter?: InputMaybe<testimonials_filter>
  groupBy?: InputMaybe<Array<InputMaybe<Scalars["String"]>>>
  limit?: InputMaybe<Scalars["Int"]>
  offset?: InputMaybe<Scalars["Int"]>
  page?: InputMaybe<Scalars["Int"]>
  search?: InputMaybe<Scalars["String"]>
  sort?: InputMaybe<Array<InputMaybe<Scalars["String"]>>>
}

export type Querytestimonials_by_idArgs = {
  id: Scalars["ID"]
}

export type Querytestimonials_translationsArgs = {
  filter?: InputMaybe<testimonials_translations_filter>
  limit?: InputMaybe<Scalars["Int"]>
  offset?: InputMaybe<Scalars["Int"]>
  page?: InputMaybe<Scalars["Int"]>
  search?: InputMaybe<Scalars["String"]>
  sort?: InputMaybe<Array<InputMaybe<Scalars["String"]>>>
}

export type Querytestimonials_translations_aggregatedArgs = {
  filter?: InputMaybe<testimonials_translations_filter>
  groupBy?: InputMaybe<Array<InputMaybe<Scalars["String"]>>>
  limit?: InputMaybe<Scalars["Int"]>
  offset?: InputMaybe<Scalars["Int"]>
  page?: InputMaybe<Scalars["Int"]>
  search?: InputMaybe<Scalars["String"]>
  sort?: InputMaybe<Array<InputMaybe<Scalars["String"]>>>
}

export type Querytestimonials_translations_by_idArgs = {
  id: Scalars["ID"]
}

export type articles = {
  __typename?: "articles"
  author?: Maybe<directus_users>
  date_created?: Maybe<Scalars["Date"]>
  date_created_func?: Maybe<datetime_functions>
  date_updated?: Maybe<Scalars["Date"]>
  date_updated_func?: Maybe<datetime_functions>
  id: Scalars["ID"]
  image?: Maybe<directus_files>
  publish_date?: Maybe<Scalars["Date"]>
  publish_date_func?: Maybe<datetime_functions>
  slug?: Maybe<Scalars["String"]>
  sort?: Maybe<Scalars["Int"]>
  status?: Maybe<Scalars["String"]>
  tags?: Maybe<Array<Maybe<articles_tags>>>
  tags_func?: Maybe<count_functions>
  translations?: Maybe<Array<Maybe<articles_translations>>>
  translations_func?: Maybe<count_functions>
  user_created?: Maybe<directus_users>
  user_updated?: Maybe<directus_users>
}

export type articlesauthorArgs = {
  filter?: InputMaybe<directus_users_filter>
  limit?: InputMaybe<Scalars["Int"]>
  offset?: InputMaybe<Scalars["Int"]>
  page?: InputMaybe<Scalars["Int"]>
  search?: InputMaybe<Scalars["String"]>
  sort?: InputMaybe<Array<InputMaybe<Scalars["String"]>>>
}

export type articlesimageArgs = {
  filter?: InputMaybe<directus_files_filter>
  limit?: InputMaybe<Scalars["Int"]>
  offset?: InputMaybe<Scalars["Int"]>
  page?: InputMaybe<Scalars["Int"]>
  search?: InputMaybe<Scalars["String"]>
  sort?: InputMaybe<Array<InputMaybe<Scalars["String"]>>>
}

export type articlestagsArgs = {
  filter?: InputMaybe<articles_tags_filter>
  limit?: InputMaybe<Scalars["Int"]>
  offset?: InputMaybe<Scalars["Int"]>
  page?: InputMaybe<Scalars["Int"]>
  search?: InputMaybe<Scalars["String"]>
  sort?: InputMaybe<Array<InputMaybe<Scalars["String"]>>>
}

export type articlestranslationsArgs = {
  filter?: InputMaybe<articles_translations_filter>
  limit?: InputMaybe<Scalars["Int"]>
  offset?: InputMaybe<Scalars["Int"]>
  page?: InputMaybe<Scalars["Int"]>
  search?: InputMaybe<Scalars["String"]>
  sort?: InputMaybe<Array<InputMaybe<Scalars["String"]>>>
}

export type articlesuser_createdArgs = {
  filter?: InputMaybe<directus_users_filter>
  limit?: InputMaybe<Scalars["Int"]>
  offset?: InputMaybe<Scalars["Int"]>
  page?: InputMaybe<Scalars["Int"]>
  search?: InputMaybe<Scalars["String"]>
  sort?: InputMaybe<Array<InputMaybe<Scalars["String"]>>>
}

export type articlesuser_updatedArgs = {
  filter?: InputMaybe<directus_users_filter>
  limit?: InputMaybe<Scalars["Int"]>
  offset?: InputMaybe<Scalars["Int"]>
  page?: InputMaybe<Scalars["Int"]>
  search?: InputMaybe<Scalars["String"]>
  sort?: InputMaybe<Array<InputMaybe<Scalars["String"]>>>
}

export type articles_aggregated = {
  __typename?: "articles_aggregated"
  avg?: Maybe<articles_aggregated_fields>
  avgDistinct?: Maybe<articles_aggregated_fields>
  count?: Maybe<articles_aggregated_count>
  countAll?: Maybe<Scalars["Int"]>
  countDistinct?: Maybe<articles_aggregated_count>
  group?: Maybe<Scalars["JSON"]>
  max?: Maybe<articles_aggregated_fields>
  min?: Maybe<articles_aggregated_fields>
  sum?: Maybe<articles_aggregated_fields>
  sumDistinct?: Maybe<articles_aggregated_fields>
}

export type articles_aggregated_count = {
  __typename?: "articles_aggregated_count"
  author?: Maybe<Scalars["Int"]>
  date_created?: Maybe<Scalars["Int"]>
  date_updated?: Maybe<Scalars["Int"]>
  id?: Maybe<Scalars["Int"]>
  image?: Maybe<Scalars["Int"]>
  publish_date?: Maybe<Scalars["Int"]>
  slug?: Maybe<Scalars["Int"]>
  sort?: Maybe<Scalars["Int"]>
  status?: Maybe<Scalars["Int"]>
  tags?: Maybe<Scalars["Int"]>
  translations?: Maybe<Scalars["Int"]>
  user_created?: Maybe<Scalars["Int"]>
  user_updated?: Maybe<Scalars["Int"]>
}

export type articles_aggregated_fields = {
  __typename?: "articles_aggregated_fields"
  id?: Maybe<Scalars["Float"]>
  sort?: Maybe<Scalars["Float"]>
}

export type articles_filter = {
  _and?: InputMaybe<Array<InputMaybe<articles_filter>>>
  _or?: InputMaybe<Array<InputMaybe<articles_filter>>>
  author?: InputMaybe<directus_users_filter>
  date_created?: InputMaybe<date_filter_operators>
  date_created_func?: InputMaybe<datetime_function_filter_operators>
  date_updated?: InputMaybe<date_filter_operators>
  date_updated_func?: InputMaybe<datetime_function_filter_operators>
  id?: InputMaybe<number_filter_operators>
  image?: InputMaybe<directus_files_filter>
  publish_date?: InputMaybe<date_filter_operators>
  publish_date_func?: InputMaybe<datetime_function_filter_operators>
  slug?: InputMaybe<string_filter_operators>
  sort?: InputMaybe<number_filter_operators>
  status?: InputMaybe<string_filter_operators>
  tags?: InputMaybe<articles_tags_filter>
  tags_func?: InputMaybe<count_function_filter_operators>
  translations?: InputMaybe<articles_translations_filter>
  translations_func?: InputMaybe<count_function_filter_operators>
  user_created?: InputMaybe<directus_users_filter>
  user_updated?: InputMaybe<directus_users_filter>
}

export type articles_tags = {
  __typename?: "articles_tags"
  articles_id?: Maybe<articles>
  id: Scalars["ID"]
  tags_id?: Maybe<tags>
}

export type articles_tagsarticles_idArgs = {
  filter?: InputMaybe<articles_filter>
  limit?: InputMaybe<Scalars["Int"]>
  offset?: InputMaybe<Scalars["Int"]>
  page?: InputMaybe<Scalars["Int"]>
  search?: InputMaybe<Scalars["String"]>
  sort?: InputMaybe<Array<InputMaybe<Scalars["String"]>>>
}

export type articles_tagstags_idArgs = {
  filter?: InputMaybe<tags_filter>
  limit?: InputMaybe<Scalars["Int"]>
  offset?: InputMaybe<Scalars["Int"]>
  page?: InputMaybe<Scalars["Int"]>
  search?: InputMaybe<Scalars["String"]>
  sort?: InputMaybe<Array<InputMaybe<Scalars["String"]>>>
}

export type articles_tags_aggregated = {
  __typename?: "articles_tags_aggregated"
  avg?: Maybe<articles_tags_aggregated_fields>
  avgDistinct?: Maybe<articles_tags_aggregated_fields>
  count?: Maybe<articles_tags_aggregated_count>
  countAll?: Maybe<Scalars["Int"]>
  countDistinct?: Maybe<articles_tags_aggregated_count>
  group?: Maybe<Scalars["JSON"]>
  max?: Maybe<articles_tags_aggregated_fields>
  min?: Maybe<articles_tags_aggregated_fields>
  sum?: Maybe<articles_tags_aggregated_fields>
  sumDistinct?: Maybe<articles_tags_aggregated_fields>
}

export type articles_tags_aggregated_count = {
  __typename?: "articles_tags_aggregated_count"
  articles_id?: Maybe<Scalars["Int"]>
  id?: Maybe<Scalars["Int"]>
  tags_id?: Maybe<Scalars["Int"]>
}

export type articles_tags_aggregated_fields = {
  __typename?: "articles_tags_aggregated_fields"
  articles_id?: Maybe<Scalars["Float"]>
  id?: Maybe<Scalars["Float"]>
  tags_id?: Maybe<Scalars["Float"]>
}

export type articles_tags_filter = {
  _and?: InputMaybe<Array<InputMaybe<articles_tags_filter>>>
  _or?: InputMaybe<Array<InputMaybe<articles_tags_filter>>>
  articles_id?: InputMaybe<articles_filter>
  id?: InputMaybe<number_filter_operators>
  tags_id?: InputMaybe<tags_filter>
}

export type articles_translations = {
  __typename?: "articles_translations"
  articles_id?: Maybe<articles>
  body?: Maybe<Scalars["String"]>
  id: Scalars["ID"]
  languages_code?: Maybe<Scalars["String"]>
  summary?: Maybe<Scalars["String"]>
  title?: Maybe<Scalars["String"]>
}

export type articles_translationsarticles_idArgs = {
  filter?: InputMaybe<articles_filter>
  limit?: InputMaybe<Scalars["Int"]>
  offset?: InputMaybe<Scalars["Int"]>
  page?: InputMaybe<Scalars["Int"]>
  search?: InputMaybe<Scalars["String"]>
  sort?: InputMaybe<Array<InputMaybe<Scalars["String"]>>>
}

export type articles_translations_aggregated = {
  __typename?: "articles_translations_aggregated"
  avg?: Maybe<articles_translations_aggregated_fields>
  avgDistinct?: Maybe<articles_translations_aggregated_fields>
  count?: Maybe<articles_translations_aggregated_count>
  countAll?: Maybe<Scalars["Int"]>
  countDistinct?: Maybe<articles_translations_aggregated_count>
  group?: Maybe<Scalars["JSON"]>
  max?: Maybe<articles_translations_aggregated_fields>
  min?: Maybe<articles_translations_aggregated_fields>
  sum?: Maybe<articles_translations_aggregated_fields>
  sumDistinct?: Maybe<articles_translations_aggregated_fields>
}

export type articles_translations_aggregated_count = {
  __typename?: "articles_translations_aggregated_count"
  articles_id?: Maybe<Scalars["Int"]>
  body?: Maybe<Scalars["Int"]>
  id?: Maybe<Scalars["Int"]>
  languages_code?: Maybe<Scalars["Int"]>
  summary?: Maybe<Scalars["Int"]>
  title?: Maybe<Scalars["Int"]>
}

export type articles_translations_aggregated_fields = {
  __typename?: "articles_translations_aggregated_fields"
  articles_id?: Maybe<Scalars["Float"]>
  id?: Maybe<Scalars["Float"]>
}

export type articles_translations_filter = {
  _and?: InputMaybe<Array<InputMaybe<articles_translations_filter>>>
  _or?: InputMaybe<Array<InputMaybe<articles_translations_filter>>>
  articles_id?: InputMaybe<articles_filter>
  body?: InputMaybe<string_filter_operators>
  id?: InputMaybe<number_filter_operators>
  languages_code?: InputMaybe<string_filter_operators>
  summary?: InputMaybe<string_filter_operators>
  title?: InputMaybe<string_filter_operators>
}

export type boolean_filter_operators = {
  _eq?: InputMaybe<Scalars["Boolean"]>
  _neq?: InputMaybe<Scalars["Boolean"]>
  _nnull?: InputMaybe<Scalars["Boolean"]>
  _null?: InputMaybe<Scalars["Boolean"]>
}

export type comparison = {
  __typename?: "comparison"
  date_created?: Maybe<Scalars["Date"]>
  date_created_func?: Maybe<datetime_functions>
  date_updated?: Maybe<Scalars["Date"]>
  date_updated_func?: Maybe<datetime_functions>
  id: Scalars["ID"]
  sort?: Maybe<Scalars["Int"]>
  status?: Maybe<Scalars["String"]>
  user_created?: Maybe<directus_users>
  user_updated?: Maybe<directus_users>
}

export type comparisonuser_createdArgs = {
  filter?: InputMaybe<directus_users_filter>
  limit?: InputMaybe<Scalars["Int"]>
  offset?: InputMaybe<Scalars["Int"]>
  page?: InputMaybe<Scalars["Int"]>
  search?: InputMaybe<Scalars["String"]>
  sort?: InputMaybe<Array<InputMaybe<Scalars["String"]>>>
}

export type comparisonuser_updatedArgs = {
  filter?: InputMaybe<directus_users_filter>
  limit?: InputMaybe<Scalars["Int"]>
  offset?: InputMaybe<Scalars["Int"]>
  page?: InputMaybe<Scalars["Int"]>
  search?: InputMaybe<Scalars["String"]>
  sort?: InputMaybe<Array<InputMaybe<Scalars["String"]>>>
}

export type comparison_aggregated = {
  __typename?: "comparison_aggregated"
  avg?: Maybe<comparison_aggregated_fields>
  avgDistinct?: Maybe<comparison_aggregated_fields>
  count?: Maybe<comparison_aggregated_count>
  countAll?: Maybe<Scalars["Int"]>
  countDistinct?: Maybe<comparison_aggregated_count>
  group?: Maybe<Scalars["JSON"]>
  max?: Maybe<comparison_aggregated_fields>
  min?: Maybe<comparison_aggregated_fields>
  sum?: Maybe<comparison_aggregated_fields>
  sumDistinct?: Maybe<comparison_aggregated_fields>
}

export type comparison_aggregated_count = {
  __typename?: "comparison_aggregated_count"
  date_created?: Maybe<Scalars["Int"]>
  date_updated?: Maybe<Scalars["Int"]>
  id?: Maybe<Scalars["Int"]>
  sort?: Maybe<Scalars["Int"]>
  status?: Maybe<Scalars["Int"]>
  user_created?: Maybe<Scalars["Int"]>
  user_updated?: Maybe<Scalars["Int"]>
}

export type comparison_aggregated_fields = {
  __typename?: "comparison_aggregated_fields"
  id?: Maybe<Scalars["Float"]>
  sort?: Maybe<Scalars["Float"]>
}

export type comparison_filter = {
  _and?: InputMaybe<Array<InputMaybe<comparison_filter>>>
  _or?: InputMaybe<Array<InputMaybe<comparison_filter>>>
  date_created?: InputMaybe<date_filter_operators>
  date_created_func?: InputMaybe<datetime_function_filter_operators>
  date_updated?: InputMaybe<date_filter_operators>
  date_updated_func?: InputMaybe<datetime_function_filter_operators>
  id?: InputMaybe<number_filter_operators>
  sort?: InputMaybe<number_filter_operators>
  status?: InputMaybe<string_filter_operators>
  user_created?: InputMaybe<directus_users_filter>
  user_updated?: InputMaybe<directus_users_filter>
}

export type contact_sales_forms = {
  __typename?: "contact_sales_forms"
  date_created?: Maybe<Scalars["Date"]>
  date_created_func?: Maybe<datetime_functions>
  date_updated?: Maybe<Scalars["Date"]>
  date_updated_func?: Maybe<datetime_functions>
  id: Scalars["ID"]
  user_created?: Maybe<directus_users>
  user_updated?: Maybe<directus_users>
}

export type contact_sales_formsuser_createdArgs = {
  filter?: InputMaybe<directus_users_filter>
  limit?: InputMaybe<Scalars["Int"]>
  offset?: InputMaybe<Scalars["Int"]>
  page?: InputMaybe<Scalars["Int"]>
  search?: InputMaybe<Scalars["String"]>
  sort?: InputMaybe<Array<InputMaybe<Scalars["String"]>>>
}

export type contact_sales_formsuser_updatedArgs = {
  filter?: InputMaybe<directus_users_filter>
  limit?: InputMaybe<Scalars["Int"]>
  offset?: InputMaybe<Scalars["Int"]>
  page?: InputMaybe<Scalars["Int"]>
  search?: InputMaybe<Scalars["String"]>
  sort?: InputMaybe<Array<InputMaybe<Scalars["String"]>>>
}

export type contact_sales_forms_aggregated = {
  __typename?: "contact_sales_forms_aggregated"
  avg?: Maybe<contact_sales_forms_aggregated_fields>
  avgDistinct?: Maybe<contact_sales_forms_aggregated_fields>
  count?: Maybe<contact_sales_forms_aggregated_count>
  countAll?: Maybe<Scalars["Int"]>
  countDistinct?: Maybe<contact_sales_forms_aggregated_count>
  group?: Maybe<Scalars["JSON"]>
  max?: Maybe<contact_sales_forms_aggregated_fields>
  min?: Maybe<contact_sales_forms_aggregated_fields>
  sum?: Maybe<contact_sales_forms_aggregated_fields>
  sumDistinct?: Maybe<contact_sales_forms_aggregated_fields>
}

export type contact_sales_forms_aggregated_count = {
  __typename?: "contact_sales_forms_aggregated_count"
  date_created?: Maybe<Scalars["Int"]>
  date_updated?: Maybe<Scalars["Int"]>
  id?: Maybe<Scalars["Int"]>
  user_created?: Maybe<Scalars["Int"]>
  user_updated?: Maybe<Scalars["Int"]>
}

export type contact_sales_forms_aggregated_fields = {
  __typename?: "contact_sales_forms_aggregated_fields"
  id?: Maybe<Scalars["Float"]>
}

export type contact_sales_forms_filter = {
  _and?: InputMaybe<Array<InputMaybe<contact_sales_forms_filter>>>
  _or?: InputMaybe<Array<InputMaybe<contact_sales_forms_filter>>>
  date_created?: InputMaybe<date_filter_operators>
  date_created_func?: InputMaybe<datetime_function_filter_operators>
  date_updated?: InputMaybe<date_filter_operators>
  date_updated_func?: InputMaybe<datetime_function_filter_operators>
  id?: InputMaybe<number_filter_operators>
  user_created?: InputMaybe<directus_users_filter>
  user_updated?: InputMaybe<directus_users_filter>
}

export type count_function_filter_operators = {
  count?: InputMaybe<number_filter_operators>
}

export type count_functions = {
  __typename?: "count_functions"
  count?: Maybe<Scalars["Int"]>
}

export type create_contact_sales_forms_input = {
  date_created?: InputMaybe<Scalars["Date"]>
  date_updated?: InputMaybe<Scalars["Date"]>
  id?: InputMaybe<Scalars["ID"]>
  user_created?: InputMaybe<Scalars["String"]>
  user_updated?: InputMaybe<Scalars["String"]>
}

export type create_feedback_forms_input = {
  date_created?: InputMaybe<Scalars["Date"]>
  date_updated?: InputMaybe<Scalars["Date"]>
  id?: InputMaybe<Scalars["ID"]>
  message?: InputMaybe<Scalars["String"]>
  user?: InputMaybe<Scalars["String"]>
  user_created?: InputMaybe<Scalars["String"]>
  user_updated?: InputMaybe<Scalars["String"]>
}

export type date_filter_operators = {
  _between?: InputMaybe<Array<InputMaybe<Scalars["GraphQLStringOrFloat"]>>>
  _eq?: InputMaybe<Scalars["String"]>
  _gt?: InputMaybe<Scalars["String"]>
  _gte?: InputMaybe<Scalars["String"]>
  _in?: InputMaybe<Array<InputMaybe<Scalars["String"]>>>
  _lt?: InputMaybe<Scalars["String"]>
  _lte?: InputMaybe<Scalars["String"]>
  _nbetween?: InputMaybe<Array<InputMaybe<Scalars["GraphQLStringOrFloat"]>>>
  _neq?: InputMaybe<Scalars["String"]>
  _nin?: InputMaybe<Array<InputMaybe<Scalars["String"]>>>
  _nnull?: InputMaybe<Scalars["Boolean"]>
  _null?: InputMaybe<Scalars["Boolean"]>
}

export type datetime_function_filter_operators = {
  day?: InputMaybe<number_filter_operators>
  hour?: InputMaybe<number_filter_operators>
  minute?: InputMaybe<number_filter_operators>
  month?: InputMaybe<number_filter_operators>
  second?: InputMaybe<number_filter_operators>
  week?: InputMaybe<number_filter_operators>
  weekday?: InputMaybe<number_filter_operators>
  year?: InputMaybe<number_filter_operators>
}

export type datetime_functions = {
  __typename?: "datetime_functions"
  day?: Maybe<Scalars["Int"]>
  hour?: Maybe<Scalars["Int"]>
  minute?: Maybe<Scalars["Int"]>
  month?: Maybe<Scalars["Int"]>
  second?: Maybe<Scalars["Int"]>
  week?: Maybe<Scalars["Int"]>
  weekday?: Maybe<Scalars["Int"]>
  year?: Maybe<Scalars["Int"]>
}

export type dictionary = {
  __typename?: "dictionary"
  date_created?: Maybe<Scalars["Date"]>
  date_created_func?: Maybe<datetime_functions>
  date_updated?: Maybe<Scalars["Date"]>
  date_updated_func?: Maybe<datetime_functions>
  id: Scalars["ID"]
  translations?: Maybe<Array<Maybe<dictionary_translations>>>
  translations_func?: Maybe<count_functions>
  user_created?: Maybe<directus_users>
  user_updated?: Maybe<directus_users>
}

export type dictionarytranslationsArgs = {
  filter?: InputMaybe<dictionary_translations_filter>
  limit?: InputMaybe<Scalars["Int"]>
  offset?: InputMaybe<Scalars["Int"]>
  page?: InputMaybe<Scalars["Int"]>
  search?: InputMaybe<Scalars["String"]>
  sort?: InputMaybe<Array<InputMaybe<Scalars["String"]>>>
}

export type dictionaryuser_createdArgs = {
  filter?: InputMaybe<directus_users_filter>
  limit?: InputMaybe<Scalars["Int"]>
  offset?: InputMaybe<Scalars["Int"]>
  page?: InputMaybe<Scalars["Int"]>
  search?: InputMaybe<Scalars["String"]>
  sort?: InputMaybe<Array<InputMaybe<Scalars["String"]>>>
}

export type dictionaryuser_updatedArgs = {
  filter?: InputMaybe<directus_users_filter>
  limit?: InputMaybe<Scalars["Int"]>
  offset?: InputMaybe<Scalars["Int"]>
  page?: InputMaybe<Scalars["Int"]>
  search?: InputMaybe<Scalars["String"]>
  sort?: InputMaybe<Array<InputMaybe<Scalars["String"]>>>
}

export type dictionary_aggregated = {
  __typename?: "dictionary_aggregated"
  avg?: Maybe<dictionary_aggregated_fields>
  avgDistinct?: Maybe<dictionary_aggregated_fields>
  count?: Maybe<dictionary_aggregated_count>
  countAll?: Maybe<Scalars["Int"]>
  countDistinct?: Maybe<dictionary_aggregated_count>
  group?: Maybe<Scalars["JSON"]>
  max?: Maybe<dictionary_aggregated_fields>
  min?: Maybe<dictionary_aggregated_fields>
  sum?: Maybe<dictionary_aggregated_fields>
  sumDistinct?: Maybe<dictionary_aggregated_fields>
}

export type dictionary_aggregated_count = {
  __typename?: "dictionary_aggregated_count"
  date_created?: Maybe<Scalars["Int"]>
  date_updated?: Maybe<Scalars["Int"]>
  id?: Maybe<Scalars["Int"]>
  translations?: Maybe<Scalars["Int"]>
  user_created?: Maybe<Scalars["Int"]>
  user_updated?: Maybe<Scalars["Int"]>
}

export type dictionary_aggregated_fields = {
  __typename?: "dictionary_aggregated_fields"
  id?: Maybe<Scalars["Float"]>
}

export type dictionary_filter = {
  _and?: InputMaybe<Array<InputMaybe<dictionary_filter>>>
  _or?: InputMaybe<Array<InputMaybe<dictionary_filter>>>
  date_created?: InputMaybe<date_filter_operators>
  date_created_func?: InputMaybe<datetime_function_filter_operators>
  date_updated?: InputMaybe<date_filter_operators>
  date_updated_func?: InputMaybe<datetime_function_filter_operators>
  id?: InputMaybe<number_filter_operators>
  translations?: InputMaybe<dictionary_translations_filter>
  translations_func?: InputMaybe<count_function_filter_operators>
  user_created?: InputMaybe<directus_users_filter>
  user_updated?: InputMaybe<directus_users_filter>
}

export type dictionary_translations = {
  __typename?: "dictionary_translations"
  acronym?: Maybe<Scalars["String"]>
  definition?: Maybe<Scalars["String"]>
  dictionary_id?: Maybe<dictionary>
  id: Scalars["ID"]
  languages_code?: Maybe<Scalars["String"]>
  term?: Maybe<Scalars["String"]>
}

export type dictionary_translationsdictionary_idArgs = {
  filter?: InputMaybe<dictionary_filter>
  limit?: InputMaybe<Scalars["Int"]>
  offset?: InputMaybe<Scalars["Int"]>
  page?: InputMaybe<Scalars["Int"]>
  search?: InputMaybe<Scalars["String"]>
  sort?: InputMaybe<Array<InputMaybe<Scalars["String"]>>>
}

export type dictionary_translations_aggregated = {
  __typename?: "dictionary_translations_aggregated"
  avg?: Maybe<dictionary_translations_aggregated_fields>
  avgDistinct?: Maybe<dictionary_translations_aggregated_fields>
  count?: Maybe<dictionary_translations_aggregated_count>
  countAll?: Maybe<Scalars["Int"]>
  countDistinct?: Maybe<dictionary_translations_aggregated_count>
  group?: Maybe<Scalars["JSON"]>
  max?: Maybe<dictionary_translations_aggregated_fields>
  min?: Maybe<dictionary_translations_aggregated_fields>
  sum?: Maybe<dictionary_translations_aggregated_fields>
  sumDistinct?: Maybe<dictionary_translations_aggregated_fields>
}

export type dictionary_translations_aggregated_count = {
  __typename?: "dictionary_translations_aggregated_count"
  acronym?: Maybe<Scalars["Int"]>
  definition?: Maybe<Scalars["Int"]>
  dictionary_id?: Maybe<Scalars["Int"]>
  id?: Maybe<Scalars["Int"]>
  languages_code?: Maybe<Scalars["Int"]>
  term?: Maybe<Scalars["Int"]>
}

export type dictionary_translations_aggregated_fields = {
  __typename?: "dictionary_translations_aggregated_fields"
  dictionary_id?: Maybe<Scalars["Float"]>
  id?: Maybe<Scalars["Float"]>
}

export type dictionary_translations_filter = {
  _and?: InputMaybe<Array<InputMaybe<dictionary_translations_filter>>>
  _or?: InputMaybe<Array<InputMaybe<dictionary_translations_filter>>>
  acronym?: InputMaybe<string_filter_operators>
  definition?: InputMaybe<string_filter_operators>
  dictionary_id?: InputMaybe<dictionary_filter>
  id?: InputMaybe<number_filter_operators>
  languages_code?: InputMaybe<string_filter_operators>
  term?: InputMaybe<string_filter_operators>
}

export type directus_files = {
  __typename?: "directus_files"
  charset?: Maybe<Scalars["String"]>
  description?: Maybe<Scalars["String"]>
  duration?: Maybe<Scalars["Int"]>
  embed?: Maybe<Scalars["String"]>
  filename_disk?: Maybe<Scalars["String"]>
  filename_download: Scalars["String"]
  filesize?: Maybe<Scalars["GraphQLBigInt"]>
  folder?: Maybe<directus_folders>
  height?: Maybe<Scalars["Int"]>
  id: Scalars["ID"]
  location?: Maybe<Scalars["String"]>
  metadata?: Maybe<Scalars["JSON"]>
  metadata_func?: Maybe<count_functions>
  modified_by?: Maybe<directus_users>
  modified_on?: Maybe<Scalars["Date"]>
  modified_on_func?: Maybe<datetime_functions>
  storage: Scalars["String"]
  tags?: Maybe<Scalars["JSON"]>
  tags_func?: Maybe<count_functions>
  title?: Maybe<Scalars["String"]>
  type?: Maybe<Scalars["String"]>
  uploaded_by?: Maybe<directus_users>
  uploaded_on?: Maybe<Scalars["Date"]>
  uploaded_on_func?: Maybe<datetime_functions>
  width?: Maybe<Scalars["Int"]>
}

export type directus_filesfolderArgs = {
  filter?: InputMaybe<directus_folders_filter>
  limit?: InputMaybe<Scalars["Int"]>
  offset?: InputMaybe<Scalars["Int"]>
  page?: InputMaybe<Scalars["Int"]>
  search?: InputMaybe<Scalars["String"]>
  sort?: InputMaybe<Array<InputMaybe<Scalars["String"]>>>
}

export type directus_filesmodified_byArgs = {
  filter?: InputMaybe<directus_users_filter>
  limit?: InputMaybe<Scalars["Int"]>
  offset?: InputMaybe<Scalars["Int"]>
  page?: InputMaybe<Scalars["Int"]>
  search?: InputMaybe<Scalars["String"]>
  sort?: InputMaybe<Array<InputMaybe<Scalars["String"]>>>
}

export type directus_filesuploaded_byArgs = {
  filter?: InputMaybe<directus_users_filter>
  limit?: InputMaybe<Scalars["Int"]>
  offset?: InputMaybe<Scalars["Int"]>
  page?: InputMaybe<Scalars["Int"]>
  search?: InputMaybe<Scalars["String"]>
  sort?: InputMaybe<Array<InputMaybe<Scalars["String"]>>>
}

export type directus_files_filter = {
  _and?: InputMaybe<Array<InputMaybe<directus_files_filter>>>
  _or?: InputMaybe<Array<InputMaybe<directus_files_filter>>>
  charset?: InputMaybe<string_filter_operators>
  description?: InputMaybe<string_filter_operators>
  duration?: InputMaybe<number_filter_operators>
  embed?: InputMaybe<string_filter_operators>
  filename_disk?: InputMaybe<string_filter_operators>
  filename_download?: InputMaybe<string_filter_operators>
  filesize?: InputMaybe<number_filter_operators>
  folder?: InputMaybe<directus_folders_filter>
  height?: InputMaybe<number_filter_operators>
  id?: InputMaybe<string_filter_operators>
  location?: InputMaybe<string_filter_operators>
  metadata?: InputMaybe<string_filter_operators>
  metadata_func?: InputMaybe<count_function_filter_operators>
  modified_by?: InputMaybe<directus_users_filter>
  modified_on?: InputMaybe<date_filter_operators>
  modified_on_func?: InputMaybe<datetime_function_filter_operators>
  storage?: InputMaybe<string_filter_operators>
  tags?: InputMaybe<string_filter_operators>
  tags_func?: InputMaybe<count_function_filter_operators>
  title?: InputMaybe<string_filter_operators>
  type?: InputMaybe<string_filter_operators>
  uploaded_by?: InputMaybe<directus_users_filter>
  uploaded_on?: InputMaybe<date_filter_operators>
  uploaded_on_func?: InputMaybe<datetime_function_filter_operators>
  width?: InputMaybe<number_filter_operators>
}

export type directus_folders = {
  __typename?: "directus_folders"
  id: Scalars["ID"]
  name: Scalars["String"]
  parent?: Maybe<directus_folders>
}

export type directus_foldersparentArgs = {
  filter?: InputMaybe<directus_folders_filter>
  limit?: InputMaybe<Scalars["Int"]>
  offset?: InputMaybe<Scalars["Int"]>
  page?: InputMaybe<Scalars["Int"]>
  search?: InputMaybe<Scalars["String"]>
  sort?: InputMaybe<Array<InputMaybe<Scalars["String"]>>>
}

export type directus_folders_filter = {
  _and?: InputMaybe<Array<InputMaybe<directus_folders_filter>>>
  _or?: InputMaybe<Array<InputMaybe<directus_folders_filter>>>
  id?: InputMaybe<string_filter_operators>
  name?: InputMaybe<string_filter_operators>
  parent?: InputMaybe<directus_folders_filter>
}

export type directus_roles = {
  __typename?: "directus_roles"
  admin_access: Scalars["Boolean"]
  app_access?: Maybe<Scalars["Boolean"]>
  description?: Maybe<Scalars["String"]>
  enforce_tfa: Scalars["Boolean"]
  icon?: Maybe<Scalars["String"]>
  id: Scalars["ID"]
  ip_access?: Maybe<Array<Maybe<Scalars["String"]>>>
  name: Scalars["String"]
  users?: Maybe<Array<Maybe<directus_users>>>
  users_func?: Maybe<count_functions>
}

export type directus_rolesusersArgs = {
  filter?: InputMaybe<directus_users_filter>
  limit?: InputMaybe<Scalars["Int"]>
  offset?: InputMaybe<Scalars["Int"]>
  page?: InputMaybe<Scalars["Int"]>
  search?: InputMaybe<Scalars["String"]>
  sort?: InputMaybe<Array<InputMaybe<Scalars["String"]>>>
}

export type directus_roles_filter = {
  _and?: InputMaybe<Array<InputMaybe<directus_roles_filter>>>
  _or?: InputMaybe<Array<InputMaybe<directus_roles_filter>>>
  admin_access?: InputMaybe<boolean_filter_operators>
  app_access?: InputMaybe<boolean_filter_operators>
  description?: InputMaybe<string_filter_operators>
  enforce_tfa?: InputMaybe<boolean_filter_operators>
  icon?: InputMaybe<string_filter_operators>
  id?: InputMaybe<string_filter_operators>
  ip_access?: InputMaybe<string_filter_operators>
  name?: InputMaybe<string_filter_operators>
  users?: InputMaybe<directus_users_filter>
  users_func?: InputMaybe<count_function_filter_operators>
}

export type directus_users = {
  __typename?: "directus_users"
  auth_data?: Maybe<Scalars["JSON"]>
  auth_data_func?: Maybe<count_functions>
  avatar?: Maybe<directus_files>
  description?: Maybe<Scalars["String"]>
  email?: Maybe<Scalars["String"]>
  email_notifications?: Maybe<Scalars["Boolean"]>
  external_identifier?: Maybe<Scalars["String"]>
  first_name?: Maybe<Scalars["String"]>
  id: Scalars["ID"]
  language?: Maybe<Scalars["String"]>
  last_access?: Maybe<Scalars["Date"]>
  last_access_func?: Maybe<datetime_functions>
  last_name?: Maybe<Scalars["String"]>
  last_page?: Maybe<Scalars["String"]>
  location?: Maybe<Scalars["String"]>
  password?: Maybe<Scalars["Hash"]>
  provider?: Maybe<Scalars["String"]>
  role?: Maybe<directus_roles>
  status?: Maybe<Scalars["String"]>
  tags?: Maybe<Scalars["JSON"]>
  tags_func?: Maybe<count_functions>
  tfa_secret?: Maybe<Scalars["Hash"]>
  theme?: Maybe<Scalars["String"]>
  title?: Maybe<Scalars["String"]>
  token?: Maybe<Scalars["Hash"]>
}

export type directus_usersavatarArgs = {
  filter?: InputMaybe<directus_files_filter>
  limit?: InputMaybe<Scalars["Int"]>
  offset?: InputMaybe<Scalars["Int"]>
  page?: InputMaybe<Scalars["Int"]>
  search?: InputMaybe<Scalars["String"]>
  sort?: InputMaybe<Array<InputMaybe<Scalars["String"]>>>
}

export type directus_usersroleArgs = {
  filter?: InputMaybe<directus_roles_filter>
  limit?: InputMaybe<Scalars["Int"]>
  offset?: InputMaybe<Scalars["Int"]>
  page?: InputMaybe<Scalars["Int"]>
  search?: InputMaybe<Scalars["String"]>
  sort?: InputMaybe<Array<InputMaybe<Scalars["String"]>>>
}

export type directus_users_filter = {
  _and?: InputMaybe<Array<InputMaybe<directus_users_filter>>>
  _or?: InputMaybe<Array<InputMaybe<directus_users_filter>>>
  auth_data?: InputMaybe<string_filter_operators>
  auth_data_func?: InputMaybe<count_function_filter_operators>
  avatar?: InputMaybe<directus_files_filter>
  description?: InputMaybe<string_filter_operators>
  email?: InputMaybe<string_filter_operators>
  email_notifications?: InputMaybe<boolean_filter_operators>
  external_identifier?: InputMaybe<string_filter_operators>
  first_name?: InputMaybe<string_filter_operators>
  id?: InputMaybe<string_filter_operators>
  language?: InputMaybe<string_filter_operators>
  last_access?: InputMaybe<date_filter_operators>
  last_access_func?: InputMaybe<datetime_function_filter_operators>
  last_name?: InputMaybe<string_filter_operators>
  last_page?: InputMaybe<string_filter_operators>
  location?: InputMaybe<string_filter_operators>
  password?: InputMaybe<hash_filter_operators>
  provider?: InputMaybe<string_filter_operators>
  role?: InputMaybe<directus_roles_filter>
  status?: InputMaybe<string_filter_operators>
  tags?: InputMaybe<string_filter_operators>
  tags_func?: InputMaybe<count_function_filter_operators>
  tfa_secret?: InputMaybe<hash_filter_operators>
  theme?: InputMaybe<string_filter_operators>
  title?: InputMaybe<string_filter_operators>
  token?: InputMaybe<hash_filter_operators>
}

export type documentation = {
  __typename?: "documentation"
  date_created?: Maybe<Scalars["Date"]>
  date_created_func?: Maybe<datetime_functions>
  date_updated?: Maybe<Scalars["Date"]>
  date_updated_func?: Maybe<datetime_functions>
  id: Scalars["ID"]
  parent?: Maybe<documentation>
  publish_date?: Maybe<Scalars["Date"]>
  publish_date_func?: Maybe<datetime_functions>
  slug?: Maybe<Scalars["String"]>
  sort?: Maybe<Scalars["Int"]>
  status?: Maybe<Scalars["String"]>
  tags?: Maybe<Array<Maybe<documentation_tags>>>
  tags_func?: Maybe<count_functions>
  translations?: Maybe<Array<Maybe<documentation_translations>>>
  translations_func?: Maybe<count_functions>
  user_created?: Maybe<directus_users>
  user_updated?: Maybe<directus_users>
  /** Weighted rank against other pages using the same tag. (ordered lowest to highest) */
  weight?: Maybe<Scalars["Int"]>
}

export type documentationparentArgs = {
  filter?: InputMaybe<documentation_filter>
  limit?: InputMaybe<Scalars["Int"]>
  offset?: InputMaybe<Scalars["Int"]>
  page?: InputMaybe<Scalars["Int"]>
  search?: InputMaybe<Scalars["String"]>
  sort?: InputMaybe<Array<InputMaybe<Scalars["String"]>>>
}

export type documentationtagsArgs = {
  filter?: InputMaybe<documentation_tags_filter>
  limit?: InputMaybe<Scalars["Int"]>
  offset?: InputMaybe<Scalars["Int"]>
  page?: InputMaybe<Scalars["Int"]>
  search?: InputMaybe<Scalars["String"]>
  sort?: InputMaybe<Array<InputMaybe<Scalars["String"]>>>
}

export type documentationtranslationsArgs = {
  filter?: InputMaybe<documentation_translations_filter>
  limit?: InputMaybe<Scalars["Int"]>
  offset?: InputMaybe<Scalars["Int"]>
  page?: InputMaybe<Scalars["Int"]>
  search?: InputMaybe<Scalars["String"]>
  sort?: InputMaybe<Array<InputMaybe<Scalars["String"]>>>
}

export type documentationuser_createdArgs = {
  filter?: InputMaybe<directus_users_filter>
  limit?: InputMaybe<Scalars["Int"]>
  offset?: InputMaybe<Scalars["Int"]>
  page?: InputMaybe<Scalars["Int"]>
  search?: InputMaybe<Scalars["String"]>
  sort?: InputMaybe<Array<InputMaybe<Scalars["String"]>>>
}

export type documentationuser_updatedArgs = {
  filter?: InputMaybe<directus_users_filter>
  limit?: InputMaybe<Scalars["Int"]>
  offset?: InputMaybe<Scalars["Int"]>
  page?: InputMaybe<Scalars["Int"]>
  search?: InputMaybe<Scalars["String"]>
  sort?: InputMaybe<Array<InputMaybe<Scalars["String"]>>>
}

export type documentation_aggregated = {
  __typename?: "documentation_aggregated"
  avg?: Maybe<documentation_aggregated_fields>
  avgDistinct?: Maybe<documentation_aggregated_fields>
  count?: Maybe<documentation_aggregated_count>
  countAll?: Maybe<Scalars["Int"]>
  countDistinct?: Maybe<documentation_aggregated_count>
  group?: Maybe<Scalars["JSON"]>
  max?: Maybe<documentation_aggregated_fields>
  min?: Maybe<documentation_aggregated_fields>
  sum?: Maybe<documentation_aggregated_fields>
  sumDistinct?: Maybe<documentation_aggregated_fields>
}

export type documentation_aggregated_count = {
  __typename?: "documentation_aggregated_count"
  date_created?: Maybe<Scalars["Int"]>
  date_updated?: Maybe<Scalars["Int"]>
  id?: Maybe<Scalars["Int"]>
  parent?: Maybe<Scalars["Int"]>
  publish_date?: Maybe<Scalars["Int"]>
  slug?: Maybe<Scalars["Int"]>
  sort?: Maybe<Scalars["Int"]>
  status?: Maybe<Scalars["Int"]>
  tags?: Maybe<Scalars["Int"]>
  translations?: Maybe<Scalars["Int"]>
  user_created?: Maybe<Scalars["Int"]>
  user_updated?: Maybe<Scalars["Int"]>
  /** Weighted rank against other pages using the same tag. (ordered lowest to highest) */
  weight?: Maybe<Scalars["Int"]>
}

export type documentation_aggregated_fields = {
  __typename?: "documentation_aggregated_fields"
  id?: Maybe<Scalars["Float"]>
  parent?: Maybe<Scalars["Float"]>
  sort?: Maybe<Scalars["Float"]>
  /** Weighted rank against other pages using the same tag. (ordered lowest to highest) */
  weight?: Maybe<Scalars["Float"]>
}

export type documentation_filter = {
  _and?: InputMaybe<Array<InputMaybe<documentation_filter>>>
  _or?: InputMaybe<Array<InputMaybe<documentation_filter>>>
  date_created?: InputMaybe<date_filter_operators>
  date_created_func?: InputMaybe<datetime_function_filter_operators>
  date_updated?: InputMaybe<date_filter_operators>
  date_updated_func?: InputMaybe<datetime_function_filter_operators>
  id?: InputMaybe<number_filter_operators>
  parent?: InputMaybe<documentation_filter>
  publish_date?: InputMaybe<date_filter_operators>
  publish_date_func?: InputMaybe<datetime_function_filter_operators>
  slug?: InputMaybe<string_filter_operators>
  sort?: InputMaybe<number_filter_operators>
  status?: InputMaybe<string_filter_operators>
  tags?: InputMaybe<documentation_tags_filter>
  tags_func?: InputMaybe<count_function_filter_operators>
  translations?: InputMaybe<documentation_translations_filter>
  translations_func?: InputMaybe<count_function_filter_operators>
  user_created?: InputMaybe<directus_users_filter>
  user_updated?: InputMaybe<directus_users_filter>
  weight?: InputMaybe<number_filter_operators>
}

export type documentation_tags = {
  __typename?: "documentation_tags"
  documentation_id?: Maybe<documentation>
  id: Scalars["ID"]
  tags_id?: Maybe<tags>
}

export type documentation_tagsdocumentation_idArgs = {
  filter?: InputMaybe<documentation_filter>
  limit?: InputMaybe<Scalars["Int"]>
  offset?: InputMaybe<Scalars["Int"]>
  page?: InputMaybe<Scalars["Int"]>
  search?: InputMaybe<Scalars["String"]>
  sort?: InputMaybe<Array<InputMaybe<Scalars["String"]>>>
}

export type documentation_tagstags_idArgs = {
  filter?: InputMaybe<tags_filter>
  limit?: InputMaybe<Scalars["Int"]>
  offset?: InputMaybe<Scalars["Int"]>
  page?: InputMaybe<Scalars["Int"]>
  search?: InputMaybe<Scalars["String"]>
  sort?: InputMaybe<Array<InputMaybe<Scalars["String"]>>>
}

export type documentation_tags_aggregated = {
  __typename?: "documentation_tags_aggregated"
  avg?: Maybe<documentation_tags_aggregated_fields>
  avgDistinct?: Maybe<documentation_tags_aggregated_fields>
  count?: Maybe<documentation_tags_aggregated_count>
  countAll?: Maybe<Scalars["Int"]>
  countDistinct?: Maybe<documentation_tags_aggregated_count>
  group?: Maybe<Scalars["JSON"]>
  max?: Maybe<documentation_tags_aggregated_fields>
  min?: Maybe<documentation_tags_aggregated_fields>
  sum?: Maybe<documentation_tags_aggregated_fields>
  sumDistinct?: Maybe<documentation_tags_aggregated_fields>
}

export type documentation_tags_aggregated_count = {
  __typename?: "documentation_tags_aggregated_count"
  documentation_id?: Maybe<Scalars["Int"]>
  id?: Maybe<Scalars["Int"]>
  tags_id?: Maybe<Scalars["Int"]>
}

export type documentation_tags_aggregated_fields = {
  __typename?: "documentation_tags_aggregated_fields"
  documentation_id?: Maybe<Scalars["Float"]>
  id?: Maybe<Scalars["Float"]>
  tags_id?: Maybe<Scalars["Float"]>
}

export type documentation_tags_filter = {
  _and?: InputMaybe<Array<InputMaybe<documentation_tags_filter>>>
  _or?: InputMaybe<Array<InputMaybe<documentation_tags_filter>>>
  documentation_id?: InputMaybe<documentation_filter>
  id?: InputMaybe<number_filter_operators>
  tags_id?: InputMaybe<tags_filter>
}

export type documentation_translations = {
  __typename?: "documentation_translations"
  body?: Maybe<Scalars["String"]>
  documentation_id?: Maybe<documentation>
  id: Scalars["ID"]
  languages_code?: Maybe<Scalars["String"]>
  summary?: Maybe<Scalars["String"]>
  title?: Maybe<Scalars["String"]>
}

export type documentation_translationsdocumentation_idArgs = {
  filter?: InputMaybe<documentation_filter>
  limit?: InputMaybe<Scalars["Int"]>
  offset?: InputMaybe<Scalars["Int"]>
  page?: InputMaybe<Scalars["Int"]>
  search?: InputMaybe<Scalars["String"]>
  sort?: InputMaybe<Array<InputMaybe<Scalars["String"]>>>
}

export type documentation_translations_aggregated = {
  __typename?: "documentation_translations_aggregated"
  avg?: Maybe<documentation_translations_aggregated_fields>
  avgDistinct?: Maybe<documentation_translations_aggregated_fields>
  count?: Maybe<documentation_translations_aggregated_count>
  countAll?: Maybe<Scalars["Int"]>
  countDistinct?: Maybe<documentation_translations_aggregated_count>
  group?: Maybe<Scalars["JSON"]>
  max?: Maybe<documentation_translations_aggregated_fields>
  min?: Maybe<documentation_translations_aggregated_fields>
  sum?: Maybe<documentation_translations_aggregated_fields>
  sumDistinct?: Maybe<documentation_translations_aggregated_fields>
}

export type documentation_translations_aggregated_count = {
  __typename?: "documentation_translations_aggregated_count"
  body?: Maybe<Scalars["Int"]>
  documentation_id?: Maybe<Scalars["Int"]>
  id?: Maybe<Scalars["Int"]>
  languages_code?: Maybe<Scalars["Int"]>
  summary?: Maybe<Scalars["Int"]>
  title?: Maybe<Scalars["Int"]>
}

export type documentation_translations_aggregated_fields = {
  __typename?: "documentation_translations_aggregated_fields"
  documentation_id?: Maybe<Scalars["Float"]>
  id?: Maybe<Scalars["Float"]>
}

export type documentation_translations_filter = {
  _and?: InputMaybe<Array<InputMaybe<documentation_translations_filter>>>
  _or?: InputMaybe<Array<InputMaybe<documentation_translations_filter>>>
  body?: InputMaybe<string_filter_operators>
  documentation_id?: InputMaybe<documentation_filter>
  id?: InputMaybe<number_filter_operators>
  languages_code?: InputMaybe<string_filter_operators>
  summary?: InputMaybe<string_filter_operators>
  title?: InputMaybe<string_filter_operators>
}

export type ecosystem = {
  __typename?: "ecosystem"
  date_created?: Maybe<Scalars["Date"]>
  date_created_func?: Maybe<datetime_functions>
  date_updated?: Maybe<Scalars["Date"]>
  date_updated_func?: Maybe<datetime_functions>
  discord?: Maybe<Scalars["String"]>
  featured?: Maybe<Scalars["Boolean"]>
  id: Scalars["ID"]
  images?: Maybe<Array<Maybe<ecosystem_files>>>
  images_func?: Maybe<count_functions>
  name?: Maybe<Scalars["String"]>
  pocket_approved?: Maybe<Scalars["Boolean"]>
  reviews?: Maybe<Array<Maybe<reviews>>>
  reviews_func?: Maybe<count_functions>
  sort?: Maybe<Scalars["Int"]>
  status?: Maybe<Scalars["String"]>
  tags?: Maybe<tags>
  thumbnail?: Maybe<directus_files>
  translations?: Maybe<Array<Maybe<ecosystem_translations>>>
  translations_func?: Maybe<count_functions>
  user_created?: Maybe<directus_users>
  user_updated?: Maybe<directus_users>
  votes?: Maybe<Scalars["Int"]>
  website?: Maybe<Scalars["String"]>
}

export type ecosystemimagesArgs = {
  filter?: InputMaybe<ecosystem_files_filter>
  limit?: InputMaybe<Scalars["Int"]>
  offset?: InputMaybe<Scalars["Int"]>
  page?: InputMaybe<Scalars["Int"]>
  search?: InputMaybe<Scalars["String"]>
  sort?: InputMaybe<Array<InputMaybe<Scalars["String"]>>>
}

export type ecosystemreviewsArgs = {
  filter?: InputMaybe<reviews_filter>
  limit?: InputMaybe<Scalars["Int"]>
  offset?: InputMaybe<Scalars["Int"]>
  page?: InputMaybe<Scalars["Int"]>
  search?: InputMaybe<Scalars["String"]>
  sort?: InputMaybe<Array<InputMaybe<Scalars["String"]>>>
}

export type ecosystemtagsArgs = {
  filter?: InputMaybe<tags_filter>
  limit?: InputMaybe<Scalars["Int"]>
  offset?: InputMaybe<Scalars["Int"]>
  page?: InputMaybe<Scalars["Int"]>
  search?: InputMaybe<Scalars["String"]>
  sort?: InputMaybe<Array<InputMaybe<Scalars["String"]>>>
}

export type ecosystemthumbnailArgs = {
  filter?: InputMaybe<directus_files_filter>
  limit?: InputMaybe<Scalars["Int"]>
  offset?: InputMaybe<Scalars["Int"]>
  page?: InputMaybe<Scalars["Int"]>
  search?: InputMaybe<Scalars["String"]>
  sort?: InputMaybe<Array<InputMaybe<Scalars["String"]>>>
}

export type ecosystemtranslationsArgs = {
  filter?: InputMaybe<ecosystem_translations_filter>
  limit?: InputMaybe<Scalars["Int"]>
  offset?: InputMaybe<Scalars["Int"]>
  page?: InputMaybe<Scalars["Int"]>
  search?: InputMaybe<Scalars["String"]>
  sort?: InputMaybe<Array<InputMaybe<Scalars["String"]>>>
}

export type ecosystemuser_createdArgs = {
  filter?: InputMaybe<directus_users_filter>
  limit?: InputMaybe<Scalars["Int"]>
  offset?: InputMaybe<Scalars["Int"]>
  page?: InputMaybe<Scalars["Int"]>
  search?: InputMaybe<Scalars["String"]>
  sort?: InputMaybe<Array<InputMaybe<Scalars["String"]>>>
}

export type ecosystemuser_updatedArgs = {
  filter?: InputMaybe<directus_users_filter>
  limit?: InputMaybe<Scalars["Int"]>
  offset?: InputMaybe<Scalars["Int"]>
  page?: InputMaybe<Scalars["Int"]>
  search?: InputMaybe<Scalars["String"]>
  sort?: InputMaybe<Array<InputMaybe<Scalars["String"]>>>
}

export type ecosystem_aggregated = {
  __typename?: "ecosystem_aggregated"
  avg?: Maybe<ecosystem_aggregated_fields>
  avgDistinct?: Maybe<ecosystem_aggregated_fields>
  count?: Maybe<ecosystem_aggregated_count>
  countAll?: Maybe<Scalars["Int"]>
  countDistinct?: Maybe<ecosystem_aggregated_count>
  group?: Maybe<Scalars["JSON"]>
  max?: Maybe<ecosystem_aggregated_fields>
  min?: Maybe<ecosystem_aggregated_fields>
  sum?: Maybe<ecosystem_aggregated_fields>
  sumDistinct?: Maybe<ecosystem_aggregated_fields>
}

export type ecosystem_aggregated_count = {
  __typename?: "ecosystem_aggregated_count"
  date_created?: Maybe<Scalars["Int"]>
  date_updated?: Maybe<Scalars["Int"]>
  discord?: Maybe<Scalars["Int"]>
  featured?: Maybe<Scalars["Int"]>
  id?: Maybe<Scalars["Int"]>
  images?: Maybe<Scalars["Int"]>
  name?: Maybe<Scalars["Int"]>
  pocket_approved?: Maybe<Scalars["Int"]>
  reviews?: Maybe<Scalars["Int"]>
  sort?: Maybe<Scalars["Int"]>
  status?: Maybe<Scalars["Int"]>
  tags?: Maybe<Scalars["Int"]>
  thumbnail?: Maybe<Scalars["Int"]>
  translations?: Maybe<Scalars["Int"]>
  user_created?: Maybe<Scalars["Int"]>
  user_updated?: Maybe<Scalars["Int"]>
  votes?: Maybe<Scalars["Int"]>
  website?: Maybe<Scalars["Int"]>
}

export type ecosystem_aggregated_fields = {
  __typename?: "ecosystem_aggregated_fields"
  id?: Maybe<Scalars["Float"]>
  sort?: Maybe<Scalars["Float"]>
  tags?: Maybe<Scalars["Float"]>
  votes?: Maybe<Scalars["Float"]>
}

export type ecosystem_files = {
  __typename?: "ecosystem_files"
  directus_files_id?: Maybe<directus_files>
  ecosystem_id?: Maybe<ecosystem>
  id: Scalars["ID"]
}

export type ecosystem_filesdirectus_files_idArgs = {
  filter?: InputMaybe<directus_files_filter>
  limit?: InputMaybe<Scalars["Int"]>
  offset?: InputMaybe<Scalars["Int"]>
  page?: InputMaybe<Scalars["Int"]>
  search?: InputMaybe<Scalars["String"]>
  sort?: InputMaybe<Array<InputMaybe<Scalars["String"]>>>
}

export type ecosystem_filesecosystem_idArgs = {
  filter?: InputMaybe<ecosystem_filter>
  limit?: InputMaybe<Scalars["Int"]>
  offset?: InputMaybe<Scalars["Int"]>
  page?: InputMaybe<Scalars["Int"]>
  search?: InputMaybe<Scalars["String"]>
  sort?: InputMaybe<Array<InputMaybe<Scalars["String"]>>>
}

export type ecosystem_files_aggregated = {
  __typename?: "ecosystem_files_aggregated"
  avg?: Maybe<ecosystem_files_aggregated_fields>
  avgDistinct?: Maybe<ecosystem_files_aggregated_fields>
  count?: Maybe<ecosystem_files_aggregated_count>
  countAll?: Maybe<Scalars["Int"]>
  countDistinct?: Maybe<ecosystem_files_aggregated_count>
  group?: Maybe<Scalars["JSON"]>
  max?: Maybe<ecosystem_files_aggregated_fields>
  min?: Maybe<ecosystem_files_aggregated_fields>
  sum?: Maybe<ecosystem_files_aggregated_fields>
  sumDistinct?: Maybe<ecosystem_files_aggregated_fields>
}

export type ecosystem_files_aggregated_count = {
  __typename?: "ecosystem_files_aggregated_count"
  directus_files_id?: Maybe<Scalars["Int"]>
  ecosystem_id?: Maybe<Scalars["Int"]>
  id?: Maybe<Scalars["Int"]>
}

export type ecosystem_files_aggregated_fields = {
  __typename?: "ecosystem_files_aggregated_fields"
  ecosystem_id?: Maybe<Scalars["Float"]>
  id?: Maybe<Scalars["Float"]>
}

export type ecosystem_files_filter = {
  _and?: InputMaybe<Array<InputMaybe<ecosystem_files_filter>>>
  _or?: InputMaybe<Array<InputMaybe<ecosystem_files_filter>>>
  directus_files_id?: InputMaybe<directus_files_filter>
  ecosystem_id?: InputMaybe<ecosystem_filter>
  id?: InputMaybe<number_filter_operators>
}

export type ecosystem_filter = {
  _and?: InputMaybe<Array<InputMaybe<ecosystem_filter>>>
  _or?: InputMaybe<Array<InputMaybe<ecosystem_filter>>>
  date_created?: InputMaybe<date_filter_operators>
  date_created_func?: InputMaybe<datetime_function_filter_operators>
  date_updated?: InputMaybe<date_filter_operators>
  date_updated_func?: InputMaybe<datetime_function_filter_operators>
  discord?: InputMaybe<string_filter_operators>
  featured?: InputMaybe<boolean_filter_operators>
  id?: InputMaybe<number_filter_operators>
  images?: InputMaybe<ecosystem_files_filter>
  images_func?: InputMaybe<count_function_filter_operators>
  name?: InputMaybe<string_filter_operators>
  pocket_approved?: InputMaybe<boolean_filter_operators>
  reviews?: InputMaybe<reviews_filter>
  reviews_func?: InputMaybe<count_function_filter_operators>
  sort?: InputMaybe<number_filter_operators>
  status?: InputMaybe<string_filter_operators>
  tags?: InputMaybe<tags_filter>
  thumbnail?: InputMaybe<directus_files_filter>
  translations?: InputMaybe<ecosystem_translations_filter>
  translations_func?: InputMaybe<count_function_filter_operators>
  user_created?: InputMaybe<directus_users_filter>
  user_updated?: InputMaybe<directus_users_filter>
  votes?: InputMaybe<number_filter_operators>
  website?: InputMaybe<string_filter_operators>
}

export type ecosystem_tags = {
  __typename?: "ecosystem_tags"
  ecosystem_id?: Maybe<ecosystem>
  id: Scalars["ID"]
  tags_id?: Maybe<tags>
}

export type ecosystem_tagsecosystem_idArgs = {
  filter?: InputMaybe<ecosystem_filter>
  limit?: InputMaybe<Scalars["Int"]>
  offset?: InputMaybe<Scalars["Int"]>
  page?: InputMaybe<Scalars["Int"]>
  search?: InputMaybe<Scalars["String"]>
  sort?: InputMaybe<Array<InputMaybe<Scalars["String"]>>>
}

export type ecosystem_tagstags_idArgs = {
  filter?: InputMaybe<tags_filter>
  limit?: InputMaybe<Scalars["Int"]>
  offset?: InputMaybe<Scalars["Int"]>
  page?: InputMaybe<Scalars["Int"]>
  search?: InputMaybe<Scalars["String"]>
  sort?: InputMaybe<Array<InputMaybe<Scalars["String"]>>>
}

export type ecosystem_tags_aggregated = {
  __typename?: "ecosystem_tags_aggregated"
  avg?: Maybe<ecosystem_tags_aggregated_fields>
  avgDistinct?: Maybe<ecosystem_tags_aggregated_fields>
  count?: Maybe<ecosystem_tags_aggregated_count>
  countAll?: Maybe<Scalars["Int"]>
  countDistinct?: Maybe<ecosystem_tags_aggregated_count>
  group?: Maybe<Scalars["JSON"]>
  max?: Maybe<ecosystem_tags_aggregated_fields>
  min?: Maybe<ecosystem_tags_aggregated_fields>
  sum?: Maybe<ecosystem_tags_aggregated_fields>
  sumDistinct?: Maybe<ecosystem_tags_aggregated_fields>
}

export type ecosystem_tags_aggregated_count = {
  __typename?: "ecosystem_tags_aggregated_count"
  ecosystem_id?: Maybe<Scalars["Int"]>
  id?: Maybe<Scalars["Int"]>
  tags_id?: Maybe<Scalars["Int"]>
}

export type ecosystem_tags_aggregated_fields = {
  __typename?: "ecosystem_tags_aggregated_fields"
  ecosystem_id?: Maybe<Scalars["Float"]>
  id?: Maybe<Scalars["Float"]>
  tags_id?: Maybe<Scalars["Float"]>
}

export type ecosystem_tags_filter = {
  _and?: InputMaybe<Array<InputMaybe<ecosystem_tags_filter>>>
  _or?: InputMaybe<Array<InputMaybe<ecosystem_tags_filter>>>
  ecosystem_id?: InputMaybe<ecosystem_filter>
  id?: InputMaybe<number_filter_operators>
  tags_id?: InputMaybe<tags_filter>
}

export type ecosystem_translations = {
  __typename?: "ecosystem_translations"
  body?: Maybe<Scalars["String"]>
  ecosystem_id?: Maybe<ecosystem>
  id: Scalars["ID"]
  languages_code?: Maybe<Scalars["String"]>
  summary?: Maybe<Scalars["String"]>
}

export type ecosystem_translationsecosystem_idArgs = {
  filter?: InputMaybe<ecosystem_filter>
  limit?: InputMaybe<Scalars["Int"]>
  offset?: InputMaybe<Scalars["Int"]>
  page?: InputMaybe<Scalars["Int"]>
  search?: InputMaybe<Scalars["String"]>
  sort?: InputMaybe<Array<InputMaybe<Scalars["String"]>>>
}

export type ecosystem_translations_aggregated = {
  __typename?: "ecosystem_translations_aggregated"
  avg?: Maybe<ecosystem_translations_aggregated_fields>
  avgDistinct?: Maybe<ecosystem_translations_aggregated_fields>
  count?: Maybe<ecosystem_translations_aggregated_count>
  countAll?: Maybe<Scalars["Int"]>
  countDistinct?: Maybe<ecosystem_translations_aggregated_count>
  group?: Maybe<Scalars["JSON"]>
  max?: Maybe<ecosystem_translations_aggregated_fields>
  min?: Maybe<ecosystem_translations_aggregated_fields>
  sum?: Maybe<ecosystem_translations_aggregated_fields>
  sumDistinct?: Maybe<ecosystem_translations_aggregated_fields>
}

export type ecosystem_translations_aggregated_count = {
  __typename?: "ecosystem_translations_aggregated_count"
  body?: Maybe<Scalars["Int"]>
  ecosystem_id?: Maybe<Scalars["Int"]>
  id?: Maybe<Scalars["Int"]>
  languages_code?: Maybe<Scalars["Int"]>
  summary?: Maybe<Scalars["Int"]>
}

export type ecosystem_translations_aggregated_fields = {
  __typename?: "ecosystem_translations_aggregated_fields"
  ecosystem_id?: Maybe<Scalars["Float"]>
  id?: Maybe<Scalars["Float"]>
}

export type ecosystem_translations_filter = {
  _and?: InputMaybe<Array<InputMaybe<ecosystem_translations_filter>>>
  _or?: InputMaybe<Array<InputMaybe<ecosystem_translations_filter>>>
  body?: InputMaybe<string_filter_operators>
  ecosystem_id?: InputMaybe<ecosystem_filter>
  id?: InputMaybe<number_filter_operators>
  languages_code?: InputMaybe<string_filter_operators>
  summary?: InputMaybe<string_filter_operators>
}

export type flags = {
  __typename?: "flags"
  flagGroups?: Maybe<Scalars["JSON"]>
  flagGroups_func?: Maybe<count_functions>
  name: Scalars["ID"]
  sort?: Maybe<Scalars["Int"]>
}

export type flags_aggregated = {
  __typename?: "flags_aggregated"
  avg?: Maybe<flags_aggregated_fields>
  avgDistinct?: Maybe<flags_aggregated_fields>
  count?: Maybe<flags_aggregated_count>
  countAll?: Maybe<Scalars["Int"]>
  countDistinct?: Maybe<flags_aggregated_count>
  group?: Maybe<Scalars["JSON"]>
  max?: Maybe<flags_aggregated_fields>
  min?: Maybe<flags_aggregated_fields>
  sum?: Maybe<flags_aggregated_fields>
  sumDistinct?: Maybe<flags_aggregated_fields>
}

export type flags_aggregated_count = {
  __typename?: "flags_aggregated_count"
  flagGroups?: Maybe<Scalars["Int"]>
  name?: Maybe<Scalars["Int"]>
  sort?: Maybe<Scalars["Int"]>
}

export type flags_aggregated_fields = {
  __typename?: "flags_aggregated_fields"
  sort?: Maybe<Scalars["Float"]>
}

export type flags_filter = {
  _and?: InputMaybe<Array<InputMaybe<flags_filter>>>
  _or?: InputMaybe<Array<InputMaybe<flags_filter>>>
  flagGroups?: InputMaybe<string_filter_operators>
  flagGroups_func?: InputMaybe<count_function_filter_operators>
  name?: InputMaybe<string_filter_operators>
  sort?: InputMaybe<number_filter_operators>
}

export type hash_filter_operators = {
  _empty?: InputMaybe<Scalars["Boolean"]>
  _nempty?: InputMaybe<Scalars["Boolean"]>
  _nnull?: InputMaybe<Scalars["Boolean"]>
  _null?: InputMaybe<Scalars["Boolean"]>
}

export type legal = {
  __typename?: "legal"
  category?: Maybe<tags>
  date_created?: Maybe<Scalars["Date"]>
  date_created_func?: Maybe<datetime_functions>
  date_updated?: Maybe<Scalars["Date"]>
  date_updated_func?: Maybe<datetime_functions>
  id: Scalars["ID"]
  status?: Maybe<Scalars["String"]>
  translations?: Maybe<Array<Maybe<legal_translations>>>
  translations_func?: Maybe<count_functions>
  user_created?: Maybe<directus_users>
  user_updated?: Maybe<directus_users>
}

export type legalcategoryArgs = {
  filter?: InputMaybe<tags_filter>
  limit?: InputMaybe<Scalars["Int"]>
  offset?: InputMaybe<Scalars["Int"]>
  page?: InputMaybe<Scalars["Int"]>
  search?: InputMaybe<Scalars["String"]>
  sort?: InputMaybe<Array<InputMaybe<Scalars["String"]>>>
}

export type legaltranslationsArgs = {
  filter?: InputMaybe<legal_translations_filter>
  limit?: InputMaybe<Scalars["Int"]>
  offset?: InputMaybe<Scalars["Int"]>
  page?: InputMaybe<Scalars["Int"]>
  search?: InputMaybe<Scalars["String"]>
  sort?: InputMaybe<Array<InputMaybe<Scalars["String"]>>>
}

export type legaluser_createdArgs = {
  filter?: InputMaybe<directus_users_filter>
  limit?: InputMaybe<Scalars["Int"]>
  offset?: InputMaybe<Scalars["Int"]>
  page?: InputMaybe<Scalars["Int"]>
  search?: InputMaybe<Scalars["String"]>
  sort?: InputMaybe<Array<InputMaybe<Scalars["String"]>>>
}

export type legaluser_updatedArgs = {
  filter?: InputMaybe<directus_users_filter>
  limit?: InputMaybe<Scalars["Int"]>
  offset?: InputMaybe<Scalars["Int"]>
  page?: InputMaybe<Scalars["Int"]>
  search?: InputMaybe<Scalars["String"]>
  sort?: InputMaybe<Array<InputMaybe<Scalars["String"]>>>
}

export type legal_aggregated = {
  __typename?: "legal_aggregated"
  avg?: Maybe<legal_aggregated_fields>
  avgDistinct?: Maybe<legal_aggregated_fields>
  count?: Maybe<legal_aggregated_count>
  countAll?: Maybe<Scalars["Int"]>
  countDistinct?: Maybe<legal_aggregated_count>
  group?: Maybe<Scalars["JSON"]>
  max?: Maybe<legal_aggregated_fields>
  min?: Maybe<legal_aggregated_fields>
  sum?: Maybe<legal_aggregated_fields>
  sumDistinct?: Maybe<legal_aggregated_fields>
}

export type legal_aggregated_count = {
  __typename?: "legal_aggregated_count"
  category?: Maybe<Scalars["Int"]>
  date_created?: Maybe<Scalars["Int"]>
  date_updated?: Maybe<Scalars["Int"]>
  id?: Maybe<Scalars["Int"]>
  status?: Maybe<Scalars["Int"]>
  translations?: Maybe<Scalars["Int"]>
  user_created?: Maybe<Scalars["Int"]>
  user_updated?: Maybe<Scalars["Int"]>
}

export type legal_aggregated_fields = {
  __typename?: "legal_aggregated_fields"
  category?: Maybe<Scalars["Float"]>
  id?: Maybe<Scalars["Float"]>
}

export type legal_filter = {
  _and?: InputMaybe<Array<InputMaybe<legal_filter>>>
  _or?: InputMaybe<Array<InputMaybe<legal_filter>>>
  category?: InputMaybe<tags_filter>
  date_created?: InputMaybe<date_filter_operators>
  date_created_func?: InputMaybe<datetime_function_filter_operators>
  date_updated?: InputMaybe<date_filter_operators>
  date_updated_func?: InputMaybe<datetime_function_filter_operators>
  id?: InputMaybe<number_filter_operators>
  status?: InputMaybe<string_filter_operators>
  translations?: InputMaybe<legal_translations_filter>
  translations_func?: InputMaybe<count_function_filter_operators>
  user_created?: InputMaybe<directus_users_filter>
  user_updated?: InputMaybe<directus_users_filter>
}

export type legal_translations = {
  __typename?: "legal_translations"
  body?: Maybe<Scalars["String"]>
  id: Scalars["ID"]
  languages_code?: Maybe<Scalars["String"]>
  legal_id?: Maybe<legal>
  name?: Maybe<Scalars["String"]>
}

export type legal_translationslegal_idArgs = {
  filter?: InputMaybe<legal_filter>
  limit?: InputMaybe<Scalars["Int"]>
  offset?: InputMaybe<Scalars["Int"]>
  page?: InputMaybe<Scalars["Int"]>
  search?: InputMaybe<Scalars["String"]>
  sort?: InputMaybe<Array<InputMaybe<Scalars["String"]>>>
}

export type legal_translations_aggregated = {
  __typename?: "legal_translations_aggregated"
  avg?: Maybe<legal_translations_aggregated_fields>
  avgDistinct?: Maybe<legal_translations_aggregated_fields>
  count?: Maybe<legal_translations_aggregated_count>
  countAll?: Maybe<Scalars["Int"]>
  countDistinct?: Maybe<legal_translations_aggregated_count>
  group?: Maybe<Scalars["JSON"]>
  max?: Maybe<legal_translations_aggregated_fields>
  min?: Maybe<legal_translations_aggregated_fields>
  sum?: Maybe<legal_translations_aggregated_fields>
  sumDistinct?: Maybe<legal_translations_aggregated_fields>
}

export type legal_translations_aggregated_count = {
  __typename?: "legal_translations_aggregated_count"
  body?: Maybe<Scalars["Int"]>
  id?: Maybe<Scalars["Int"]>
  languages_code?: Maybe<Scalars["Int"]>
  legal_id?: Maybe<Scalars["Int"]>
  name?: Maybe<Scalars["Int"]>
}

export type legal_translations_aggregated_fields = {
  __typename?: "legal_translations_aggregated_fields"
  id?: Maybe<Scalars["Float"]>
  legal_id?: Maybe<Scalars["Float"]>
}

export type legal_translations_filter = {
  _and?: InputMaybe<Array<InputMaybe<legal_translations_filter>>>
  _or?: InputMaybe<Array<InputMaybe<legal_translations_filter>>>
  body?: InputMaybe<string_filter_operators>
  id?: InputMaybe<number_filter_operators>
  languages_code?: InputMaybe<string_filter_operators>
  legal_id?: InputMaybe<legal_filter>
  name?: InputMaybe<string_filter_operators>
}

export type number_filter_operators = {
  _between?: InputMaybe<Array<InputMaybe<Scalars["GraphQLStringOrFloat"]>>>
  _eq?: InputMaybe<Scalars["GraphQLStringOrFloat"]>
  _gt?: InputMaybe<Scalars["GraphQLStringOrFloat"]>
  _gte?: InputMaybe<Scalars["GraphQLStringOrFloat"]>
  _in?: InputMaybe<Array<InputMaybe<Scalars["GraphQLStringOrFloat"]>>>
  _lt?: InputMaybe<Scalars["GraphQLStringOrFloat"]>
  _lte?: InputMaybe<Scalars["GraphQLStringOrFloat"]>
  _nbetween?: InputMaybe<Array<InputMaybe<Scalars["GraphQLStringOrFloat"]>>>
  _neq?: InputMaybe<Scalars["GraphQLStringOrFloat"]>
  _nin?: InputMaybe<Array<InputMaybe<Scalars["GraphQLStringOrFloat"]>>>
  _nnull?: InputMaybe<Scalars["Boolean"]>
  _null?: InputMaybe<Scalars["Boolean"]>
}

export type personas = {
  __typename?: "personas"
  body?: Maybe<Scalars["String"]>
  date_created?: Maybe<Scalars["Date"]>
  date_created_func?: Maybe<datetime_functions>
  date_updated?: Maybe<Scalars["Date"]>
  date_updated_func?: Maybe<datetime_functions>
  id: Scalars["ID"]
  name?: Maybe<Scalars["String"]>
  quote?: Maybe<Scalars["String"]>
  summary?: Maybe<Scalars["String"]>
  user_created?: Maybe<directus_users>
  user_updated?: Maybe<directus_users>
}

export type personasuser_createdArgs = {
  filter?: InputMaybe<directus_users_filter>
  limit?: InputMaybe<Scalars["Int"]>
  offset?: InputMaybe<Scalars["Int"]>
  page?: InputMaybe<Scalars["Int"]>
  search?: InputMaybe<Scalars["String"]>
  sort?: InputMaybe<Array<InputMaybe<Scalars["String"]>>>
}

export type personasuser_updatedArgs = {
  filter?: InputMaybe<directus_users_filter>
  limit?: InputMaybe<Scalars["Int"]>
  offset?: InputMaybe<Scalars["Int"]>
  page?: InputMaybe<Scalars["Int"]>
  search?: InputMaybe<Scalars["String"]>
  sort?: InputMaybe<Array<InputMaybe<Scalars["String"]>>>
}

export type personas_aggregated = {
  __typename?: "personas_aggregated"
  avg?: Maybe<personas_aggregated_fields>
  avgDistinct?: Maybe<personas_aggregated_fields>
  count?: Maybe<personas_aggregated_count>
  countAll?: Maybe<Scalars["Int"]>
  countDistinct?: Maybe<personas_aggregated_count>
  group?: Maybe<Scalars["JSON"]>
  max?: Maybe<personas_aggregated_fields>
  min?: Maybe<personas_aggregated_fields>
  sum?: Maybe<personas_aggregated_fields>
  sumDistinct?: Maybe<personas_aggregated_fields>
}

export type personas_aggregated_count = {
  __typename?: "personas_aggregated_count"
  body?: Maybe<Scalars["Int"]>
  date_created?: Maybe<Scalars["Int"]>
  date_updated?: Maybe<Scalars["Int"]>
  id?: Maybe<Scalars["Int"]>
  name?: Maybe<Scalars["Int"]>
  quote?: Maybe<Scalars["Int"]>
  summary?: Maybe<Scalars["Int"]>
  user_created?: Maybe<Scalars["Int"]>
  user_updated?: Maybe<Scalars["Int"]>
}

export type personas_aggregated_fields = {
  __typename?: "personas_aggregated_fields"
  id?: Maybe<Scalars["Float"]>
}

export type personas_filter = {
  _and?: InputMaybe<Array<InputMaybe<personas_filter>>>
  _or?: InputMaybe<Array<InputMaybe<personas_filter>>>
  body?: InputMaybe<string_filter_operators>
  date_created?: InputMaybe<date_filter_operators>
  date_created_func?: InputMaybe<datetime_function_filter_operators>
  date_updated?: InputMaybe<date_filter_operators>
  date_updated_func?: InputMaybe<datetime_function_filter_operators>
  id?: InputMaybe<number_filter_operators>
  name?: InputMaybe<string_filter_operators>
  quote?: InputMaybe<string_filter_operators>
  summary?: InputMaybe<string_filter_operators>
  user_created?: InputMaybe<directus_users_filter>
  user_updated?: InputMaybe<directus_users_filter>
}

export type plans = {
  __typename?: "plans"
  date_created?: Maybe<Scalars["Date"]>
  date_created_func?: Maybe<datetime_functions>
  date_updated?: Maybe<Scalars["Date"]>
  date_updated_func?: Maybe<datetime_functions>
  id: Scalars["ID"]
  price?: Maybe<Scalars["Int"]>
  status?: Maybe<Scalars["String"]>
  translations?: Maybe<Array<Maybe<plans_translations>>>
  translations_func?: Maybe<count_functions>
  user_created?: Maybe<directus_users>
  user_updated?: Maybe<directus_users>
}

export type planstranslationsArgs = {
  filter?: InputMaybe<plans_translations_filter>
  limit?: InputMaybe<Scalars["Int"]>
  offset?: InputMaybe<Scalars["Int"]>
  page?: InputMaybe<Scalars["Int"]>
  search?: InputMaybe<Scalars["String"]>
  sort?: InputMaybe<Array<InputMaybe<Scalars["String"]>>>
}

export type plansuser_createdArgs = {
  filter?: InputMaybe<directus_users_filter>
  limit?: InputMaybe<Scalars["Int"]>
  offset?: InputMaybe<Scalars["Int"]>
  page?: InputMaybe<Scalars["Int"]>
  search?: InputMaybe<Scalars["String"]>
  sort?: InputMaybe<Array<InputMaybe<Scalars["String"]>>>
}

export type plansuser_updatedArgs = {
  filter?: InputMaybe<directus_users_filter>
  limit?: InputMaybe<Scalars["Int"]>
  offset?: InputMaybe<Scalars["Int"]>
  page?: InputMaybe<Scalars["Int"]>
  search?: InputMaybe<Scalars["String"]>
  sort?: InputMaybe<Array<InputMaybe<Scalars["String"]>>>
}

export type plans_aggregated = {
  __typename?: "plans_aggregated"
  avg?: Maybe<plans_aggregated_fields>
  avgDistinct?: Maybe<plans_aggregated_fields>
  count?: Maybe<plans_aggregated_count>
  countAll?: Maybe<Scalars["Int"]>
  countDistinct?: Maybe<plans_aggregated_count>
  group?: Maybe<Scalars["JSON"]>
  max?: Maybe<plans_aggregated_fields>
  min?: Maybe<plans_aggregated_fields>
  sum?: Maybe<plans_aggregated_fields>
  sumDistinct?: Maybe<plans_aggregated_fields>
}

export type plans_aggregated_count = {
  __typename?: "plans_aggregated_count"
  date_created?: Maybe<Scalars["Int"]>
  date_updated?: Maybe<Scalars["Int"]>
  id?: Maybe<Scalars["Int"]>
  price?: Maybe<Scalars["Int"]>
  status?: Maybe<Scalars["Int"]>
  translations?: Maybe<Scalars["Int"]>
  user_created?: Maybe<Scalars["Int"]>
  user_updated?: Maybe<Scalars["Int"]>
}

export type plans_aggregated_fields = {
  __typename?: "plans_aggregated_fields"
  id?: Maybe<Scalars["Float"]>
  price?: Maybe<Scalars["Float"]>
}

export type plans_filter = {
  _and?: InputMaybe<Array<InputMaybe<plans_filter>>>
  _or?: InputMaybe<Array<InputMaybe<plans_filter>>>
  date_created?: InputMaybe<date_filter_operators>
  date_created_func?: InputMaybe<datetime_function_filter_operators>
  date_updated?: InputMaybe<date_filter_operators>
  date_updated_func?: InputMaybe<datetime_function_filter_operators>
  id?: InputMaybe<number_filter_operators>
  price?: InputMaybe<number_filter_operators>
  status?: InputMaybe<string_filter_operators>
  translations?: InputMaybe<plans_translations_filter>
  translations_func?: InputMaybe<count_function_filter_operators>
  user_created?: InputMaybe<directus_users_filter>
  user_updated?: InputMaybe<directus_users_filter>
}

export type plans_translations = {
  __typename?: "plans_translations"
  id: Scalars["ID"]
  languages_code?: Maybe<Scalars["String"]>
  plan_billing_type?: Maybe<Scalars["String"]>
  plan_description?: Maybe<Scalars["String"]>
  plan_features?: Maybe<Scalars["JSON"]>
  plan_features_func?: Maybe<count_functions>
  plan_features_title?: Maybe<Scalars["String"]>
  plan_name?: Maybe<Scalars["String"]>
  plans_id?: Maybe<plans>
}

export type plans_translationsplans_idArgs = {
  filter?: InputMaybe<plans_filter>
  limit?: InputMaybe<Scalars["Int"]>
  offset?: InputMaybe<Scalars["Int"]>
  page?: InputMaybe<Scalars["Int"]>
  search?: InputMaybe<Scalars["String"]>
  sort?: InputMaybe<Array<InputMaybe<Scalars["String"]>>>
}

export type plans_translations_aggregated = {
  __typename?: "plans_translations_aggregated"
  avg?: Maybe<plans_translations_aggregated_fields>
  avgDistinct?: Maybe<plans_translations_aggregated_fields>
  count?: Maybe<plans_translations_aggregated_count>
  countAll?: Maybe<Scalars["Int"]>
  countDistinct?: Maybe<plans_translations_aggregated_count>
  group?: Maybe<Scalars["JSON"]>
  max?: Maybe<plans_translations_aggregated_fields>
  min?: Maybe<plans_translations_aggregated_fields>
  sum?: Maybe<plans_translations_aggregated_fields>
  sumDistinct?: Maybe<plans_translations_aggregated_fields>
}

export type plans_translations_aggregated_count = {
  __typename?: "plans_translations_aggregated_count"
  id?: Maybe<Scalars["Int"]>
  languages_code?: Maybe<Scalars["Int"]>
  plan_billing_type?: Maybe<Scalars["Int"]>
  plan_description?: Maybe<Scalars["Int"]>
  plan_features?: Maybe<Scalars["Int"]>
  plan_features_title?: Maybe<Scalars["Int"]>
  plan_name?: Maybe<Scalars["Int"]>
  plans_id?: Maybe<Scalars["Int"]>
}

export type plans_translations_aggregated_fields = {
  __typename?: "plans_translations_aggregated_fields"
  id?: Maybe<Scalars["Float"]>
  plans_id?: Maybe<Scalars["Float"]>
}

export type plans_translations_filter = {
  _and?: InputMaybe<Array<InputMaybe<plans_translations_filter>>>
  _or?: InputMaybe<Array<InputMaybe<plans_translations_filter>>>
  id?: InputMaybe<number_filter_operators>
  languages_code?: InputMaybe<string_filter_operators>
  plan_billing_type?: InputMaybe<string_filter_operators>
  plan_description?: InputMaybe<string_filter_operators>
  plan_features?: InputMaybe<string_filter_operators>
  plan_features_func?: InputMaybe<count_function_filter_operators>
  plan_features_title?: InputMaybe<string_filter_operators>
  plan_name?: InputMaybe<string_filter_operators>
  plans_id?: InputMaybe<plans_filter>
}

export type questions = {
  __typename?: "questions"
  category?: Maybe<tags>
  date_created?: Maybe<Scalars["Date"]>
  date_created_func?: Maybe<datetime_functions>
  date_updated?: Maybe<Scalars["Date"]>
  date_updated_func?: Maybe<datetime_functions>
  id: Scalars["ID"]
  sort?: Maybe<Scalars["Int"]>
  status?: Maybe<Scalars["String"]>
  tags?: Maybe<Array<Maybe<questions_tags>>>
  tags_func?: Maybe<count_functions>
  translations?: Maybe<Array<Maybe<questions_translations>>>
  translations_func?: Maybe<count_functions>
  user_created?: Maybe<directus_users>
  user_updated?: Maybe<directus_users>
}

export type questionscategoryArgs = {
  filter?: InputMaybe<tags_filter>
  limit?: InputMaybe<Scalars["Int"]>
  offset?: InputMaybe<Scalars["Int"]>
  page?: InputMaybe<Scalars["Int"]>
  search?: InputMaybe<Scalars["String"]>
  sort?: InputMaybe<Array<InputMaybe<Scalars["String"]>>>
}

export type questionstagsArgs = {
  filter?: InputMaybe<questions_tags_filter>
  limit?: InputMaybe<Scalars["Int"]>
  offset?: InputMaybe<Scalars["Int"]>
  page?: InputMaybe<Scalars["Int"]>
  search?: InputMaybe<Scalars["String"]>
  sort?: InputMaybe<Array<InputMaybe<Scalars["String"]>>>
}

export type questionstranslationsArgs = {
  filter?: InputMaybe<questions_translations_filter>
  limit?: InputMaybe<Scalars["Int"]>
  offset?: InputMaybe<Scalars["Int"]>
  page?: InputMaybe<Scalars["Int"]>
  search?: InputMaybe<Scalars["String"]>
  sort?: InputMaybe<Array<InputMaybe<Scalars["String"]>>>
}

export type questionsuser_createdArgs = {
  filter?: InputMaybe<directus_users_filter>
  limit?: InputMaybe<Scalars["Int"]>
  offset?: InputMaybe<Scalars["Int"]>
  page?: InputMaybe<Scalars["Int"]>
  search?: InputMaybe<Scalars["String"]>
  sort?: InputMaybe<Array<InputMaybe<Scalars["String"]>>>
}

export type questionsuser_updatedArgs = {
  filter?: InputMaybe<directus_users_filter>
  limit?: InputMaybe<Scalars["Int"]>
  offset?: InputMaybe<Scalars["Int"]>
  page?: InputMaybe<Scalars["Int"]>
  search?: InputMaybe<Scalars["String"]>
  sort?: InputMaybe<Array<InputMaybe<Scalars["String"]>>>
}

export type questions_aggregated = {
  __typename?: "questions_aggregated"
  avg?: Maybe<questions_aggregated_fields>
  avgDistinct?: Maybe<questions_aggregated_fields>
  count?: Maybe<questions_aggregated_count>
  countAll?: Maybe<Scalars["Int"]>
  countDistinct?: Maybe<questions_aggregated_count>
  group?: Maybe<Scalars["JSON"]>
  max?: Maybe<questions_aggregated_fields>
  min?: Maybe<questions_aggregated_fields>
  sum?: Maybe<questions_aggregated_fields>
  sumDistinct?: Maybe<questions_aggregated_fields>
}

export type questions_aggregated_count = {
  __typename?: "questions_aggregated_count"
  category?: Maybe<Scalars["Int"]>
  date_created?: Maybe<Scalars["Int"]>
  date_updated?: Maybe<Scalars["Int"]>
  id?: Maybe<Scalars["Int"]>
  sort?: Maybe<Scalars["Int"]>
  status?: Maybe<Scalars["Int"]>
  tags?: Maybe<Scalars["Int"]>
  translations?: Maybe<Scalars["Int"]>
  user_created?: Maybe<Scalars["Int"]>
  user_updated?: Maybe<Scalars["Int"]>
}

export type questions_aggregated_fields = {
  __typename?: "questions_aggregated_fields"
  category?: Maybe<Scalars["Float"]>
  id?: Maybe<Scalars["Float"]>
  sort?: Maybe<Scalars["Float"]>
}

export type questions_filter = {
  _and?: InputMaybe<Array<InputMaybe<questions_filter>>>
  _or?: InputMaybe<Array<InputMaybe<questions_filter>>>
  category?: InputMaybe<tags_filter>
  date_created?: InputMaybe<date_filter_operators>
  date_created_func?: InputMaybe<datetime_function_filter_operators>
  date_updated?: InputMaybe<date_filter_operators>
  date_updated_func?: InputMaybe<datetime_function_filter_operators>
  id?: InputMaybe<number_filter_operators>
  sort?: InputMaybe<number_filter_operators>
  status?: InputMaybe<string_filter_operators>
  tags?: InputMaybe<questions_tags_filter>
  tags_func?: InputMaybe<count_function_filter_operators>
  translations?: InputMaybe<questions_translations_filter>
  translations_func?: InputMaybe<count_function_filter_operators>
  user_created?: InputMaybe<directus_users_filter>
  user_updated?: InputMaybe<directus_users_filter>
}

export type questions_tags = {
  __typename?: "questions_tags"
  id: Scalars["ID"]
  questions_id?: Maybe<questions>
  tags_id?: Maybe<tags>
}

export type questions_tagsquestions_idArgs = {
  filter?: InputMaybe<questions_filter>
  limit?: InputMaybe<Scalars["Int"]>
  offset?: InputMaybe<Scalars["Int"]>
  page?: InputMaybe<Scalars["Int"]>
  search?: InputMaybe<Scalars["String"]>
  sort?: InputMaybe<Array<InputMaybe<Scalars["String"]>>>
}

export type questions_tagstags_idArgs = {
  filter?: InputMaybe<tags_filter>
  limit?: InputMaybe<Scalars["Int"]>
  offset?: InputMaybe<Scalars["Int"]>
  page?: InputMaybe<Scalars["Int"]>
  search?: InputMaybe<Scalars["String"]>
  sort?: InputMaybe<Array<InputMaybe<Scalars["String"]>>>
}

export type questions_tags_aggregated = {
  __typename?: "questions_tags_aggregated"
  avg?: Maybe<questions_tags_aggregated_fields>
  avgDistinct?: Maybe<questions_tags_aggregated_fields>
  count?: Maybe<questions_tags_aggregated_count>
  countAll?: Maybe<Scalars["Int"]>
  countDistinct?: Maybe<questions_tags_aggregated_count>
  group?: Maybe<Scalars["JSON"]>
  max?: Maybe<questions_tags_aggregated_fields>
  min?: Maybe<questions_tags_aggregated_fields>
  sum?: Maybe<questions_tags_aggregated_fields>
  sumDistinct?: Maybe<questions_tags_aggregated_fields>
}

export type questions_tags_aggregated_count = {
  __typename?: "questions_tags_aggregated_count"
  id?: Maybe<Scalars["Int"]>
  questions_id?: Maybe<Scalars["Int"]>
  tags_id?: Maybe<Scalars["Int"]>
}

export type questions_tags_aggregated_fields = {
  __typename?: "questions_tags_aggregated_fields"
  id?: Maybe<Scalars["Float"]>
  questions_id?: Maybe<Scalars["Float"]>
  tags_id?: Maybe<Scalars["Float"]>
}

export type questions_tags_filter = {
  _and?: InputMaybe<Array<InputMaybe<questions_tags_filter>>>
  _or?: InputMaybe<Array<InputMaybe<questions_tags_filter>>>
  id?: InputMaybe<number_filter_operators>
  questions_id?: InputMaybe<questions_filter>
  tags_id?: InputMaybe<tags_filter>
}

export type questions_translations = {
  __typename?: "questions_translations"
  answer?: Maybe<Scalars["String"]>
  id: Scalars["ID"]
  languages_code?: Maybe<Scalars["String"]>
  question?: Maybe<Scalars["String"]>
  questions_id?: Maybe<questions>
}

export type questions_translationsquestions_idArgs = {
  filter?: InputMaybe<questions_filter>
  limit?: InputMaybe<Scalars["Int"]>
  offset?: InputMaybe<Scalars["Int"]>
  page?: InputMaybe<Scalars["Int"]>
  search?: InputMaybe<Scalars["String"]>
  sort?: InputMaybe<Array<InputMaybe<Scalars["String"]>>>
}

export type questions_translations_aggregated = {
  __typename?: "questions_translations_aggregated"
  avg?: Maybe<questions_translations_aggregated_fields>
  avgDistinct?: Maybe<questions_translations_aggregated_fields>
  count?: Maybe<questions_translations_aggregated_count>
  countAll?: Maybe<Scalars["Int"]>
  countDistinct?: Maybe<questions_translations_aggregated_count>
  group?: Maybe<Scalars["JSON"]>
  max?: Maybe<questions_translations_aggregated_fields>
  min?: Maybe<questions_translations_aggregated_fields>
  sum?: Maybe<questions_translations_aggregated_fields>
  sumDistinct?: Maybe<questions_translations_aggregated_fields>
}

export type questions_translations_aggregated_count = {
  __typename?: "questions_translations_aggregated_count"
  answer?: Maybe<Scalars["Int"]>
  id?: Maybe<Scalars["Int"]>
  languages_code?: Maybe<Scalars["Int"]>
  question?: Maybe<Scalars["Int"]>
  questions_id?: Maybe<Scalars["Int"]>
}

export type questions_translations_aggregated_fields = {
  __typename?: "questions_translations_aggregated_fields"
  id?: Maybe<Scalars["Float"]>
  questions_id?: Maybe<Scalars["Float"]>
}

export type questions_translations_filter = {
  _and?: InputMaybe<Array<InputMaybe<questions_translations_filter>>>
  _or?: InputMaybe<Array<InputMaybe<questions_translations_filter>>>
  answer?: InputMaybe<string_filter_operators>
  id?: InputMaybe<number_filter_operators>
  languages_code?: InputMaybe<string_filter_operators>
  question?: InputMaybe<string_filter_operators>
  questions_id?: InputMaybe<questions_filter>
}

export type reviews = {
  __typename?: "reviews"
  children?: Maybe<Array<Maybe<reviews>>>
  children_func?: Maybe<count_functions>
  date_created?: Maybe<Scalars["Date"]>
  date_created_func?: Maybe<datetime_functions>
  date_updated?: Maybe<Scalars["Date"]>
  date_updated_func?: Maybe<datetime_functions>
  ecosystem_id?: Maybe<ecosystem>
  id: Scalars["ID"]
  parent?: Maybe<reviews>
  review?: Maybe<Scalars["String"]>
  sort?: Maybe<Scalars["Int"]>
  status?: Maybe<Scalars["String"]>
  user?: Maybe<Scalars["String"]>
  user_created?: Maybe<directus_users>
  user_updated?: Maybe<directus_users>
  votes?: Maybe<Scalars["Int"]>
}

export type reviewschildrenArgs = {
  filter?: InputMaybe<reviews_filter>
  limit?: InputMaybe<Scalars["Int"]>
  offset?: InputMaybe<Scalars["Int"]>
  page?: InputMaybe<Scalars["Int"]>
  search?: InputMaybe<Scalars["String"]>
  sort?: InputMaybe<Array<InputMaybe<Scalars["String"]>>>
}

export type reviewsecosystem_idArgs = {
  filter?: InputMaybe<ecosystem_filter>
  limit?: InputMaybe<Scalars["Int"]>
  offset?: InputMaybe<Scalars["Int"]>
  page?: InputMaybe<Scalars["Int"]>
  search?: InputMaybe<Scalars["String"]>
  sort?: InputMaybe<Array<InputMaybe<Scalars["String"]>>>
}

export type reviewsparentArgs = {
  filter?: InputMaybe<reviews_filter>
  limit?: InputMaybe<Scalars["Int"]>
  offset?: InputMaybe<Scalars["Int"]>
  page?: InputMaybe<Scalars["Int"]>
  search?: InputMaybe<Scalars["String"]>
  sort?: InputMaybe<Array<InputMaybe<Scalars["String"]>>>
}

export type reviewsuser_createdArgs = {
  filter?: InputMaybe<directus_users_filter>
  limit?: InputMaybe<Scalars["Int"]>
  offset?: InputMaybe<Scalars["Int"]>
  page?: InputMaybe<Scalars["Int"]>
  search?: InputMaybe<Scalars["String"]>
  sort?: InputMaybe<Array<InputMaybe<Scalars["String"]>>>
}

export type reviewsuser_updatedArgs = {
  filter?: InputMaybe<directus_users_filter>
  limit?: InputMaybe<Scalars["Int"]>
  offset?: InputMaybe<Scalars["Int"]>
  page?: InputMaybe<Scalars["Int"]>
  search?: InputMaybe<Scalars["String"]>
  sort?: InputMaybe<Array<InputMaybe<Scalars["String"]>>>
}

export type reviews_aggregated = {
  __typename?: "reviews_aggregated"
  avg?: Maybe<reviews_aggregated_fields>
  avgDistinct?: Maybe<reviews_aggregated_fields>
  count?: Maybe<reviews_aggregated_count>
  countAll?: Maybe<Scalars["Int"]>
  countDistinct?: Maybe<reviews_aggregated_count>
  group?: Maybe<Scalars["JSON"]>
  max?: Maybe<reviews_aggregated_fields>
  min?: Maybe<reviews_aggregated_fields>
  sum?: Maybe<reviews_aggregated_fields>
  sumDistinct?: Maybe<reviews_aggregated_fields>
}

export type reviews_aggregated_count = {
  __typename?: "reviews_aggregated_count"
  children?: Maybe<Scalars["Int"]>
  date_created?: Maybe<Scalars["Int"]>
  date_updated?: Maybe<Scalars["Int"]>
  ecosystem_id?: Maybe<Scalars["Int"]>
  id?: Maybe<Scalars["Int"]>
  parent?: Maybe<Scalars["Int"]>
  review?: Maybe<Scalars["Int"]>
  sort?: Maybe<Scalars["Int"]>
  status?: Maybe<Scalars["Int"]>
  user?: Maybe<Scalars["Int"]>
  user_created?: Maybe<Scalars["Int"]>
  user_updated?: Maybe<Scalars["Int"]>
  votes?: Maybe<Scalars["Int"]>
}

export type reviews_aggregated_fields = {
  __typename?: "reviews_aggregated_fields"
  ecosystem_id?: Maybe<Scalars["Float"]>
  id?: Maybe<Scalars["Float"]>
  parent?: Maybe<Scalars["Float"]>
  sort?: Maybe<Scalars["Float"]>
  votes?: Maybe<Scalars["Float"]>
}

export type reviews_filter = {
  _and?: InputMaybe<Array<InputMaybe<reviews_filter>>>
  _or?: InputMaybe<Array<InputMaybe<reviews_filter>>>
  children?: InputMaybe<reviews_filter>
  children_func?: InputMaybe<count_function_filter_operators>
  date_created?: InputMaybe<date_filter_operators>
  date_created_func?: InputMaybe<datetime_function_filter_operators>
  date_updated?: InputMaybe<date_filter_operators>
  date_updated_func?: InputMaybe<datetime_function_filter_operators>
  ecosystem_id?: InputMaybe<ecosystem_filter>
  id?: InputMaybe<number_filter_operators>
  parent?: InputMaybe<reviews_filter>
  review?: InputMaybe<string_filter_operators>
  sort?: InputMaybe<number_filter_operators>
  status?: InputMaybe<string_filter_operators>
  user?: InputMaybe<string_filter_operators>
  user_created?: InputMaybe<directus_users_filter>
  user_updated?: InputMaybe<directus_users_filter>
  votes?: InputMaybe<number_filter_operators>
}

export type string_filter_operators = {
  _contains?: InputMaybe<Scalars["String"]>
  _empty?: InputMaybe<Scalars["Boolean"]>
  _ends_with?: InputMaybe<Scalars["String"]>
  _eq?: InputMaybe<Scalars["String"]>
  _icontains?: InputMaybe<Scalars["String"]>
  _in?: InputMaybe<Array<InputMaybe<Scalars["String"]>>>
  _ncontains?: InputMaybe<Scalars["String"]>
  _nempty?: InputMaybe<Scalars["Boolean"]>
  _nends_with?: InputMaybe<Scalars["String"]>
  _neq?: InputMaybe<Scalars["String"]>
  _nin?: InputMaybe<Array<InputMaybe<Scalars["String"]>>>
  _nnull?: InputMaybe<Scalars["Boolean"]>
  _nstarts_with?: InputMaybe<Scalars["String"]>
  _null?: InputMaybe<Scalars["Boolean"]>
  _starts_with?: InputMaybe<Scalars["String"]>
}

export type tags = {
  __typename?: "tags"
  children?: Maybe<Array<Maybe<tags>>>
  children_func?: Maybe<count_functions>
  date_created?: Maybe<Scalars["Date"]>
  date_created_func?: Maybe<datetime_functions>
  date_updated?: Maybe<Scalars["Date"]>
  date_updated_func?: Maybe<datetime_functions>
  id: Scalars["ID"]
  parent?: Maybe<tags>
  translations?: Maybe<Array<Maybe<tags_translations>>>
  translations_func?: Maybe<count_functions>
  user_created?: Maybe<directus_users>
  user_updated?: Maybe<directus_users>
}

export type tagschildrenArgs = {
  filter?: InputMaybe<tags_filter>
  limit?: InputMaybe<Scalars["Int"]>
  offset?: InputMaybe<Scalars["Int"]>
  page?: InputMaybe<Scalars["Int"]>
  search?: InputMaybe<Scalars["String"]>
  sort?: InputMaybe<Array<InputMaybe<Scalars["String"]>>>
}

export type tagsparentArgs = {
  filter?: InputMaybe<tags_filter>
  limit?: InputMaybe<Scalars["Int"]>
  offset?: InputMaybe<Scalars["Int"]>
  page?: InputMaybe<Scalars["Int"]>
  search?: InputMaybe<Scalars["String"]>
  sort?: InputMaybe<Array<InputMaybe<Scalars["String"]>>>
}

export type tagstranslationsArgs = {
  filter?: InputMaybe<tags_translations_filter>
  limit?: InputMaybe<Scalars["Int"]>
  offset?: InputMaybe<Scalars["Int"]>
  page?: InputMaybe<Scalars["Int"]>
  search?: InputMaybe<Scalars["String"]>
  sort?: InputMaybe<Array<InputMaybe<Scalars["String"]>>>
}

export type tagsuser_createdArgs = {
  filter?: InputMaybe<directus_users_filter>
  limit?: InputMaybe<Scalars["Int"]>
  offset?: InputMaybe<Scalars["Int"]>
  page?: InputMaybe<Scalars["Int"]>
  search?: InputMaybe<Scalars["String"]>
  sort?: InputMaybe<Array<InputMaybe<Scalars["String"]>>>
}

export type tagsuser_updatedArgs = {
  filter?: InputMaybe<directus_users_filter>
  limit?: InputMaybe<Scalars["Int"]>
  offset?: InputMaybe<Scalars["Int"]>
  page?: InputMaybe<Scalars["Int"]>
  search?: InputMaybe<Scalars["String"]>
  sort?: InputMaybe<Array<InputMaybe<Scalars["String"]>>>
}

export type tags_aggregated = {
  __typename?: "tags_aggregated"
  avg?: Maybe<tags_aggregated_fields>
  avgDistinct?: Maybe<tags_aggregated_fields>
  count?: Maybe<tags_aggregated_count>
  countAll?: Maybe<Scalars["Int"]>
  countDistinct?: Maybe<tags_aggregated_count>
  group?: Maybe<Scalars["JSON"]>
  max?: Maybe<tags_aggregated_fields>
  min?: Maybe<tags_aggregated_fields>
  sum?: Maybe<tags_aggregated_fields>
  sumDistinct?: Maybe<tags_aggregated_fields>
}

export type tags_aggregated_count = {
  __typename?: "tags_aggregated_count"
  children?: Maybe<Scalars["Int"]>
  date_created?: Maybe<Scalars["Int"]>
  date_updated?: Maybe<Scalars["Int"]>
  id?: Maybe<Scalars["Int"]>
  parent?: Maybe<Scalars["Int"]>
  translations?: Maybe<Scalars["Int"]>
  user_created?: Maybe<Scalars["Int"]>
  user_updated?: Maybe<Scalars["Int"]>
}

export type tags_aggregated_fields = {
  __typename?: "tags_aggregated_fields"
  id?: Maybe<Scalars["Float"]>
  parent?: Maybe<Scalars["Float"]>
}

export type tags_filter = {
  _and?: InputMaybe<Array<InputMaybe<tags_filter>>>
  _or?: InputMaybe<Array<InputMaybe<tags_filter>>>
  children?: InputMaybe<tags_filter>
  children_func?: InputMaybe<count_function_filter_operators>
  date_created?: InputMaybe<date_filter_operators>
  date_created_func?: InputMaybe<datetime_function_filter_operators>
  date_updated?: InputMaybe<date_filter_operators>
  date_updated_func?: InputMaybe<datetime_function_filter_operators>
  id?: InputMaybe<number_filter_operators>
  parent?: InputMaybe<tags_filter>
  translations?: InputMaybe<tags_translations_filter>
  translations_func?: InputMaybe<count_function_filter_operators>
  user_created?: InputMaybe<directus_users_filter>
  user_updated?: InputMaybe<directus_users_filter>
}

export type tags_translations = {
  __typename?: "tags_translations"
  display?: Maybe<Scalars["String"]>
  id: Scalars["ID"]
  languages_code?: Maybe<Scalars["String"]>
  name?: Maybe<Scalars["String"]>
  tags_id?: Maybe<tags>
}

export type tags_translationstags_idArgs = {
  filter?: InputMaybe<tags_filter>
  limit?: InputMaybe<Scalars["Int"]>
  offset?: InputMaybe<Scalars["Int"]>
  page?: InputMaybe<Scalars["Int"]>
  search?: InputMaybe<Scalars["String"]>
  sort?: InputMaybe<Array<InputMaybe<Scalars["String"]>>>
}

export type tags_translations_aggregated = {
  __typename?: "tags_translations_aggregated"
  avg?: Maybe<tags_translations_aggregated_fields>
  avgDistinct?: Maybe<tags_translations_aggregated_fields>
  count?: Maybe<tags_translations_aggregated_count>
  countAll?: Maybe<Scalars["Int"]>
  countDistinct?: Maybe<tags_translations_aggregated_count>
  group?: Maybe<Scalars["JSON"]>
  max?: Maybe<tags_translations_aggregated_fields>
  min?: Maybe<tags_translations_aggregated_fields>
  sum?: Maybe<tags_translations_aggregated_fields>
  sumDistinct?: Maybe<tags_translations_aggregated_fields>
}

export type tags_translations_aggregated_count = {
  __typename?: "tags_translations_aggregated_count"
  display?: Maybe<Scalars["Int"]>
  id?: Maybe<Scalars["Int"]>
  languages_code?: Maybe<Scalars["Int"]>
  name?: Maybe<Scalars["Int"]>
  tags_id?: Maybe<Scalars["Int"]>
}

export type tags_translations_aggregated_fields = {
  __typename?: "tags_translations_aggregated_fields"
  id?: Maybe<Scalars["Float"]>
  tags_id?: Maybe<Scalars["Float"]>
}

export type tags_translations_filter = {
  _and?: InputMaybe<Array<InputMaybe<tags_translations_filter>>>
  _or?: InputMaybe<Array<InputMaybe<tags_translations_filter>>>
  display?: InputMaybe<string_filter_operators>
  id?: InputMaybe<number_filter_operators>
  languages_code?: InputMaybe<string_filter_operators>
  name?: InputMaybe<string_filter_operators>
  tags_id?: InputMaybe<tags_filter>
}

export type testimonials = {
  __typename?: "testimonials"
  avatar?: Maybe<directus_files>
  company?: Maybe<Scalars["String"]>
  date_created?: Maybe<Scalars["Date"]>
  date_created_func?: Maybe<datetime_functions>
  date_updated?: Maybe<Scalars["Date"]>
  date_updated_func?: Maybe<datetime_functions>
  id: Scalars["ID"]
  speaker?: Maybe<Scalars["String"]>
  status?: Maybe<Scalars["String"]>
  title?: Maybe<Scalars["String"]>
  translations?: Maybe<Array<Maybe<testimonials_translations>>>
  translations_func?: Maybe<count_functions>
  user_created?: Maybe<directus_users>
  user_updated?: Maybe<directus_users>
}

export type testimonialsavatarArgs = {
  filter?: InputMaybe<directus_files_filter>
  limit?: InputMaybe<Scalars["Int"]>
  offset?: InputMaybe<Scalars["Int"]>
  page?: InputMaybe<Scalars["Int"]>
  search?: InputMaybe<Scalars["String"]>
  sort?: InputMaybe<Array<InputMaybe<Scalars["String"]>>>
}

export type testimonialstranslationsArgs = {
  filter?: InputMaybe<testimonials_translations_filter>
  limit?: InputMaybe<Scalars["Int"]>
  offset?: InputMaybe<Scalars["Int"]>
  page?: InputMaybe<Scalars["Int"]>
  search?: InputMaybe<Scalars["String"]>
  sort?: InputMaybe<Array<InputMaybe<Scalars["String"]>>>
}

export type testimonialsuser_createdArgs = {
  filter?: InputMaybe<directus_users_filter>
  limit?: InputMaybe<Scalars["Int"]>
  offset?: InputMaybe<Scalars["Int"]>
  page?: InputMaybe<Scalars["Int"]>
  search?: InputMaybe<Scalars["String"]>
  sort?: InputMaybe<Array<InputMaybe<Scalars["String"]>>>
}

export type testimonialsuser_updatedArgs = {
  filter?: InputMaybe<directus_users_filter>
  limit?: InputMaybe<Scalars["Int"]>
  offset?: InputMaybe<Scalars["Int"]>
  page?: InputMaybe<Scalars["Int"]>
  search?: InputMaybe<Scalars["String"]>
  sort?: InputMaybe<Array<InputMaybe<Scalars["String"]>>>
}

export type testimonials_aggregated = {
  __typename?: "testimonials_aggregated"
  avg?: Maybe<testimonials_aggregated_fields>
  avgDistinct?: Maybe<testimonials_aggregated_fields>
  count?: Maybe<testimonials_aggregated_count>
  countAll?: Maybe<Scalars["Int"]>
  countDistinct?: Maybe<testimonials_aggregated_count>
  group?: Maybe<Scalars["JSON"]>
  max?: Maybe<testimonials_aggregated_fields>
  min?: Maybe<testimonials_aggregated_fields>
  sum?: Maybe<testimonials_aggregated_fields>
  sumDistinct?: Maybe<testimonials_aggregated_fields>
}

export type testimonials_aggregated_count = {
  __typename?: "testimonials_aggregated_count"
  avatar?: Maybe<Scalars["Int"]>
  company?: Maybe<Scalars["Int"]>
  date_created?: Maybe<Scalars["Int"]>
  date_updated?: Maybe<Scalars["Int"]>
  id?: Maybe<Scalars["Int"]>
  speaker?: Maybe<Scalars["Int"]>
  status?: Maybe<Scalars["Int"]>
  title?: Maybe<Scalars["Int"]>
  translations?: Maybe<Scalars["Int"]>
  user_created?: Maybe<Scalars["Int"]>
  user_updated?: Maybe<Scalars["Int"]>
}

export type testimonials_aggregated_fields = {
  __typename?: "testimonials_aggregated_fields"
  id?: Maybe<Scalars["Float"]>
}

export type testimonials_filter = {
  _and?: InputMaybe<Array<InputMaybe<testimonials_filter>>>
  _or?: InputMaybe<Array<InputMaybe<testimonials_filter>>>
  avatar?: InputMaybe<directus_files_filter>
  company?: InputMaybe<string_filter_operators>
  date_created?: InputMaybe<date_filter_operators>
  date_created_func?: InputMaybe<datetime_function_filter_operators>
  date_updated?: InputMaybe<date_filter_operators>
  date_updated_func?: InputMaybe<datetime_function_filter_operators>
  id?: InputMaybe<number_filter_operators>
  speaker?: InputMaybe<string_filter_operators>
  status?: InputMaybe<string_filter_operators>
  title?: InputMaybe<string_filter_operators>
  translations?: InputMaybe<testimonials_translations_filter>
  translations_func?: InputMaybe<count_function_filter_operators>
  user_created?: InputMaybe<directus_users_filter>
  user_updated?: InputMaybe<directus_users_filter>
}

export type testimonials_translations = {
  __typename?: "testimonials_translations"
  id: Scalars["ID"]
  languages_code?: Maybe<Scalars["String"]>
  quote?: Maybe<Scalars["String"]>
  testimonials_id?: Maybe<testimonials>
}

export type testimonials_translationstestimonials_idArgs = {
  filter?: InputMaybe<testimonials_filter>
  limit?: InputMaybe<Scalars["Int"]>
  offset?: InputMaybe<Scalars["Int"]>
  page?: InputMaybe<Scalars["Int"]>
  search?: InputMaybe<Scalars["String"]>
  sort?: InputMaybe<Array<InputMaybe<Scalars["String"]>>>
}

export type testimonials_translations_aggregated = {
  __typename?: "testimonials_translations_aggregated"
  avg?: Maybe<testimonials_translations_aggregated_fields>
  avgDistinct?: Maybe<testimonials_translations_aggregated_fields>
  count?: Maybe<testimonials_translations_aggregated_count>
  countAll?: Maybe<Scalars["Int"]>
  countDistinct?: Maybe<testimonials_translations_aggregated_count>
  group?: Maybe<Scalars["JSON"]>
  max?: Maybe<testimonials_translations_aggregated_fields>
  min?: Maybe<testimonials_translations_aggregated_fields>
  sum?: Maybe<testimonials_translations_aggregated_fields>
  sumDistinct?: Maybe<testimonials_translations_aggregated_fields>
}

export type testimonials_translations_aggregated_count = {
  __typename?: "testimonials_translations_aggregated_count"
  id?: Maybe<Scalars["Int"]>
  languages_code?: Maybe<Scalars["Int"]>
  quote?: Maybe<Scalars["Int"]>
  testimonials_id?: Maybe<Scalars["Int"]>
}

export type testimonials_translations_aggregated_fields = {
  __typename?: "testimonials_translations_aggregated_fields"
  id?: Maybe<Scalars["Float"]>
  testimonials_id?: Maybe<Scalars["Float"]>
}

export type testimonials_translations_filter = {
  _and?: InputMaybe<Array<InputMaybe<testimonials_translations_filter>>>
  _or?: InputMaybe<Array<InputMaybe<testimonials_translations_filter>>>
  id?: InputMaybe<number_filter_operators>
  languages_code?: InputMaybe<string_filter_operators>
  quote?: InputMaybe<string_filter_operators>
  testimonials_id?: InputMaybe<testimonials_filter>
}

export type update_directus_files_input = {
  charset?: InputMaybe<Scalars["String"]>
  description?: InputMaybe<Scalars["String"]>
  duration?: InputMaybe<Scalars["Int"]>
  embed?: InputMaybe<Scalars["String"]>
  filename_disk?: InputMaybe<Scalars["String"]>
  filename_download?: InputMaybe<Scalars["String"]>
  filesize?: InputMaybe<Scalars["GraphQLBigInt"]>
  folder?: InputMaybe<update_directus_folders_input>
  height?: InputMaybe<Scalars["Int"]>
  id?: InputMaybe<Scalars["ID"]>
  location?: InputMaybe<Scalars["String"]>
  metadata?: InputMaybe<Scalars["JSON"]>
  modified_by?: InputMaybe<update_directus_users_input>
  modified_on?: InputMaybe<Scalars["Date"]>
  storage?: InputMaybe<Scalars["String"]>
  tags?: InputMaybe<Scalars["JSON"]>
  title?: InputMaybe<Scalars["String"]>
  type?: InputMaybe<Scalars["String"]>
  uploaded_by?: InputMaybe<update_directus_users_input>
  uploaded_on?: InputMaybe<Scalars["Date"]>
  width?: InputMaybe<Scalars["Int"]>
}

export type update_directus_folders_input = {
  id?: InputMaybe<Scalars["ID"]>
  name?: InputMaybe<Scalars["String"]>
  parent?: InputMaybe<update_directus_folders_input>
}

export type update_directus_users_input = {
  avatar?: InputMaybe<update_directus_files_input>
  description?: InputMaybe<Scalars["String"]>
  email?: InputMaybe<Scalars["String"]>
  first_name?: InputMaybe<Scalars["String"]>
  language?: InputMaybe<Scalars["String"]>
  last_name?: InputMaybe<Scalars["String"]>
  location?: InputMaybe<Scalars["String"]>
  password?: InputMaybe<Scalars["Hash"]>
  tfa_secret?: InputMaybe<Scalars["Hash"]>
  theme?: InputMaybe<Scalars["String"]>
  title?: InputMaybe<Scalars["String"]>
}

export type update_ecosystem_input = {
  date_created?: InputMaybe<Scalars["Date"]>
  date_updated?: InputMaybe<Scalars["Date"]>
  discord?: InputMaybe<Scalars["String"]>
  featured?: InputMaybe<Scalars["Boolean"]>
  id?: InputMaybe<Scalars["ID"]>
  name?: InputMaybe<Scalars["String"]>
  pocket_approved?: InputMaybe<Scalars["Boolean"]>
  sort?: InputMaybe<Scalars["Int"]>
  status?: InputMaybe<Scalars["String"]>
  tags?: InputMaybe<Scalars["Int"]>
  thumbnail?: InputMaybe<update_directus_files_input>
  user_created?: InputMaybe<update_directus_users_input>
  user_updated?: InputMaybe<update_directus_users_input>
  votes?: InputMaybe<Scalars["Int"]>
  website?: InputMaybe<Scalars["String"]>
}

export type getQuestionsQueryVariables = Exact<{
  filter?: InputMaybe<questions_filter>
  limit?: InputMaybe<Scalars["Int"]>
  offset?: InputMaybe<Scalars["Int"]>
  page?: InputMaybe<Scalars["Int"]>
  search?: InputMaybe<Scalars["String"]>
  sort?: InputMaybe<Array<InputMaybe<Scalars["String"]>> | InputMaybe<Scalars["String"]>>
  language?: InputMaybe<Scalars["String"]>
}>

export type getQuestionsQuery = {
  __typename?: "Query"
  questions: Array<{
    __typename?: "questions"
    id: string
    status?: string | null
    category?: {
      __typename?: "tags"
      id: string
      translations?: Array<{
        __typename?: "tags_translations"
        name?: string | null
        display?: string | null
      } | null> | null
    } | null
    translations?: Array<{
      __typename?: "questions_translations"
      answer?: string | null
      question?: string | null
    } | null> | null
  }>
}

export type getLegalQueryVariables = Exact<{
  language?: InputMaybe<Scalars["String"]>
}>

export type getLegalQuery = {
  __typename?: "Query"
  legal_by_id?: {
    __typename?: "legal"
    category?: {
      __typename?: "tags"
      id: string
      translations?: Array<{
        __typename?: "tags_translations"
        name?: string | null
        display?: string | null
      } | null> | null
    } | null
    translations?: Array<{
      __typename?: "legal_translations"
      name?: string | null
      body?: string | null
    } | null> | null
  } | null
}

export const getQuestionsDocument = gql`
  query getQuestions(
    $filter: questions_filter
    $limit: Int
    $offset: Int
    $page: Int
    $search: String
    $sort: [String]
    $language: String
  ) {
    questions(
      filter: $filter
      limit: $limit
      offset: $offset
      page: $page
      search: $search
      sort: $sort
    ) {
      id
      category {
        id
        translations(filter: { languages_code: { _eq: $language } }) {
          name
          display
        }
      }
      status
      translations(filter: { languages_code: { _eq: $language } }) {
        answer
        question
      }
    }
  }
`
export const getLegalDocument = gql`
  query getLegal($language: String) {
    legal_by_id(id: 1) {
      category {
        id
        translations(filter: { languages_code: { _eq: $language } }) {
          name
          display
        }
      }
      translations(filter: { languages_code: { _eq: $language } }) {
        name
        body
      }
    }
  }
`

export type SdkFunctionWrapper = <T>(
  action: (requestHeaders?: Record<string, string>) => Promise<T>,
  operationName: string,
  operationType?: string,
) => Promise<T>

const defaultWrapper: SdkFunctionWrapper = (action, _operationName, _operationType) =>
  action()

export function getSdk(
  client: GraphQLClient,
  withWrapper: SdkFunctionWrapper = defaultWrapper,
) {
  return {
    getQuestions(
      variables?: getQuestionsQueryVariables,
      requestHeaders?: Dom.RequestInit["headers"],
    ): Promise<getQuestionsQuery> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.request<getQuestionsQuery>(getQuestionsDocument, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders,
          }),
        "getQuestions",
        "query",
      )
    },
    getLegal(
      variables?: getLegalQueryVariables,
      requestHeaders?: Dom.RequestInit["headers"],
    ): Promise<getLegalQuery> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.request<getLegalQuery>(getLegalDocument, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders,
          }),
        "getLegal",
        "query",
      )
    },
  }
}
export type Sdk = ReturnType<typeof getSdk>
