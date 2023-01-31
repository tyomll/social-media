export interface PostDataType {
  id: string
  author: {
    id: string
  }
  date: number,
  image: string,
  likes: string[],
  text: string
}