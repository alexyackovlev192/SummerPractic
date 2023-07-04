export const mockRpd = [];
let response =  fetch('http://localhost/summerpractic/konstructor/api/getallRpd' , {
  method: 'GET'
})
let data =  response.json()
console.log(data)
