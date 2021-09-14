import React, {useState, useEffect} from 'react';
import axios from 'axios';
import './App.css';
import Coin from './pages/coin/Coin';



function App() {
  const [coins, setCoins] = useState([])
  const [search, setSearch] = useState('')

  useEffect(() => {
    axios.get('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false')
    .then(res => {
      setCoins(res.data)
    }).catch(error => console.log(error))
  }, [])

  const handleChange = a => {
    setSearch(a.target.value)
  }

  const filteredCoins = coins.filter(coin => 
    coin.name.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div className="App">
      <div className="coin-search">
        <form>
          <input 
          placeholder="Search" 
          className="coin-input" 
          onChange={handleChange}
          />
        </form>
      </div>
      {filteredCoins.map(coin => {
        return (
          <Coin 
          key={coin.id} 
          name={coin.name} 
          image={coin.image}
          symbol={coin.symbol}
          volume={coin.total_volume} 
          price={coin.current_price}
          priceChange={coin.price_change_percentage_24h}
          marketcap={coin.market_cap}
          />
        )
      })}
    </div>
  );
}

export default App;
