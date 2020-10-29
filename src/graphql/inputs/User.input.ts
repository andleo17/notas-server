import { Field, InputType, Int } from 'type-graphql';
import UserType from '../types/User.type';

@InputType()
export default class UserInput implements Partial<UserType> {
	@Field({ nullable: true })
	nickname: string;

	@Field({ nullable: true })
	password: string;

	@Field({ nullable: true })
	email: string;

	@Field({ nullable: true })
	name: string;

	@Field({ nullable: true })
	lastname: string;

	@Field({ nullable: true })
	birthDate: Date;

	@Field({ nullable: true })
	photo: string;

	@Field({ nullable: true })
	genre: boolean;

	@Field({ nullable: true })
	state: boolean;

	@Field({ nullable: true })
	semesterId?: string;

	@Field((type) => Int, { nullable: true })
	schoolId?: number;
}
