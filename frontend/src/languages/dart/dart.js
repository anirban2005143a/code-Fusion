const registerDartCompletions = (monaco) => {
    monaco.languages.registerCompletionItemProvider("dart", {
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
                // Dart Keywords
                { label: "class", kind: monaco.languages.CompletionItemKind.Keyword, insertText: "class ClassName {\n\t// fields\n}" },
                { label: "void", kind: monaco.languages.CompletionItemKind.Keyword, insertText: "void functionName() {\n\t// code\n}" },
                { label: "var", kind: monaco.languages.CompletionItemKind.Keyword, insertText: "var variableName = value" },
                { label: "final", kind: monaco.languages.CompletionItemKind.Keyword, insertText: "final variableName = value" },
                { label: "const", kind: monaco.languages.CompletionItemKind.Keyword, insertText: "const constantName = value" },
                { label: "import", kind: monaco.languages.CompletionItemKind.Keyword, insertText: "import 'package:name';" },
                { label: "if", kind: monaco.languages.CompletionItemKind.Keyword, insertText: "if (condition) {\n\t// code\n}" },
                { label: "else", kind: monaco.languages.CompletionItemKind.Keyword, insertText: "else {\n\t// code\n}" },
                { label: "for", kind: monaco.languages.CompletionItemKind.Keyword, insertText: "for (var i = 0; i < n; i++) {\n\t// code\n}" },
                { label: "while", kind: monaco.languages.CompletionItemKind.Keyword, insertText: "while (condition) {\n\t// code\n}" },

                // Data Types
                { label: "String", kind: monaco.languages.CompletionItemKind.Type, insertText: "String" },
                { label: "int", kind: monaco.languages.CompletionItemKind.Type, insertText: "int" },
                { label: "double", kind: monaco.languages.CompletionItemKind.Type, insertText: "double" },
                { label: "bool", kind: monaco.languages.CompletionItemKind.Type, insertText: "bool" },
                { label: "List", kind: monaco.languages.CompletionItemKind.Type, insertText: "List<Type>" },
                { label: "Map", kind: monaco.languages.CompletionItemKind.Type, insertText: "Map<KeyType, ValueType>" },

                // Built-in Functions
                { label: "print", kind: monaco.languages.CompletionItemKind.Function, insertText: "print()" },
                { label: "println", kind: monaco.languages.CompletionItemKind.Function, insertText: "println()" },
                { label: "int.parse", kind: monaco.languages.CompletionItemKind.Function, insertText: "int.parse()" },
                { label: "double.parse", kind: monaco.languages.CompletionItemKind.Function, insertText: "double.parse()" },
                { label: "toString", kind: monaco.languages.CompletionItemKind.Function, insertText: "toString()" },

                // Async & Await
                { label: "async", kind: monaco.languages.CompletionItemKind.Keyword, insertText: "async " },
                { label: "await", kind: monaco.languages.CompletionItemKind.Keyword, insertText: "await " },

                // Lambdas & Closures
                { label: "=>", kind: monaco.languages.CompletionItemKind.Operator, insertText: "=>" },

                // Collections Functions
                { label: "map", kind: monaco.languages.CompletionItemKind.Function, insertText: "map()" },
                { label: "forEach", kind: monaco.languages.CompletionItemKind.Function, insertText: "forEach()" },
                { label: "add", kind: monaco.languages.CompletionItemKind.Method, insertText: "add()" },
                { label: "remove", kind: monaco.languages.CompletionItemKind.Method, insertText: "remove()" },

                // File Operations
                { label: "File.readAsString", kind: monaco.languages.CompletionItemKind.Function, insertText: "File.readAsString('path')" },
                { label: "File.writeAsString", kind: monaco.languages.CompletionItemKind.Function, insertText: "File.writeAsString('path', content)" },
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

export default registerDartCompletions;
