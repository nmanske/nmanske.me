function getAge(dateOfBirth) {
  let today = new Date()
  let birthDate = new Date(dateOfBirth)
  let age = today.getFullYear() - birthDate.getFullYear()
  let m = today.getMonth() - birthDate.getMonth()
  if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      age--
  }
  let ageElement = document.querySelector('.age')
  ageElement.innerHTML = age
}

getAge('1994-11-01')
