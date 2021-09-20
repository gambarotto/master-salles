import ICryptoJsDTO from '../dtos/ICryptoJsDTO';

export default interface IEncryptProvider {
  encrypt({ data, key }: ICryptoJsDTO): string;
  decrypt({ data, key }: ICryptoJsDTO): string;
}
