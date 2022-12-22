import { fireEvent, render, renderHook, screen } from "@testing-library/react";
import { assert } from "chai";
import React from "react";
import useFormData from ".";

it("Hook Test", async () => {
    render(
        <form>
            <input type="text" name="fullname" />
        </form>
    );
    let { result } = renderHook(() => useFormData());
    let formData = result.current;
    assert.deepEqual(formData, { "fullname": "" });

    const textbox = await screen.getByRole("textbox");
    fireEvent.input(textbox, {
        target: {
            value: "ufuk bakan"
        }
    });

    formData = result.current;
    assert.deepEqual(formData, { "fullname": "ufuk bakan" });
})