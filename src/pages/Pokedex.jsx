import React from 'react';
import { useSelector} from 'react-redux';
import PokemonCard from '../components/PokemonCard';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Pokedex = () => {

  const trainerName = useSelector(state => state.trainerName)
  const [dataPokemons, setDataPokemons] = useState([])
  const [dataPokemonByName, setDataPokemonByName] = useState({})
  const [dataPokemonsByType, setDataPokemonsByType] = useState([])
  const [pokemonName, setPokemonName] = useState("")
  const [dataTypes, setDataTypes] = useState([])
  const [isVisibleAllPokemons, setIsVisibleAllPokemons] =useState (true)
  const [isVisiblePokemonByName, setIsVisiblePokemonByName] = useState (false)
  const [isVisiblePokemonsByType, setIsVisiblePokemonsByType] =useState (false)
  const [style, setStyle] = useState("&__div--search-sub")
  const [pokemonCardContainerStyle, setPokemonCardContainerStyle ] =useState("Pokedex__div--PokemonCard-container")
  const [prevPage, setPrevPage] = useState(null)
  const [nextPage, setNextPage] = useState(null)
  
  const makeAllPokemonsVisible = () => {
    setIsVisibleAllPokemons (true)
    setIsVisiblePokemonByName (false)
    setIsVisiblePokemonsByType (false)
  }

  const makePokemonByNameVisible = () => {
    setIsVisiblePokemonByName(true)
    setIsVisibleAllPokemons (false)
    setIsVisiblePokemonsByType (false)
  }

  const makePokemonByTypeVisible = () => {
    setIsVisiblePokemonsByType (true)
    setIsVisiblePokemonByName(false)
    setIsVisibleAllPokemons (false)
  }

  const getAllPokemons = () => {
    axios.get("https://pokeapi.co/api/v2/pokemon-species/")
      .then(resp => {
        setDataPokemons(resp.data.results)
        setNextPage(resp.data.next)
        setPrevPage(resp.data.previous)
        makeAllPokemonsVisible()
        setPokemonCardContainerStyle("Pokedex__div--PokemonCard-container")
      })
      .catch(error => console.error(error))
  }

  const getPokemonByName = (name) => {
    axios.get(`https://pokeapi.co/api/v2/pokemon/${name}/`)
    .then(resp => {
      setDataPokemonByName(resp.data)
      makePokemonByNameVisible()
      setPokemonCardContainerStyle("Pokedex__div--PokemonCard-container.one-card")
    })
    .catch(error => console.error(error))
  }

  const getPokemonTypes = () => {
    axios.get(`https://pokeapi.co/api/v2/type/`)
    .then (resp => {
      setDataTypes(resp.data.results)})
    .catch (error => console.error(error))
  }

  const getPokemonsByType = (type) => {
    axios.get (`https://pokeapi.co/api/v2/type/${type}/`)
    .then(resp => {
      setDataPokemonsByType(resp.data.pokemon)
      makePokemonByTypeVisible ()
      setPokemonCardContainerStyle("Pokedex__div--PokemonCard-container")
    })
    .catch(error => console.error (error))
  }

  const getPreviusPage = (url) => {
    axios.get(url)
    .then(resp => {
      setDataPokemons(resp.data.results)
      setNextPage(resp.data.next)
      setPrevPage(resp.data.previous)
    })
    .catch(error => console.error(error))
  }

  const getNextPage = (url) => {
    axios.get(url)
    .then(resp => {
      setDataPokemons(resp.data.results)
      setNextPage(resp.data.next)
      setPrevPage(resp.data.previous)
    })
    .catch(error => console.error(error))
  }
  
  useEffect(() => {
    getAllPokemons()
    getPokemonTypes()
  }, [])

  return (
    <main className='Pokedex'>
      <p className='Pokedex__p'><span className='Pokedex__span'>{trainerName}</span>, here you can find your favorite pokemon.</p>
      <div className='Pokedex__div--search'>
        <form className='Pokedex__form' onSubmit={e => {
          e.preventDefault()
          getPokemonByName(pokemonName)
          }} >
          <div className='Pokedex__div--form'>
            <input className='Pokedex__input Pokedex__input--text' type="text" placeholder='Pokemon' name='search' value={pokemonName} onChange={e=> setPokemonName(e.target.value)}/>
            <input className='Pokedex__input Pokedex__input--btn' type="button" value="Search" onClick={ e=>{e.preventDefault()
              getPokemonByName(pokemonName)}} />
          </div>
        </form>
        <div className={style}>
          <ul className="Pokedex__ul" name="" id="" value="">
            <button className='Pokedex__btn--ul' onClick={() => setStyle("&__div--search-sub .visible")}>
              <i className='Pokedex__i bx bx-chevron-down bx-sm'></i>
            </button>
            <li className='Pokedex__li' value="All pokemons" key={0} selected onClick={() => {
              setStyle("Pokedex__ul--hidden")
              getAllPokemons()
              }}>All pokemons</li>
              {dataTypes.map((dataType, index) => (<li className='Pokedex__li' value={dataType.name} key={index+1} onClick={() =>{
              getPokemonsByType(dataType.name)
              setIsVisiblePokemonByName(false)
              setStyle("Pokedex__ul--hidden")
              }}>{dataType.name}</li>))}
          </ul>
        </div>
       </div>
       <div className={pokemonCardContainerStyle}>
        { isVisibleAllPokemons && (dataPokemons.map((dataPokemon, index) =>(<Link key={index} to={`/pokedex/${index+1}`}> <PokemonCard url = {dataPokemon.url} pokemonName ={dataPokemon.name} /> </Link>))) }
        { isVisiblePokemonByName && (<Link to={`/pokedex/${dataPokemonByName.id}`}> <PokemonCard url = {dataPokemonByName.species.url} pokemonName ={dataPokemonByName.name}/> </Link>) }
        { isVisiblePokemonsByType && (dataPokemonsByType.map((dataPokemon, index) =>(<Link key={index} to={`/pokedex/${index+1}`}> <PokemonCard url = {dataPokemon.pokemon.url} pokemonName ={dataPokemon.pokemon.name} /> </Link>)))}
       </div>
        <div className='Pokedex__div--btns'>
          <button className='Pokedex__btn--page' onClick={() => getPreviusPage(prevPage)}>
            <i className='bx bx-left-arrow bx-sm Pokedex__i' ></i>
          </button>
          <button className='Pokedex__btn--page'onClick={() => getNextPage(nextPage)}>
            <i className='bx bx-right-arrow bx-sm Pokedex__i'></i>
          </button>
        </div>
    </main> 
  ) 
};

export default Pokedex;