import { FC, useEffect, useState } from 'react'

import { Handler } from '../../common/validation'

interface IInput {
  placeHolder: string
  data?: any
  type: string
  setState: any
  state: any
  dirty: any
}

export const Input: FC<IInput> = ({
  placeHolder,
  state,
  setState,
  type,
  dirty
}) => {

  useEffect(() => {
    setDirty(dirty)
  }, [dirty])

  const [Dirty, setDirty] = useState(false)
  const [Error, setError] = useState('Поле не може бути пустим')

  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      {(Dirty && Error) && <span style={{ color: 'red' }}>{Error}</span>}
      <input
        name='name'
        onChange={e => Handler(e,setState,type, setError, setDirty)}
        value={state}
        className='input'
        placeholder={placeHolder}
        onBlur={() => setDirty(true)}
      />
    </div>
  )
}
