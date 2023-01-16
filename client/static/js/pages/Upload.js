export default class {
	constructor() {
		document.title = "Upload";
	}
	async getHtml() {
		setTimeout(() => {
		let imgAdd = document.createElement("button");
		let title = document.createElement("input");
		let content = document.createElement("textarea");
		let submitBtn = document.createElement("button");

		imgAdd.innerHTML = "랜덤 이미지 추가하기";
		imgAdd.id = "img-add-button";
		imgAdd.onclick = async () => {
			console.log("h");
		}

		title.placeholder = "글 제목을 작성해주세요.";
		title.id = "input-title";
		title.maxLength = 50

		content.placeholder = "글 내용을 작성해주세요.";
		content.id = "textarea-title";
		content.maxLength = 500;

		submitBtn.innerHTML = "글 작성하기";
		submitBtn.id = "submit-button";
		submitBtn.dataset.link = "";
		submitBtn.href = location.href.slice(0, -6);
		submitBtn.onclick = async () => {
			console.log("a");
		}

		document.querySelector(".main").appendChild(imgAdd);
		document.querySelector(".main").appendChild(title);
		document.querySelector(".main").appendChild(content);
		document.querySelector(".main").appendChild(submitBtn);
	}, 100);

		return `
			<h1>Upload</h1>
			<div id="detail-title">
			</div>
			<div class="main">
			</div>
		`;
	}
}
