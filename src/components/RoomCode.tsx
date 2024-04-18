import codyImg from "../assets/images/copy.svg"
import { useLocale } from "../hooks/useLocale"

import "../styles/room-code.scss"

type RoomCodeProps = {
  code: string
}

function RoomCode({ code } : RoomCodeProps){
  const { t } = useLocale()

  function copyRoomCodeToClipboard() {
      navigator.clipboard.writeText(code)
  }

  return (
    <button className="room-code" onClick={copyRoomCodeToClipboard}>
      <div>
        <img src={codyImg} alt="Copy room code" />
      </div>
      <span>{t('Room code label')} #{code}</span>
    </button>
  )
}


export { RoomCode }