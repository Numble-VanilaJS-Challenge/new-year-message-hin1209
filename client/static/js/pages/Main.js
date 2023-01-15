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

					let elem = document.createElement("div");
					let text = document.createElement("div");
					let img = document.createElement("img");
					let title = document.createElement("div");
					let content = document.createElement("div");

					elem.className = "list-elem";
					elem.id = post.postId;
					console.log(elem.id);
					document.querySelector(".main__list").appendChild(elem);

					img.src = post.image;
					img.className = "list-img";
					document.getElementById(post.postId).appendChild(img);

					title.className = "list-title";
					title.innerHTML = post.title;

					content.className = "list-content";
					content.innerHTML = post.content;

					text.appendChild(title);
					text.appendChild(content);
					text.className = "list-textArea";
					document.getElementById(post.postId).appendChild(text);

				}

				console.log(res.status);
				console.log(res.data);
			})
			.catch((err) => {
				console.log(err);
			});
		
		return `
			<h1>Main</h1>
			<div class = "main__list"></div>
		`;
	}
}
