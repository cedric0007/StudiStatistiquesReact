import logo from './logo.svg';
import './App.css';
import Banner from './components/Banner'
import Cart from './components/Cart'
import ShoppingList from './components/ShoppingList'

function App() {
    // return <ShoppingList />

    const fetchUserData = () => {
        fetch("https://jsonplaceholder.typicode.com/users")
          .then(response => {
            return response.json()
          })
          .then(data => {
            setUsers(data)
          })
      }
    
      useEffect(() => {
        fetchUserData()
      }, [])
    
      return (
        <div>
          {users.length > 0 && (
            <ul>
              {users.map(user => (
                <li key={user.id}>{user.name}</li>
              ))}
            </ul>
          )}
        </div>
      );
}
    
export default App;
