export interface IPokeAPIResponse {
  count: number
  next: string
  previous: null
  results: ISimplePokemon[]
}

export interface ISimplePokemon {
  id?: string
  name: string
  url: string
}
