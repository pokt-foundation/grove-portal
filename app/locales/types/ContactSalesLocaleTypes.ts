type ContactSalesFormFields = {
  label: string
  placeholder: string
}

export type ContactSalesForm = {
  firstName: ContactSalesFormFields
  lastName: ContactSalesFormFields
  email: ContactSalesFormFields
  company: ContactSalesFormFields
  chains: ContactSalesFormFields
  relays: ContactSalesFormFields
  tellUsMore: ContactSalesFormFields
  submitting: string
  submit: string
}

export type ContactSalesView = {
  title: string
  description: string
  formSubmitted: string
  done: string
  formSubmissionFailed: string
}
