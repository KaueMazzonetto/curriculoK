export type SubmitHandler<T> = (data: T) => void | Promise<void>;
export type SubmitErrorHandler<T> = (errors: any) => void;
export function useForm<T = any>(options?: any): { register: (name: any) => any; control: any; handleSubmit: (valid: SubmitHandler<T>, invalid?: SubmitErrorHandler<T>) => (event?: any) => Promise<void>; formState: { errors: any; isSubmitting: boolean; isValid: boolean } };
export function useFieldArray(options: { control: any; name: any }): { fields: any[]; append: (value: any) => void; remove: (index: number) => void };
export function Controller(props: { control: any; name: any; render: (props: { field: any }) => any }): any;
