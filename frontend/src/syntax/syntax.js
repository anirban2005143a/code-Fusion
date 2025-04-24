// // const registerCustomSyntax = (monaco) => {
// //     // 1️⃣ Register language
// //     monaco.languages.register({ id: "customLang" });

// //     // 2️⃣ Define syntax rules (Monarch Tokenizer)
// //     monaco.languages.setMonarchTokensProvider("customLang", {
// //         tokenizer: {
// //             root: [
// //                 // Keywords
// //                 [/\b(if|else|for|while|return|function|class|public|private|static|void|new|import|export)\b/, "keyword"],
                
// //                 // Data types
// //                 [/\b(int|float|double|boolean|string|char|var|let|const)\b/, "type"],
                
// //                 // Function names
// //                 [/\b([a-zA-Z_][\w]*)\s*(?=\()/, "function"],
                
// //                 // Strings
// //                 [/".*?"/, "string"],
// //                 [/'.*?'/, "string"],

// //                 // Numbers
// //                 [/\b\d+(\.\d+)?\b/, "number"],

// //                 // Comments
// //                 [/\/\/.*/, "comment"], // Single-line comments
// //                 [/\/\*[\s\S]*?\*\//, "comment"], // Multi-line comments
// //             ],
// //         },
// //     });

// //     // 3️⃣ Define a custom theme for Monaco
// //     monaco.editor.defineTheme("customDarkTheme", {
// //         base: "vs-dark", // Base theme (dark mode)
// //         inherit: true, // Inherit base styles
// //         rules: [
// //             { token: "keyword", foreground: "ff7f50", fontStyle: "bold" }, // Coral
// //             { token: "type", foreground: "00bfff" }, // DeepSkyBlue
// //             { token: "function", foreground: "32cd32", fontStyle: "italic" }, // LimeGreen
// //             { token: "string", foreground: "ffa500" }, // Orange
// //             { token: "number", foreground: "ff1493" }, // DeepPink
// //             { token: "comment", foreground: "808080", fontStyle: "italic" }, // Gray
// //         ],
// //         colors: {
// //             "editor.foreground": "#FFFFFF", // Default text color (white)
// //             "editor.background": "#1E1E1E", // Dark background
// //             "editorCursor.foreground": "#FFFFFF", // Cursor color
// //             "editor.lineHighlightBackground": "#333333", // Line highlight color
// //             "editorLineNumber.foreground": "#858585", // Line numbers color
// //             "editor.selectionBackground": "#264f78", // Selected text
// //         },
// //     });
    
// // };

// // export default registerCustomSyntax;


// const registerCustomSyntax = (monaco) => {
//     // Register the language
//     monaco.languages.register({ id: "customLang" });

//     // Define tokenization rules (Syntax highlighting)
//     monaco.languages.setMonarchTokensProvider("customLang", {
//         tokenizer: {
//             root: [
//                 // Keywords
//                 [/\b(if|else|for|while|return|function|class|public|private|static|void|new|import|export)\b/, "keyword"],
                
//                 // Data types
//                 [/\b(int|float|double|boolean|string|char|var|let|const)\b/, "type"],
                
//                 // Function names
//                 [/\b([a-zA-Z_][\w]*)\s*(?=\()/, "function"],
                
//                 // Strings
//                 [/".*?"/, "string"],
//                 [/'.*?'/, "string"],

//                 // Numbers
//                 [/\b\d+(\.\d+)?\b/, "number"],

//                 // Comments
//                 [/\/\/.*/, "comment"], // Single-line comments
//                 [/\/\*[\s\S]*?\*\//, "comment"], // Multi-line comments
//             ],
//         },
//     });
// };

// export default registerCustomSyntax;

const registerCustomSyntax = (monaco) => {
    // Register languages
    monaco.languages.register({ id: "cpp" });
    monaco.languages.register({ id: "dart" });
    monaco.languages.register({ id: "go" });
    monaco.languages.register({ id: "haskell" });
    monaco.languages.register({ id: "html" });
    monaco.languages.register({ id: "java" });
    monaco.languages.register({ id: "kotlin" });
    monaco.languages.register({ id: "perl" });
    monaco.languages.register({ id: "php" });
    monaco.languages.register({ id: "python" });
    monaco.languages.register({ id: "r" });
    monaco.languages.register({ id: "ruby" });
    monaco.languages.register({ id: "rust" });
    monaco.languages.register({ id: "shell" });
    monaco.languages.register({ id: "swift" });
    monaco.languages.register({ id: "xml" });
    monaco.languages.register({ id: "yaml" });

    const languages = [
        {
            id: "cpp",
            keywords: ["if", "else", "for", "while", "return", "class", "public", "private", "static", "new", "delete", "namespace", "void", "int", "float", "double", "bool", "char", "long", "short", "const", "template", "include", "try", "catch", "namespace"],
            functions: ["cout", "cin", "strlen", "strcmp", "malloc", "free", "abs", "pow", "sqrt", "rand"],
            types: ["int", "float", "double", "char", "string", "bool", "long"],
        },
        {
            id: "dart",
            keywords: ["if", "else", "for", "while", "return", "class", "static", "new", "var", "final", "const", "void", "int", "double", "bool", "String", "List", "Map", "Set", "dynamic"],
            functions: ["print", "main", "setState", "runApp", "toString", "hashCode"],
            types: ["int", "double", "String", "List", "Map", "Set", "bool", "dynamic"],
        },
        {
            id: "go",
            keywords: ["if", "else", "for", "return", "package", "import", "func", "struct", "interface", "map", "chan", "go", "select", "range"],
            functions: ["fmt.Println", "len", "cap", "append", "make", "new"],
            types: ["int", "float64", "bool", "string", "map", "slice", "array", "chan", "struct"],
        },
        {
            id: "haskell",
            keywords: ["if", "then", "else", "let", "in", "data", "type", "newtype", "case", "of", "do", "class", "instance", "import", "module", "qualified", "as"],
            functions: ["map", "filter", "foldr", "foldl", "head", "tail", "zip", "concat", "concatMap"],
            types: ["Int", "Bool", "Char", "String", "Double", "Maybe", "List", "Either", "IO", "Maybe"],
        },
        {
            id: "html",
            keywords: ["<!DOCTYPE", "<html>", "<head>", "<body>", "<div>", "<span>", "<a>", "<p>", "<h1>", "<h2>", "<h3>", "<form>", "<input>", "<button>", "<link>", "<meta>"],
            functions: ["document.getElementById", "document.querySelector", "addEventListener", "setAttribute", "getAttribute"],
            types: ["String", "HTMLElement", "Node", "Document"],
        },
        {
            id: "java",
            keywords: ["public", "private", "protected", "static", "void", "class", "if", "else", "while", "for", "try", "catch", "finally", "new", "int", "float", "String", "boolean", "extends", "implements", "interface", "abstract", "super", "this"],
            functions: ["System.out.println", "Integer.parseInt", "Math.max", "String.valueOf", "Thread.sleep"],
            types: ["int", "float", "double", "String", "boolean", "char", "void", "Object", "List", "Map", "Set"],
        },
        {
            id: "kotlin",
            keywords: ["if", "else", "when", "for", "while", "return", "class", "fun", "val", "var", "object", "sealed", "interface", "public", "private", "protected"],
            functions: ["println", "toString", "equals", "hashCode", "run"],
            types: ["Int", "Double", "String", "Boolean", "Char", "List", "Set", "Map"],
        },
        {
            id: "perl",
            keywords: ["if", "elsif", "else", "for", "while", "return", "sub", "my", "local", "use", "require", "package", "begin", "end"],
            functions: ["print", "push", "pop", "chomp", "split", "join", "substr", "index"],
            types: ["int", "float", "string", "array", "hash", "scalar"],
        },
        {
            id: "php",
            keywords: ["if", "else", "elseif", "for", "foreach", "while", "return", "function", "class", "public", "private", "protected", "const", "new", "extends", "abstract", "final"],
            functions: ["echo", "print", "var_dump", "isset", "empty", "strlen", "substr", "array_map", "count", "implode"],
            types: ["int", "string", "bool", "float", "array", "object"],
        },
        {
            id: "python",
            keywords: ["if", "else", "elif", "for", "while", "def", "return", "import", "try", "except", "with", "class", "yield", "lambda"],
            functions: ["print", "len", "range", "input", "str", "int", "float", "list", "dict", "set"],
            types: ["int", "float", "str", "list", "dict", "tuple", "set"],
        },
        {
            id: "r",
            keywords: ["if", "else", "for", "while", "function", "return", "break", "next", "in", "TRUE", "FALSE", "NA", "NULL", "repeat"],
            functions: ["print", "mean", "sum", "length", "seq", "c", "list", "matrix", "data.frame"],
            types: ["numeric", "integer", "character", "logical", "list", "data.frame", "matrix"],
        },
        {
            id: "ruby",
            keywords: ["if", "else", "elsif", "for", "while", "return", "def", "class", "module", "include", "extend", "begin", "end", "case", "when"],
            functions: ["puts", "print", "gets", "each", "map", "select", "reduce", "gsub", "sub"],
            types: ["String", "Integer", "Float", "Array", "Hash", "Symbol", "NilClass", "TrueClass", "FalseClass"],
        },
        {
            id: "rust",
            keywords: ["if", "else", "for", "while", "match", "return", "let", "mut", "pub", "mod", "use", "struct", "enum", "fn", "impl"],
            functions: ["println!", "String::new", "Vec::new", "std::fs::File", "Option::Some", "Result::Ok", "Result::Err"],
            types: ["i32", "f64", "String", "Vec", "Option", "Result", "bool"],
        },
        {
            id: "shell",
            keywords: ["if", "else", "for", "while", "case", "return", "function", "export", "source", "cd", "echo", "ls", "chmod", "touch", "rm", "ps"],
            functions: ["echo", "cat", "grep", "awk", "sed", "find", "chmod", "chown", "pwd"],
            types: ["string", "integer", "array"],
        },
        {
            id: "swift",
            keywords: ["if", "else", "switch", "for", "while", "let", "var", "func", "class", "struct", "enum", "import", "extension", "defer", "try", "catch", "guard"],
            functions: ["print", "map", "filter", "reduce", "sorted", "range", "enumerated"],
            types: ["Int", "Float", "Double", "String", "Bool", "Array", "Set", "Dictionary", "Optional"],
        },
        {
            id: "xml",
            keywords: ["<xml>", "<head>", "<body>", "<div>", "<span>", "<title>", "<meta>", "<link>", "<style>", "<script>", "<footer>", "<header>"],
            functions: ["document.createElement", "document.querySelector", "getElementById"],
            types: ["Element", "Document", "Node", "String"],
        },
        {
            id: "yaml",
            keywords: ["---", "true", "false", "null", "yes", "no"],
            functions: [],
            types: ["string", "integer", "boolean", "list", "map"],
        }
    ];

    languages.forEach((language) => {
        monaco.languages.setMonarchTokensProvider(language.id, {
            tokenizer: {
                root: [
                    // Keywords
                    [new RegExp(`\\b(${language.keywords.join("|")})\\b`), "keyword"],

                    // Data types
                    [new RegExp(`\\b(${language.types.join("|")})\\b`), "type"],

                    // Function names
                    [new RegExp(`\\b(${language.functions.join("|")})\\b(?=\\()`, "g"), "function"],

                    // Strings
                    [/".*?"/, "string"],
                    [/'[^']*'/, "string"],

                    // Numbers
                    [/\b\d+(\.\d+)?\b/, "number"],

                    // Comments
                    [/\/\/.*/, "comment"], // Single-line comments
                    [/\/\*[\s\S]*?\*\//, "comment"], // Multi-line comments
                ],
            },
        });

        // Register auto-completion provider
        monaco.languages.registerCompletionItemProvider(language.id, {
            triggerCharacters: ["(", ".", " "],
            provideCompletionItems: (model, position) => {
                const word = model.getWordUntilPosition(position);
                const range = {
                    startLineNumber: position.lineNumber,
                    endLineNumber: position.lineNumber,
                    startColumn: word.startColumn,
                    endColumn: position.column,
                };

                const suggestions = [
                    ...language.keywords.map(keyword => ({
                        label: keyword,
                        kind: monaco.languages.CompletionItemKind.Keyword,
                        insertText: keyword,
                        range,
                    })),
                    ...language.types.map(type => ({
                        label: type,
                        kind: monaco.languages.CompletionItemKind.Type,
                        insertText: type,
                        range,
                    })),
                    ...language.functions.map(fn => ({
                        label: fn,
                        kind: monaco.languages.CompletionItemKind.Function,
                        insertText: `${fn}()`,
                        range,
                    })),
                ];

                return { suggestions };
            },
        });
    });

};

// Export the function
export default registerCustomSyntax;
