export interface AvatarApi {
  getAvatarByUserId(userId: number): Promise<ArrayBuffer>;
}
