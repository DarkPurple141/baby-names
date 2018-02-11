
function getNewIndex(oldA, length) {
   let index = oldA
   while (index == oldA) {
      index = Math.floor(Math.random() * length)
   }
   return index
}

export function newRound(oldA, oldB, range) {

   let index = getNewIndex(oldA, range)

   let secIndex = index
   while (secIndex == index) {
      secIndex = getNewIndex(oldB, range)
   }

   return { index, secIndex }
}
