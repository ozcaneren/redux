import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { fetchCharacters } from '../../redux/charactersSlice'
import Loading from '../../components/Loading'
import Error from '../../components/Error'

function Home() {
  const characters = useSelector((state) => state.characters.items)
  const isLoading = useSelector((state) => state.characters.isLoading)
  const error = useSelector((state) => state.characters.error)

  const dispatch = useDispatch()
  
  useEffect(() => {
    dispatch(fetchCharacters())
  }, [dispatch])

  if (isLoading) {
    return <Loading />
  }

  if (error) {
    return <Error message={error} />
  }

  return (
    <div>
      <h1>Characters</h1>
      {
        characters.map((character) => (
          <div key={character.id}>
            <h3>{character.name}</h3>
            <p>{character.status}</p>
            <p>{character.species}</p>
            <img src={character.image} alt={character.name} />
          </div>
        ))
      }
    </div>
  )
}

export default Home