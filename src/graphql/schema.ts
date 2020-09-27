import { buildSchema } from 'type-graphql';
import { join } from 'path';

export async function createSchema() {
	return await buildSchema({
		resolvers: [__dirname + '/resolvers/*.{ts,js}'],
		emitSchemaFile: join(__dirname, 'schema.gql'),
	});
}
