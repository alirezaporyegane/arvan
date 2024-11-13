export const rules = {
  required: (value: string) => !!value || 'Required field',
  min_value: (value: any, count: number) =>
    value?.length >= count || `Field must be grater than ${count} or `,
  email: (value: string) =>
    !!String(value)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      ) || 'Email is not correct'
}
