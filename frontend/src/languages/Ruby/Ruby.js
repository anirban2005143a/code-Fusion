const registerRubyCompletions = (monaco) => {
    monaco.languages.registerCompletionItemProvider("ruby", {
        triggerCharacters: ["d", "p", "f", "s", "w", "t", ".", "b"],
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
                // Ruby Keywords
                { label: "def", kind: monaco.languages.CompletionItemKind.Keyword, insertText: "def method_name\n\t# code\nend" },
                { label: "class", kind: monaco.languages.CompletionItemKind.Keyword, insertText: "class ClassName\n\tdef initialize\n\tend\nend" },
                { label: "module", kind: monaco.languages.CompletionItemKind.Keyword, insertText: "module ModuleName\n\t# code\nend" },
                { label: "begin", kind: monaco.languages.CompletionItemKind.Keyword, insertText: "begin\n\t# code\nrescue => e\n\t# handle error\nend" },
                { label: "rescue", kind: monaco.languages.CompletionItemKind.Keyword, insertText: "rescue => e\n\t# handle error" },
                { label: "end", kind: monaco.languages.CompletionItemKind.Keyword, insertText: "end" },
                { label: "return", kind: monaco.languages.CompletionItemKind.Keyword, insertText: "return " },
                { label: "yield", kind: monaco.languages.CompletionItemKind.Keyword, insertText: "yield " },
                { label: "if", kind: monaco.languages.CompletionItemKind.Keyword, insertText: "if condition\n\t# code\nend" },
                { label: "else", kind: monaco.languages.CompletionItemKind.Keyword, insertText: "else\n\t# code" },
                { label: "elsif", kind: monaco.languages.CompletionItemKind.Keyword, insertText: "elsif condition\n\t# code" },
                { label: "case", kind: monaco.languages.CompletionItemKind.Keyword, insertText: "case variable\nwhen value\n\t# code\nelse\n\t# default\nend" },
                { label: "while", kind: monaco.languages.CompletionItemKind.Keyword, insertText: "while condition\n\t# code\nend" },
                { label: "for", kind: monaco.languages.CompletionItemKind.Keyword, insertText: "for item in collection\n\t# code\nend" },
                { label: "do", kind: monaco.languages.CompletionItemKind.Keyword, insertText: "do\n\t# code\nend" },

                // Data Types
                { label: "String", kind: monaco.languages.CompletionItemKind.Type, insertText: "String" },
                { label: "Integer", kind: monaco.languages.CompletionItemKind.Type, insertText: "Integer" },
                { label: "Float", kind: monaco.languages.CompletionItemKind.Type, insertText: "Float" },
                { label: "Array", kind: monaco.languages.CompletionItemKind.Type, insertText: "Array" },
                { label: "Hash", kind: monaco.languages.CompletionItemKind.Type, insertText: "Hash" },
                { label: "Boolean", kind: monaco.languages.CompletionItemKind.Type, insertText: "Boolean" },
                { label: "nil", kind: monaco.languages.CompletionItemKind.Type, insertText: "nil" },

                // Built-in Methods
                { label: "puts", kind: monaco.languages.CompletionItemKind.Function, insertText: "puts " },
                { label: "print", kind: monaco.languages.CompletionItemKind.Function, insertText: "print " },
                { label: "gets", kind: monaco.languages.CompletionItemKind.Function, insertText: "gets " },
                { label: "chomp", kind: monaco.languages.CompletionItemKind.Function, insertText: "chomp" },
                { label: "to_i", kind: monaco.languages.CompletionItemKind.Function, insertText: "to_i" },
                { label: "to_f", kind: monaco.languages.CompletionItemKind.Function, insertText: "to_f" },
                { label: "to_s", kind: monaco.languages.CompletionItemKind.Function, insertText: "to_s" },
                { label: "each", kind: monaco.languages.CompletionItemKind.Method, insertText: "each { |item| }" },
                { label: "map", kind: monaco.languages.CompletionItemKind.Method, insertText: "map { |item| }" },
                { label: "select", kind: monaco.languages.CompletionItemKind.Method, insertText: "select { |item| }" },
                { label: "reject", kind: monaco.languages.CompletionItemKind.Method, insertText: "reject { |item| }" },
                { label: "reduce", kind: monaco.languages.CompletionItemKind.Method, insertText: "reduce(0) { |acc, item| }" },

                // Class Methods
                { label: "attr_accessor", kind: monaco.languages.CompletionItemKind.Keyword, insertText: "attr_accessor :" },
                { label: "attr_reader", kind: monaco.languages.CompletionItemKind.Keyword, insertText: "attr_reader :" },
                { label: "attr_writer", kind: monaco.languages.CompletionItemKind.Keyword, insertText: "attr_writer :" },

                // Exception Handling
                { label: "raise", kind: monaco.languages.CompletionItemKind.Function, insertText: "raise 'Error Message'" },
                { label: "begin", kind: monaco.languages.CompletionItemKind.Keyword, insertText: "begin\n\t# code\nrescue => e\n\t# handle error\nend" },

                // Modules
                { label: "include", kind: monaco.languages.CompletionItemKind.Keyword, insertText: "include " },
                { label: "extend", kind: monaco.languages.CompletionItemKind.Keyword, insertText: "extend " },
                { label: "require", kind: monaco.languages.CompletionItemKind.Keyword, insertText: "require ''" },
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

export default registerRubyCompletions;
