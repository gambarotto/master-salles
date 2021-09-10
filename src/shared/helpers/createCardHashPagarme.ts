import AppError from '@shared/errors/AppError';
import CryptoJS from 'crypto-js';
import pagarme from 'pagarme';

export default async function createCardHashPagarme(
  hash: string,
  user_id: string,
): Promise<string> {
  try {
    const cardDecoded = CryptoJS.AES.decrypt(
      hash,
      process.env.APP_SECRET_CRYPTOJS_MOBILE as string,
    ).toString(CryptoJS.enc.Utf8);

    const client = await pagarme.client.connect({
      encryption_key: process.env.API_KEY_PAGARME,
    });

    const card_hash = client.security.encrypt(JSON.parse(cardDecoded));

    return card_hash;
  } catch (error) {
    console.log(error);
    throw new AppError('Error while decrypt card');
  }
}
