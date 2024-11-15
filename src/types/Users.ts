export type LoginBody = {
  user: {
    email: Nullable<string>
    password: Nullable<string>
  }
}

export type RegisterBody = {
  user: {
    username: Nullable<string>
    email: Nullable<string>
    password: Nullable<string>
  }
}

export type Auth = {
  user: User
}
export type User = {
  id: number
  email: string
  username: string
  bio?: null
  image: string
  token: string
}
