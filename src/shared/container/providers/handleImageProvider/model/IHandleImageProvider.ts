import IDimensionDTO from '../dtos/IDimensionDTO';

export default interface IHandleImageProvider {
  dimension({ image, height, width }: IDimensionDTO): Promise<void>;
}
