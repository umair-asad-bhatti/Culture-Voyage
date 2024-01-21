

import RoutesContainer from "./pages/Routes/RoutesContainer"
import { ThemeController } from "./components/DaktToggler/DarkToggler"
import { useState } from 'react'
export default function App() {
  const [darkMode, setDarkMode] = useState(false)
  return (
    <div className={`${darkMode ? "dark" : ""}`}>

      <ThemeController darkMode={darkMode} setDarkMode={setDarkMode} />
      <RoutesContainer />
    </div >
  )
}
