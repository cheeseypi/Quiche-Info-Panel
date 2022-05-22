import React from 'react';
import './TitleText.css';

function TitleText(props: any) {
    return (
        <h1>{props.title && <span>{props.title}</span>}{props.children}</h1>
    )
}

export default TitleText;