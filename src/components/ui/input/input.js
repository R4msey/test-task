import { useEffect, useState } from 'react'

import { Handler } from '../../common/validation'

export const Input = ({
  placeHolder,
  state,
  setState,
  type,
  dirty,
}) => {

  useEffect(() => {
    setDirty(dirty)
  }, [dirty])

  const [Dirty, setDirty] = useState(false)
  const [error, setError] = useState('The field cannot be empty')

  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      {(Dirty && error) && <span style={{ color: 'red' }}>{error}</span>}
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
