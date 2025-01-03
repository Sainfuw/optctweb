export interface IPokeAPIResponse {
  count: number
  next: string
  previous: null
  results: ISimpleCard[]
}

export interface ISimpleCard {
  id?: string
  name: string
  url: string
}
