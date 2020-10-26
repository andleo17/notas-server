import { Field, ObjectType } from 'type-graphql';
import UserType from './User.type';

@ObjectType('AuthenticationPayload')
export default class AuthenticationPayloadType {
	@Field((returns) => UserType)
	user: UserType;

	@Field()
	token: string;
}
