import { component$, type Signal, $ } from '@builder.io/qwik';
import { GoTrash, GoPencil } from '@qwikest/icons/octicons';
import styles from './content.module.css';
import { useRemoveFromListAction } from '../../routes/index';
import type { listItem } from '../../routes/index';

export interface ContentProps {
  item: listItem;
  editingIdSignal: Signal<string>;
}

export const Content = component$(({ item, editingIdSignal }: ContentProps) => {
  const removeFromListAction = useRemoveFromListAction();
  return (
    <>
      <div>
        <span class={styles.content}>{item.text}</span>
      </div>
      <div class={styles.controls}>
        <button
          onClick$={$(() => {
            editingIdSignal.value = item.id;
          })}
        >
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
