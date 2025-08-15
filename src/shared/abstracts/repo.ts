export type FindById<T> = (id: string) => Promise<T | null>;
export type FindMany<T> = (ids: string[]) => Promise<T[]>;
export type FindAll<T> = () => Promise<T[]>;
export type Create<T, EditableT = T> = (data: EditableT) => Promise<T>;
export type Delete = (id: string) => Promise<boolean>;

export type Update<T, EditableT = T> = (id: string, data: Partial<EditableT>) => Promise<T | null>;

export type AbstractRepository<T, EditableT = T> = {
	findById: FindById<T>;
	findMany: FindMany<T>;
	findAll: FindAll<T>;
	create: Create<T, EditableT>;
	update: Update<T, EditableT>;
	delete: Delete;
};
