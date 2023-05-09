export interface MessageQueueEmitter<DataType> {
  emitMessage(message: string, payload: DataType): void;
}
