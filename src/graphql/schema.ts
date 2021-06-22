import { buildSchema, ResolverData } from 'type-graphql';
import { join } from 'path';
import { APIContext } from '../utils/context';
import { GraphQLSchema } from 'graphql';

const createSchema = async (): Promise<GraphQLSchema> => {
	return buildSchema({
		resolvers: [__dirname + '/resolvers/*.{ts,js}'],
		emitSchemaFile: join(__dirname, 'schema.gql'),
		authChecker: ({ context }: ResolverData<APIContext>) => {
			return !!context.user;
		},
	});
};

export default createSchema;
