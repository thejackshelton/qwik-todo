import { component$, type Signal } from '@builder.io/qwik';
import { GoTrash, GoPencil } from '@qwikest/icons/octicons';
import styles from './content.module.css';
import { useRemoveFromListAction } from '../../routes/index';
import type { listItem } from '../../routes/index';

export interface ContentProps {
  item: listItem;
  isEditable: Signal<boolean>;
}

export const Content = component$(({ item, isEditable }: ContentProps) => {
  const removeFromListAction = useRemoveFromListAction();
  return (
    <>
      <div>
        <span class={styles.content}>{item.text}</span>
      </div>
      <div class={styles.controls}>
        <button onClick$={() => (isEditable.value = !isEditable.value)}>
          <GoPencil />
        </button>
        <button onClick$={() => removeFromListAction.submit({ id: item.id })}>
          <GoTrash />
        </button>
      </div>
    </>
  );
});

export default Content;
