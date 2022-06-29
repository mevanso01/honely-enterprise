import React, { useState } from "react";
function TestComponent (props) {
    // console.log('prop value', props.dummyProp)
    props.dummyProp("message from child component..")
    return (
        <div>
            <p>test component</p>
        </div>
    )
}
export default TestComponent;