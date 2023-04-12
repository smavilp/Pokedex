import React from 'react';
import { useState, useEffect } from 'react';
import axios from 'axios';

const PokemonCard = ({url, pokemonName}) => {
  const [dataSpecie, setDataSpecie] = useState({})
  const [dataPokemon, setDataPokemon] = useState({})

  const getDataPokemon = () => {
    axios.get(`${url}`)
    .then(resp => {
      setDataSpecie(resp.data)
    })
    .catch(error=>console.error(error))

    axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`)
    .then(resp => {
      setDataPokemon(resp.data)
    })
    .catch(error=>console.error(error))

  }

  useEffect(() => {
    url
  }, [getDataPokemon()])
  

  return (
    <article className='PokemonCard'>
      <div className='PokemonCard__div--border'>
      <div className='PokemonCard__div PokemonCard__div--banner'>
        <img className='PokemonCard__img' src={dataPokemon.sprites?.other["official-artwork"].front_default} alt="" loading='lazy'/>
      </div>
      <div className='PokemonCard__div PokemonCard__div--data'>
        <div className='PokemonCard__div PokemonCard__div--up'>
          <h2 className='PokemonCard__h2'>{dataSpecie.name}</h2>
          <h3 className='PokemonCard__h3'>{dataPokemon.types?.[0].type.name}</h3>
          <span className='PokemonCard__span  PokemonCard__span--type'>Type</span>
        </div>
        <hr className='PokemonCard__hr' />
        <div className='PokemonCard__div PokemonCard__div--down'>
          <div className='PokemonCard__div PokemonCard__div--inter'>
            <h4 className='PokemonCard__h4'>hp</h4>
            <span className='PokemonCard__span PokemonCard__span--data'>{dataPokemon.stats?.[0].base_stat}</span>
          </div>
          <div className='PokemonCard__div PokemonCard__div--inter'>
            <h4 className='PokemonCard__h4'>attack</h4>
            <span className='PokemonCard__span PokemonCard__span--data'>{dataPokemon.stats?.[1].base_stat}</span>
          </div>
          <div className='PokemonCard__div PokemonCard__div--inter'>
            <h4 className='PokemonCard__h4'>defense</h4>
            <span className='PokemonCard__span PokemonCard__span--data'>{dataPokemon.stats?.[2].base_stat}</span>
          </div>
          <div className='PokemonCard__div PokemonCard__div--inter'>
            <h4 className='PokemonCard__h4'>speed</h4>
            <span className='PokemonCard__span PokemonCard__span--data'>{dataPokemon.stats?.[5].base_stat}</span>
          </div>
        </div>
      </div>
      </div>
    </article>
  );
};

export default PokemonCard;