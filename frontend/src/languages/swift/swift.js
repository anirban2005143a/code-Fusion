const registerSwiftCompletions = (monaco) => {
    monaco.languages.registerCompletionItemProvider("swift", {
        triggerCharacters: ["f", "v", "s", "w", ".", "b"],
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
                // Swift Keywords
                { label: "func", kind: monaco.languages.CompletionItemKind.Keyword, insertText: "func functionName() {\n\t// code\n}" },
                { label: "let", kind: monaco.languages.CompletionItemKind.Keyword, insertText: "let variableName: Type = value" },
                { label: "var", kind: monaco.languages.CompletionItemKind.Keyword, insertText: "var variableName: Type = value" },
                { label: "class", kind: monaco.languages.CompletionItemKind.Keyword, insertText: "class ClassName {\n\t// fields\n}" },
                { label: "struct", kind: monaco.languages.CompletionItemKind.Keyword, insertText: "struct StructName {\n\t// fields\n}" },
                { label: "enum", kind: monaco.languages.CompletionItemKind.Keyword, insertText: "enum EnumName {\n\tcase value1, value2\n}" },
                { label: "init", kind: monaco.languages.CompletionItemKind.Keyword, insertText: "init() {\n\t// code\n}" },
                { label: "deinit", kind: monaco.languages.CompletionItemKind.Keyword, insertText: "deinit {\n\t// cleanup code\n}" },
                { label: "if", kind: monaco.languages.CompletionItemKind.Keyword, insertText: "if condition {\n\t// code\n}" },
                { label: "else", kind: monaco.languages.CompletionItemKind.Keyword, insertText: "else {\n\t// code\n}" },
                { label: "switch", kind: monaco.languages.CompletionItemKind.Keyword, insertText: "switch variable {\n\tcase value1:\n\t\t// code\n}" },
                { label: "for", kind: monaco.languages.CompletionItemKind.Keyword, insertText: "for index in 0..<count {\n\t// code\n}" },

                // Data Types
                { label: "String", kind: monaco.languages.CompletionItemKind.Type, insertText: "String" },
                { label: "Int", kind: monaco.languages.CompletionItemKind.Type, insertText: "Int" },
                { label: "Double", kind: monaco.languages.CompletionItemKind.Type, insertText: "Double" },
                { label: "Bool", kind: monaco.languages.CompletionItemKind.Type, insertText: "Bool" },
                { label: "Array", kind: monaco.languages.CompletionItemKind.Type, insertText: "Array<Type>" },

                // Functions
                { label: "print", kind: monaco.languages.CompletionItemKind.Function, insertText: "print()" },
                { label: "println", kind: monaco.languages.CompletionItemKind.Function, insertText: "println()" },
                { label: "String.isEmpty", kind: monaco.languages.CompletionItemKind.Function, insertText: "String.isEmpty" },
                { label: "Array.append", kind: monaco.languages.CompletionItemKind.Function, insertText: "Array.append(item)" },

                // Optional Handling
                { label: "Optional", kind: monaco.languages.CompletionItemKind.Type, insertText: "Optional<Type>" },
                { label: "if let", kind: monaco.languages.CompletionItemKind.Function, insertText: "if let unwrapped = optional {\n\t// code\n}" },
                { label: "guard let", kind: monaco.languages.CompletionItemKind.Function, insertText: "guard let unwrapped = optional else {\n\t// handle error\n}" },

                // Closure
                { label: "closure", kind: monaco.languages.CompletionItemKind.Function, insertText: "{ (parameter) -> ReturnType in\n\t// code\n}" },
                { label: "map", kind: monaco.languages.CompletionItemKind.Function, insertText: "map { $0 }" },
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

export default registerSwiftCompletions;
