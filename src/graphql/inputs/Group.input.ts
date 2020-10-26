import { Field, InputType, Int } from 'type-graphql';
import GroupType from '../types/Group.type';

@InputType()
export default class GroupInput implements Partial<GroupType> {
	@Field()
	denomination: string;

	@Field({ nullable: true })
	state?: boolean;

	@Field({ nullable: true })
	courseCode?: string;

	@Field((type) => Int, { nullable: true })
	teacherId?: number;

	@Field({ nullable: true })
	semesterId?: string;
}
