import { fireEvent, render, renderHook } from "@testing-library/react";
import { assert } from "chai";
import React from "react";
import useFormData from ".";

describe("Useformdata Hook Test", () => {

    it("Test different input types", () => {
        let { container } = render(
            <form>
                <textarea name="textarea"></textarea>
                <input type="text" name="textbox" />
                <input type="password" name="password" />
                <input type="radio" name="radiogroup" value="radioVal1" id="radio1" />
                <input type="radio" name="radiogroup" value="radioVal2" id="radio2" />
                <input type="checkbox" name="checkbox" />
                <input type="color" name="color" defaultValue="#ffffff" />
                <input type="date" name="date" />
                <input type="month" name="month" />
                <input type="week" name="week" />
                <input type="time" name="time" />
                <input type="datetime-local" name="datetime-local" />
                <input type="email" name="email" />
                <input type="range" name="range" min={0} max={200} defaultValue={100} />
                <input type="search" name="search" />
                <input type="tel" name="tel" />
                <input type="url" name="url" />
                <input type="file" name="shouldBeIgnored1" />
                <input type="submit" name="shouldBeIgnored2" />
                <input type="reset" name="shouldBeIgnored3" />
                <input type="image" name="shouldBeIgnored4" />
                <input type="button" name="shouldBeIgnored5" />
            </form>
        );

        let { result } = renderHook(() => useFormData());
        let formData = result.current;
        assert.deepEqual(formData, {
            "checkbox": false,
            "color": "#ffffff",
            "date": "",
            "datetime-local": "",
            "email": "",
            "month": "",
            "password": "",
            "radiogroup": undefined,
            "range": "100",
            "search": "",
            "tel": "",
            "textarea": "",
            "textbox": "",
            "time": "",
            "url": "",
            "week": ""
        });

        const checkbox = container.querySelector("input[name='checkbox']");
        const color = container.querySelector("input[name='color']");
        const email = container.querySelector("input[name='email']");
        const date = container.querySelector("input[name='date']");
        const datetime = container.querySelector("input[name='datetime-local']");
        const month = container.querySelector("input[name='month']");
        const week = container.querySelector("input[name='week']");
        const time = container.querySelector("input[name='time']");
        const password = container.querySelector("input[name='password']");
        const radio1 = container.querySelector("#radio1");
        const radio2 = container.querySelector("#radio2");
        const range = container.querySelector("input[name='range']");
        const search = container.querySelector("input[name='search']");
        const tel = container.querySelector("input[name='tel']");
        const textarea = container.querySelector("textarea");
        const textbox = container.querySelector("input[name='textbox']");
        const url = container.querySelector("input[name='url']");

        fireEvent.click(checkbox);
        fireEvent.change(color, { target: { value: "#00ff00" } });
        fireEvent.change(email, { target: { value: "println.ufukbakan@gmail.com" } });
        fireEvent.change(date, { target: { value: "2023-01-02" } });
        fireEvent.change(datetime, { target: { value: "2023-01-02T21:52" } });
        fireEvent.change(month, { target: { value: "2023-01" } });
        fireEvent.change(week, { target: { value: "2023-W01" } });
        fireEvent.change(time, { target: { value: "21:55" } });
        fireEvent.input(password, { target: { value: "123456" } });
        fireEvent.click(radio2);
        fireEvent.input(range, { target: { value: 150 } });
        fireEvent.input(search, { target: { value: "search this" } });
        fireEvent.input(tel, { target: { value: "+90" } });
        fireEvent.input(textarea, { target: { value: "textarea" } });
        fireEvent.change(textbox, { target: { value: "Ufuk Bakan" } });
        fireEvent.change(url, { target: { value: "https://github.com/ufukbakan" } });

        formData = result.current;

        assert.deepEqual(formData, {
            "checkbox": true,
            "color": "#00ff00",
            "date": "2023-01-02",
            "datetime-local": "2023-01-02T21:52",
            "email": "println.ufukbakan@gmail.com",
            "month": "2023-01",
            "password": "123456",
            "radiogroup": "radioVal2",
            "range": "150",
            "search": "search this",
            "tel": "+90",
            "textarea": "textarea",
            "textbox": "Ufuk Bakan",
            "time": "21:55",
            "url": "https://github.com/ufukbakan",
            "week": "2023-W01",
        });

        const form = container.querySelector("form");
        form.removeChild(checkbox);
        form.removeChild(color);
        form.removeChild(email);
        form.removeChild(date);
        form.removeChild(datetime);
        form.removeChild(month);
        form.removeChild(week);
        form.removeChild(time);
        form.removeChild(password);
        form.removeChild(radio1);
        form.removeChild(radio2);
        form.removeChild(range);
        form.removeChild(search);
        form.removeChild(tel);
        form.removeChild(textarea);
        form.removeChild(url);

        formData = renderHook(() => useFormData()).result.current;

        assert.deepEqual(formData, {
            "textbox": "Ufuk Bakan",
        });
    })

    it("Test with no mutation observer", () => {

        let { container } = render(
            <form>
                <input type="checkbox" name="checkbox" />
                <input type="color" name="color" defaultValue="#ffffff" />
                <input type="file" name="shouldBeIgnored1" />
                <input type="submit" name="shouldBeIgnored2" />
                <input type="reset" name="shouldBeIgnored3" />
                <input type="image" name="shouldBeIgnored4" />
                <input type="button" name="shouldBeIgnored5" />
            </form>
        );

        let { result } = renderHook(() => useFormData({ legacyListeners: true }));
        let formData = result.current;
        assert.deepEqual(formData, {
            "checkbox": false,
            "color": "#ffffff",
        });

        const checkbox = container.querySelector("input[name='checkbox']");
        const form = container.querySelector("form");
        form.removeChild(checkbox);

        formData = renderHook(() => useFormData()).result.current;

        assert.deepEqual(formData, {
            "color": "#ffffff",
        });
    })


});