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
import { useLocale } from "../hooks/useLocale"

type RoomParams = {
  id: string
}

function AdminRoom() {
  const history = useHistory()
  const { t } = useLocale()
  const { user } = useAuth()  
  
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
      title: t('Admin confirmation remove question'),
      showCancelButton: true,
      confirmButtonText: t('Admin confirmation remove question yes'),
      confirmButtonColor: "#e558f9",
      cancelButtonText: t("Admin confirmation remove question no"),
    })

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
            <Button onClick={handleEndRoom} isOutlined>{t('Admin terminate room')}</Button>
          </div>
        </div>
      </header>

      <main className="content">
        <div className="room-title">
          <h1>{t('Admin room label')} : {title}</h1>
          <span>{questions.length || 0} {t('Admin room questions')}</span>
        </div>

       
        {questions.map(question => {
          return (
            <div className="question-list" key={question.id}>
              <Question author={question.author} content={question.content} >
                <button type="button" onClick={() => handleDeleteQuestion(question.id)}>
                  <img src={deleteImage} alt={t('Admin remove question')} />
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