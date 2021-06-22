import { ApolloServer } from 'apollo-server-express';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import Express from 'express';
import 'reflect-metadata';
import createSchema from './graphql/schema';
import { createContext } from './utils/context';
import { APP_PORT } from './utils/env';

const main = async () => {
	const server: ApolloServer = new ApolloServer({
		schema: await createSchema(),
		context: createContext,
	});

	await server.start();

	const app = Express();

	app.use(cors({ credentials: true, origin: '*' })).use(cookieParser());

	server.applyMiddleware({ app });

	app.listen(APP_PORT, () => {
		console.log(`Server ready at http://localhost:${APP_PORT}/`);
	});
};

main();
