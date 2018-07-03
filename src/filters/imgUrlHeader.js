
let local = 'http://localhost:3000/'
let test = 'http://13.229.129.152:3000/'
let production = '//13.229.129.152:3000/'

export default (value) => {
  const imgUrl = production+value
  return imgUrl
}
