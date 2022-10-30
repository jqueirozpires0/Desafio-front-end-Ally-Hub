import './App.css';
import React, { useEffect, useState } from 'react'
import { useForm } from "react-hook-form";
import BaseSelect from 'react-select';
import FixRequiredSelect from "./FixRequiredSelect";
import { IMaskInput } from "react-imask";
import GlobalStyle from './temas/global.js';
import { ThemeProvider } from 'styled-components';
import { darkTheme, lightTheme } from './temas/styles.js';
import axios from 'axios';
import Switch from 'react-switch';
import { FaWpforms, FaFacebook, FaInstagram, FaLinkedin, FaTwitter, FaYoutube, FaMoon, FaRegLightbulb } from 'react-icons/fa'

const apiCity = axios.create({
  baseURL: "https://amazon-api.sellead.com/city",
});

const apiCountry = axios.create({
  baseURL: "https://amazon-api.sellead.com/country",
});

function App() {
  const [listCity, setCity] = useState([]);
  const [listCountry, setCountry] = useState([]);
  const [theme, setTheme] = useState(lightTheme)
  const { register, handleSubmit } = useForm({});

  const Select = props => (
    <FixRequiredSelect
      {...props}
      SelectComponent={BaseSelect}
      listCity={props.listCity || listCity}
    />
  );

  const toggleTheme = () => {
    setTheme(theme.name.class === "light" ? darkTheme : lightTheme)
  }

  useEffect(() => {
    async function countryData() {
      const { data } = await apiCountry.get("")
      const optCountry = []
      data.forEach((value) => {
        optCountry.push({
          label: value.name_ptbr,
          value: value.name,
        })
      })
      setCountry(optCountry)
    }
    countryData()

    async function cityData() {
      const { data } = await apiCity.get("")
      const optCity = []
      data.forEach((value) => {
        optCity.push({
          label: value.name.substring(0, value.name.indexOf(",")),
          value: value.name,
        })
      })
      setCity(optCity)
    }
    cityData()

  }, [])

  return (
    <ThemeProvider theme={theme}>
      <form onSubmit={handleSubmit}>
        <div className="img-div">
          <img alt="Logo Empresa" className="img-logo" src='https://allyhub.co/images/Logo.png'></img>
        </div>
        <div className="card-icon">
          <FaWpforms />
        </div>
        <div className='title'>Roteiros de Interesse
          <Switch onChange={toggleTheme}
            className="switch-modo"
            checked={theme.name.class === 'light'}
            checkedIcon={
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  height: "100%",
                  fontSize: 15,
                  width:"70%",
                  color: "black",
                  paddingRight: 2,
                  marginLeft: "3px"
                }}
              >
                <FaRegLightbulb />
              </div>
            }
            uncheckedIcon={
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  height: "100%",
                  fontSize: 15,
                  color: "black",
                  paddingRight: 2
                }}
              >
                <FaMoon />
              </div>
            }
            height={22}
            width={60}
            handleDiameter={18}
            onColor="#0000FF"
            offColor='#FFA800'
          >
          </Switch>
        </div>
        <div className='div-form'>
          <h4>Dados Pessoais</h4>
          <div className='half-div'>
            <label>
              <input type="text" placeholder='Nome' {...register("name")} required>
              </input>
            </label>
            <label>
              <input type="email" placeholder='Email' {...register("email")} required>
              </input>
            </label>
          </div>
          <div className='half-div'>
            <label>
              <IMaskInput placeholder='Telefone' mask="(00) 00000-0000" type="text" {...register("telefone")} required>
              </IMaskInput>
            </label>
            <label>
              <IMaskInput placeholder='CPF' mask="000.000.000-00" type="text" {...register("cpf")} required>
              </IMaskInput>
            </label>
          </div>
          <h4>Destinos de Interesse</h4>
          <div className='half-div'>
            <label>
              <Select className="select-class" options={listCountry} isSearchable isMulti placeholder="Selecione um país:" {...register("country")} required>
              </Select>
            </label>
            <label>
              <Select className="select-class" options={listCity} isMulti placeholder="Selecione uma cidade:" {...register("city")} required>
              </Select>
            </label>
          </div>
        </div>
        <div className='button-position'>
          <button type='submit'>
            Salvar informações
          </button>
        </div>
        <footer className='footer'>
          <ul className='social_list'>
            <li>
              <a className='a_social' href='https://web.facebook.com/allyhubedu?_rdc=1&_rdr' target="blank">
                <FaFacebook />
              </a>
            </li>
            <li>
              <a className="a_social" href='https://www.instagram.com/allyhubedu/' target="blank">
                <FaInstagram />
              </a>
            </li>
            <li>
              <a className="a_social" href='https://www.linkedin.com/company/allyhubedu/' target="blank">
                <FaLinkedin />
              </a>
            </li>
            <li>
              <a className="a_social" href='https://twitter.com/allyhubedu' target="blank">
                <FaTwitter />
              </a>
            </li>
            <li>
              <a className="a_social" href='https://www.youtube.com/channel/UCMgpaV2yWo7kwT3hVY6AqQw' target="blank">
                <FaYoutube />
              </a>
            </li>
          </ul>
          <p className='copy_right'>
            <span>By João Paulo Queiroz Pires</span> &copy; 2022
          </p>
        </footer>
      </form>
      <GlobalStyle />
    </ThemeProvider>
  );
}

export default App;
