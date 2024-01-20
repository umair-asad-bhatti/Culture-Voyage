
import {useState} from 'react'
import RoutesContainer from "./pages/Routes/RoutesContainer"
import {ThemeController} from "./components/DarkToggler.jsx";
export default function App() {
  const [darkMode, setDarkMode] = useState(false)
  return (
    <div className={`${darkMode?"dark": ""}`}>
        <ThemeController darkMode={darkMode} setDarkMode={setDarkMode}/>
        <div className=' h-full'>
            <RoutesContainer />
        </div>
    </div >
  )
}
