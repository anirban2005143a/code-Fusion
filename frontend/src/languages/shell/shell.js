const registerShellCompletions = (monaco) => {
    monaco.languages.registerCompletionItemProvider("shell", {
        triggerCharacters: ["$", ".", "-", "s", "w", "t", "b"],
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
                // Shell Keywords
                { label: "if", kind: monaco.languages.CompletionItemKind.Keyword, insertText: "if [ condition ]; then\n\t# code\nfi" },
                { label: "else", kind: monaco.languages.CompletionItemKind.Keyword, insertText: "else\n\t# code" },
                { label: "elif", kind: monaco.languages.CompletionItemKind.Keyword, insertText: "elif [ condition ]; then\n\t# code" },
                { label: "fi", kind: monaco.languages.CompletionItemKind.Keyword, insertText: "fi" },
                { label: "for", kind: monaco.languages.CompletionItemKind.Keyword, insertText: "for var in list; do\n\t# code\ndone" },
                { label: "while", kind: monaco.languages.CompletionItemKind.Keyword, insertText: "while [ condition ]; do\n\t# code\ndone" },
                { label: "until", kind: monaco.languages.CompletionItemKind.Keyword, insertText: "until [ condition ]; do\n\t# code\ndone" },
                { label: "case", kind: monaco.languages.CompletionItemKind.Keyword, insertText: "case $var in\npattern)\n\t# code\n;;\nesac" },
                { label: "esac", kind: monaco.languages.CompletionItemKind.Keyword, insertText: "esac" },
                { label: "function", kind: monaco.languages.CompletionItemKind.Keyword, insertText: "function function_name() {\n\t# code\n}" },
                { label: "return", kind: monaco.languages.CompletionItemKind.Keyword, insertText: "return " },
                { label: "exit", kind: monaco.languages.CompletionItemKind.Keyword, insertText: "exit 0" },

                // Shell Built-in Commands
                { label: "echo", kind: monaco.languages.CompletionItemKind.Function, insertText: "echo \"message\"" },
                { label: "printf", kind: monaco.languages.CompletionItemKind.Function, insertText: "printf \"format_string\" arguments" },
                { label: "read", kind: monaco.languages.CompletionItemKind.Function, insertText: "read variable" },
                { label: "pwd", kind: monaco.languages.CompletionItemKind.Function, insertText: "pwd" },
                { label: "cd", kind: monaco.languages.CompletionItemKind.Function, insertText: "cd /path/to/directory" },
                { label: "ls", kind: monaco.languages.CompletionItemKind.Function, insertText: "ls -la" },
                { label: "cp", kind: monaco.languages.CompletionItemKind.Function, insertText: "cp source destination" },
                { label: "mv", kind: monaco.languages.CompletionItemKind.Function, insertText: "mv source destination" },
                { label: "rm", kind: monaco.languages.CompletionItemKind.Function, insertText: "rm -rf /path" },
                { label: "touch", kind: monaco.languages.CompletionItemKind.Function, insertText: "touch filename" },
                { label: "mkdir", kind: monaco.languages.CompletionItemKind.Function, insertText: "mkdir new_directory" },
                { label: "rmdir", kind: monaco.languages.CompletionItemKind.Function, insertText: "rmdir directory" },
                { label: "grep", kind: monaco.languages.CompletionItemKind.Function, insertText: "grep 'pattern' filename" },
                { label: "sed", kind: monaco.languages.CompletionItemKind.Function, insertText: "sed 's/old/new/g' filename" },
                { label: "awk", kind: monaco.languages.CompletionItemKind.Function, insertText: "awk '{print $1}' filename" },
                { label: "find", kind: monaco.languages.CompletionItemKind.Function, insertText: "find /path -name 'filename'" },
                { label: "chmod", kind: monaco.languages.CompletionItemKind.Function, insertText: "chmod 755 filename" },
                { label: "chown", kind: monaco.languages.CompletionItemKind.Function, insertText: "chown user:group filename" },
                { label: "curl", kind: monaco.languages.CompletionItemKind.Function, insertText: "curl -X GET URL" },
                { label: "wget", kind: monaco.languages.CompletionItemKind.Function, insertText: "wget URL" },
                { label: "tar", kind: monaco.languages.CompletionItemKind.Function, insertText: "tar -czvf archive.tar.gz folder/" },

                // Environment Variables
                { label: "$HOME", kind: monaco.languages.CompletionItemKind.Variable, insertText: "$HOME" },
                { label: "$USER", kind: monaco.languages.CompletionItemKind.Variable, insertText: "$USER" },
                { label: "$PATH", kind: monaco.languages.CompletionItemKind.Variable, insertText: "$PATH" },
                { label: "$PWD", kind: monaco.languages.CompletionItemKind.Variable, insertText: "$PWD" },
                { label: "$SHELL", kind: monaco.languages.CompletionItemKind.Variable, insertText: "$SHELL" },
                { label: "$EDITOR", kind: monaco.languages.CompletionItemKind.Variable, insertText: "$EDITOR" },
                { label: "$RANDOM", kind: monaco.languages.CompletionItemKind.Variable, insertText: "$RANDOM" },
                { label: "$?", kind: monaco.languages.CompletionItemKind.Variable, insertText: "$?" },

                // Redirection Operators
                { label: ">", kind: monaco.languages.CompletionItemKind.Operator, insertText: ">" },
                { label: ">>", kind: monaco.languages.CompletionItemKind.Operator, insertText: ">>" },
                { label: "<", kind: monaco.languages.CompletionItemKind.Operator, insertText: "<" },
                { label: "|", kind: monaco.languages.CompletionItemKind.Operator, insertText: "|" },
                { label: "&", kind: monaco.languages.CompletionItemKind.Operator, insertText: "&" },
                { label: "&&", kind: monaco.languages.CompletionItemKind.Operator, insertText: "&&" },
                { label: "||", kind: monaco.languages.CompletionItemKind.Operator, insertText: "||" },
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

export default registerShellCompletions;
