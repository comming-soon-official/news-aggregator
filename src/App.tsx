import Navbar from './layout/Navbar'
import Home from './pages/home'

const App = () => {
    return (
        <div className="h-full px-2 bg-gray-100 lg:px-32">
            <Navbar />
            <Home />
        </div>
    )
}

export default App
