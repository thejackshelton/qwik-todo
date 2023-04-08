import { component$ } from '@builder.io/qwik';
import { GoTrash, GoPencil } from '@qwikest/icons/octicons';
import styles from './content.module.css';
import useRemoveFromListAction from '../../routes/index';
import type { listItem } from '../../routes/index';

interface ContentProps {
  item: listItem;
}

export const Content = component$<ContentProps>(
  ({ item }: { item: listItem }) => {
    return (
      <>
        <div>
          <span class={styles.content}>{item.text}</span>
        </div>
        <div class={styles.controls}>
          <button>
            <GoPencil />
          </button>
          <button
            onClick$={() => useRemoveFromListAction.submit({ id: item.id })}
          >
            <GoTrash />
          </button>
        </div>
      </>
    );
  }
);

export default Content;
