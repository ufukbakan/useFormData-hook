type FormData = {
    [key: string]: any
}

type UseFormProps = {
    form?: HTMLFormElement | HTMLElement | Element,
    legacyListeners?: boolean
}

export default function useFormData(props?: UseFormProps): FormData;