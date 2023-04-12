import { component$, type Signal, $, useSignal } from '@builder.io/qwik';
import { GoTrash, GoPencil, GoCheck } from '@qwikest/icons/octicons';
import styles from './content.module.css';
import { useRemoveFromListAction } from '../../routes/index';
import type { listItem } from '../../routes/index';

export interface ContentProps {
  item: listItem;
  editingIdSignal: Signal<string>;
}

export const Content = component$(({ item, editingIdSignal }: ContentProps) => {
  const removeFromListAction = useRemoveFromListAction();
  const isTaskDone = useSignal(false);
  const checkDone = isTaskDone.value ? styles.done : '';
  return (
    <>
      <div>
        <span class={checkDone}>{item.text}</span>
      </div>
      <div class={styles.controls}>
        <button
          onClick$={() => (isTaskDone.value = !isTaskDone.value)}
          class={styles.check}
        >
          {isTaskDone.value && (
            <span>
              <GoCheck />
            </span>
          )}
        </button>
        <button
          onClick$={$(() => {
            editingIdSignal.value = item.id;
          })}
        >
          <GoPencil />
        </button>
        <button
          onClick$={() => removeFromListAction.submit({ id: item.id })}
          onSubmit$={() => removeFromListAction.submit({ id: item.id })}
        >
          <GoTrash />
        </button>
      </div>
    </>
  );
});

export default Content;
