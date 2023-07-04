export const mockRpd = [];
let response =  fetch('http://localhost/summerpractic/konstructor/api/getRpd' , {
  method: 'GET'
})
let data =  response.json()
console.log(data)
