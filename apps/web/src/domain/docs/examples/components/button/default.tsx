import { BLButton } from '@bloco/ui';

export function ButtonDefault() {
  return <BLButton onPress={() => alert('Saved')}>Save changes</BLButton>;
}
