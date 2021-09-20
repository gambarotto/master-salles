import IEncryptDTO from '../dtos/ICryptoJsDTO';
import IEncryptProvider from '../models/IEncryptProvider';

class FakeCryptoJsProvider implements IEncryptProvider {
  public encrypt({ data }: IEncryptDTO): string {
    return data;
  }

  public decrypt({ data }: IEncryptDTO): string {
    return data;
  }
}
export default FakeCryptoJsProvider;
