import { Button, TextField, Typography, Box } from "@mui/material";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import http from "../../../../http";
import IRestaurante from "../../../../interfaces/IRestaurante";

export default function FormularioRestaurante() {

  const [nomeRestaurante, setNomeRestaurante] = useState('');

  const parametros = useParams();

  useEffect(() => {
    if (parametros.id) {
      http.get<IRestaurante>(`restaurantes/${parametros.id}/`)
        .then(resposta => {
          setNomeRestaurante(resposta.data.nome)
        })
    }
  }, [parametros])

  const formSubmit = (evento: React.FormEvent<HTMLFormElement>) => {
    evento.preventDefault();

    if (parametros.id) {
      http.put<IRestaurante>(`restaurantes/${parametros.id}/`, { nome: nomeRestaurante })
        .then(resposta => {
          console.log(resposta.data)
          alert("Nome Alterado")
        })
    } else {
      http.post('restaurantes/', { nome: nomeRestaurante })
        .then(resposta => {
          console.log(resposta.data)
          alert("restaurante cadastrado")
        })
    }
  }


  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', flexGrow: 1 }}>
      <Typography component="h1" variant="h6">Formulário Restaurantes</Typography>
      <Box component='form' onSubmit={formSubmit} sx={{ width: '100%' }}>
        <TextField
          value={nomeRestaurante}
          onChange={(evento) => setNomeRestaurante(evento.target.value)}
          label="Nome do Restaurante"
          variant="standard"
          fullWidth
          required
        />
        <Button
          sx={{
            marginTop: 1
          }}
          type="submit"
          variant="outlined"
          fullWidth
        >
          Salvar
        </Button>
      </Box>
    </Box>
  )
}