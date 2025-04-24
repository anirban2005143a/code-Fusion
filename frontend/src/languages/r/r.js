const registerRCompletions = (monaco) => {
    monaco.languages.registerCompletionItemProvider("r", {
        triggerCharacters: ["i", "f", "s", "w", "t", ".", "b"],
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
                // R Keywords
                { label: "if", kind: monaco.languages.CompletionItemKind.Keyword, insertText: "if (condition) {\n\t# code\n}" },
                { label: "else", kind: monaco.languages.CompletionItemKind.Keyword, insertText: "else {\n\t# code\n}" },
                { label: "for", kind: monaco.languages.CompletionItemKind.Keyword, insertText: "for (i in 1:N) {\n\t# code\n}" },
                { label: "while", kind: monaco.languages.CompletionItemKind.Keyword, insertText: "while (condition) {\n\t# code\n}" },
                { label: "function", kind: monaco.languages.CompletionItemKind.Keyword, insertText: "function_name <- function() {\n\t# code\n}" },
                { label: "return", kind: monaco.languages.CompletionItemKind.Keyword, insertText: "return value" },
                { label: "break", kind: monaco.languages.CompletionItemKind.Keyword, insertText: "break" },
                { label: "next", kind: monaco.languages.CompletionItemKind.Keyword, insertText: "next" },

                // R Data Types
                { label: "numeric", kind: monaco.languages.CompletionItemKind.Type, insertText: "numeric" },
                { label: "integer", kind: monaco.languages.CompletionItemKind.Type, insertText: "integer" },
                { label: "character", kind: monaco.languages.CompletionItemKind.Type, insertText: "character" },
                { label: "logical", kind: monaco.languages.CompletionItemKind.Type, insertText: "logical" },
                { label: "factor", kind: monaco.languages.CompletionItemKind.Type, insertText: "factor" },
                { label: "data.frame", kind: monaco.languages.CompletionItemKind.Type, insertText: "data.frame" },
                { label: "list", kind: monaco.languages.CompletionItemKind.Type, insertText: "list" },
                { label: "matrix", kind: monaco.languages.CompletionItemKind.Type, insertText: "matrix" },
                { label: "array", kind: monaco.languages.CompletionItemKind.Type, insertText: "array" },
                { label: "vector", kind: monaco.languages.CompletionItemKind.Type, insertText: "vector" },

                // Built-in Functions
                { label: "print", kind: monaco.languages.CompletionItemKind.Function, insertText: "print()" },
                { label: "cat", kind: monaco.languages.CompletionItemKind.Function, insertText: "cat()" },
                { label: "str", kind: monaco.languages.CompletionItemKind.Function, insertText: "str()" },
                { label: "length", kind: monaco.languages.CompletionItemKind.Function, insertText: "length()" },
                { label: "mean", kind: monaco.languages.CompletionItemKind.Function, insertText: "mean()" },
                { label: "sum", kind: monaco.languages.CompletionItemKind.Function, insertText: "sum()" },
                { label: "median", kind: monaco.languages.CompletionItemKind.Function, insertText: "median()" },
                { label: "sd", kind: monaco.languages.CompletionItemKind.Function, insertText: "sd()" },
                { label: "lm", kind: monaco.languages.CompletionItemKind.Function, insertText: "lm()" },
                { label: "cor", kind: monaco.languages.CompletionItemKind.Function, insertText: "cor()" },
                { label: "apply", kind: monaco.languages.CompletionItemKind.Function, insertText: "apply()" },
                { label: "tapply", kind: monaco.languages.CompletionItemKind.Function, insertText: "tapply()" },
                { label: "cbind", kind: monaco.languages.CompletionItemKind.Function, insertText: "cbind()" },
                { label: "rbind", kind: monaco.languages.CompletionItemKind.Function, insertText: "rbind()" },
                { label: "subset", kind: monaco.languages.CompletionItemKind.Function, insertText: "subset()" },

                // R Operators
                { label: "<-", kind: monaco.languages.CompletionItemKind.Operator, insertText: "<-" },
                { label: "->", kind: monaco.languages.CompletionItemKind.Operator, insertText: "->" },
                { label: "==", kind: monaco.languages.CompletionItemKind.Operator, insertText: "==" },
                { label: "!=" , kind: monaco.languages.CompletionItemKind.Operator, insertText: "!=" },
                { label: ">", kind: monaco.languages.CompletionItemKind.Operator, insertText: ">" },
                { label: "<", kind: monaco.languages.CompletionItemKind.Operator, insertText: "<" },
                { label: ">=", kind: monaco.languages.CompletionItemKind.Operator, insertText: ">=" },
                { label: "<=", kind: monaco.languages.CompletionItemKind.Operator, insertText: "<=" },
                { label: "+", kind: monaco.languages.CompletionItemKind.Operator, insertText: "+" },
                { label: "-", kind: monaco.languages.CompletionItemKind.Operator, insertText: "-" },
                { label: "*", kind: monaco.languages.CompletionItemKind.Operator, insertText: "*" },
                { label: "/", kind: monaco.languages.CompletionItemKind.Operator, insertText: "/" },

                // Data Manipulation Functions
                { label: "merge", kind: monaco.languages.CompletionItemKind.Function, insertText: "merge()" },
                { label: "subset", kind: monaco.languages.CompletionItemKind.Function, insertText: "subset()" },
                { label: "transform", kind: monaco.languages.CompletionItemKind.Function, insertText: "transform()" },
                { label: "aggregate", kind: monaco.languages.CompletionItemKind.Function, insertText: "aggregate()" },

                // File Handling
                { label: "read.csv", kind: monaco.languages.CompletionItemKind.Function, insertText: "read.csv('file.csv')" },
                { label: "read.table", kind: monaco.languages.CompletionItemKind.Function, insertText: "read.table('file.txt')" },
                { label: "write.csv", kind: monaco.languages.CompletionItemKind.Function, insertText: "write.csv(data, 'file.csv')" },
                { label: "write.table", kind: monaco.languages.CompletionItemKind.Function, insertText: "write.table(data, 'file.txt')" },

                // Plotting Functions
                { label: "plot", kind: monaco.languages.CompletionItemKind.Function, insertText: "plot()" },
                { label: "hist", kind: monaco.languages.CompletionItemKind.Function, insertText: "hist()" },
                { label: "boxplot", kind: monaco.languages.CompletionItemKind.Function, insertText: "boxplot()" },
                { label: "barplot", kind: monaco.languages.CompletionItemKind.Function, insertText: "barplot()" },
                { label: "pairs", kind: monaco.languages.CompletionItemKind.Function, insertText: "pairs()" },
            ];

            return {
                suggestions: suggestions.map((item) => ({
                    ...item,
                    range,
                })),
            };
        },
    });
};

export default registerRCompletions;
