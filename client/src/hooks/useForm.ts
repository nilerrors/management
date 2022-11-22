import { createStore } from "solid-js/store";

const useForm = <T extends object>(formFields: T) => {
  const [form, setForm] = createStore<T>(formFields);

  const clearField = (fieldName: string) => {
    setForm({ ...form, [fieldName]: "" });
  };

  const updateFormField = (fieldName: string) => (event: Event) => {
    const inputElement = event.currentTarget as HTMLInputElement;
    if (inputElement.type === "checkbox") {
      setForm({ ...form, [fieldName]: !!inputElement.checked });
    } else {
      setForm({ ...form, [fieldName]: inputElement.value });
    }
  };

  return { form, updateFormField, clearField };
};

export { useForm };
