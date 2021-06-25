import { FormEvent, useEffect, useState } from "react"
import Swal from "sweetalert2"
import { useHistory, useParams } from "react-router-dom"
import logoImg from "../assets/images/logo.svg"
import deleteImage from "../assets/images/delete.svg"
import { Button } from "../components/Button"
import { Question } from "../components/Question"
import { RoomCode } from "../components/RoomCode"
import { useAuth } from "../hooks/useAuth"
import { useRoom } from "../hooks/useRoom"
import { database } from "../services/firebase"

import "../styles/room.scss"

type RoomParams = {
  id: string
}

function AdminRoom() {
  const history = useHistory()
  // const { user } = useAuth()  
  
  const params = useParams<RoomParams>()
  const roomId = params?.id;

  const { questions, title } = useRoom(roomId)

  async function handleEndRoom() {
    await database.ref(`rooms/${roomId}`).update({
      endedAt: new Date()
    })

    history.push("/")
  }

  async function handleDeleteQuestion(questionId: string) {
    const { isConfirmed } = await Swal.fire({
      title: "Tem certeza que você deseja remover esta pergunta?",
      showCancelButton: true,
      confirmButtonText: "Sim",
      confirmButtonColor: "#e558f9",
      cancelButtonText: "Não",
    })

    console.log(isConfirmed)

    if(isConfirmed) {
      await database.ref(`rooms/${roomId}/questions/${questionId}`).remove()
    }
  }

  return(
    <div id="page-room">
      <header>
        <div className="content">
          <img src={logoImg} alt="Logo" />
          <div>
            <RoomCode code={roomId} />
            <Button onClick={handleEndRoom} isOutlined>Encerrar sala</Button>
          </div>
        </div>
      </header>

      <main className="content">
        <div className="room-title">
          <h1>Sala {title}</h1>
          <span>{questions.length || 0} perguntas</span>
        </div>

       
        {questions.map(question => {
          return (
            <div className="question-list" key={question.id}>
              <Question author={question.author} content={question.content} >
                <button type="button" onClick={() => handleDeleteQuestion(question.id)}>
                  <img src={deleteImage} alt="Remover pergunta" />
                </button>
              </Question>
            </div>
          )
        })}

      </main>

    </div>
  )
}


export { AdminRoom }