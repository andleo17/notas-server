import { Field, ID, Int, ObjectType } from 'type-graphql';
import { Curriculum } from './Curriculum';
import { Faculty } from './Faculty';
import { User } from './User';

@ObjectType()
export class School {
	@Field(() => ID)
	id: number;

	@Field()
	name: string;

	@Field()
	state: boolean;

	@Field(() => Int)
	facultyId: number;

	@Field(() => Faculty)
	faculty?: Faculty;

	@Field(() => [User])
	users?: User[];

	@Field(() => [Curriculum])
	curriculums?: Curriculum[];
}
