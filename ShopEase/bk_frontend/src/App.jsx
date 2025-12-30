import './App.css'
import HeroSection from './components/herosection/HeroSection'
import Navigation from './components/navigation/Navigation'
import NewArrival from './components/sections/NewArrival'

function App() {

  return (
    <>
    <div className="App">
      <Navigation />
      <HeroSection />
      <NewArrival />
    </div>
    </>
  )
}

export default App
