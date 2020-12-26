import { Teacher } from '../../../prisma/@client';
import { Field, ID, ObjectType } from 'type-graphql';
import GroupType from './Group.type';

@ObjectType('Teacher')
export default class TeacherType implements Teacher {
	@Field(() => ID)
	id: number;

	@Field()
	name: string;

	@Field()
	lastname: string;

	@Field()
	state: boolean;

	@Field(() => [GroupType])
	groups?: GroupType[];
}
