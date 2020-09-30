import { Field, InputType, Int } from 'type-graphql';
import GroupType from '../types/Group.type';

@InputType()
export default class GroupInput implements Partial<GroupType> {
	@Field()
	denomination: string;

	@Field({ nullable: true })
	state?: boolean;

	@Field((type) => Int, { nullable: true })
	courseId?: number;

	@Field((type) => Int, { nullable: true })
	teacherId?: number;

	@Field((type) => Int, { nullable: true })
	semesterId?: number;
}
