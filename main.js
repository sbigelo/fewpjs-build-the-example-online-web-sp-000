// Defining text characters for the empty and full hearts for you to use later.
const EMPTY_HEART = '♡'
const FULL_HEART = '♥'
const modalClass = document.getElementById('modal')
const heart = document.querySelectorAll('.like-glyph')
// Your JavaScript code goes here!

heart.forEach( h => {
  h.addEventListener('click', userLiked)
})

function userLiked(event) {
  let target = event.target
  mimicServerCall("google.com")
    .then(message => { 
      target.classList.add('activated-heart')
      target.textContent = FULL_HEART
      target.removeEventListener('click', userLiked)
      target.addEventListener('click', userUnliked)
    })
    .catch(error => {
      modalClass.classList.remove("hidden")
      const p = document.createElement('p')
      const errorMessage = document.createTextNode(error)
      p.appendChild(errorMessage)
      modalClass.appendChild(p)
      setTimeout(function() {modalClass.classList.add("hidden")}, 3000)
})
}

function userUnliked(event) {
  let target = event.target
  target.classList.remove('activated-heart')
  target.textContent = EMPTY_HEART
  target.removeEventListener('click', userUnliked)
  target.addEventListener('click', userLiked)
}
  






//------------------------------------------------------------------------------
// Don't change the code below: this function mocks the server response
//------------------------------------------------------------------------------

function mimicServerCall(url="http://mimicServer.example.com", config={}) {
  return new Promise(function(resolve, reject) {
    setTimeout(function() {
      let isRandomFailure = Math.random() < .2
      if (isRandomFailure) {
        reject("Random server error. Try again.");
      } else {
        resolve("Pretend remote server notified of action!");
      }
    }, 300);
  });
}
