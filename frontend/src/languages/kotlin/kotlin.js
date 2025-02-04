const registerKotlinCompletions = (monaco) => {
    monaco.languages.registerCompletionItemProvider("kotlin", {
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
                // Kotlin Keywords
                { label: "fun", kind: monaco.languages.CompletionItemKind.Keyword, insertText: "fun functionName() {\n\t// code\n}" },
                { label: "val", kind: monaco.languages.CompletionItemKind.Keyword, insertText: "val variableName: Type = value" },
                { label: "var", kind: monaco.languages.CompletionItemKind.Keyword, insertText: "var variableName: Type = value" },
                { label: "class", kind: monaco.languages.CompletionItemKind.Keyword, insertText: "class ClassName {\n\t// fields\n}" },
                { label: "object", kind: monaco.languages.CompletionItemKind.Keyword, insertText: "object ObjectName {\n\t// implementation\n}" },
                { label: "interface", kind: monaco.languages.CompletionItemKind.Keyword, insertText: "interface InterfaceName {\n\t// methods\n}" },
                { label: "if", kind: monaco.languages.CompletionItemKind.Keyword, insertText: "if (condition) {\n\t// code\n}" },
                { label: "else", kind: monaco.languages.CompletionItemKind.Keyword, insertText: "else {\n\t// code\n}" },
                { label: "when", kind: monaco.languages.CompletionItemKind.Keyword, insertText: "when (value) {\n\t// code\n}" },
                { label: "for", kind: monaco.languages.CompletionItemKind.Keyword, insertText: "for (i in 0..N) {\n\t// code\n}" },
                { label: "while", kind: monaco.languages.CompletionItemKind.Keyword, insertText: "while (condition) {\n\t// code\n}" },

                // Data Types
                { label: "String", kind: monaco.languages.CompletionItemKind.Type, insertText: "String" },
                { label: "Int", kind: monaco.languages.CompletionItemKind.Type, insertText: "Int" },
                { label: "Double", kind: monaco.languages.CompletionItemKind.Type, insertText: "Double" },
                { label: "Boolean", kind: monaco.languages.CompletionItemKind.Type, insertText: "Boolean" },
                { label: "Char", kind: monaco.languages.CompletionItemKind.Type, insertText: "Char" },
                { label: "List", kind: monaco.languages.CompletionItemKind.Type, insertText: "List<Type>" },
                { label: "Map", kind: monaco.languages.CompletionItemKind.Type, insertText: "Map<KeyType, ValueType>" },

                // Built-in Functions
                { label: "println", kind: monaco.languages.CompletionItemKind.Function, insertText: "println()" },
                { label: "print", kind: monaco.languages.CompletionItemKind.Function, insertText: "print()" },
                { label: "readLine", kind: monaco.languages.CompletionItemKind.Function, insertText: "readLine()" },
                { label: "toInt", kind: monaco.languages.CompletionItemKind.Function, insertText: "toInt()" },
                { label: "toDouble", kind: monaco.languages.CompletionItemKind.Function, insertText: "toDouble()" },
                { label: "toString", kind: monaco.languages.CompletionItemKind.Function, insertText: "toString()" },

                // Lambda Expressions
                { label: "lambda", kind: monaco.languages.CompletionItemKind.Snippet, insertText: "{ arg -> // code }" },
                { label: "it", kind: monaco.languages.CompletionItemKind.Snippet, insertText: "it" },

                // File Operations
                { label: "File.readText", kind: monaco.languages.CompletionItemKind.Function, insertText: "File.readText()" },
                { label: "File.writeText", kind: monaco.languages.CompletionItemKind.Function, insertText: "File.writeText()" },
                { label: "File.exists", kind: monaco.languages.CompletionItemKind.Function, insertText: "File.exists()" },

                // Collections Functions
                { label: "map", kind: monaco.languages.CompletionItemKind.Function, insertText: "map { it }" },
                { label: "filter", kind: monaco.languages.CompletionItemKind.Function, insertText: "filter { it > 5 }" },
                { label: "forEach", kind: monaco.languages.CompletionItemKind.Function, insertText: "forEach { println(it) }" },

                // Null Safety
                { label: "?.", kind: monaco.languages.CompletionItemKind.Operator, insertText: "?." },
                { label: "!!", kind: monaco.languages.CompletionItemKind.Operator, insertText: "!!" },
                { label: "let", kind: monaco.languages.CompletionItemKind.Function, insertText: "let" },
                { label: "apply", kind: monaco.languages.CompletionItemKind.Function, insertText: "apply" },

                // Coroutines
                { label: "launch", kind: monaco.languages.CompletionItemKind.Function, insertText: "launch { // code }" },
                { label: "async", kind: monaco.languages.CompletionItemKind.Function, insertText: "async { // code }" },
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

export default registerKotlinCompletions;
