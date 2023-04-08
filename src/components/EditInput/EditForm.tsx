import { component$ } from '@builder.io/qwik';
import { Form } from '@builder.io/qwik-city';
import styles from './editform.module.css';
import { GoCheck, GoX } from '@qwikest/icons/octicons';
import { type ContentProps } from '../Content/Content';

export const EditForm = component$(({ item, isEditable }: ContentProps) => {
  return (
    <div class={styles.wrapper}>
      <Form class={styles.form}>
        <input class={styles.edit} type="" value={item.text} />
        <button class={styles.done}>
          <GoCheck />
        </button>
      </Form>
      <div class={styles.remove}>
        <button onClick$={() => (isEditable.value = !isEditable.value)}>
          <GoX />
        </button>
      </div>
    </div>
  );
});

export default EditForm;
