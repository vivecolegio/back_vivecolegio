import { ObjectId } from 'mongodb';

export type Ref<T> = T | ObjectId;

export type Lazy<T extends object> = Promise<T> | T;
