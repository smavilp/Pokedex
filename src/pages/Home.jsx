import React from 'react';
import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {setTrainerName} from "../store/slices/trainerName.slice";
import { useNavigate } from 'react-router-dom';
import Footer from '../components/Footer';

const Home = () => {
  const [name, setName] = useState("")
  const trainerName = useSelector(state => state.trainerName)
  const dispatch = useDispatch();
  const changeTrainerName = () => dispatch(setTrainerName(name))
  const navigate = useNavigate();
  const login = () => {
    changeTrainerName()
    navigate("/pokedex")
  }

  return (
    <>
      <main className='Home'>
        <img className='Home__img' src="/pokedex-logo.png" alt="" />
        <h1 className='Home__h1'>Wellcome pokemon trainer!</h1>
        <p className='Home__p'>To start, write your name</p>
        <form className='Home__form' onSubmit={(e) => {
          e.preventDefault()
          login()
        }} >
          <input className='Home__input Home__input--text' type="text" placeholder='Name' value={name} onChange={(e)=>setName(e.target.value)}/>
          <input className='Home__input Home__input--btn' type="button" value="Start" onClick={login} />
        </form>
      </main>
      <Footer />
    </>
  );
};

export default Home;