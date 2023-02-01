export interface CommentDataType {
  id: string,
  author: {
    id: string
  }
  postId: string,
  date: number,
  comment: string
}