const names = [
   //"Arthur",
   "Darcy",
   "Harry",
   //"Dylan",
   //"Ellis",
   //"Francis",
   "Angus",
   //"Llewellyn",
   "George",
   "Julian",
   "Louis",
   "Lachlan",
   "Oliver",
   "Thomas",
   //"Oscar",
   "William",
]

const last = "Bardsley Hinds"
let final = []

for (let i in names) {
   let name = names[i] + " "+  last
   final.push({name: name, score: 0})
   /*
   for (let j in names) {
      if (i == j) continue
      let name = names[i] + " " + names[j] + " " +  last

   }
   */
}

window.final = final
