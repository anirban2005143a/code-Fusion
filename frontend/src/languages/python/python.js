const registerPythonCompletions = (monaco) => {
    monaco.languages.registerCompletionItemProvider("python", {
        triggerCharacters: ["i", "d", "p", "f", "s", "w", "t", ".", "b"],
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
                { label: "import", kind: monaco.languages.CompletionItemKind.Keyword, insertText: "import " },
                { label: "def", kind: monaco.languages.CompletionItemKind.Keyword, insertText: "def function_name():" },
                { label: "class", kind: monaco.languages.CompletionItemKind.Keyword, insertText: "class ClassName:" },
                { label: "return", kind: monaco.languages.CompletionItemKind.Keyword, insertText: "return " },
                { label: "if", kind: monaco.languages.CompletionItemKind.Keyword, insertText: "if condition:" },
                { label: "elif", kind: monaco.languages.CompletionItemKind.Keyword, insertText: "elif condition:" },
                { label: "else", kind: monaco.languages.CompletionItemKind.Keyword, insertText: "else:" },
                { label: "for", kind: monaco.languages.CompletionItemKind.Keyword, insertText: "for item in iterable:" },
                { label: "while", kind: monaco.languages.CompletionItemKind.Keyword, insertText: "while condition:" },
                { label: "try", kind: monaco.languages.CompletionItemKind.Keyword, insertText: "try:\n    " },
                { label: "except", kind: monaco.languages.CompletionItemKind.Keyword, insertText: "except Exception as e:\n    print(e)" },
                
                // Built-in Functions
                { label: "print", kind: monaco.languages.CompletionItemKind.Function, insertText: "print()" },
                { label: "len", kind: monaco.languages.CompletionItemKind.Function, insertText: "len()" },
                { label: "range", kind: monaco.languages.CompletionItemKind.Function, insertText: "range()" },
                { label: "input", kind: monaco.languages.CompletionItemKind.Function, insertText: "input()" },
                { label: "int", kind: monaco.languages.CompletionItemKind.Function, insertText: "int()" },
                { label: "float", kind: monaco.languages.CompletionItemKind.Function, insertText: "float()" },
                { label: "str", kind: monaco.languages.CompletionItemKind.Function, insertText: "str()" },
                { label: "list", kind: monaco.languages.CompletionItemKind.Function, insertText: "list()" },
                { label: "dict", kind: monaco.languages.CompletionItemKind.Function, insertText: "dict()" },
                { label: "tuple", kind: monaco.languages.CompletionItemKind.Function, insertText: "tuple()" },
                { label: "set", kind: monaco.languages.CompletionItemKind.Function, insertText: "set()" },
                
                // Libraries
                { label: "math", kind: monaco.languages.CompletionItemKind.Module, insertText: "import math" },
                { label: "os", kind: monaco.languages.CompletionItemKind.Module, insertText: "import os" },
                { label: "sys", kind: monaco.languages.CompletionItemKind.Module, insertText: "import sys" },
                { label: "random", kind: monaco.languages.CompletionItemKind.Module, insertText: "import random" },
                { label: "time", kind: monaco.languages.CompletionItemKind.Module, insertText: "import time" },
                { label: "datetime", kind: monaco.languages.CompletionItemKind.Module, insertText: "import datetime" },
                
                // String Methods
                { label: "upper", kind: monaco.languages.CompletionItemKind.Method, insertText: "upper()" },
                { label: "lower", kind: monaco.languages.CompletionItemKind.Method, insertText: "lower()" },
                { label: "strip", kind: monaco.languages.CompletionItemKind.Method, insertText: "strip()" },
                { label: "split", kind: monaco.languages.CompletionItemKind.Method, insertText: "split()" },
                
                // List Methods
                { label: "append", kind: monaco.languages.CompletionItemKind.Method, insertText: "append()" },
                { label: "extend", kind: monaco.languages.CompletionItemKind.Method, insertText: "extend()" },
                { label: "remove", kind: monaco.languages.CompletionItemKind.Method, insertText: "remove()" },
                { label: "pop", kind: monaco.languages.CompletionItemKind.Method, insertText: "pop()" },
            ];

            return {
                suggestions: suggestions.map(item => ({
                    ...item,
                    range,
                })),
            };
        },
    });
};

export default registerPythonCompletions;
