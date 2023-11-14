import {BrowserRouter as Router,Routes,Route,} from "react-router-dom"
import App from "./App"

const MyRoute = ()=>{
    return(
        <Router>
            <Routes>
                <Route path="/" exact Component={App}/>
            </Routes>
        </Router>
    )
}

export default MyRoute