import { Button, TextField, Typography, Box, FormControl, InputLabel, Select, MenuItem } from "@mui/material";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import http from "../../../../http";
import IPrato, { ITag } from "../../../../interfaces/IPrato";
import IRestaurante from "../../../../interfaces/IRestaurante";

export default function FormularioPratos() {

    const [nomePrato, setNomePrato] = useState('');
    
    const [descricao, setDescricao] = useState('');

    const [tag, setTag] = useState('');
    const [tags, setTags] = useState<ITag[]>([]);

    const [restaurante, setRestaurante] = useState('');
    const [restaurantes, setRestaurantes] = useState<IRestaurante[]>([]);

    const [imagem, setImagem] = useState<File | null>(null);

    const parametros = useParams();

    useEffect(()=>{
      http.get<{tags: ITag[]}>('tags/')
        .then(resposta=>
          setTags(resposta.data.tags)
        )
      http.get<IRestaurante[]>('restaurantes/')
        .then(resposta=>
          setRestaurantes(resposta.data)
        )
    },[])

    useEffect(() => {
        if (parametros.id) {
            http.get<IPrato>(`pratos/${parametros.id}/`)
                .then(resposta => {
                    setNomePrato(resposta.data.nome)
                })
        }
    }, [parametros])

    const formSubmit = (evento: React.FormEvent<HTMLFormElement>) => {
        evento.preventDefault();

        const formData = new FormData();

        formData.append('nome', nomePrato)
        formData.append('descricao', descricao)
        formData.append('tag', tag)
        formData.append('restaurante', restaurante)

        imagem && formData.append('imagem', imagem)

        if (parametros.id) {
            http.put<IPrato>(`pratos/${parametros.id}/`, { nome: nomePrato })
                .then(resposta => {
                    console.log(resposta.data)
                    alert("Nome Alterado")
                })
        } else {
            http.request({
              url:'pratos/',
              method: 'POST',
              headers:{
                'content-type': 'multipart/form-data'
              },
              data: formData
            })
                .then(resposta => {
                    console.log(resposta.data)
                    alert("Prato cadastrado")
                })
        }
    }

    const filtrarImagem = (evento: React.ChangeEvent<HTMLInputElement>)=>{
      evento.preventDefault();

      if(evento.target.files?.length){
        setImagem(evento.target.files[0])
      }else{
        setImagem(null)
      }
    }


    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', flexGrow: 1 }}>
            <Typography component="h1" variant="h6">Formulário Pratos</Typography>
            <Box component='form' onSubmit={formSubmit} sx={{ width: '100%' }}>
                <TextField
                    value={nomePrato}
                    onChange={(evento) => setNomePrato(evento.target.value)}
                    label="Nome do Prato"
                    variant="standard"
                    fullWidth
                    required
                    margin="dense"
                />
                <TextField
                    value={descricao}
                    onChange={(evento) => setDescricao(evento.target.value)}
                    label="Descrição do prato "
                    variant="standard"
                    fullWidth
                    required
                    margin="dense"
                />
                <FormControl 
                  margin="dense" 
                  fullWidth
                >
                  <InputLabel id="select-tag">Tag</InputLabel>
                  <Select 
                    labelId="select-tag"
                    value={tag}
                    onChange={evento=> setTag(evento.target.value)}
                  >
                    {
                      tags.map(tag=>
                        <MenuItem 
                          key={tag.id} 
                          value={tag.value}
                        >
                          {tag.value}
                        </MenuItem>  
                      )
                    }
                  </Select>
                </FormControl>
                <FormControl 
                  margin="dense" 
                  fullWidth
                >
                  <InputLabel id="select-restaurante">Restaurante</InputLabel>
                  <Select 
                    labelId="select-restaurante"
                    value={restaurante}
                    onChange={evento=> setRestaurante(evento.target.value)}
                  >
                    {
                      restaurantes.map(restaurante=>
                        <MenuItem 
                          key={restaurante.id} 
                          value={restaurante.id}
                        >
                          {restaurante.nome}
                        </MenuItem>  
                      )
                    }
                  </Select>
                </FormControl>
                <input type="file" onChange={evento=> filtrarImagem(evento)}/>
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