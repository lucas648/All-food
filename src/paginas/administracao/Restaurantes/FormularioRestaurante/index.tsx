import { Button, TextField } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import IRestaurante from "../../../../interfaces/IRestaurante";

    export default function FormularioRestaurante(){

      const [nomeRestaurante, setNomeRestaurante] = useState('');

      const parametros = useParams();

      useEffect(()=>{
        if(parametros.id){
          axios.get<IRestaurante>(`http://localhost:8000/api/v2/restaurantes/${parametros.id}/`)
            .then(resposta=>{
              setNomeRestaurante(resposta.data.nome)
            })
        }
      },[parametros])
      
      const formSubmit = (evento: React.FormEvent<HTMLFormElement>)=>{
        evento.preventDefault();

        if(parametros.id){
            axios.put<IRestaurante>(`http://localhost:8000/api/v2/restaurantes/${parametros.id}/`,{nome: nomeRestaurante})
            .then(resposta=>{
              console.log(resposta.data)
              alert("Nome Alterado")
            })
        }else{
          axios.post('http://localhost:8000/api/v2/restaurantes/',{nome: nomeRestaurante})
            .then(resposta=>{
              console.log(resposta.data)
              alert("restaurante cadastrado")
            })
        }
      }  

    
      return(
        <form onSubmit={formSubmit}>
          <TextField 
            value={nomeRestaurante}
            onChange={(evento)=> setNomeRestaurante(evento.target.value)}
            label="Nome do Restaurante" 
            variant="standard" 
          />
          <Button 
            type="submit"
            variant="outlined"
          >
            Salvar
          </Button>
        </form>
      )
    }