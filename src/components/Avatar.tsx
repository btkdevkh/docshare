import { User } from 'firebase/auth'
import '../assets/css/Avatar.css'

type Props = {
  user: User
}

export default function Avatar({ user }: Props) {
  return (
    <div className="avatar">
      <img src={user.photoURL as string} alt="user avatar" />
    </div>
  )
}
