import type { Id, TableNames } from "./_generated/dataModel";

export type Nullable<T> = T | null;
export type Optional<T> = T | undefined;
export type NullableOptional<T> = T | null | undefined;

export type WithId<T, TableName extends TableNames> = T & {
  _id: Id<TableName>;
};
