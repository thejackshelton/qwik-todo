import { component$, type Signal, useSignal, $ } from '@builder.io/qwik';
import { Form } from '@builder.io/qwik-city';
import styles from './editform.module.css';
import { GoCheck, GoX } from '@qwikest/icons/octicons';
import type { listItem } from '../../routes/index';
import { useEditFromListAction } from '../../routes/index';

export interface EditFormProps {
  item: listItem;
  editingIdSignal: Signal<string>;
}

export const EditForm = component$(
  ({ item, editingIdSignal }: EditFormProps) => {
    const editAction = useEditFromListAction();

    const inputRef = useSignal<HTMLInputElement>();
    inputRef.value?.focus();

    const inputForm = useSignal<HTMLFormElement>();

    const handleSubmit = $((e: Event, form: HTMLFormElement) => {
      editAction.submit({ text: item.text, id: item.id });
      form.submit();
    });
    return (
      <div class={styles.wrapper}>
        <Form
          action={editAction}
          class={styles.form}
          onSubmit$={handleSubmit}
          spaReset
        >
          <input
            ref={inputRef}
            class={styles.edit}
            type="text"
            value={item.text}
            name="text"
            id={`edit-${item.id}`}
          />
          {/* Include the hidden input field for the "id" attribute */}
          <input type="hidden" name="id" value={item.id} />
          <button
            class={styles.done}
            onClick$={() => inputForm.value?.submit()}
          >
            <GoCheck />
          </button>
        </Form>

        <div class={styles.remove}>
          <button onClick$={() => (editingIdSignal.value = '')}>
            <GoX />
          </button>
        </div>
      </div>
    );
  }
);

export default EditForm;
