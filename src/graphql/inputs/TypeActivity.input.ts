import { Field, InputType } from 'type-graphql';
import TypeActivityType from '../types/TypeActivity.type';

@InputType()
export default class TypeActivityInput implements Partial<TypeActivityType> {
	@Field()
	name: string;
}
