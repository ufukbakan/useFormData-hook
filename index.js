const { useEffect, useState } = require("react");

/**
 * @typedef {Object<string, any>} FormData
 */

/**
 * @typedef {Object} UseFormProps
 * @property {HTMLFormElement | HTMLElement | Element} [form]
 * @property {boolean} [legacyListeners]
 */

/**
 * @param {UseFormProps} props
 * @returns {FormData}
 */
module.exports = function useFormData(props) {
    if (typeof window !== "undefined") {
        const form = props?.form || document.querySelector("form");
        const [formData, setFormData] = useState({});
        const [inputs, setInputs] = useState([]);
        const observeCallback = (mutations) => {
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
                if (!props?.legacyListeners && observer) {
                    observer.observe(form, { childList: true, subtree: true })
                } else {
                    document.body.addEventListener("DOMNodeInserted", updateInputs);
                    document.body.addEventListener("DOMNodeRemoved", updateInputs);
                }
            }
            return (() => {
                if (!props?.legacyListeners && observer) {
                    observer.disconnect();
                }
                else {
                    document.body.removeEventListener("DOMNodeInserted", updateInputs);
                    document.body.removeEventListener("DOMNodeRemoved", updateInputs);
                }
            });
        }, [form])

        useEffect(() => {
            addEventListeners();
            updateFormData();
            return () => {
                removeEventListeners();
            }
        }, [inputs]);

        const updateInputs = () => {
            let inputElements = Array.from(form?.querySelectorAll("input,textarea") || []);
            inputElements = inputElements.filter(e => {
                if (e instanceof HTMLTextAreaElement) {
                    return true;
                } else if (e instanceof HTMLInputElement) {
                    return e.type != "file" && e.type != "submit" && e.type != "reset" && e.type != "button" && e.type != "image";
                }
            });
            setInputs(inputElements);
        }



        const updateFormData = () => {
            const newFormData = {};
            inputs?.forEach(input => {
                if (input instanceof HTMLInputElement) {
                    if (input.type != "radio") {
                        newFormData[input.name] = getValue(input);
                    } else if (!newFormData[input.name] && input.type == "radio") {
                        newFormData[input.name] = getValue(inputs.find(i => i instanceof HTMLInputElement && i.type == "radio" && i.name == input.name && i.checked));
                    }
                } else if (input instanceof HTMLTextAreaElement) {
                    newFormData[input.name] = getValue(input);
                }
            });
            setFormData(newFormData);
        }

        const updateSingleData = (e) => {
            const inputElement = e.target;
            setFormData((prevData) => ({ ...prevData, [inputElement.name]: getValue(inputElement) }));
        }

        const addEventListeners = () => {
            inputs?.forEach(input => input.addEventListener("input", updateSingleData));
            inputs?.forEach(input => input.addEventListener("change", updateSingleData));
        }

        const removeEventListeners = () => {
            inputs?.forEach(input => input.removeEventListener("input", updateSingleData));
            inputs?.forEach(input => input.removeEventListener("change", updateSingleData));
        }

        const getValue = (element) => {
            if (!element) {
                return undefined;
            }
            if (element instanceof HTMLInputElement && element.type == "checkbox") {
                return element.checked;
            } else if (element instanceof HTMLInputElement || element instanceof HTMLTextAreaElement) {
                return element.value;
            }
        }

        return formData;
    }
    else {
        return null
    }
}