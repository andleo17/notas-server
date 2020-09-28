import { Faculty } from '@prisma/client';
import { Field, ID, ObjectType } from 'type-graphql';
import SchoolType from './School.type';

@ObjectType('Faculty')
export default class FacultyType implements Faculty {
	@Field((type) => ID)
	id: number;

	@Field((type) => String)
	name: string;

	@Field((type) => Boolean)
	state: boolean;

	@Field((type) => [SchoolType])
	schools?: SchoolType[];
}
