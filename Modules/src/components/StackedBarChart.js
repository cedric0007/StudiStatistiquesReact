import React, { useEffect, useState } from "react"

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);
const token = "johndoe"

const UsingFetch = (props) => {
    const [donnees, setDonnees] = useState([])
    const fetchData = () => {
      fetch(props.urlApi, {
        method: "GET",
        headers: {
        "Authorization": `Bearer ${token}`
        }
      })
        .then(response => {
          return response.json()
        })
        .then(data => {
          setDonnees(data)
        })
    }
  
    useEffect(() => {
      fetchData()
    }, [])

    const options = {
    plugins: {
        title: {
        display: true,
        text: props.titreGraphique,
        },
    },
    responsive: true,
    scales: {
        x: {
        stacked: true,
        },
        y: {
        stacked: true,
        },
    },
    };

    const labelstest = ['Ouvrier', 'Fonctionnaire'];
    const categories = donnees.reduce(
      (acc, elem) =>
        acc.includes(elem.libelle) ? acc : acc.concat(elem.libelle),
      []
    )
    console.log("categories",categories);

    const csp = donnees.reduce(
      (acc, elem) =>
        acc.includes(elem.classe_socio_professionnelle) ? acc : acc.concat(elem.classe_socio_professionnelle),
      []
    )

    // calculer le montant total par catégorie et CSP
    const datasets = donnees.reduce((acc, cur) => {
      // Trouver ou créer un objet pour le label actuel
      console.log("cur", cur);
      let obj = acc.find(obj => obj.label === cur.libelle);
      if (!obj) {
        obj = { label: cur.libelle, backgruondColor : 'red', data: [] };
        acc.push(obj);
      }
      // Ajouter le montant à l'objet pour la classe socio-professionnelle actuelle
      csp.forEach(function(classeSocPro) {
        console.log("classeSocPro", classeSocPro);
        const index = csp.indexOf(classeSocPro);
        if (cur.classe_socio_professionnelle === classeSocPro) {
          obj.data[index] = (obj.data[index] || 0) + cur.montant_total;
        }
      });
      

      return acc;
    }, []);

    const data = {
    labels: labelstest,
    datasets: datasets,
    };

const StackedBar = () => (
    <Bar 
    options={options} 
    data={data} 
    width={300}
    height={300}
    />
)

return (
    <div>
        <StackedBar />
    </div>
  )

}

export default UsingFetch;    