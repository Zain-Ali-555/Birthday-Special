const BASE_URL = "https://birthday-special-ii4z.vercel.app/api/comments";

const commentForm = document.getElementById("comment-form");
const commentName = document.getElementById("comment-name");
const commentInput = document.getElementById("comment-input");
const commentList = document.getElementById("comment-list");

// Fetch comments from the backend
async function fetchComments() {
  try {
    const response = await fetch(BASE_URL);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const comments = await response.json();
    commentList.innerHTML = ""; // Clear existing comments
    comments.forEach(({ name, message }) => addComment(name, message));
  } catch (error) {
    console.error("Error fetching comments:", error);
  }
}

// Post a new comment to the backend
async function postComment(name, message) {
  try {
    const response = await fetch(BASE_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, message }),
    });
    if (!response.ok) {
      throw new Error("Failed to post comment");
    }
  } catch (error) {
    console.error("Error posting comment:", error);
  }
}

// Add a comment to the UI
function addComment(name, message) {
  const listItem = document.createElement("li");
  listItem.className = "comment";
  listItem.innerHTML = `
    <h3>${name}</h3>
    <p>${message}</p>
  `;
  commentList.appendChild(listItem);
}

// Handle form submission
document
  .getElementById("submit-comment")
  .addEventListener("click", async () => {
    const name = commentName.value.trim();
    const message = commentInput.value.trim();

    if (name && message) {
      await postComment(name, message); // Post to backend
      await fetchComments(); // Refresh comments
      commentName.value = "";
      commentInput.value = "";
    }
  });

// Initialize comments on page load
fetchComments();
