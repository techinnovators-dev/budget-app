export function useFormat() {
  const commaNumber = value => value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
  return {commaNumber}
}