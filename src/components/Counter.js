import React from 'react'
import { useSelector } from 'react-redux'

function Counter() {

  const countValue = useSelector(state => state.counter.value)

  console.log(countValue)

  return (
    <h1>1</h1>
  )
}

export default Counter