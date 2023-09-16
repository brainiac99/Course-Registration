import { useEffect, useState } from "react";

export default function App() {
  return (
    <>
      <header>
        <h1>Course Registration</h1>
      </header>

      <Main />
    </>
  );
}

function Main() {
  const [cardData, setCardData] = useState([]);
  const [cart, setCart] = useState([]);

  const totalCredit = cart.reduce((acc,item)=>acc+item.credit,0)
  const totalPrice = cart.reduce((acc,item)=>acc+item.price,0)
  const creditRemaining = 20 - totalCredit;

  function handleAdd(card){
    if(card.credit>creditRemaining||cart.includes(card)) return;
    setCart([...cart, card])
  }

  useEffect(function () {
    async function getData() {
      const res = await fetch("src/assets/data.json");
      const data = await res.json();
      setCardData(data);
    }
    getData();
  }, []);

  console.log(cardData);
  return (
    <main>
      <div className="cards-container">
        {cardData.map((card) => (
          <Card card={card} key={card.name} handleAdd={handleAdd} />
        ))}
      </div>
      <Cart cart={cart} totalCredit={totalCredit} totalPrice={totalPrice} creditRemaining={creditRemaining} />
    </main>
  );
}

function Card({ card, handleAdd }) {
  return (
    <div className="card">
      <div>
        <img src={card.img} />
      </div>
      <h3>{card.name}</h3>
      <p>{card.description}</p>
      <div className="card-details">
        <div>💲 Price: {card.price} </div>
        <div>📖 Credit: {card.credit}hr</div>
      </div>
      <button onClick={()=>handleAdd(card)} >Select</button>
    </div>
  );
}

function Cart({cart, totalCredit, totalPrice, creditRemaining}) {

  return (
    <aside>
      <h3>credit hour remaining {creditRemaining}hr</h3>
      <h2>Course Name</h2>
      <ol>
        {cart.map(item=><li key={item.name} >{item.name}</li>)}
      </ol>
      <p className="price">Total credit hours: {totalCredit}</p>
      <p>Total price: {totalPrice} USD</p>
    </aside>
  );
}
