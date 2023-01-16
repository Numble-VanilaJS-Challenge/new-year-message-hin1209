export default class {
	constructor() {
		document.title = "Main";
	}
	async getHtml() {
		axios.get("http://43.201.103.199/posts")
			.then((res) => {
				var postInfo = {};
				var posts = res.data.data.posts;

				for (let i = 0; i < posts.length; i++) {
					const post = posts[i];
					postInfo[post.postId] = [post.title, post.image, post.content, post.createdAt, post.updatedAt];

					let btnArea = document.createElement("div");
					let uploadBtn = document.createElement("div");
				
					btnArea.appendChild(uploadBtn);
					uploadBtn.href = location.href + "upload"; 
					uploadBtn.innerHTML = "게시글 작성하기";
					uploadBtn.dataset.link = "";
					document.querySelector(".main").appendChild(btnArea);

					let elem = document.createElement("div");
					let text = document.createElement("div");
					let img = document.createElement("img");
					let title = document.createElement("div");
					let content = document.createElement("div");

					elem.className = "list-elem";
					elem.id = post.postId;
					elem.dataset.link = "";
					elem.href = location.href + `posts/` + post.postId; 
					document.querySelector(".main").appendChild(elem);

					img.src = post.image;
					img.className = "list-img";
					img.dataset.link = "";
					img.href = location.href + `posts/` + post.postId; 
					document.getElementById(post.postId).appendChild(img);

					title.className = "list-title";
					title.innerHTML = post.title;
					title.dataset.link = "";
					title.href = location.href + `posts/` + post.postId; 
					content.className = "list-content";
					content.innerHTML = post.content;
					content.dataset.link = "";
					content.href = location.href + `posts/` + post.postId; 

					text.appendChild(title);
					text.appendChild(content);
					text.className = "list-textArea";
					document.getElementById(post.postId).appendChild(text);
				}
			})
			.catch((err) => {
				console.log(err);
			});
		
		return `
			<h1>Main</h1>
			<div class = "main"></div>
		`;
	}
}
