<h1 align="center">useFormData</h1>
<div align="center">Get and validate form data without converting each input to a controlled one.


![Statements](https://img.shields.io/badge/statements-98.64%25-brightgreen.svg?style=flat) ![Branches](https://img.shields.io/badge/branches-84.26%25-yellow.svg?style=flat) ![Functions](https://img.shields.io/badge/functions-100%25-brightgreen.svg?style=flat) ![Lines](https://img.shields.io/badge/lines-98.52%25-brightgreen.svg?style=flat)
</div>

## Simple usage
This hook will scan only one form. By default it is the first form in the page, but you can change it to any form by passsing an argument.
```js
import useFormData from "useformdata-hook";

export default function App() {

    const formData = useFormData();

    return (
        <form>
            <input type='text' name='fullName' /><br/>
            <input type='date' name='birthdate' /><br/>
            <textarea name='comment'>
        </form>
    )
}
```
## Advanced Usage

```js
import { useRef } from "react";
import useFormData from "useformdata-hook";

export default function App() {

    const formRef = useRef(null);
    const formData = useFormData({form: formRef.current});

    useEffect(()=>{
      // console.log(formData);
      // Validation logic goes here
    }, [formData])

    return (
        <form ref={formRef}>
            <input type='text' name='fullName' />
            <input type='date' name='birthdate' />
        </form>
    )
}
```
Typescript example provided [here](https://github.com/ufukbakan/useFormData-hook/tree/main/example)

