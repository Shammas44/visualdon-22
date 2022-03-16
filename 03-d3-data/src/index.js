import { shuffle } from "d3";
import * as d3 from "d3";
import { json } from "d3-fetch";
import { leftShift } from "mathjs";
const URL = "https://jsonplaceholder.typicode.com/";
Promise.all([json(`${URL}users`), json(`${URL}posts`)]).then(
	([users, posts]) => {
		const usernameOfLongestPost = get_most_long_post(posts, users);
		console.log(usernameOfLongestPost);
		const usersArray = create_data(users, posts);
		create_chart(usersArray);
		const body = d3.select("body");
		body
			.append("p")
			.append("text")
			.text("le post le plus long est rédigé par: " + usernameOfLongestPost);
	}
);

function create_data(users, posts) {
	const totalPost = posts.length - 1;
	const available_post_number = [];
	let user_posts = [];
	for (let i = 0; i <= totalPost; i++) {
		available_post_number[i] = i;
	}
	users.forEach((user) => {
		const user_id = user.id;
		user_posts = posts.filter((post) => {
			if (post.userId == user_id) return post;
		});
		user["posts"] = user_posts;
	});
	return users;
}

function get_most_long_post(post, users) {
	const values = sortByValue(post, "body");
	const userid = values[0].userId;
	const username = users.filter((user) => {
		if (user.id == userid) return user.username;
	});
	return username[0].name;
}

/**
 * @description Trie un tableau selon la valeur contenu dans une cellule spécific
 * @param {*} array
 * @param {*} index un entier ou une chaîne de character
 * @return {*} le tableau trié
 */
export function sortByValue(array, index) {
	array.sort((data1, data2) => {
		if (data1[index].length > data2[index].length) {
			return -1;
		}
		if (data1[index].length < data2[index].length) {
			return 1;
		}
		return 0;
	});
	return array;
}
const width = [20, 5, 25, 8, 15];

function create_chart(data) {
	const body = d3.select("body");
	const chart = body.append("div");
	chart.style("display", "flex");
	chart.style("gap", "20px");
	chart.style("align-items", "end");

	chart
		.selectAll("div")
		.data(data)
		.enter()
		.append("div")
		.style("display", "flex")
		.style("flex-direction", "column")
		.style("justify-content", "end")
		.style("height", (posts) => {
			return `${posts.posts.length}rem`;
		})
		.style("width", "20px")
		.style("background", "red")
		.append("div")
		.append("text")
		.text((posts) => posts.posts.length);
}
