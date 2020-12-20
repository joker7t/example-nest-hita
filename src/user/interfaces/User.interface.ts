import { Document } from 'mongoose';

export interface UserAttrs extends Document {
  readonly firstname: string;
  readonly lastname: string;
  readonly email: string;
  readonly accessToken: string;
  readonly from: string;
}
