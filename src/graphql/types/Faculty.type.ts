import { Faculty } from '../../../prisma/@client';
import { Field, ID, ObjectType } from 'type-graphql';
import SchoolType from './School.type';

@ObjectType('Faculty')
export default class FacultyType implements Faculty {
	@Field(() => ID)
	id: number;

	@Field(() => String)
	name: string;

	@Field(() => Boolean)
	state: boolean;

	@Field(() => [SchoolType])
	schools?: SchoolType[];
}
