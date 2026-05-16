function setPath(target, path, value) {
  const parts = path.split(".").filter(Boolean);
  let cursor = target;
  parts.forEach((part, index) => {
    if (index === parts.length - 1) {
      cursor[part] = value;
      return;
    }
    cursor[part] ??= /^\d+$/.test(parts[index + 1]) ? [] : {};
    cursor = cursor[part];
  });
}

export function yupResolver(schema) {
  return async (values) => {
    try {
      await schema.validate(values, { abortEarly: false });
      return { values, errors: {} };
    } catch (error) {
      const errors = {};
      const list = error.inner?.length ? error.inner : [error];
      for (const item of list) {
        if (item.path) setPath(errors, item.path, { type: "validation", message: item.message });
      }
      return { values: {}, errors };
    }
  };
}
