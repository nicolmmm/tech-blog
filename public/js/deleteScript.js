const blogElement = document.getElementById("commentBodyInput");
const blogId = blogElement.getAttribute("data-id");

const deleteBlogPost = async (event) => {
  event.preventDefault();
  //delete blog post request
  const response = await fetch("/blog/" + blogId, {
    method: "DELETE",
  });

  if (response.ok) {
    console.log("post successful");
    document.location.replace("/user/dashboard");
  } else {
    alert("Failed to post.");
  }
};

const submit = document.getElementById("deletePostButton");
submit.addEventListener("click", deleteBlogPost);
