import localforage from "localforage"

export const Validation = (e: string, type: string, setError: any) => {
  switch (type) {
    case 'number':
      if (isNaN(Number(e)) || e === '') {
        setError('Не являється числом')
        return true
      } else return false
    case 'text':
      if (e.length < 5) {
        setError('Мінімальна кількість букв 5')
        return true
      } else return false
    case 'description':
      if (e.length < 10) {
        setError('Мінімальна кількість букв 10')
        return true
      } else return false
    case 'id':
      localforage.getItem('items').then(function (value: any) {
        if (value.map((i: any) => i.id).filter((i: any) => i === e).length === 1) {
          setError('Цей айди вже зайнято')
          return false
        } else {
          return true
        }
      }).catch(function (err) {
        console.log(err);
      })

  }
}
export const Handler = (e: any, setState: any, type: string, setError: any, setDirty: any) => {
  setState(e.target.value)
  if (Validation(e.target.value, type, setError)) {
    console.log('73825')
    setDirty(true)
  } else {
    console.log('else')
    setDirty(true)
    setError('')
  }
  if (e.target.value === '') {
    setError('Поле не може бути пустим')
  }
}