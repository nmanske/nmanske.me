// Age writer
var age = new moment().diff(moment('19940111', 'YYYYMMDD'), 'years')
var ageElements = document.getElementsByClassName("age")
for (let element of ageElements)
  element.innerHTML = age

// Copyright year writer
var copyrightYear = new moment().year()
var copyrightYearElements = document.getElementsByClassName("copyrightYear")
console.log(copyrightYearElements[0])
for (let element of copyrightYearElements)
  element.innerHTML = copyrightYear
