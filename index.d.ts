type FormData = {
    [key: string]: any
}

type UseFormProps = {
    form?: HTMLFormElement | HTMLElement | Element | null,
    legacyListeners?: boolean
}

export default function useFormData(props?: UseFormProps): FormData;