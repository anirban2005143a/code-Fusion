const registerHaskellCompletions = (monaco) => {
    monaco.languages.registerCompletionItemProvider("haskell", {
        triggerCharacters: ["d", "f", "s", "t", ".", "b", "m"],
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
                // Haskell Keywords
                { label: "let", kind: monaco.languages.CompletionItemKind.Keyword, insertText: "let x = " },
                { label: "in", kind: monaco.languages.CompletionItemKind.Keyword, insertText: "in " },
                { label: "if", kind: monaco.languages.CompletionItemKind.Keyword, insertText: "if condition then\n\t// code\nelse\n\t// code" },
                { label: "then", kind: monaco.languages.CompletionItemKind.Keyword, insertText: "then" },
                { label: "else", kind: monaco.languages.CompletionItemKind.Keyword, insertText: "else" },
                { label: "case", kind: monaco.languages.CompletionItemKind.Keyword, insertText: "case expression of\n\tpattern -> result" },
                { label: "of", kind: monaco.languages.CompletionItemKind.Keyword, insertText: "of" },
                { label: "data", kind: monaco.languages.CompletionItemKind.Keyword, insertText: "data Type = Constructor" },

                // Haskell Types
                { label: "Int", kind: monaco.languages.CompletionItemKind.Type, insertText: "Int" },
                { label: "Double", kind: monaco.languages.CompletionItemKind.Type, insertText: "Double" },
                { label: "Bool", kind: monaco.languages.CompletionItemKind.Type, insertText: "Bool" },
                { label: "Char", kind: monaco.languages.CompletionItemKind.Type, insertText: "Char" },
                { label: "String", kind: monaco.languages.CompletionItemKind.Type, insertText: "String" },
                { label: "Maybe", kind: monaco.languages.CompletionItemKind.Type, insertText: "Maybe Type" },
                { label: "Either", kind: monaco.languages.CompletionItemKind.Type, insertText: "Either Type1 Type2" },

                // Functions
                { label: "print", kind: monaco.languages.CompletionItemKind.Function, insertText: "print" },
                { label: "putStrLn", kind: monaco.languages.CompletionItemKind.Function, insertText: "putStrLn" },
                { label: "map", kind: monaco.languages.CompletionItemKind.Function, insertText: "map f list" },
                { label: "filter", kind: monaco.languages.CompletionItemKind.Function, insertText: "filter predicate list" },
                { label: "foldl", kind: monaco.languages.CompletionItemKind.Function, insertText: "foldl function initial list" },
                { label: "foldr", kind: monaco.languages.CompletionItemKind.Function, insertText: "foldr function initial list" },

                // Operators
                { label: "+", kind: monaco.languages.CompletionItemKind.Operator, insertText: "+" },
                { label: "-", kind: monaco.languages.CompletionItemKind.Operator, insertText: "-" },
                { label: "*", kind: monaco.languages.CompletionItemKind.Operator, insertText: "*" },
                { label: "/", kind: monaco.languages.CompletionItemKind.Operator, insertText: "/" },
                { label: "==", kind: monaco.languages.CompletionItemKind.Operator, insertText: "==" },

                // List Functions
                { label: "head", kind: monaco.languages.CompletionItemKind.Function, insertText: "head list" },
                { label: "tail", kind: monaco.languages.CompletionItemKind.Function, insertText: "tail list" },
                { label: "length", kind: monaco.languages.CompletionItemKind.Function, insertText: "length list" },

                // IO
                { label: "getLine", kind: monaco.languages.CompletionItemKind.Function, insertText: "getLine" },
                { label: "putStr", kind: monaco.languages.CompletionItemKind.Function, insertText: "putStr" },

                // Monads
                { label: "return", kind: monaco.languages.CompletionItemKind.Keyword, insertText: "return value" },
                { label: ">>=", kind: monaco.languages.CompletionItemKind.Operator, insertText: ">>=" },
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

export default registerHaskellCompletions;
