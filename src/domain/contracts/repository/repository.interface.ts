export interface Repository<T> {
  insert(entity: T): Promise<T>;
  remove(uuid: string): Promise<boolean>;
  findOne(uuid: string): Promise<T>;
  findAll(): Promise<Array<T>>;
}
