const registerJavaCompletions = (monaco) => {
    monaco.languages.registerCompletionItemProvider("java", {
        triggerCharacters: ["p", "i", "c", "s", "f", "w", "t", ".", "b"],
        provideCompletionItems: (model, position) => {
            const word = model.getWordUntilPosition(position);
            const textBeforeCursor = model.getValueInRange({
                startLineNumber: position.lineNumber,
                startColumn: 1,
                endLineNumber: position.lineNumber,
                endColumn: position.column,
            });

            const dotIndex = textBeforeCursor.lastIndexOf(".") + 1;
            const range = {
                startLineNumber: position.lineNumber,
                endLineNumber: position.lineNumber,
                startColumn: dotIndex > 0 ? dotIndex : word.startColumn,
                endColumn: position.column,
            };

            const suggestions = [
                // Keywords
                { label: "public", kind: monaco.languages.CompletionItemKind.Keyword, insertText: "public " },
                { label: "private", kind: monaco.languages.CompletionItemKind.Keyword, insertText: "private " },
                { label: "protected", kind: monaco.languages.CompletionItemKind.Keyword, insertText: "protected " },
                { label: "class", kind: monaco.languages.CompletionItemKind.Keyword, insertText: "class ClassName {" },
                { label: "interface", kind: monaco.languages.CompletionItemKind.Keyword, insertText: "interface InterfaceName {" },
                { label: "extends", kind: monaco.languages.CompletionItemKind.Keyword, insertText: "extends " },
                { label: "implements", kind: monaco.languages.CompletionItemKind.Keyword, insertText: "implements " },
                { label: "static", kind: monaco.languages.CompletionItemKind.Keyword, insertText: "static " },
                { label: "final", kind: monaco.languages.CompletionItemKind.Keyword, insertText: "final " },
                { label: "void", kind: monaco.languages.CompletionItemKind.Keyword, insertText: "void " },
                { label: "return", kind: monaco.languages.CompletionItemKind.Keyword, insertText: "return " },
                { label: "new", kind: monaco.languages.CompletionItemKind.Keyword, insertText: "new " },

                // Data types
                { label: "int", kind: monaco.languages.CompletionItemKind.Keyword, insertText: "int " },
                { label: "double", kind: monaco.languages.CompletionItemKind.Keyword, insertText: "double " },
                { label: "float", kind: monaco.languages.CompletionItemKind.Keyword, insertText: "float " },
                { label: "char", kind: monaco.languages.CompletionItemKind.Keyword, insertText: "char " },
                { label: "boolean", kind: monaco.languages.CompletionItemKind.Keyword, insertText: "boolean " },
                { label: "String", kind: monaco.languages.CompletionItemKind.Keyword, insertText: "String " },

                // Control flow
                { label: "if", kind: monaco.languages.CompletionItemKind.Keyword, insertText: "if (condition) {\n\t// code\n}" },
                { label: "else", kind: monaco.languages.CompletionItemKind.Keyword, insertText: "else {\n\t// code\n}" },
                { label: "for", kind: monaco.languages.CompletionItemKind.Keyword, insertText: "for (int i = 0; i < N; i++) {\n\t// code\n}" },
                { label: "while", kind: monaco.languages.CompletionItemKind.Keyword, insertText: "while (condition) {\n\t// code\n}" },
                { label: "switch", kind: monaco.languages.CompletionItemKind.Keyword, insertText: "switch (variable) {\n\tcase 1: // code\n\tbreak;\n\tdefault: // code\n}" },
                
                // Common Methods
                { label: "System.out.println", kind: monaco.languages.CompletionItemKind.Function, insertText: "System.out.println();" },
                { label: "System.out.print", kind: monaco.languages.CompletionItemKind.Function, insertText: "System.out.print();" },
                { label: "Math.sqrt", kind: monaco.languages.CompletionItemKind.Function, insertText: "Math.sqrt(value);" },
                { label: "Math.pow", kind: monaco.languages.CompletionItemKind.Function, insertText: "Math.pow(base, exponent);" },
                { label: "Math.abs", kind: monaco.languages.CompletionItemKind.Function, insertText: "Math.abs(value);" },

                // Collections
                { label: "ArrayList", kind: monaco.languages.CompletionItemKind.Class, insertText: "ArrayList<Type> list = new ArrayList<>();" },
                { label: "HashMap", kind: monaco.languages.CompletionItemKind.Class, insertText: "HashMap<Key, Value> map = new HashMap<>();" },
                { label: "HashSet", kind: monaco.languages.CompletionItemKind.Class, insertText: "HashSet<Type> set = new HashSet<>();" },

                // Class template
                { label: "class", kind: monaco.languages.CompletionItemKind.Class, insertText: "class ClassName {\n\tprivate:\n\t\tint field;\n\tpublic:\n\t\tClassName();\n\t\t~ClassName();\n};" },
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

export default registerJavaCompletions;
