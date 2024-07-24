const addUserBtn = document.getElementById('add-user')
const doubleWealthBtn = document.getElementById('double-wealth')
const onlyMillionairesBtn = document.getElementById('only-millionaires')
const sortBtn = document.getElementById('sort')
const totalWealthBtn = document.getElementById('total-wealth')

const main = document.getElementById('main')

// event listeners
doubleWealthBtn.addEventListener('click', doubleWealth)
onlyMillionairesBtn.addEventListener('click', filterMillionaires)
addUserBtn.addEventListener('click', fetchPerson)
sortBtn.addEventListener('click', sortByRichest)
totalWealthBtn.addEventListener('click', totalWealth)

let usersData = []

// Pega o usuário via API e o insere no array de usuários
async function fetchPerson() {
  const res = await fetch('https://randomuser.me/api')
  const data = await res.json()

  const user = data.results[0]

  const newUser = {
    name: `${user.name.first} ${user.name.last}`,
    money: Math.floor(Math.random() * 1000000),
  }

  addUser(newUser)

  console.log(newUser)
}

// Adiciona um usuário ao array
function addUser(obj) {
  usersData.push(obj)

  refreshPage()
}

// Atualiza a página
function refreshPage(data = usersData) {
  main.innerHTML = '<h2><span>Pessoa</span> Patrimônio</h2>'

  data.forEach(item => {
    const divElement = document.createElement('div')
    divElement.classList.add('person')
    divElement.innerHTML = ` 
    <span>${item.name}</span> 
    <span><strong>R$</strong> ${formatNumber(item.money)} </span>
    `
    main.appendChild(divElement)
  })
}

// Dobra os valores do patrimônio
function doubleWealth(){
  usersData = usersData.map(user => {
    return {...user, money: user.money * 2}
  })

  refreshPage()
}

// filtrar os milionários
function filterMillionaires(){
  usersData = usersData.filter(user => user.money >= 1000000)

  refreshPage()
}

// formatar o valor do patrimônio com regex
function formatNumber(number){
  return number.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
}

// ordenar: mais ricos aparecem primeiro na lista
function sortByRichest(){
  usersData.sort((a, b) => b.money - a.money)

  refreshPage()
}

// Soma de todos os patrimônios dos usuários juntos
function totalWealth(){
  const wealth = usersData.reduce((acc, user) => (acc += user.money), 0)
  const wealthElement = document.createElement('div')
  wealthElement.innerHTML = ` <h3> Soma dos patrimônios: ${formatNumber(wealth)} </h3> `
  main.appendChild(wealthElement)
}



fetchPerson()
fetchPerson()
fetchPerson()
fetchPerson()
fetchPerson()

