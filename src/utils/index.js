export const parsePrice = (num, isFixed = false) => {
  const number = Math.round(parseFloat(num) / 100) * 100
  const fixedNumber = isFixed ? Number.parseFloat(number).toFixed(2) : Number.parseFloat(number) 
  return '$' + String(fixedNumber).replace(/\B(?=(\d{3})+(?!\d))/g, ",")
}
