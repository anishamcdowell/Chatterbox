// const { Json } = require("sequelize/types/lib/utils");

// CREATE POST
const newPostHandler = async (event) => {
  event.preventDefault();

  const title = document.querySelector("#post-title").value.trim();
  const content = document.querySelector("#post-content").value.trim();

  if (title && content) {
    const response = await fetch(`/api/posts`, {
      method: "POST",
      body: JSON.stringify({
        title,
        content,
        //forum foreign key info
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.ok) {
      document.location.replace("/dashboard");
      alert("Post successful!");
    } else {
      alert(response.statusText);
    }
  }
};

// DELETE POST
const deleteButtonHandler = async (event) => {
  if (event.target.hasAttribute('data-id')) {
    const id = event.target.getAttribute('data-id');

    const response = await fetch(`/api/posts/${id}`, {
      method: 'DELETE',
    });
    
    if (response.ok) {
      console.log('deleted');
      document.location.replace('/profile');
    } else {
      alert('Failed to delete post.');
    }
  }
};

// EDIT POST
const editButtonHandler = async (event) => {
  const title = postTitle.value;
  const content = postContent.value;
  console.log(title, content, postId);
  const response = await fetch(`/api/posts/${postId}`, {
    method: 'PUT',
    body: JSON.stringify({
      title,
      content
    }),
    headers: {
      "Content-Type": "application/json",
    },
  });
  
  if (response.ok) {
    console.log('edited');
    document.location.reload();
  } else {
    alert('Failed to edit post.');
  }
};

const modalPopup = (event) => {
    event.stopPropagation()
    console.log("hit")
    if(modal.style.display !== "block") {
      postTitle.value = event.target.getAttribute("data-title");
      postContent.value = event.target.getAttribute("data-content");
      postId = event.target.getAttribute("data-id");
      modal.style.display = "block"
      return
    }
    modal.style.display = "none"
}

const newPostForm = document
  .querySelector(".new-post-form");

if (newPostForm) newPostForm.addEventListener("submit", newPostHandler);

const deletePostButton = document
  .querySelectorAll(".delete-post");

if (deletePostButton.length > 0) deletePostButton.forEach(elment => {
  elment.addEventListener("click", deleteButtonHandler);
});

const editPostButton = document
  .querySelectorAll(".edit-post");

if (editPostButton.length > 0) editPostButton.forEach(element => {
  element.addEventListener("click", modalPopup);
});

const modal = document.querySelector(".modal");
const closeModalButton = document.querySelector("#close-modal").addEventListener("click", modalPopup);
const postContent = document.querySelector("#post-content");
const postTitle = document.querySelector("#post-title");
let postId;

const saveChangesBtn = document.querySelector("#save-changes").addEventListener("click", editButtonHandler);