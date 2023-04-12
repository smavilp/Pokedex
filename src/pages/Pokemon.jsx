import React from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { useEffect,useState } from 'react';

const Pokemon = () => {

  const {id} = useParams()
  const [pokemonDetail, setPokemonDetail] = useState ({})

  useEffect(() => {
    axios
      .get(`https://pokeapi.co/api/v2/pokemon/${id}/`)
      .then(resp => {console.log(resp.data)
        setPokemonDetail(resp.data)})
      .catch(error => console.error(error))
  }, [])
  
  return (
    <>
      <div className='Pokemon'>
        <div className='Pokemon__div--up'>
          <div className='Pokemon__div--banner'></div>
          <span className='Pokemon__span--id'>{pokemonDetail.id}</span>
          <div className='Pokemon__div--name'>
            <span className='Pokemon__span--name'>{pokemonDetail.name}</span>
          </div>
          <div className='Pokemon__div--measurements'>
              <div className='Pokemon__div--weight'>
                <span className='Pokemon__span'>Weight</span>
                <span className='Pokemon__span'>{pokemonDetail.weight}</span>
              </div>
              <div className='Pokemon__div--height'>
                <span className='Pokemon__span'>Height </span>
                <span className='Pokemon__span'>{pokemonDetail.height}</span>
              </div>
          </div>
          <div className='Pokemon__div--type-skills'>
            <div className='Pokemon__div--type'>
              <span className='Pokemon__span--type'>Type</span>
              <div className='Pokemon__div--type-sub'>
                <span className='Pokemon__span--type1'>Plant</span>
                <span className='Pokemon__span--type2'>Poison</span>
              </div>
            </div>
            <div className='Pokemon__div--skills'>
              <span className='Pokemon__span--skills'>Skills</span>
              <div className='Pokemon__div--skills-sub'>
                <span className='Pokemon__span--skills1'>Crecimi</span>
                <span className='Pokemon__span--skills2'>Clorofi</span>
              </div> 
            </div>
          </div>
        </div>
        <div className='Pokemon__div--down'>
          <div className='Pokemon__div--stats'>
            <span className='Pokemon__span-stats-title'>Stats</span>
            <div className='Pokemon__div--stats-sup'>
              <div className='Pokemon__div--stats-data'>
                <span className='Pokemon__span--stats'>HP</span>
                <span className='Pokemon__span--stats'>{pokemonDetail.stats?.[0].base_stat}/255</span>
              </div>
              <input className='Pokemon__range' type="range" disabled min="0" max="255" value={pokemonDetail.stats?.[0].base_stat}/>
              </div>
            <div className='Pokemon__div--stats-sup'>
              <div className='Pokemon__div--stats-data'>
                <span className='Pokemon__span--stats'>Atack</span>
                <span className='Pokemon__span--stats'>{pokemonDetail.stats?.[1].base_stat}/190</span>
              </div>
              <input className='Pokemon__range' type="range" disabled min="0" max="190" value={pokemonDetail.stats?.[1].base_stat}/>
              </div>
            <div className='Pokemon__div--stats-sup'>
              <div className='Pokemon__div--stats-data'>
                <span className='Pokemon__span--stats'>Defense</span>
                <span className='Pokemon__span--stats'>{pokemonDetail?.stats?.[2].base_stat}/250</span>
              </div>
              <input className='Pokemon__range' type="range" disabled min="0" max="250" value={pokemonDetail.stats?.[2].base_stat}/>
              </div>
            <div className='Pokemon__div--stats-sup'>
              <div className='Pokemon__div--stats-data'>
                <span className='Pokemon__span--stats'>Speed</span>
                <span className='Pokemon__span--stats'>{pokemonDetail.stats?.[5].base_stat}/180</span>
              </div>
              <input className='Pokemon__range' type="range" disabled min="0" max="180" value={pokemonDetail.stats?.[5].base_stat}/>
              </div>
          </div>
        </div>
      </div>
      <div className='Pokemon__div--movements'>
        <div className='Pokemon__div--movements-sub' >
          <span className='Pokemon__span--movements'></span>
        </div>
        <ul className='Pokemon__ul'>

        </ul>
      </div>
    </>
  );
};

export default Pokemon;