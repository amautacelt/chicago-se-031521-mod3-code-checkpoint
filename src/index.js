const imageCard = document.querySelector('div#image-card')
const likesButton = document.querySelector('button.like-button')
console.log(likesButton)
const likesSection = document.querySelector('.likes-section')
let likesSpan = document.querySelector('span.likes')
console.log(likesSpan)


fetch('http://localhost:3000/images/1')
    .then(response => response.json())
    .then(imageObject => {

        const imagePhoto = document.querySelector('img.image')
        imagePhoto.src = imageObject.image
        imagePhoto.alt = imageObject.title
        imagePhoto.dataset = imageObject.id

        const imageTitle = document.querySelector('h2.title')
        imageTitle.textContent = imageObject.title

        const imageComment = document.querySelector('ul.comments')
        imageComment.textContent = imageObject.content

        console.log(imageComment)
    })


fetch('http://localhost:3000/comments')
    .then(response => response.json())
    .then(commentArray => {
        commentArray.forEach(renderComment)
    })

function renderComment(commentObj){

    const li = document.createElement('li')
    li.textContent = commentObj.content

    li.dataset.id = commentObj.id

    const commentUl = document.querySelector('ul.comments')
    commentUl.append(li)

}

likesButton.addEventListener('click', event => {
    console.log(event.target)

    likesSpan.textContent = likesSpan += 1

    fetch(`http://localhost:3000/images/1`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body: JSON.stringify({ likes: 0 })
    })
        .then(response => response.json())
        .then(data => {
            likesSpan.textContent = data.likes
        })
})

