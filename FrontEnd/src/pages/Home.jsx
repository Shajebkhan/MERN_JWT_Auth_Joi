import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { handleSuccess } from '../utils';
import { ToastContainer } from 'react-toastify';
function Home() {
  const [loggedInUser, setLoggedInUser] = useState('');
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    setLoggedInUser(localStorage.getItem('loggedInUser'))
  }, [])

  const handleLogout = (e) => {
    localStorage.removeItem('token');
    localStorage.removeItem('loggedInUser');
    handleSuccess('User loggedout')
    setTimeout(() => {
      navigate('/login')
    }, 1000)
  }

  const fetchProducts = async () => {
    const headers = {
      headers: {
        'Authorization': localStorage.getItem('token')
      }
    }
    const res = await fetch('http://localhost:8080/products', headers);
    const result = await res.json();
    console.log(result);
    setProducts(result);
  }

  useEffect(() => {
    fetchProducts()
  }, [])
  return (
    <div>
      <h1>Welcome {loggedInUser}</h1>
      <button onClick={handleLogout} >Logout</button>
      {
        products && products.map((item) => (
          <ul>
            <li key={item.id}>{item.name} : {item.price}</li>
          </ul>
        ))
      }
      <ToastContainer />
    </div>
  )
}

export default Home