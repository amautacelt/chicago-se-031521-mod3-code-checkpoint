// write your code here
const imageCard = document.querySelector('div#image-card')
const commentUl = document.querySelector('ul.comments')
const likesButton = document.querySelector('button.like-button')
const likesSpan = document.querySelector('span.likes')
const commentForm = document.querySelector('form.comment-form')


fetch('http://localhost:3000/images')
    .then(resp => resp.json())
    .then(imagesArray => imagesArray.forEach(imageObject => {
        renderCard(imageObject)
    }))

function renderCard(imageObject){

    let title = document.querySelector('h2.title')
    title.textContent = imageObject.title

    let image = document.querySelector('img.image')
    image.src = imageObject.image
    image.alt = imageObject.title
    image.dataset.id = imageObject.id

    commentForm.dataset.id = imageObject.id

    likesSpan.textContent = `${imageObject.likes} Likes`

    commentUl.innerHTML = ''

}


fetch('http://localhost:3000/comments')
.then(response => response.json())
.then(commentsArray => commentsArray.forEach(commentObject => {
    console.log(commentObject)
    renderComment(commentObject)
}))


function renderComment(commentObject){

    let li = document.createElement('li')
    li.textContent = commentObject.content
    li.dataset.id = commentObject.id

    commentUl.append(li)
}


likesButton.addEventListener('click', event => {
    console.log(event.target)

    let likesCount = parseInt(likesSpan.textContent)

    fetch(`http://localhost:3000/images/1`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body: JSON.stringify({ likes: likesCount + 1 })
    })
        .then(response => response.json())
        .then(updatedObject => {
            likesSpan.textContent = `${updatedObject.likes} Likes`
        })
})


commentForm.addEventListener('submit', e => {
    e.preventDefault()
    
    const newCommentObj = {
        id: '',
        imageId: parseInt(e.target.dataset.id),
        content: e.target.comment.value
    }  

    fetch(`http://localhost:3000/comments`, {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
    },
    body: JSON.stringify(newCommentObj)
    })
    .then(r => r.json())
    .then(addCommentObj => {
        renderComment(addCommentObj)

        commentForm.reset()
    })
})

