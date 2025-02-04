const registerYamlCompletions = (monaco) => {
    monaco.languages.registerCompletionItemProvider("yaml", {
        triggerCharacters: [":", "-", "#", " "],
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
                // Common YAML structure and keywords
                { label: "key:", kind: monaco.languages.CompletionItemKind.Property, insertText: "key: value" },
                { label: "value:", kind: monaco.languages.CompletionItemKind.Property, insertText: "value: " },
                { label: "true", kind: monaco.languages.CompletionItemKind.Keyword, insertText: "true" },
                { label: "false", kind: monaco.languages.CompletionItemKind.Keyword, insertText: "false" },
                { label: "null", kind: monaco.languages.CompletionItemKind.Keyword, insertText: "null" },
                { label: "# comment", kind: monaco.languages.CompletionItemKind.Comment, insertText: "# comment" },

                // List items
                { label: "- item", kind: monaco.languages.CompletionItemKind.Snippet, insertText: "- item" },
                { label: "- list", kind: monaco.languages.CompletionItemKind.Snippet, insertText: "- list" },
                { label: "- true", kind: monaco.languages.CompletionItemKind.Snippet, insertText: "- true" },

                // Data types and common objects
                { label: "integer:", kind: monaco.languages.CompletionItemKind.Property, insertText: "integer: 42" },
                { label: "string:", kind: monaco.languages.CompletionItemKind.Property, insertText: "string: \"some text\"" },
                { label: "array:", kind: monaco.languages.CompletionItemKind.Property, insertText: "array:\n  - item1\n  - item2" },
                { label: "object:", kind: monaco.languages.CompletionItemKind.Property, insertText: "object:\n  key: value" },

                // JSON-like structures
                { label: "array:", kind: monaco.languages.CompletionItemKind.Property, insertText: "array:\n  - item1\n  - item2" },
                { label: "map:", kind: monaco.languages.CompletionItemKind.Property, insertText: "map:\n  key: value" },

                // Nested objects and arrays
                { label: "parent_key:", kind: monaco.languages.CompletionItemKind.Property, insertText: "parent_key:\n  child_key: child_value" },
                { label: "nested_array:", kind: monaco.languages.CompletionItemKind.Property, insertText: "nested_array:\n  - item1\n  - item2" },

                // More YAML special objects
                { label: "!!str", kind: monaco.languages.CompletionItemKind.Keyword, insertText: "!!str" },
                { label: "!!int", kind: monaco.languages.CompletionItemKind.Keyword, insertText: "!!int" },
                { label: "!!map", kind: monaco.languages.CompletionItemKind.Keyword, insertText: "!!map" },

                // Multiline support
                { label: "|", kind: monaco.languages.CompletionItemKind.Operator, insertText: "|\n  text" },
                { label: ">", kind: monaco.languages.CompletionItemKind.Operator, insertText: ">\n  text" },
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

export default registerYamlCompletions;
