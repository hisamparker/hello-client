// This is client side config only - don't put anything in here that shouldn't be public!
// here's how our graphqlqueries know where to look!!!!!
export const endpoint = `http://localhost:3000/api/graphql`;
export const prodEndpoint = `https://api.hellotutorials.dev/api/graphql`;
// here's where we decide items per page not great to hardcode this on the page itself, so putting it here makes it easier to change
export const perPage = 2;
