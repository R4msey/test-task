import localforage from "localforage"

export const Validation = (value, type, setError) => {
  switch (type) {
    case 'number':
      if (isNaN(Number(value)) || value === '') {
        setError('Not a number')
        return true
      } else return false
    case 'text':
      if (value.length < 5) {
        setError('The minimum number of letters is 5')
        return true
      } else return false
    case 'description':
      if (value.length < 10) {
        setError('The minimum number of letters is 10')
        return true
      } else return false
    case 'id':
      localforage.getItem('items').then((data) => {
        if (data.map((item) => item.id).filter((item) => item === value).length === 1) {
          setError('This id is already taken')
          return false
        } else {
          return true
        }
      }).catch((err) => {
        console.log(err)
      })
      break
      default: return null
  }
}
export const Handler = (value, setState, type, setError, setDirty) => {
  setState(value.target.value)
  if (Validation(value.target.value, type, setError)) {
    setDirty(true)
  } else {
    setDirty(true)
    setError('')
  }
  if (value.target.value === '') {
    setError('The field cannot be empty')
  }
}