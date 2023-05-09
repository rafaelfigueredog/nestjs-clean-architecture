export interface Mapper<Entity, Dto> {
  toEntity(dto: Dto): Entity;
  toDto(entity: Entity): Dto;
}
