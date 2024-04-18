import illustraImg from "../assets/images/illustration.svg"
import logoImg from "../assets/images/logo.svg"
import googleIcon from "../assets/images/google-icon.svg"
import { Button } from "../components/Button"
import { useHistory } from "react-router-dom"
import { useAuth } from "../hooks/useAuth"

import "../styles/auth.scss"
import { useState } from "react"
import { FormEvent } from "react"
import { database } from "../services/firebase"
import { useModal } from "../hooks/useModal"
import { useLocale } from "../hooks/useLocale"
import { AsideQA } from "../components/AsideQA"

function Home() {
  const { Toast } = useModal()
  const { user, signInWithGoogle } = useAuth()
  const { t } = useLocale()

  const [roomCode, setRoomCode] = useState('')

  const history = useHistory()

  async function handleCreateRoom() {
    if (!user) {
      await signInWithGoogle()
    }

    history.push("/rooms/new")
  }

  async function handleJoinRoom(event: FormEvent) {
    event.preventDefault()

    if (roomCode.trim() === '') {
      return;
    }

    const roomRef = await database.ref(`rooms/${roomCode}`).get()

    if (!roomRef.exists()) {
      return Toast.fire({
        icon: 'error',
        title: t('Home error join room')
      })
    }

    if (roomRef.val().endedAt) {
      return Toast.fire({
        icon: 'error',
        title: t('Home error join finished room')
      })
    }

    history.push(`/rooms/${roomCode}`)

  }

  return (
    <div id="page-auth">

      <AsideQA />

      <main>
        <div className="main-content">
          <img src={logoImg} alt="Letmeask" />
          <button className="create-room" onClick={handleCreateRoom}>
            <img src={googleIcon} alt={t('Home google logo')} />
            {t('Home create room-w-google')}
          </button>
          <div className="separator">{t('Home or join room')}</div>
          <form onSubmit={handleJoinRoom}>
            <input
              type="text"
              placeholder={t('Home join room placeholder')}
              value={roomCode}
              onChange={event => setRoomCode(event.target.value)}
            />
            <Button type="submit">
              {t('Home join room button')}
            </Button>
          </form>
        </div>
      </main>
    </div>
  )
}


export { Home }