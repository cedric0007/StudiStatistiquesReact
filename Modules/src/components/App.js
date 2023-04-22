import { useState, useEffect } from 'react'
import Banner from './Banner'
import '../styles/Layout.css'
import BarChart from './BarChart'
import StackedBar from './StackedBarChart'
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
				
				<h1 className='lmj-title'>Statistiques Golden Line</h1>
			</Banner>
			
			<h2 className='lmj-title'>Suivi des dépenses</h2>
			<div className="App lmj-layout-inner"  >
				<StackedBar titreGraphique="Dépenses par CSP et catégorie" urlApi="https://statistiques.orisonm.fr/depenses"/>
				<BarChart titreGraphique="Dépenses par catégorie" urlApi="https://statistiques.orisonm.fr/depenses/categories"/>
				<BarChart titreGraphique="Dépenses par CSP" urlApi="https://statistiques.orisonm.fr/depenses/csp"/>
				
    		</div>			
			<hr/>
			<br/>

			<h2 className='lmj-title'>Panier moyen</h2>
			<div className="App lmj-layout-inner"  >
				<BarChart titreGraphique="Panier moyen par CSP" urlApi="https://statistiques.orisonm.fr/paniermoyen/categories"/>				
    		</div>			
			<br/>
			<hr/>

			<h2 className='lmj-title'>Export des datas</h2>
			<div className="App lmj-layout-inner"  >
			<ExportButton />
			</div>

		</div>
	)
}
export default App
