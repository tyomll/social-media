export interface UserDataType {
  avatar: string,
  coverImage: string,
  id: string,
  firstName: string,
  lastName: string,
  email: string,
  createdAt: string,
  username: string
  friends: string[]
  friendRequests?: string[]
}