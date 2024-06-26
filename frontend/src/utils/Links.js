import board from "../assets/icons/board.svg";
import boardDark from "../assets/icons/boardDark.svg";
import database from "../assets/icons/database.svg";
import databaseDark from "../assets/icons/databaseDark.svg";
import settings from "../assets/icons/settings.svg";
import settingsDark from "../assets/icons/settingsDark.svg";
export const Links = [
  { text: "Board", path: ".", icon: board, darkIcon: boardDark },
  {
    text: "Analytics",
    path: "/home/analytics",
    icon: database,
    darkIcon: databaseDark,
  },
  {
    text: "Settings",
    path: "/home/settings",
    icon: settings,
    darkIcon: settingsDark,
  },
];
