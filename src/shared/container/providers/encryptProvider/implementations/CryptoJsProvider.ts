import IEncryptDTO from '../dtos/ICryptoJsDTO';
import IEncryptProvider from '../models/IEncryptProvider';

class CryptoJsProvider implements IEncryptProvider {
  public encrypt({ data, key }: IEncryptDTO): string {
    const secretHash = CryptoJS.AES.encrypt(data, key).toString();
    return secretHash;
  }

  public decrypt({ data, key }: IEncryptDTO): string {
    const cardDecoded = CryptoJS.AES.decrypt(data, key).toString(
      CryptoJS.enc.Utf8,
    );
    return cardDecoded;
  }
}
export default CryptoJsProvider;
