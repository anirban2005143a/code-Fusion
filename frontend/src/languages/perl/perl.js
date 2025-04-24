const registerPerlCompletions = (monaco) => {
    monaco.languages.registerCompletionItemProvider("perl", {
        triggerCharacters: ["$", "@", "%", "p", "f", "s", "w", "t", ".", "b"],
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
                // Perl Keywords
                { label: "use", kind: monaco.languages.CompletionItemKind.Keyword, insertText: "use Module::Name;" },
                { label: "package", kind: monaco.languages.CompletionItemKind.Keyword, insertText: "package ModuleName;" },
                { label: "sub", kind: monaco.languages.CompletionItemKind.Keyword, insertText: "sub function_name {\n\t# code\n}" },
                { label: "my", kind: monaco.languages.CompletionItemKind.Keyword, insertText: "my $variable;" },
                { label: "our", kind: monaco.languages.CompletionItemKind.Keyword, insertText: "our $variable;" },
                { label: "local", kind: monaco.languages.CompletionItemKind.Keyword, insertText: "local $variable;" },
                { label: "return", kind: monaco.languages.CompletionItemKind.Keyword, insertText: "return value;" },

                // Control Flow
                { label: "if", kind: monaco.languages.CompletionItemKind.Keyword, insertText: "if (condition) {\n\t# code\n}" },
                { label: "elsif", kind: monaco.languages.CompletionItemKind.Keyword, insertText: "elsif (condition) {\n\t# code\n}" },
                { label: "else", kind: monaco.languages.CompletionItemKind.Keyword, insertText: "else {\n\t# code\n}" },
                { label: "for", kind: monaco.languages.CompletionItemKind.Keyword, insertText: "for (my $i = 0; $i < N; $i++) {\n\t# code\n}" },
                { label: "foreach", kind: monaco.languages.CompletionItemKind.Keyword, insertText: "foreach my $item (@array) {\n\t# code\n}" },
                { label: "while", kind: monaco.languages.CompletionItemKind.Keyword, insertText: "while (condition) {\n\t# code\n}" },
                { label: "do", kind: monaco.languages.CompletionItemKind.Keyword, insertText: "do {\n\t# code\n} while (condition);" },
                { label: "last", kind: monaco.languages.CompletionItemKind.Keyword, insertText: "last;" },
                { label: "next", kind: monaco.languages.CompletionItemKind.Keyword, insertText: "next;" },
                { label: "redo", kind: monaco.languages.CompletionItemKind.Keyword, insertText: "redo;" },

                // Data Types
                { label: "scalar", kind: monaco.languages.CompletionItemKind.Type, insertText: "$variable" },
                { label: "array", kind: monaco.languages.CompletionItemKind.Type, insertText: "@array" },
                { label: "hash", kind: monaco.languages.CompletionItemKind.Type, insertText: "%hash" },

                // Built-in Functions
                { label: "print", kind: monaco.languages.CompletionItemKind.Function, insertText: "print \"message\";" },
                { label: "say", kind: monaco.languages.CompletionItemKind.Function, insertText: "say \"message\";" },
                { label: "chomp", kind: monaco.languages.CompletionItemKind.Function, insertText: "chomp($variable);" },
                { label: "split", kind: monaco.languages.CompletionItemKind.Function, insertText: "split(/separator/, $string);" },
                { label: "join", kind: monaco.languages.CompletionItemKind.Function, insertText: "join(separator, @array);" },
                { label: "length", kind: monaco.languages.CompletionItemKind.Function, insertText: "length($string);" },
                { label: "index", kind: monaco.languages.CompletionItemKind.Function, insertText: "index($string, $substring);" },
                { label: "substr", kind: monaco.languages.CompletionItemKind.Function, insertText: "substr($string, start, length);" },

                // Regular Expressions
                { label: "m//", kind: monaco.languages.CompletionItemKind.Snippet, insertText: "m/pattern/" },
                { label: "s///", kind: monaco.languages.CompletionItemKind.Snippet, insertText: "s/old/new/g" },
                { label: "tr///", kind: monaco.languages.CompletionItemKind.Snippet, insertText: "tr/A-Z/a-z/" },

                // File Handling
                { label: "open", kind: monaco.languages.CompletionItemKind.Function, insertText: "open(my $fh, '<', 'file.txt');" },
                { label: "close", kind: monaco.languages.CompletionItemKind.Function, insertText: "close($fh);" },
                { label: "readline", kind: monaco.languages.CompletionItemKind.Function, insertText: "my $line = <$fh>;" },

                // Special Variables
                { label: "$_", kind: monaco.languages.CompletionItemKind.Variable, insertText: "$_" },
                { label: "$@", kind: monaco.languages.CompletionItemKind.Variable, insertText: "$@" },
                { label: "$!", kind: monaco.languages.CompletionItemKind.Variable, insertText: "$!" },
                { label: "$0", kind: monaco.languages.CompletionItemKind.Variable, insertText: "$0" },
                { label: "$$", kind: monaco.languages.CompletionItemKind.Variable, insertText: "$$" },
                { label: "$?", kind: monaco.languages.CompletionItemKind.Variable, insertText: "$?" },
                { label: "@ARGV", kind: monaco.languages.CompletionItemKind.Variable, insertText: "@ARGV" },
                { label: "%ENV", kind: monaco.languages.CompletionItemKind.Variable, insertText: "%ENV" },

                // Object-Oriented Programming
                { label: "bless", kind: monaco.languages.CompletionItemKind.Function, insertText: "bless {}, 'ClassName';" },
                { label: "new", kind: monaco.languages.CompletionItemKind.Method, insertText: "my $obj = ClassName->new();" },

                // Error Handling
                { label: "die", kind: monaco.languages.CompletionItemKind.Function, insertText: "die \"Error message\";" },
                { label: "warn", kind: monaco.languages.CompletionItemKind.Function, insertText: "warn \"Warning message\";" },
                { label: "eval", kind: monaco.languages.CompletionItemKind.Function, insertText: "eval {\n\t# code\n};\nif ($@) {\n\twarn \"Caught error: $@\";\n}" },
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

export default registerPerlCompletions;
