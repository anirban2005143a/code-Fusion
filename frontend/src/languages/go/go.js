const registerGoCompletions = (monaco) => {
    monaco.languages.registerCompletionItemProvider("go", {
        triggerCharacters: ["p", "f", "s", "w", "t", ".", "b"],
        provideCompletionItems: (model, position) => {
            const word = model.getWordUntilPosition(position);
            const textBeforeCursor = model.getValueInRange({
                startLineNumber: position.lineNumber,
                startColumn: 1,
                endLineNumber: position.lineNumber,
                endColumn: position.column,
            });

            const range = {
                startLineNumber: position.lineNumber,
                endLineNumber: position.lineNumber,
                startColumn: word.startColumn,
                endColumn: position.column,
            };

            const suggestions = [
                // Go Keywords
                { label: "package", kind: monaco.languages.CompletionItemKind.Keyword, insertText: "package main" },
                { label: "import", kind: monaco.languages.CompletionItemKind.Keyword, insertText: "import \"fmt\"" },
                { label: "func", kind: monaco.languages.CompletionItemKind.Keyword, insertText: "func functionName() {\n\t// code\n}" },
                { label: "return", kind: monaco.languages.CompletionItemKind.Keyword, insertText: "return " },
                { label: "var", kind: monaco.languages.CompletionItemKind.Keyword, insertText: "var variableName type" },
                { label: "const", kind: monaco.languages.CompletionItemKind.Keyword, insertText: "const constantName type = value" },
                { label: "type", kind: monaco.languages.CompletionItemKind.Keyword, insertText: "type TypeName struct {\n\t// fields\n}" },
                { label: "struct", kind: monaco.languages.CompletionItemKind.Keyword, insertText: "struct {\n\t// fields\n}" },
                { label: "interface", kind: monaco.languages.CompletionItemKind.Keyword, insertText: "interface {\n\t// methods\n}" },
                { label: "go", kind: monaco.languages.CompletionItemKind.Keyword, insertText: "go functionName()" },
                { label: "defer", kind: monaco.languages.CompletionItemKind.Keyword, insertText: "defer functionName()" },
                { label: "chan", kind: monaco.languages.CompletionItemKind.Keyword, insertText: "chan type" },

                // Control Flow
                { label: "if", kind: monaco.languages.CompletionItemKind.Keyword, insertText: "if condition {\n\t// code\n}" },
                { label: "else", kind: monaco.languages.CompletionItemKind.Keyword, insertText: "else {\n\t// code\n}" },
                { label: "switch", kind: monaco.languages.CompletionItemKind.Keyword, insertText: "switch expression {\ncase value:\n\t// code\ndefault:\n\t// code\n}" },
                { label: "for", kind: monaco.languages.CompletionItemKind.Keyword, insertText: "for i := 0; i < N; i++ {\n\t// code\n}" },
                { label: "range", kind: monaco.languages.CompletionItemKind.Keyword, insertText: "for key, value := range collection {\n\t// code\n}" },

                // Data Types
                { label: "int", kind: monaco.languages.CompletionItemKind.Type, insertText: "int" },
                { label: "float64", kind: monaco.languages.CompletionItemKind.Type, insertText: "float64" },
                { label: "string", kind: monaco.languages.CompletionItemKind.Type, insertText: "string" },
                { label: "bool", kind: monaco.languages.CompletionItemKind.Type, insertText: "bool" },
                { label: "byte", kind: monaco.languages.CompletionItemKind.Type, insertText: "byte" },
                { label: "rune", kind: monaco.languages.CompletionItemKind.Type, insertText: "rune" },
                { label: "error", kind: monaco.languages.CompletionItemKind.Type, insertText: "error" },

                // Built-in Functions
                { label: "fmt.Println", kind: monaco.languages.CompletionItemKind.Function, insertText: "fmt.Println()" },
                { label: "fmt.Printf", kind: monaco.languages.CompletionItemKind.Function, insertText: "fmt.Printf(\"%s\", value)" },
                { label: "fmt.Sprintf", kind: monaco.languages.CompletionItemKind.Function, insertText: "fmt.Sprintf(\"%s\", value)" },
                { label: "len", kind: monaco.languages.CompletionItemKind.Function, insertText: "len(variable)" },
                { label: "cap", kind: monaco.languages.CompletionItemKind.Function, insertText: "cap(variable)" },
                { label: "make", kind: monaco.languages.CompletionItemKind.Function, insertText: "make(type, size)" },
                { label: "append", kind: monaco.languages.CompletionItemKind.Function, insertText: "append(slice, item)" },
                { label: "copy", kind: monaco.languages.CompletionItemKind.Function, insertText: "copy(dest, src)" },
                { label: "panic", kind: monaco.languages.CompletionItemKind.Function, insertText: "panic(\"error message\")" },
                { label: "recover", kind: monaco.languages.CompletionItemKind.Function, insertText: "recover()" },

                // Concurrency
                { label: "go func", kind: monaco.languages.CompletionItemKind.Snippet, insertText: "go func() {\n\t// code\n}()" },
                { label: "select", kind: monaco.languages.CompletionItemKind.Keyword, insertText: "select {\ncase <-channel:\n\t// code\ndefault:\n\t// code\n}" },

                // File Handling
                { label: "os.Open", kind: monaco.languages.CompletionItemKind.Function, insertText: "os.Open(\"filename\")" },
                { label: "os.Create", kind: monaco.languages.CompletionItemKind.Function, insertText: "os.Create(\"filename\")" },
                { label: "os.Remove", kind: monaco.languages.CompletionItemKind.Function, insertText: "os.Remove(\"filename\")" },
                { label: "ioutil.ReadFile", kind: monaco.languages.CompletionItemKind.Function, insertText: "ioutil.ReadFile(\"filename\")" },
                { label: "ioutil.WriteFile", kind: monaco.languages.CompletionItemKind.Function, insertText: "ioutil.WriteFile(\"filename\", data, 0644)" },

                // HTTP Requests
                { label: "http.Get", kind: monaco.languages.CompletionItemKind.Function, insertText: "http.Get(\"https://example.com\")" },
                { label: "http.Post", kind: monaco.languages.CompletionItemKind.Function, insertText: "http.Post(\"https://example.com\", \"application/json\", body)" },
            ];

            return {
                suggestions: suggestions.map(item => ({
                    ...item,
                    range
                }))
            };
        },
    });
};

export default registerGoCompletions;
