let count = -1

document.onkeyup = (event) => {
   if (event.key === "Enter") { //enter key
     finish(event)
   }
}

function opacity(el) {
   $(el).css('opacity', .6)
}

function fixOpacity() {
   $('.inner').css('opacity', 1.0)
}

function dealWithReject(reject) {
   reject = reject === "first inner" ? "second" : "first"
   reject = $('.'+reject).text()
   let obj = final.find((item) => {
      return item.name === reject
   })
   obj.score--;
}

function clicked(el) {
   let name = el.innerHTML
   let obj = final.find((item) => {
      return item.name === name
   })
   let reject = el.className
   dealWithReject(reject)

   obj.score++
   newRound()
}

function sort() {
   final = final.sort((a, b) => { return b.score - a.score })
   return final;
}

function newRound() {
   if (count == 10) {
      final = final.filter(item => item.score >= 0)
   }

   if (count == 15) {
      final = final.filter(item => item.score > 0)
   }

   if (count > 20) {
      finish(null)
   } else {
      let index = Math.floor(Math.random() * final.length)
      let a = final[index]
      let secIndex = index
      while (secIndex === index) {
         secIndex = Math.floor(Math.random() * final.length)
      }
      let b = final[secIndex]
      $('.first .content').text(a.name)
      $('.second .content').text(b.name)
   }
   count++
}

function finish(event) {

   sort()
   let el = $('.finish ol')
   final.map(item => {
      el.append('<li>' + item.name + '</li>')
   })

   $( ".container" ).animate({
      opacity: 0
    }, 500 , () => {
      $(".finish").css('display','flex')
      $( ".container" ).hide()
    })

}

window.onload = () => {
   newRound()
   $( ".container" ).on("swiperight", finish);
}
