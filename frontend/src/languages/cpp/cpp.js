const registerCppCompletions = (monaco) => {
    monaco.languages.registerCompletionItemProvider("cpp", {
        triggerCharacters: ["#", "s", "f", "i", "c", "w", "m", "v", "p", "d", "l", "t", "."],
        provideCompletionItems: (model, position) => {
            const word = model.getWordUntilPosition(position);
            const textBeforeCursor = model.getValueInRange({
                startLineNumber: position.lineNumber,
                startColumn: 1,
                endLineNumber: position.lineNumber,
                endColumn: position.column,
            });

            const hashIndex = textBeforeCursor.lastIndexOf("#") + 1;
            const dotIndex = textBeforeCursor.lastIndexOf(".") + 1;
            const range = {
                startLineNumber: position.lineNumber,
                endLineNumber: position.lineNumber,
                startColumn: hashIndex > 0 ? hashIndex : (dotIndex > 0 ? dotIndex : word.startColumn),
                endColumn: position.column,
            };

            let suggestions = [
                // Preprocessor directives
                { label: "#include", kind: monaco.languages.CompletionItemKind.Keyword, insertText: "#include" },
                { label: "#define", kind: monaco.languages.CompletionItemKind.Keyword, insertText: "#define NAME value" },
                { label: "#ifdef", kind: monaco.languages.CompletionItemKind.Keyword, insertText: "#ifdef NAME" },
                { label: "#ifndef", kind: monaco.languages.CompletionItemKind.Keyword, insertText: "#ifndef NAME" },
                { label: "#endif", kind: monaco.languages.CompletionItemKind.Keyword, insertText: "#endif" },

                // Standard library headers
                { label: "iostream", kind: monaco.languages.CompletionItemKind.Text, insertText: "iostream" },
                { label: "vector", kind: monaco.languages.CompletionItemKind.Text, insertText: "vector" },
                { label: "map", kind: monaco.languages.CompletionItemKind.Text, insertText: "map" },
                { label: "algorithm", kind: monaco.languages.CompletionItemKind.Text, insertText: "algorithm" },
                { label: "cmath", kind: monaco.languages.CompletionItemKind.Text, insertText: "cmath" },
                { label: "string", kind: monaco.languages.CompletionItemKind.Text, insertText: "string" },

                // Common keywords
                { label: "int", kind: monaco.languages.CompletionItemKind.Keyword, insertText: "int" },
                { label: "float", kind: monaco.languages.CompletionItemKind.Keyword, insertText: "float" },
                { label: "double", kind: monaco.languages.CompletionItemKind.Keyword, insertText: "double" },
                { label: "char", kind: monaco.languages.CompletionItemKind.Keyword, insertText: "char" },
                { label: "void", kind: monaco.languages.CompletionItemKind.Keyword, insertText: "void" },
                { label: "bool", kind: monaco.languages.CompletionItemKind.Keyword, insertText: "bool" },

                // Control flow
                { label: "if", kind: monaco.languages.CompletionItemKind.Keyword, insertText: "if (condition) {\n\t// code\n}" },
                { label: "else", kind: monaco.languages.CompletionItemKind.Keyword, insertText: "else {\n\t// code\n}" },
                { label: "for", kind: monaco.languages.CompletionItemKind.Keyword, insertText: "for (int i = 0; i < N; i++) {\n\t// code\n}" },
                { label: "while", kind: monaco.languages.CompletionItemKind.Keyword, insertText: "while (condition) {\n\t// code\n}" },
                { label: "switch", kind: monaco.languages.CompletionItemKind.Keyword, insertText: "switch (variable) {\n\tcase 1: // code\n\tbreak;\n\tdefault: // code\n}" },
                { label: "std", kind: monaco.languages.CompletionItemKind.Keyword, insertText: "std", },
                { label: "cout", kind: monaco.languages.CompletionItemKind.Method, insertText: "cout", },
                { label: "cin", kind: monaco.languages.CompletionItemKind.Method, insertText: "cin", },

                // Functions & Methods
                { label: "main", kind: monaco.languages.CompletionItemKind.Function, insertText: "int main() {\n\treturn 0;\n}" },
                { label: "getline", kind: monaco.languages.CompletionItemKind.Function, insertText: "std::getline(std::cin, variable);" },
                { label: "pow", kind: monaco.languages.CompletionItemKind.Function, insertText: "std::pow(base, exponent);" },

                // Vector methods
                { label: "push_back", kind: monaco.languages.CompletionItemKind.Method, insertText: "push_back(value);" },
                { label: "pop_back", kind: monaco.languages.CompletionItemKind.Method, insertText: "pop_back();" },
                { label: "size", kind: monaco.languages.CompletionItemKind.Method, insertText: "size();" },
                { label: "clear", kind: monaco.languages.CompletionItemKind.Method, insertText: "clear();" },

                // Queue methods
                { label: "push", kind: monaco.languages.CompletionItemKind.Method, insertText: "push(value);" },
                { label: "pop", kind: monaco.languages.CompletionItemKind.Method, insertText: "pop();" },
                { label: "front", kind: monaco.languages.CompletionItemKind.Method, insertText: "front();" },
                { label: "back", kind: monaco.languages.CompletionItemKind.Method, insertText: "back();" },

                // Data Structures
                { label: "vector", kind: monaco.languages.CompletionItemKind.Struct, insertText: "std::vector<int> vec;" },
                { label: "map", kind: monaco.languages.CompletionItemKind.Struct, insertText: "std::map<KeyType, ValueType> myMap;" },
                { label: "set", kind: monaco.languages.CompletionItemKind.Struct, insertText: "std::set<int> mySet;" },
                { label: "queue", kind: monaco.languages.CompletionItemKind.Struct, insertText: "std::queue<int> myQueue;" },
                { label: "stack", kind: monaco.languages.CompletionItemKind.Struct, insertText: "std::stack<int> myStack;" },

                // Class Template
                { label: "class", kind: monaco.languages.CompletionItemKind.Class, insertText: "class ClassName {\npublic:\n\tClassName();\n\t~ClassName();\n};" },
                { label: "struct", kind: monaco.languages.CompletionItemKind.Class, insertText: "struct StructName {\n\tint field;\n\tvoid function();\n};" },
            ];

            const lastWord = textBeforeCursor.split(/\s+/).slice(-2)[0];
            if (textBeforeCursor.endsWith(".")) {
                if (lastWord.includes("vec")) {
                    suggestions = [
                        { label: "push_back", kind: monaco.languages.CompletionItemKind.Method, insertText: "push_back(value);" },
                        { label: "pop_back", kind: monaco.languages.CompletionItemKind.Method, insertText: "pop_back();" },
                        { label: "size", kind: monaco.languages.CompletionItemKind.Method, insertText: "size();" },
                        { label: "clear", kind: monaco.languages.CompletionItemKind.Method, insertText: "clear();" },
                    ];
                } else if (lastWord.includes("q")) {
                    suggestions = [
                        { label: "push", kind: monaco.languages.CompletionItemKind.Method, insertText: "push(value);" },
                        { label: "pop", kind: monaco.languages.CompletionItemKind.Method, insertText: "pop();" },
                        { label: "front", kind: monaco.languages.CompletionItemKind.Method, insertText: "front();" },
                        { label: "back", kind: monaco.languages.CompletionItemKind.Method, insertText: "back();" },
                    ];
                } else if (lastWord.includes("st")) {
                    suggestions = [
                        { label: "push", kind: monaco.languages.CompletionItemKind.Method, insertText: "push(value);" },
                        { label: "pop", kind: monaco.languages.CompletionItemKind.Method, insertText: "pop();" },
                        { label: "top", kind: monaco.languages.CompletionItemKind.Method, insertText: "top();" },
                        { label: "empty", kind: monaco.languages.CompletionItemKind.Method, insertText: "empty();" },
                    ];
                }
            }


            const filteredSuggestions = suggestions.filter(item => {
                if (textBeforeCursor.endsWith("#")) {
                    return item.label.startsWith("#");
                }
                return item.label.startsWith(word.word);
            });

            return {
                suggestions: filteredSuggestions.map(item => ({
                    ...item,
                    range
                }))
            };
        },
    });
};

export default registerCppCompletions;


