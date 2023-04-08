import Content from '~/components/Content/Content';
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
  text?: string;
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
  (itemData: listItem) => {
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

export default component$(() => {
  const list = useListLoader();
  const addAction = useAddToListAction();
  const removeAction = useRemoveFromListAction();

  // need to convert to string for contentEditable types
  const isEditable = useSignal(false);
  const contentEditable = isEditable.value ? 'true' : 'false';

  // const handleEdit = $(() => {
  //   const content = document.querySelector('.content') as HTMLElement;
  //   isEditable.value = !isEditable.value;

  //   if (isEditable.value === true) {
  //     content.focus();
  //   }

  //   console.log(isEditable.value);
  // });

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
                  <Content item={item} />
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
