import 'reflect-metadata';
import { ApolloServer } from 'apollo-server';
import { createContext } from './context';
import { createSchema } from './graphql/schema';

async function bootstrap() {
	const server: ApolloServer = new ApolloServer({
		schema: await createSchema(),
		context: createContext,
	});

	server
		.listen({ port: process.env.PORT || 4000 })
		.then(({ url, subscriptionsUrl }) => {
			console.log(`Server ready at ${url}`);
			console.log(`Subscriptions on ${subscriptionsUrl}`);
		});
}

bootstrap();
