export type Id = string;
export type FindById<T> = (id: Id) => Promise<T | null>;
export type FindMany<T> = (ids: Id[]) => Promise<T[]>;
export type FindAll<T> = () => Promise<T[]>;
export type Create<T, EditableT = T> = (data: EditableT) => Promise<T>;
export type Delete = (id: Id) => Promise<boolean>;

//

export type Update<T, EditableT = T> = (id: Id, data: Partial<EditableT>) => Promise<T>;

export type AbstractRepository<T, EditableT = T> = {
	findById: FindById<T>;
	findMany: FindMany<T>;
	findAll: FindAll<T>;
	create: Create<T, EditableT>;
	update: Update<T, EditableT>;
	delete: Delete;
};
