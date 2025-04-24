const registerCCompletions = (monaco) => {
    monaco.languages.registerCompletionItemProvider("c", {
        triggerCharacters: ["#", "i", "d", "p", "f", "s", "w", "t", ".", "b"],
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
                // Preprocessor directives
                { label: "#include", kind: monaco.languages.CompletionItemKind.Keyword, insertText: "#include <>" },
                { label: "#define", kind: monaco.languages.CompletionItemKind.Keyword, insertText: "#define MACRO value" },
                { label: "#ifdef", kind: monaco.languages.CompletionItemKind.Keyword, insertText: "#ifdef MACRO" },
                { label: "#ifndef", kind: monaco.languages.CompletionItemKind.Keyword, insertText: "#ifndef MACRO" },
                { label: "#endif", kind: monaco.languages.CompletionItemKind.Keyword, insertText: "#endif" },

                // Data types
                { label: "int", kind: monaco.languages.CompletionItemKind.Keyword, insertText: "int " },
                { label: "float", kind: monaco.languages.CompletionItemKind.Keyword, insertText: "float " },
                { label: "double", kind: monaco.languages.CompletionItemKind.Keyword, insertText: "double " },
                { label: "char", kind: monaco.languages.CompletionItemKind.Keyword, insertText: "char " },
                { label: "void", kind: monaco.languages.CompletionItemKind.Keyword, insertText: "void " },
                { label: "long", kind: monaco.languages.CompletionItemKind.Keyword, insertText: "long " },
                { label: "short", kind: monaco.languages.CompletionItemKind.Keyword, insertText: "short " },
                { label: "unsigned", kind: monaco.languages.CompletionItemKind.Keyword, insertText: "unsigned " },
                { label: "signed", kind: monaco.languages.CompletionItemKind.Keyword, insertText: "signed " },
                { label: "bool", kind: monaco.languages.CompletionItemKind.Keyword, insertText: "bool " },

                // Control flow
                { label: "if", kind: monaco.languages.CompletionItemKind.Keyword, insertText: "if (condition) {\n\t// code\n}" },
                { label: "else", kind: monaco.languages.CompletionItemKind.Keyword, insertText: "else {\n\t// code\n}" },
                { label: "for", kind: monaco.languages.CompletionItemKind.Keyword, insertText: "for (int i = 0; i < N; i++) {\n\t// code\n}" },
                { label: "while", kind: monaco.languages.CompletionItemKind.Keyword, insertText: "while (condition) {\n\t// code\n}" },
                { label: "do", kind: monaco.languages.CompletionItemKind.Keyword, insertText: "do {\n\t// code\n} while (condition);" },
                { label: "switch", kind: monaco.languages.CompletionItemKind.Keyword, insertText: "switch (variable) {\n\tcase 1: // code\n\tbreak;\n\tdefault: // code\n}" },

                // Standard I/O Functions
                { label: "printf", kind: monaco.languages.CompletionItemKind.Function, insertText: "printf(\"%s\", variable);" },
                { label: "scanf", kind: monaco.languages.CompletionItemKind.Function, insertText: "scanf(\"%d\", &variable);" },
                { label: "gets", kind: monaco.languages.CompletionItemKind.Function, insertText: "gets(variable);" },
                { label: "puts", kind: monaco.languages.CompletionItemKind.Function, insertText: "puts(variable);" },

                // Memory Management
                { label: "malloc", kind: monaco.languages.CompletionItemKind.Function, insertText: "malloc(size);" },
                { label: "calloc", kind: monaco.languages.CompletionItemKind.Function, insertText: "calloc(num, size);" },
                { label: "realloc", kind: monaco.languages.CompletionItemKind.Function, insertText: "realloc(pointer, new_size);" },
                { label: "free", kind: monaco.languages.CompletionItemKind.Function, insertText: "free(pointer);" },

                // Common String Functions
                { label: "strlen", kind: monaco.languages.CompletionItemKind.Function, insertText: "strlen(string);" },
                { label: "strcpy", kind: monaco.languages.CompletionItemKind.Function, insertText: "strcpy(dest, src);" },
                { label: "strncpy", kind: monaco.languages.CompletionItemKind.Function, insertText: "strncpy(dest, src, n);" },
                { label: "strcmp", kind: monaco.languages.CompletionItemKind.Function, insertText: "strcmp(str1, str2);" },
                { label: "strcat", kind: monaco.languages.CompletionItemKind.Function, insertText: "strcat(dest, src);" },
                { label: "strchr", kind: monaco.languages.CompletionItemKind.Function, insertText: "strchr(string, character);" },
                { label: "strstr", kind: monaco.languages.CompletionItemKind.Function, insertText: "strstr(haystack, needle);" },

                // Math Functions
                { label: "sqrt", kind: monaco.languages.CompletionItemKind.Function, insertText: "sqrt(value);" },
                { label: "pow", kind: monaco.languages.CompletionItemKind.Function, insertText: "pow(base, exponent);" },
                { label: "abs", kind: monaco.languages.CompletionItemKind.Function, insertText: "abs(value);" },
                { label: "ceil", kind: monaco.languages.CompletionItemKind.Function, insertText: "ceil(value);" },
                { label: "floor", kind: monaco.languages.CompletionItemKind.Function, insertText: "floor(value);" },

                // Structures
                { label: "struct", kind: monaco.languages.CompletionItemKind.Class, insertText: "struct StructName {\n\tint field;\n\tvoid function();\n};" },
                { label: "typedef", kind: monaco.languages.CompletionItemKind.Keyword, insertText: "typedef existing_type new_type;" },
                
                // Main function
                { label: "main", kind: monaco.languages.CompletionItemKind.Function, insertText: "int main() {\n\treturn 0;\n}" },
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

export default registerCCompletions;
