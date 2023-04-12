import React from 'react';

const Banner = () => {
  return (
  <header className='Banner'>
    <div className='Banner__div Banner__div--red'>
      <img className='Banner__img' src="/pokedex-logo.png" alt="Pokédex" />
    </div>
    <div className='Banner__div Banner__div--black'></div>
    <div className='Banner__div Banner__div--circle'>
      <div className='Banner__div Banner__div--inside'></div>
    </div>
  </header>
  );
};

export default Banner;