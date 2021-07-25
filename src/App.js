import localforage from 'localforage'
import { useEffect, useState } from 'react'

import './App.css'

import { Card } from './components/card/card'
import { Form } from './components/form/form'

const App = () => {

  const [storage, setStorage] = useState()

  useEffect(() => {
    const getStorage = async () => {
      const response = await localforage.getItem('items')
      setStorage(response)
    }
    getStorage()
  }, [])

  const statistics = [
    { name: 'Total Bikes: ', addInfo: '', option: Array.isArray(storage) ? storage.length : 0 },
    { name: 'Available Bikes: ', addInfo: '', option: Array.isArray(storage) ? storage.filter(i => i.status === 'Available').length : null },
    { name: 'Booked Bikes: ', addInfo: '', option: Array.isArray(storage) ? storage.filter(i => i.status === 'Busy').length : 0 },
    { name: 'Average bike cost: ', addInfo: 'UAH/hr', option: Array.isArray(storage) ? storage.map(i => Number(i.price)).reduce((count, value) => { return count + value }, 0) / storage.map(i => i.price).length : '0.00' }
  ]
  // console.log(statistics[3].option)
  return (
    <div className='body'>
      <header className='header'>ADMIN.BIKE-BOOKING.COM</header>
      <section className='left-section'>
        {(Array.isArray(storage) && storage.length !== 0)
          ? storage.map((i, index) =>
            <Card
              key={index}
              setStorage={setStorage}
              data={i}
            />)
          : <div>Нічого немає</div>
        }
      </section>
      <section className='right-section'>
        <Form setStorage={setStorage} />
        <div style={{ marginLeft: 15 }}>
          <span className='textBolt' style={{ fontSize: 20 }}>Statistics</span>
          {statistics.map((i, index) =>
            <div 
              key={index} 
              style={{ fontSize: 16 }}
            >
              {i.name}
              <span 
                className='textBolt' 
                style={{ fontSize: 16 }}
              >
                {i.option}
              </span>
              {i.addInfo}
            </div>)}
        </div>
      </section>
      <div className='footer'>
        <span className='footerTitle'>
          developer:
        </span>
        Taras Korol
      </div>
    </div>
  )
}

export default App