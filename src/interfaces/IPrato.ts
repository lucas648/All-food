export default interface IPrato {
  id: number
  nome: string
  tag: string
  imagem: string
  descricao: string
  restaurante: number
}

export interface ITag {
  value: string,
  id: number
}