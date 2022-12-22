import { useEffect, useState } from "react";

type FormData = {
    [key: string]: any
}

type UseFormProps = {
    form: HTMLFormElement | HTMLElement | Element
}

export default function useFormData(props?: UseFormProps): FormData {
    const form = props?.form || document.querySelector("form");
    const [formData, setFormData] = useState<FormData>({});
    const [inputs, setInputs] = useState<NodeListOf<HTMLInputElement>>();
    const observeCallback = (mutations: MutationRecord[]) => {
        for (const mutation of mutations) {
            if (mutation.addedNodes.length > 0 || mutation.removedNodes.length > 0) {
                updateInputs();
                break;
            }
        }
    }
    const observer = new MutationObserver(observeCallback);

    useEffect(() => {
        updateInputs();
    }, [])

    useEffect(() => {
        if (form) {
            updateInputs();
            if (observer) {
                observer.observe(form, { childList: true, subtree: true })
            } else {
                document.body.addEventListener("DOMNodeInserted", updateInputs);
                document.body.addEventListener("DOMNodeRemoved", updateInputs);
            }
        }
        return (() => {
            if (observer) {
                observer.disconnect();
            }
            else {
                document.body.removeEventListener("DOMNodeInserted", updateInputs);
                document.body.removeEventListener("DOMNodeRemoved", updateInputs);
            }
        });
    }, [form])

    useEffect(() => {
        setEventListeners();
        updateFormData();
    }, [inputs]);

    const updateInputs = () => {
        setInputs(form?.querySelectorAll("input,textarea"));
    }



    const updateFormData = () => {
        const newFormData: FormData = {};
        inputs?.forEach(input => {
            if (input.type != "file") {
                newFormData[input.name] = getValue(input);
            }
        });
        setFormData(newFormData);
    }

    const updateSingleData = (e: Event) => {
        const inputElement = e.target as HTMLInputElement;
        setFormData((prevData: FormData) => ({ ...prevData, [inputElement.name]: getValue(inputElement) }));
    }

    const setEventListeners = () => {
        inputs?.forEach(input => input.removeEventListener("input", updateSingleData));
        inputs?.forEach(input => input.addEventListener("input", updateSingleData));
    }

    const getValue = (element: HTMLInputElement) => {
        if (element.type == "radio" || element.type == "checkbox") {
            return element.checked;
        } else {
            return element.value;
        }
    }

    return formData;
}