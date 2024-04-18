import { en_aside_qa } from "./components/aside_qa";
import { en_room_code } from "./components/room_code";
import { en_home } from "./pages/home";
import { en_new_room } from "./pages/new_room";
import { en_room } from "./pages/room";

const english = {
  // Pages
  ...en_home,
  ...en_new_room,
  ...en_room,
  // Components
  ...en_aside_qa,
  ...en_room_code
}


export { english }
