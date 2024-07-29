import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType('AccountLoginResponseV1')
export class AccountLoginResponseV1 {
  @Field(() => String)
  accessToken!: string;
}
