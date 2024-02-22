import { Model } from 'mongoose';

export async function clearAllCollections(
  ...models: Array<Model<any>>
): Promise<void> {
  await Promise.all(models.map((model) => model.deleteMany({})));
}
