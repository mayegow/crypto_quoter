import styled from '@emotion/styled'
import useSelectMonedas from '../hooks/useSelectMonedas' 
import {monedas} from '../data/monedas'
import { useEffect, useState } from 'react'

const InputSubmit = styled.input`
    background-color:#9497ff;
    border: none;
    width: 100%;
    padding: 10px;
    color: #fff;
    font-weight: 700;
    text-transform: uppercase;
    font-size: 20px;
    border-radius: 5px;
    transition: background-color .3s ease;
    &:hover{
        background-color: #97ff;
        cursor:pointer;
    }
`

const Error = styled.div`
    width: 100%;
    background-color:#b7322c;
    padding: 15px;
    font-family: 'Lato';
    color: #fff;
    text-transform: uppercase;
    font-size: 20px;
    border: none;
    font-weight: 700;

`

export default function Formulario({setMonedas}) {
    const moneda = monedas
    const [state, SelectMonedas] = useSelectMonedas('Elige tu moneda', moneda)
    const [criptos, setCriptos] = useState([])
    const [error, setError] = useState(false)
    const [stateCrypto, SelectCryptoMonedas] = useSelectMonedas('Elige tu cripto moneda', criptos)
    useEffect(()=>{
        const consultarApi = async()=>{
            const url="https://min-api.cryptocompare.com/data/top/mktcapfull?limit=20&tsym=USD&api_key=e081dec1449c39f62bd402a4621e9f5db2321a0bade45513c37b49d0f50b33ec"
            const respuesta = await fetch(url)
            const resultado = await respuesta.json()
            const arrayCryptos = resultado.Data.map(cripto => {
                const objeto = {id:cripto.CoinInfo.Name, nombre:cripto.CoinInfo.FullName}
                return objeto
            })
            setCriptos(arrayCryptos)

        }
        consultarApi()
    },[])
    
    const apiConsult = async () => {
        const url = `https://min-api.cryptocompare.com/data/pricemultifull?fsyms=${stateCrypto}&tsyms=${state}&api_key=e081dec1449c39f62bd402a4621e9f5db2321a0bade45513c37b49d0f50b33ec`
        const response = await fetch(url)
        const result = await response.json()
        console.log(result)
    }

    const handleSubmit= e => {
        e.preventDefault()
        if([state, stateCrypto].includes('')){
            console.log("error al tratar de hacer la consulta")
            setError(true)
            return
        } 
        setError(false)
        setMonedas([state, stateCrypto])
        // apiConsult()

    }

  return (
    <>
        { error && (
            <Error>Todos los campos son obligatorios</Error>
        )}
        <form onSubmit={handleSubmit}>
            <SelectMonedas/>
            <SelectCryptoMonedas/>
            <InputSubmit type="submit" value="Cotizar"/>
        </form>
    </>

  )
}
