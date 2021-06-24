import codyImg from "../assets/images/copy.svg"

import "../styles/room-code.scss"

type RoomCodeProps = {
  code: string
}

function RoomCode({ code } : RoomCodeProps){

  function copyRoomCodeToClipboard() {
      navigator.clipboard.writeText(code)
  }

  return (
    <button className="room-code" onClick={copyRoomCodeToClipboard}>
      <div>
        <img src={codyImg} alt="Copy room code" />
      </div>
      <span>Sala #{code}</span>
    </button>
  )
}


export { RoomCode }