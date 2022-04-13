import IComment from '@/types/IComment'

export default interface IPost {
  userId: number
  id: number
  title: string
  body: string
  comments: IComment[]
}
