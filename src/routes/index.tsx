import Content from '~/components/Content/Content';
import EditForm from '~/components/EditInput/EditForm';
import { component$, useSignal } from '@builder.io/qwik';
import {
  type DocumentHead,
  Form,
  routeLoader$,
  routeAction$,
  zod$,
  z,
} from '@builder.io/qwik-city';
import styles from './index.module.css';

export interface listItem {
  text: string;
  id: string;
}

interface RemoveFormData {
  id: string;
}

export const list: listItem[] = [];

export const useListLoader = routeLoader$(() => {
  return list;
});

export const useAddToListAction = routeAction$(
  (item) => {
    // Generate a random id for the item
    const id = crypto.randomUUID();
    console.log(id);

    // Add the item to the list
    list.push({ text: item.text, id });

    console.log(list);
    return {
      success: true,
    };
  },
  zod$({
    text: z.string().trim().min(1),
  })
);

export const useRemoveFromListAction = routeAction$(
  // Extract the id from the form data
  (itemData: RemoveFormData) => {
    const { id } = itemData;

    // Filter the list to exclude the item with the specified id
    const updatedList = list.filter((item) => item.id !== id);

    // Update the list with the filtered array
    list.length = 0;
    list.push(...updatedList);
    return {
      success: true,
    };
  },
  zod$({
    id: z.string().uuid(), // Validate that id is a valid UUID
  })
);

export const useEditFromListAction = routeAction$(
  // Extract the id from the form data
  (itemData: listItem) => {
    const { id, text } = itemData;

    // Filter the list to exclude the item with the specified id
    const itemToUpdate = list.find((item) => item.id === id);
    if (itemToUpdate) {
      itemToUpdate.text = text;
    }
    console.log(list);

    return {
      success: true,
    };
  },
  zod$({
    id: z.string().uuid(),
    text: z.string().trim().min(1),
  })
);

export default component$(() => {
  const list = useListLoader();
  const addAction = useAddToListAction();

  const editingIdSignal = useSignal('');

  return (
    <>
      <div class={styles.wrapper}>
        <div>
          <div class={styles.heading}>
            <h1>Jack's Todo App!</h1>
          </div>
          <div class={styles.tasks}>
            <ul class={styles.list}>
              {list.value.map((item) => (
                <li class={styles.item} key={item.id}>
                  {item.id === editingIdSignal.value ? (
                    <EditForm item={item} editingIdSignal={editingIdSignal} />
                  ) : (
                    <Content item={item} editingIdSignal={editingIdSignal} />
                  )}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <Form action={addAction} spaReset>
              <input
                type="text"
                name="text"
                placeholder="Add task here..."
                required
              />
            </Form>
          </div>
        </div>
      </div>
    </>
  );
});

export const head: DocumentHead = {
  title: `Jack's Qwik todo app!`,
  meta: [
    {
      name: 'description',
      content: 'A todo app I made with Qwik!',
    },
  ],
};
