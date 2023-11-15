import styled from "@emotion/styled"

const Title = styled.h1`
    width:100%;
    color:#fff;
    font-family: 'Lato';
`

const Info = styled.p`
    width:100%;
    color:#fff;
    font-family:'Lato';
`


export default function Resultado({cotizacion}) {
  return (
    <div>
        <Title>Resultado: </Title>
        <Info><span>FROMSYMBOL: </span>{cotizacion['FROMSYMBOL']}</Info>
        <Info><span>TOSYMBOL: </span>{cotizacion['TOSYMBOL']}</Info>
        <Info><span>MARKET: </span>{cotizacion['MARKET']}</Info>
        <Info><span>PRICE: </span>{cotizacion['PRICE']}</Info>
        <Info><span>LASTUPDATE</span>{cotizacion['LASTUPDATE']}</Info>
       
    </div>
  )
}
