import localforage from 'localforage'
import { FC, useState } from 'react'

import './card.css'

interface ICard {
  setStorage: any,
  data: any
}

export const Card: FC<ICard> = ({
  setStorage,
  data
}) => {

  const [state, setState] = useState('')
  const IMAGE = "https://i.ibb.co/H7qYTxn/Vector.png"


  const color = [
    { color: '#6FCF97', name: 'Available' },
    { color: '#F2994A', name: 'Busy' },
    { color: '#EB5757', name: 'Unavailable' }
  ]

  const ChangeStorage = async (e?: any) => {
    setState(e !== null ? e.target.value : data.status)
    let response: any = await localforage.getItem('items')

    for (const i in response) {
      if (JSON.stringify(response[i]) === JSON.stringify(data)) {
        if (e == null) {
          response = response.filter((item: any, index: number) => index !== Number(i))
        } else {
          setState(e.target.value)
          response[i].status = e.target.value
        }
        setStorage(response)
        await localforage.setItem('items', response)
        setStorage(response)
      }
    }
  }

  const currentColor = color.filter(i => i.name === data.status)

  return (
    <div className={`wrapper ${data.status === 'Unavailable' ? 'disabled' : null}`} style={{ border: `3px solid ${currentColor[0].color}` }}>
        <div className='container-title'>
          <div style={{ fontSize: 18 }}>
            <span className='textBolt'>
              {data.name}
            </span>
            - {data.type} ({data.color})
          </div>
          <img
            onClick={() => ChangeStorage(null)}
            src={IMAGE}
            className='image'
            alt=""
          />
        </div>
        <span style={{ fontSize: 10 }}>ID: {data.id}</span>
        <div className='containerInfo'>
          <div className='info'>
            <label
              className='dropdown'
              style={{ paddingRight: 20 }}
              htmlFor="list"
            >
              STATUS:
            </label>
            <select
              className='dropdown'
              id="list"
              value={state === '' ? data.status : state}
              onChange={e => (ChangeStorage(e))}
            >
              <option value="Available">Available</option>
              <option value="Busy">Busy</option>
              <option value="Unavailable">Unavailable</option>
            </select>
          </div>
          <div style={{ fontWeight: 400, fontSize: 30 }}>{data.price} UAH/hr.</div>
        </div>
        </div>
  )
}