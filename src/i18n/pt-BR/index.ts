import { pt_br_aside_qa } from "./components/aside_qa";
import { pt_br_room_code } from "./components/room_code";
import { pt_br_home } from "./pages/home";
import { pt_br_new_room } from "./pages/new_room";
import { pt_br_room } from "./pages/room";

const portuguese = {
  // Pages
  ...pt_br_home,
  ...pt_br_new_room,
  ...pt_br_room,
  // Components
  ...pt_br_aside_qa,
  ...pt_br_room_code
}


export { portuguese }
