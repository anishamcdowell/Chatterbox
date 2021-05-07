// CREATE POST
const newPostHandler = async (event) => {
  event.preventDefault();

  const title = document.querySelector("#post-title").value.trim();
  const content = document.querySelector("#post-content").value.trim();
  // const forum = document.querySelector('input[name="selected-forum"]').value;

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

document
  .querySelector(".new-post-form")
  .addEventListener("submit", newPostHandler);

document
  .querySelector(".delete-post")
  .addEventListener("click", deleteButtonHandler)