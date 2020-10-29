import { Field, InputType } from 'type-graphql';
import TeacherType from '../types/Teacher.type';

@InputType()
export default class TeacherInput implements Partial<TeacherType> {
	@Field({ nullable: true })
	name: string;

	@Field({ nullable: true })
	lastname: string;

	@Field({ nullable: true })
	state?: boolean;
}
