type Blog = {
	id: string;
	title: string;
	content: string;
};

const blogs: Blog[] = [
	{
		id: "A79",
		title: "First blog post",
		content: "This is the first blog post",
	},
	{
		id: "F724A",
		title: "Second blog post",
		content: "This is the second blog post",
	},
	{
		id: "B3",
		title: "Third blog post",
		content: "What da sigma",
	},
];

Deno.serve((req: Request) => {
	let path = new URL(req.url).pathname;
	path === "/" && (path = "/index");

	if (path.startsWith("/blog/")) {
		const blogId = path.split("/")[2];

		const blog = blogs.find((blog) => blog.id === blogId);

		if (!blog) return new Response("Blog not found", {status: 404});

		return new Response(Deno.readTextFileSync("blog.html").replaceAll("{{title}}", blog.title).replaceAll("{{content}}", blog.content), {status: 200, headers: {"Content-Type": "text/html"}});
	} else {
		try {
			return new Response(Deno.readTextFileSync(Deno.cwd() + path), {status: 200, headers: {"Content-Type": "text/html"}});
		} catch {
			return new Response("Not found", {status: 404});
		}
	}
});
