export type Id = string;
const init_filters = {};
export type FindById<T> = (id: Id) => Promise<T | null>;
export type FindMany<T, Filters = typeof init_filters> = (
	ids: Id[],
	filters?: Filters,
) => Promise<T[]>;
export type FindAll<T, Filters = typeof init_filters> = (
	filters?: Filters,
) => Promise<T[]>;
export type Create<T, EditableT = T> = (data: EditableT) => Promise<T>;
export type Delete = (id: Id) => Promise<boolean>;

//

export type Update<T, EditableT = T> = (
	id: Id,
	data: Partial<EditableT>,
) => Promise<T>;

export type AbstractRepository<T, EditableT = T, Filters = typeof init_filters> = {
	findById: FindById<T>;
	findMany: FindMany<T, Filters>;
	findAll: FindAll<T, Filters>;
	create: Create<T, EditableT>;
	update: Update<T, EditableT>;
	delete: Delete;
};
