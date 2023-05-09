export interface BlobRepository {
  create(blob: ArrayBuffer): Promise<string>;
  remove(hash: string): Promise<void>;
  findOne(hash: string): Promise<string>;
}
