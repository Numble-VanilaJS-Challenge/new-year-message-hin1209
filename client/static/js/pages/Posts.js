export default class {
	constructor() {
		document.title = "Posts";
	}
	
	async getHtml(postId) {
		axios.get(`http://43.201.103.199/post/` + postId.id)
			.then((res) => {
				let data = res.data.data;
				let post = data.post;
				let img = document.createElement("img");
				let postArea = document.createElement("div");
				let title = document.createElement("strong");
				let content = document.createElement("p");
				let createdAt = document.createElement("span");
				let updatePost = document.createElement("button");
				let removePost = document.createElement("button");
				let comments = data.comments;

				img.src = post.image;

				title.innerHTML = post.title;
				createdAt.innerHTML = post.createdAt;
				content.innerHTML = post.content;
				updatePost.dataset.postId = postId.id;
				removePost.dataset.postId = postId.id;
				updatePost.className = "update-post-btn";
				removePost.className = "remove-post-btn";
				updatePost.innerHTML = "수정";
				removePost.innerHTML = "삭제";

				postArea.appendChild(img);
				postArea.appendChild(title);
				postArea.appendChild(createdAt);
				postArea.appendChild(content);
				postArea.appendChild(updatePost);
				postArea.appendChild(removePost);
				document.querySelector(".main").appendChild(postArea);

				let commentSection = document.createElement("section");
				let form = document.createElement("form");
				let input = document.createElement("input");
				let submitBtn = document.createElement("button");
				submitBtn.type = "submit";
				submitBtn.innerHTML = "게시";
				submitBtn.dataset.postId = postId.id;
				submitBtn.className = "comment-add-btn";
				form.appendChild(input);
				form.appendChild(submitBtn);
				commentSection.appendChild(form);

				let commentList = document.createElement("ul");
				for (let i=0; i < comments.length; i++) {
					let comment = document.createElement("p");
					let commentElem = document.createElement("li");
					comment.innerHTML = comments[i].content;
					commentElem.appendChild(comment);
					commentList.appendChild(commentElem);
					let btn = document.createElement("button");
					btn.id = comments[i].commentId;
					btn.innerHTML = "삭제";
					btn.className = "comment-remove-btn";
					commentElem.appendChild(btn);
				}
				commentSection.appendChild(commentList);

				document.querySelector(".main").appendChild(commentSection);
			})
		return `
			<h1>Posts</h1>
			<div class="header"></div>
			<div class="main"></div>
		`;
	}
}