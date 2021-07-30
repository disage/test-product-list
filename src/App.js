import { BrowserRouter, Route } from 'react-router-dom'
import './App.css'
import Main from './pages/Main/Main'
import ProductPage from './pages/ProductPage/ProductPage'
const App = () => {
	return (
		<div className="App">
			<BrowserRouter>
				<Route path="/" exact component={Main} />
				<Route path="/product" component={ProductPage} />
			</BrowserRouter>
		</div>
	)
}

export default App
