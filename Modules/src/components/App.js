import { useState, useEffect } from 'react'
import Banner from './Banner'
import logo from '../assets/logo.png'
import Cart from './Cart'
import Footer from './Footer'
import ShoppingList from './ShoppingList'
import '../styles/Layout.css'
import BarChart from './BarChart'
import Doughnut from './Doughnut'
import StackedBar from './StackedBarChart'
import { Bar } from 'react-chartjs-2';
import Chart from 'chart.js/auto';
import '../styles/Layout.css'
import ExportButton from './ExportButton';

 
function App() {
	 
	const savedCart = localStorage.getItem('cart')
	const [cart, updateCart] = useState(savedCart ? JSON.parse(savedCart) : [])
	useEffect(() => {
		localStorage.setItem('cart', JSON.stringify(cart))
	}, [cart])

	return (
		<div>

			<Banner>
				<img src={logo} alt='logo-la-maison-jungle' className='lmj-logo' />
				<h1 className='lmj-title'>Statistiques Golden Line</h1>
			</Banner>
			
			<h2 className='lmj-title'>Suivi des dépenses</h2>
			<div className="App lmj-layout-inner"  >
				<StackedBar titreGraphique="Dépenses par CSP et catégorie" urlApi="http://statistiques.orisonm.fr/depenses"/>
				<BarChart titreGraphique="Dépenses par catégorie" urlApi="http://statistiques.orisonm.fr/depenses/categories"/>
				<BarChart titreGraphique="Dépenses par CSP" urlApi="http://statistiques.orisonm.fr/depenses/csp"/>
				
    		</div>			
			<br/>

			<h2 className='lmj-title'>Panier moyen</h2>
			<div className="App lmj-layout-inner"  >
				<BarChart titreGraphique="Panier moyen par CSP" urlApi="http://statistiques.orisonm.fr/paniermoyen/categories"/>				
    		</div>			
			<br/>
			<h2 className='lmj-title'>Export des datas</h2>
			<div className="App lmj-layout-inner"  >
			<ExportButton />
			</div>

			<hr/>
			<div className='lmj-layout-inner'>
				<Cart cart={cart} updateCart={updateCart} />
				<ShoppingList cart={cart} updateCart={updateCart} />
			</div>
			<Footer />
		</div>
	)
}
export default App
