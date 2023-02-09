export interface MessageDataType {
  id: string
  date: number
  senderID: string
  image: string
  text: string
  messages: {
    text: string;
    image: any;
  }
}