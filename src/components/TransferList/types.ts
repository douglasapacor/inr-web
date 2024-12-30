export type transferListBasics = { id: number; name: string }
export type transferList<T> = {
  source: Array<T>
  out?: (selected: Array<T>) => void
}
