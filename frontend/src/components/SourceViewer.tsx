import SyntaxHighlighter from "react-syntax-highlighter";

import {
    atomOneDark
}
from "react-syntax-highlighter/dist/esm/styles/hljs";

interface Props{

    file:string;

    content:string;

}

export default function SourceViewer({

    file,

    content

}:Props){

    return(

        <div className="h-full overflow-auto">

            <div className="border-b border-slate-800 p-4 font-semibold">

                {file}

            </div>

            <SyntaxHighlighter

                language="python"

                style={atomOneDark}

                showLineNumbers

            >

                {content}

            </SyntaxHighlighter>

        </div>

    );

}