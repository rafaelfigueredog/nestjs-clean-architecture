import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

@Schema()
export class Avatar {
  @Prop({ type: Number, required: true, unique: true })
  userId: number;

  @Prop({ type: String, required: true, unique: true })
  hash: string;
}

export type AvatarDocument = HydratedDocument<Avatar>;
export const AvatarSchema = SchemaFactory.createForClass(Avatar);
