import { Field, ObjectType } from 'type-graphql';
import UserType from './User.type';

@ObjectType('AuthenticationPayload')
export default class AuthenticationPayloadType {
	@Field(() => UserType)
	user: UserType;

	@Field()
	token: string;
}
