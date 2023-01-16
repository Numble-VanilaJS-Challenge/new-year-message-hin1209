import Main from "./pages/Main.js";
import Posts from "./pages/Posts.js";
import Upload from "./pages/Upload.js";

const router = async () => {
	console.log("route");
	const routes = [
		{ path: "/", view: Main },
		{ path: "/posts/:id", view: Posts },
		{ path: "/upload", view: Upload },
	];
	const pathToRegex = (path) => new RegExp("^" + path.replace(/\//g, "\\/").replace(/:\w+/g, "(.+)") + "$");

	const pageMatches = routes.map((route) => {
		return {
			route,
			isMatch: location.pathname.match(pathToRegex(route.path)),
		};
	});

	const getParams = (match) => {
		const values = match.isMatch.slice(1);

		const keys = Array.from(match.route.path.matchAll(/:(\w+)/g)).map(
			(result) => result[1]
		);
		return Object.fromEntries(
			keys.map((key, i) => {
				return [key, values[i]];
			})
		);
	}
	
	let match = pageMatches.find((pageMatch) => pageMatch.isMatch !== null);

	const page = new match.route.view();

	document.querySelector("#root").innerHTML = await page.getHtml(getParams(match));
}

const removeComment = (commentId) => {
	console.log("hello");
}

window.addEventListener("popstate", () => {
	router();
});

document.addEventListener("DOMContentLoaded", () => {
	document.body.addEventListener("click", (e) => {
		if (e.target.matches("[data-link]")) {
			e.preventDefault();
			history.pushState(null, null, e.target.href);
			router();
		}
		else if (e.target.matches("button")) {
			e.preventDefault();
			removeComment(e.target.id);
		}
	});
	router();
});
