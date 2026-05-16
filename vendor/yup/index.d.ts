export type InferType<T> = any;
export class ValidationError extends Error { path?: string; inner: ValidationError[]; }
export interface BaseSchema { required(message?: string): this; min(limit: number, message?: string): this; matches(regex: RegExp, message?: string): this; email(message?: string): this; validate(value: unknown, options?: unknown): Promise<unknown>; }
export function string(): BaseSchema;
export function object<T extends Record<string, unknown>>(shape: T): BaseSchema;
export function array(): BaseSchema & { of(schema: BaseSchema): BaseSchema; };
