import React from "react";
import { Converter } from 'showdown';

interface MdConversionProps {

}

export function MdConversion(props: MdConversionProps) {
    const converter = new Converter();
    const html = converter.makeHtml('# hello, markdown!');

    return (
        <>
            {html}
        </>
    );
}