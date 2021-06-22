import { Field, ID, ObjectType } from 'type-graphql';
import { SchoolCurriculum } from './SchoolCurriculum';

@ObjectType()
export class Curriculum {
	@Field(() => ID)
	id: number;

	@Field()
	name: string;

	@Field()
	state: boolean;

	@Field(() => [SchoolCurriculum])
	schools?: SchoolCurriculum[];
}
