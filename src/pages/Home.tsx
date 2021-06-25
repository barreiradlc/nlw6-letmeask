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


function Home() {
  const { Toast } = useModal()
  const { user, signInWithGoogle } = useAuth()
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
      alert("Ops, sala inexistente. Confira o código e tente novamente :/")
      return;
    }

    if (roomRef.val().endedAt) {
      return Toast.fire({
        icon: 'error',
        title: 'Sala encerrada!'
      })
    }

    history.push(`/rooms/${roomCode}`)

  }

  return (
    <div id="page-auth">
      <aside>
        <img src={illustraImg} alt="Ilustração simbolizando perguntas e respostas" />
        <strong>Crie salas de Q&amp;A ao vivo</strong>
        <p>Tire as dúvidas da sua audiência em tempo-real</p>
      </aside>
      <main>
        <div className="main-content">
          <img src={logoImg} alt="Letmeask" />
          <button className="create-room" onClick={handleCreateRoom}>
            <img src={googleIcon} alt="Logo do google" />
            Crie sua sala com o Google
          </button>
          <div className="separator">ou entre em uma sala</div>
          <form onSubmit={handleJoinRoom}>
            <input
              type="text"
              placeholder="Digite o código da sala"
              value={roomCode}
              onChange={event => setRoomCode(event.target.value)}
            />
            <Button type="submit">
              Entrar na sala
            </Button>
          </form>
        </div>
      </main>
    </div>
  )
}


export { Home }