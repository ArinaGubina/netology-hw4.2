import { useState } from 'react'
import './App.css'
import ActivitiesList from './components/activitiesList.tsx'
import type { Item } from './components/Item'

function App() {
  const [distance, setDistance] = useState("")
  const [date, setDate] = useState("")
  const [v, setV] = useState(1)
  const [items, setItems] = useState<Item[]>([]);

  const deleteItem = (event : React.MouseEvent<HTMLElement>) => {
    const element = event.target;
    if (element instanceof Element) { 
      const index = Number(element.getAttribute("data-id"));
      setItems(current => current.filter((item, key) => key != index))
      setV(v+1);
      
    }
  }

  const checkDistance = (event : React.ChangeEvent<HTMLInputElement>) => {
    setDistance(event.target.value.replace(/[^.\d]+/g,"").replace( /^([^.]*\.)|\./g, '$1' ));
  }
  const setValue = (event : React.ChangeEvent<HTMLInputElement>) => {
    setDate(event.target.value);
  }
  const submitForm = (event : React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log(date);
    console.log(distance);
    const km = Number(distance);
    const dateArray = date.split("-");

    if (typeof(km) == "number" && km > 0 && dateArray.length == 3) {
      const newItem = {itemDate : date, itemDistance : km} as Item
      console.log(items);
      const index = items.findIndex(element => element.itemDate == newItem.itemDate);
      if (index != -1) {
        items[index].itemDistance = items[index].itemDistance + newItem.itemDistance;
      } else {
        items.push(newItem)
      }
      setV(v+1);
    } else {
      console.log("Что-то пошло не так: " + typeof(km) + " " + String(dateArray));
    }
  }
  

  return (
    <>
      <form className='form_new_item' onSubmit={submitForm}>
        <label className='inp_label' >Дата <input type="date" className='inp' value={date} onChange={setValue}/></label>
        <label className='inp_label' >Пройдено км <input type="text" className='inp' value={distance} onChange={checkDistance}/></label>
        <button className='submit-btn' type='submit'>Ок</button>
      </form>
      <div className='list-labels'>
        <div className='list-label'>Дата</div>
        <div className='list-label'>Пройдено км</div>
        <div className='list-label'>Действия</div>
      </div>
      <ActivitiesList items={items} key={v} deleteItem={deleteItem}/>
      {/* <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p> */}
    </>
  )
}

export default App
