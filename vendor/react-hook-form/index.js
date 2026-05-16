import React from "react";

function getPath(obj, path) {
  return path.split(".").reduce((acc, key) => acc?.[key], obj);
}
function setPath(obj, path, value) {
  const parts = path.split(".");
  const clone = Array.isArray(obj) ? [...obj] : { ...obj };
  let cursor = clone;
  parts.forEach((part, index) => {
    if (index === parts.length - 1) {
      cursor[part] = value;
    } else {
      const next = cursor[part];
      cursor[part] = Array.isArray(next) ? [...next] : { ...(next ?? {}) };
      cursor = cursor[part];
    }
  });
  return clone;
}

export function useForm({ defaultValues = {}, resolver } = {}) {
  const [values, setValues] = React.useState(defaultValues);
  const [errors, setErrors] = React.useState({});
  const [isSubmitting, setSubmitting] = React.useState(false);
  const validate = React.useCallback(async (nextValues) => {
    if (!resolver) return { values: nextValues, errors: {} };
    const result = await resolver(nextValues);
    setErrors(result.errors ?? {});
    return result;
  }, [resolver]);

  React.useEffect(() => { validate(values); }, [values, validate]);

  const register = (name) => ({
    name,
    value: getPath(values, name) ?? "",
    onChange: (event) => setValues((current) => setPath(current, name, event?.target ? event.target.value : event)),
  });

  const control = { values, setValues, errors };

  const handleSubmit = (onValid, onInvalid) => async (event) => {
    event?.preventDefault?.();
    setSubmitting(true);
    const result = await validate(values);
    const hasErrors = Object.keys(result.errors ?? {}).length > 0;
    if (hasErrors) onInvalid?.(result.errors);
    else await onValid(values);
    setSubmitting(false);
  };

  return { register, control, handleSubmit, formState: { errors, isSubmitting, isValid: Object.keys(errors).length === 0 } };
}

export function useFieldArray({ control, name }) {
  const items = getPath(control.values, name) ?? [];
  const fields = items.map((item, index) => ({ ...item, id: item.id ?? `${name}-${index}` }));
  return {
    fields,
    append: (value) => control.setValues((current) => setPath(current, name, [...(getPath(current, name) ?? []), value])),
    remove: (index) => control.setValues((current) => setPath(current, name, (getPath(current, name) ?? []).filter((_, itemIndex) => itemIndex !== index))),
  };
}

export function Controller({ control, name, render }) {
  const field = {
    name,
    value: getPath(control.values, name) ?? "",
    onChange: (event) => control.setValues((current) => setPath(current, name, event?.target ? event.target.value : event)),
  };
  return render({ field });
}
