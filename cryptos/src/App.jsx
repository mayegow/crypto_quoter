import { useState, useEffect } from 'react'
import styled from '@emotion/styled'
import crypto from './img/imagen-criptos.png'
import Formulario from './components/Formulario'
import Resultado from './components/Resultado'
import Spinner from './components/Spinner'

const Content = styled.div`
  max-width:900px;
  margin:0 auto;
  width:90%;
  @media(min-width:992px){
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    column-gap: 2rem;
  }
`
const Heading = styled.h1`
  font-family:'Lato', sans-serif;
  color: #fff;
  text-align:center;
  font-weight:700;
  margin-top:80px;
  margin-bottom:50px;
  font-size:34px;
  &::after{
    content:'';
    width:100px;
    height:6px;
    display:block;
    margin: 10px auto 0 auto;
    background:#1b7ee1;
  }
`
const Imagen = styled.img`
  max-width: 400px;
  width:80%;
  margin: 100px auto 0 auto;
  display: block;
`



function App() {
  const [monedas, setMonedas] = useState({})
  const [cotizacion, setCotizacion] = useState({})
  const [cargando, setCargando] = useState(false)

  useEffect(()=>{
    if(Object.keys(monedas).length > 0){
      const [moneda, cripto] = monedas
      const cotizarCripto = async()=>{
        setCotizacion({})
        setCargando(true)
        const url = `https://min-api.cryptocompare.com/data/pricemultifull?fsyms=${cripto}&tsyms=${moneda}&api_key=e081dec1449c39f62bd402a4621e9f5db2321a0bade45513c37b49d0f50b33ec`
        console.log(url)
        const response = await fetch(url)
        const result = await response.json()
        setCotizacion(result.DISPLAY[cripto][moneda])
        console.log(result.DISPLAY[cripto][moneda])
        console.log(result.DISPLAY[cripto][moneda]['FROMSYMBOL'], "ES AQUI")
        setCargando(false)
      }
      cotizarCripto()
    }
    // console.log(monedas)
  },[monedas])

  return (
    <>
      <Content>
        <Imagen
          src={crypto}
          alt="Imagen cripto monedas"
        />
        <div>
          <Heading>Cotiza Criptomonedas al instante</Heading>
          <Formulario 
            setMonedas={setMonedas}
          />
          {cargando && (<Spinner/>) }
          {
            Object.keys(cotizacion).length > 0 && (
              <Resultado
              cotizacion={cotizacion}
              />
            )
          }
        </div>
      </Content>
    </>
  )
}

export default App
