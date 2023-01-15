import Main from "./pages/Main.js";
import Posts from "./pages/Posts.js";
import Upload from "./pages/Upload.js";

const router = async () => {
	console.log("route");
	const routes = [
		{ path: "/", view: Main },
		{ path: "/posts", view: Posts },
		{ path: "/upload", view: Upload },
	];

	const pageMatches = routes.map((route) => {
		return {
			route,
			isMatch: route.path === location.pathname,
		};
	});
	
	let match = pageMatches.find((pageMatch) => pageMatch.isMatch);

	const page = new match.route.view();

	document.querySelector("#root").innerHTML = await page.getHtml();
}

window.addEventListener("popstate", () => {
	router();
});

document.addEventListener("DOMContentLoaded", () => {
	console.log("load");
	document.body.addEventListener("click", (e) => {
		if (e.target.matches("[data-link]")) {
			e.preventDefault();
			history.pushState(null, null, e.target.href);
			router();
		}
	});
	router();
});
