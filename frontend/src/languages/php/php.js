const registerPhpCompletions = (monaco) => {
    monaco.languages.registerCompletionItemProvider("php", {
        triggerCharacters: ["$", "p", "f", "s", "w", "t", ".", "b"],
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
                // PHP Keywords
                { label: "echo", kind: monaco.languages.CompletionItemKind.Keyword, insertText: "echo " },
                { label: "print", kind: monaco.languages.CompletionItemKind.Keyword, insertText: "print " },
                { label: "return", kind: monaco.languages.CompletionItemKind.Keyword, insertText: "return " },
                { label: "function", kind: monaco.languages.CompletionItemKind.Keyword, insertText: "function functionName() {\n\t// code\n}" },
                { label: "class", kind: monaco.languages.CompletionItemKind.Keyword, insertText: "class ClassName {\n\tpublic function __construct() {}\n}" },
                { label: "interface", kind: monaco.languages.CompletionItemKind.Keyword, insertText: "interface InterfaceName {\n\tpublic function methodName();\n}" },
                { label: "extends", kind: monaco.languages.CompletionItemKind.Keyword, insertText: "extends " },
                { label: "implements", kind: monaco.languages.CompletionItemKind.Keyword, insertText: "implements " },
                { label: "public", kind: monaco.languages.CompletionItemKind.Keyword, insertText: "public " },
                { label: "private", kind: monaco.languages.CompletionItemKind.Keyword, insertText: "private " },
                { label: "protected", kind: monaco.languages.CompletionItemKind.Keyword, insertText: "protected " },
                { label: "static", kind: monaco.languages.CompletionItemKind.Keyword, insertText: "static " },
                { label: "global", kind: monaco.languages.CompletionItemKind.Keyword, insertText: "global " },
                { label: "new", kind: monaco.languages.CompletionItemKind.Keyword, insertText: "new " },
                { label: "isset", kind: monaco.languages.CompletionItemKind.Function, insertText: "isset($variable);" },
                { label: "unset", kind: monaco.languages.CompletionItemKind.Function, insertText: "unset($variable);" },
                { label: "empty", kind: monaco.languages.CompletionItemKind.Function, insertText: "empty($variable);" },
                { label: "die", kind: monaco.languages.CompletionItemKind.Function, insertText: "die('Message');" },
                { label: "exit", kind: monaco.languages.CompletionItemKind.Function, insertText: "exit();" },

                // Control Structures
                { label: "if", kind: monaco.languages.CompletionItemKind.Keyword, insertText: "if (condition) {\n\t// code\n}" },
                { label: "else", kind: monaco.languages.CompletionItemKind.Keyword, insertText: "else {\n\t// code\n}" },
                { label: "elseif", kind: monaco.languages.CompletionItemKind.Keyword, insertText: "elseif (condition) {\n\t// code\n}" },
                { label: "switch", kind: monaco.languages.CompletionItemKind.Keyword, insertText: "switch ($variable) {\n\tcase 1:\n\t\t// code\n\t\tbreak;\n\tdefault:\n\t\t// code\n}" },
                { label: "for", kind: monaco.languages.CompletionItemKind.Keyword, insertText: "for ($i = 0; $i < N; $i++) {\n\t// code\n}" },
                { label: "while", kind: monaco.languages.CompletionItemKind.Keyword, insertText: "while (condition) {\n\t// code\n}" },
                { label: "do", kind: monaco.languages.CompletionItemKind.Keyword, insertText: "do {\n\t// code\n} while (condition);" },
                { label: "foreach", kind: monaco.languages.CompletionItemKind.Keyword, insertText: "foreach ($array as $key => $value) {\n\t// code\n}" },

                // String Functions
                { label: "strlen", kind: monaco.languages.CompletionItemKind.Function, insertText: "strlen($string);" },
                { label: "str_replace", kind: monaco.languages.CompletionItemKind.Function, insertText: "str_replace($search, $replace, $subject);" },
                { label: "strpos", kind: monaco.languages.CompletionItemKind.Function, insertText: "strpos($string, $substring);" },
                { label: "substr", kind: monaco.languages.CompletionItemKind.Function, insertText: "substr($string, $start, $length);" },
                { label: "trim", kind: monaco.languages.CompletionItemKind.Function, insertText: "trim($string);" },
                { label: "explode", kind: monaco.languages.CompletionItemKind.Function, insertText: "explode($delimiter, $string);" },
                { label: "implode", kind: monaco.languages.CompletionItemKind.Function, insertText: "implode($glue, $array);" },

                // Array Functions
                { label: "count", kind: monaco.languages.CompletionItemKind.Function, insertText: "count($array);" },
                { label: "array_push", kind: monaco.languages.CompletionItemKind.Function, insertText: "array_push($array, $value);" },
                { label: "array_pop", kind: monaco.languages.CompletionItemKind.Function, insertText: "array_pop($array);" },
                { label: "array_merge", kind: monaco.languages.CompletionItemKind.Function, insertText: "array_merge($array1, $array2);" },
                { label: "array_keys", kind: monaco.languages.CompletionItemKind.Function, insertText: "array_keys($array);" },

                // File Handling
                { label: "fopen", kind: monaco.languages.CompletionItemKind.Function, insertText: "fopen($filename, 'r');" },
                { label: "fwrite", kind: monaco.languages.CompletionItemKind.Function, insertText: "fwrite($file, $content);" },
                { label: "fclose", kind: monaco.languages.CompletionItemKind.Function, insertText: "fclose($file);" },
                { label: "file_get_contents", kind: monaco.languages.CompletionItemKind.Function, insertText: "file_get_contents($filename);" },

                // Database (MySQLi)
                { label: "mysqli_connect", kind: monaco.languages.CompletionItemKind.Function, insertText: "mysqli_connect($host, $user, $password, $database);" },
                { label: "mysqli_query", kind: monaco.languages.CompletionItemKind.Function, insertText: "mysqli_query($connection, $query);" },
                { label: "mysqli_fetch_assoc", kind: monaco.languages.CompletionItemKind.Function, insertText: "mysqli_fetch_assoc($result);" },
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

export default registerPhpCompletions;
