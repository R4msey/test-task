import { useState } from 'react'
import localforage from 'localforage'

import './form.css'

import { Button } from '../ui/button/button'
import { Input } from '../ui/input/input'

import { Handler, Validation } from '../common/validation'

export const Form = ({
  setStorage
}) => {

  const storageKey = 'items'

  const [, setErr] = useState()

  const [name, setName] = useState('')
  const [type, setType] = useState('')
  const [color, setColor] = useState('')
  const [size, setSize] = useState('')
  const [price, setPrice] = useState('')
  const [id, setId] = useState('')

  const [description, setDescription] = useState('')
  const [error, setError] = useState('The field cannot be empty')
  const [dirtyDescrition, setDirtyDescrition] = useState(false)
  const [dirty, setDirty] = useState(false)

  const clickSave = async () => {
    setDirty(true)
    let count = 0
    for (const i of stats) {
      if (!Validation(i.name, i.type, setErr)) {
        count++
        if (count === 7) {
          stats.map(i => i.change(''))
          let response = await localforage.getItem(storageKey)
          if (await localforage.getItem(storageKey) !== null) {
            await localforage.setItem(storageKey, response.concat(object))
            setStorage(response.concat(object))
          } else {
            await localforage.setItem(storageKey, [object])
            setStorage([object])
          }
        }
      }
    }
  }

  const stats = [
    { name: name, type: 'text', change: setName, placeHolder: 'Name' },
    { name: type, type: 'text', change: setType, placeHolder: 'Type' },
    { name: color, type: 'text', change: setColor, placeHolder: 'Color' },
    { name: size, type: 'number', change: setSize, placeHolder: 'Wheel size' },
    { name: price, type: 'number', change: setPrice, placeHolder: 'Price' },
    { name: id, type: 'id', change: setId, placeHolder: 'ID (slug): XXXXXXXXXXXXX' },
    { name: description, type: 'description', change: setDescription, placeHolder: 'Description' }
  ]

  const object = {
    name: name,
    type: type,
    color: color,
    size: size,
    price: price,
    id: id,
    status: 'Available'
  }

  return (
    <div className='container'>
      <div className='grid'>
        {stats.slice(0, 6).map((i, index) =>
          <Input
            key={index}
            placeHolder={i.placeHolder}
            state={i.name}
            setState={i.change}
            type={i.type}
            dirty={dirty}
          />)}
      </div>
      {(dirtyDescrition && error) && <span style={{ color: 'red' }}>{error}</span>}
      <textarea
        className='description'
        rows={4}
        placeholder='Description'
        onChange={e => Handler(
          e,
          setDescription,
          'description',
          setError,
          setDirtyDescrition
        )}
        value={description}
        onBlur={() => setDirtyDescrition(true)}
      />
      <div className='grid'>
        <Button
          title='Save'
          onClick={clickSave}
        />
        <Button
          title='Clear'
          onClick={() => stats.map(i => i.change(''))}
        />
      </div>
    </div>
  )
}