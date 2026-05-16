class ValidationError extends Error {
  constructor(message, path, inner = []) {
    super(message);
    this.name = "ValidationError";
    this.path = path;
    this.inner = inner;
  }
}

class BaseSchema {
  constructor() {
    this.tests = [];
  }
  required(message = "Campo obrigatório.") {
    this.tests.push({ name: "required", message, test: (value) => value !== undefined && value !== null && String(value).trim() !== "" });
    return this;
  }
  min(limit, message = `Mínimo de ${limit} caracteres.`) {
    this.tests.push({ name: "min", message, test: (value) => (value ?? "").length >= limit });
    return this;
  }
  matches(regex, message = "Formato inválido.") {
    this.tests.push({ name: "matches", message, test: (value) => regex.test(value ?? "") });
    return this;
  }
  email(message = "E-mail inválido.") {
    this.tests.push({ name: "email", message, test: (value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value ?? "") });
    return this;
  }
  validateValue(value, path) {
    const errors = [];
    for (const rule of this.tests) {
      if (!rule.test(value)) errors.push(new ValidationError(rule.message, path));
    }
    return errors;
  }
}

class StringSchema extends BaseSchema {}

class ObjectSchema extends BaseSchema {
  constructor(shape = {}) {
    super();
    this.shape = shape;
  }
  validateValue(value = {}, path = "") {
    const errors = super.validateValue(value, path);
    for (const [key, schema] of Object.entries(this.shape)) {
      errors.push(...schema.validateValue(value?.[key], path ? `${path}.${key}` : key));
    }
    return errors;
  }
  async validate(value, options = {}) {
    const errors = this.validateValue(value, "");
    if (errors.length) throw new ValidationError(errors[0].message, errors[0].path, errors);
    return value;
  }
}

class ArraySchema extends BaseSchema {
  of(schema) {
    this.itemSchema = schema;
    return this;
  }
  min(limit, message = `Informe pelo menos ${limit} item.`) {
    this.tests.push({ name: "arrayMin", message, test: (value) => Array.isArray(value) && value.length >= limit });
    return this;
  }
  validateValue(value = [], path = "") {
    const errors = super.validateValue(value, path);
    if (Array.isArray(value) && this.itemSchema) {
      value.forEach((item, index) => errors.push(...this.itemSchema.validateValue(item, `${path}.${index}`)));
    }
    return errors;
  }
}

export function string() { return new StringSchema(); }
export function object(shape) { return new ObjectSchema(shape); }
export function array() { return new ArraySchema(); }
export { ValidationError };
