// https://dev.to/collegewap/fetch-and-display-data-from-api-in-react-js-53bp
import React, { useEffect, useState } from "react"
import { Bar } from 'react-chartjs-2';

const token = "johndoe"

const UsingFetch = (props) => {
  const [users, setUsers] = useState([])
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
        setUsers(data)
      })
  }

  useEffect(() => {
    fetchData()
  }, [])
console.log("users", users);
  const categories = users.reduce(
    (acc, elem) =>
      acc.includes(elem.label) ? acc : acc.concat(elem.label),
    []
  )

  const montants = users.reduce(
    (acc, elem) =>
      acc.includes(elem.montant_total) ? acc : acc.concat(elem.montant_total),
    []
  )
  
  function randomColor(){
    var x = Math.floor(Math.random() * 256);
    var y = Math.floor(Math.random() * 256);
    var z = Math.floor(Math.random() * 256);
    var color = "rgb(" + x + "," + y + "," + z + ")"
    return color;
  }

  const data = {
    labels: categories,
    datasets: [
    {
      label: props.titreGraphique,
      backgroundColor: randomColor(),
      borderWidth: 1,
      data: montants
    }
    ]
  }

  const options = {
    scales: {
      yAxes: [
        {
          ticks: {
            beginAtZero: true,
          },
        },
      ],
    },
  }
    
  const BarChart = () => (
    <div>
      <Bar
        data={data}
        options={options}
        width={300}
        height={300}
      />
    </div>
  );

  return (
    <div>
        <BarChart />
    </div>
  )
    
}
    
export default UsingFetch;    