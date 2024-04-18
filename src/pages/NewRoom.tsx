import illustraImg from "../assets/images/illustration.svg"
import logoImg from "../assets/images/logo.svg"
import "../styles/auth.scss"

import { Button } from "../components/Button"
import { Link, useHistory } from "react-router-dom"
import { useAuth } from "../hooks/useAuth"
import { FormEvent, useState } from "react"
import { database } from "../services/firebase"
import { AsideQA } from "../components/AsideQA"
import { useLocale } from "../hooks/useLocale"
import { useModal } from "../hooks/useModal"

function NewRoom(){
  const history = useHistory()
  const { user } = useAuth()
  const { Toast } = useModal()
  const { t } = useLocale()

  const [newRoom, setNewRoom] = useState('')

  async function handleCreateRoom(event: FormEvent){
    event.preventDefault()

    if(newRoom.trim() === ''){
      return Toast.fire({
        icon: 'error',
        title: t('New room error join room')
      })
    }

    const roomRef = database.ref('rooms')

    const firebaseRoom = await roomRef.push({
      title: newRoom,
      authorId: user?.id
    })

    history.push(`/admin/rooms/${firebaseRoom.key}`)
  }

  return (
    <div id="page-auth">
    <AsideQA />

    <main>
      <div className="main-content">
        <img src={logoImg} alt="Letmeask" />
        <h1>{user?.name}</h1>
        <h2>{t('New Room create')}</h2>
        <form onSubmit={handleCreateRoom}>
          <input 
            onChange={event => setNewRoom(event.target.value)}
            type="text"
            value={newRoom}
            placeholder={t('New Room name placeholder')}
          />
          <Button type="submit" >
            {t('New Room button submit')}
          </Button>          
        </form>
        <p>
          {t('New Room existing room advice')} <Link to="/">{t('New Room existing room link')}</Link>
        </p>
      </div>
    </main>
  </div>
  )
}

export { NewRoom }