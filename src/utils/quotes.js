export function getQuotes(){
  try {
    const raw = localStorage.getItem('quotes')
    if(!raw) return []
    return JSON.parse(raw)
  } catch(e){
    console.warn('getQuotes error', e)
    return []
  }
}

export function saveQuote(q){
  const arr = getQuotes()
  arr.unshift(q)
  localStorage.setItem('quotes', JSON.stringify(arr, null, 2))
}

export function deleteQuote(id){
  const arr = getQuotes().filter(x=>x.id !== id)
  localStorage.setItem('quotes', JSON.stringify(arr, null, 2))
}
