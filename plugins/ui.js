
function getNewIndex(oldA, length) {
   let index = oldA
   while (index == oldA) {
      index = Math.floor(Math.random() * length)
   }
   return index
}

export function toTitleCase(str)
{
    return str.replace(/\w\S*/g,
      txt => (txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase())
   )
}

export function newRound(oldA, oldB, range) {

   let index = getNewIndex(oldA, range)

   let secIndex = index
   while (secIndex == index) {
      secIndex = getNewIndex(oldB, range)
   }

   return { index, secIndex }
}
