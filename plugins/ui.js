
function getNewIndex(oldA, oldB, length) {
   let index = oldA
   while (index == oldA || index == oldB) {
      index = Math.floor(Math.random() * length)
   }
   return index
}

export function newRound(oldA, oldB, range) {

   let index = getNewIndex(oldA, oldB, range)

   let secIndex = index
   while (secIndex == index) {
      secIndex = getNewIndex(oldB, oldA, range)
   }

   return { index, secIndex }
}
