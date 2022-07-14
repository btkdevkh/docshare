import '../assets/css/OnlineUsers.css'
import useCollection from '../hooks/useCollection'
import Avatar from './Avatar'

export default function OnlineUsers() {
  const { error, documents } = useCollection('users', false)

  return (
    <div className='user-list'>
      <h3>Who online ?</h3>
      {error && <div className='error'>{error}</div>}
      {documents && documents.map(user => (
        <div key={user.id}>
          {user.online && <span className='online'></span>}
          <span>{user.displayName}</span>
          <Avatar user={user} />
        </div>
      ))}
    </div>
  )
}
