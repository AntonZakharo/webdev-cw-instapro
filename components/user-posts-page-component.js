import { renderHeaderComponent } from "./header-component.js";
import { posts } from "../index.js";
import { formatDistanceToNow } from "../node_modules/date-fns/formatDistanceToNow.js";

export function renderUserPostsPageComponent({ appEl }) {
  let postsHtml = ``;
  for (let i = 0; i < posts.length; i++) {
    let post = posts[i];
    let postHtml = `
          <li class="post">
                        <div class="post-image-container">
                          <img class="post-image" src="${post.imageUrl}">
                        </div>
                        <div class="post-likes">
                          <button data-post-id="${post.id}" class="like-button">
                            <img src="./assets/images/like-active.svg">
                          </button>
                          <p class="post-likes-text">
                            Нравится: <strong>2</strong>
                          </p>
                        </div>
                        <p class="post-text">
                          <span class="user-name">${post.user.name}</span>
                         ${post.description}
                        </p>
                        <p class="post-date">
                          ${formatDistanceToNow(post.createdAt)}
                        </p>
                      </li>
          `;
    postsHtml += postHtml;
  }
  const appHtml = `
              <div class="page-container">
                <div class="header-container"></div>
                <div class="posts-user-header">
                    <img src="${posts[0].user.imageUrl}" class="posts-user-header__user-image">
                    <p class="posts-user-header__user-name">${posts[0].user.name}</p>
                </div>
                <ul class="posts">
                  ${postsHtml}
                </ul>
              </div>`;

  appEl.innerHTML = appHtml;
  renderHeaderComponent({
    element: document.querySelector(".header-container"),
  });

  for (let userEl of document.querySelectorAll(".post-header")) {
    userEl.addEventListener("click", () => {
      goToPage(USER_POSTS_PAGE, {
        userId: userEl.dataset.userId,
      });
    });
  }
}
