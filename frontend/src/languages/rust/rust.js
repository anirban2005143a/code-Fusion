const registerRustCompletions = (monaco) => {
    monaco.languages.registerCompletionItemProvider("rust", {
        triggerCharacters: ["p", "f", "s", "w", "t", ".", "b", "m", ":"],
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
                // Rust Keywords
                { label: "fn", kind: monaco.languages.CompletionItemKind.Keyword, insertText: "fn function_name() {\n\t// code\n}" },
                { label: "pub", kind: monaco.languages.CompletionItemKind.Keyword, insertText: "pub " },
                { label: "let", kind: monaco.languages.CompletionItemKind.Keyword, insertText: "let variable_name = " },
                { label: "mut", kind: monaco.languages.CompletionItemKind.Keyword, insertText: "mut " },
                { label: "const", kind: monaco.languages.CompletionItemKind.Keyword, insertText: "const CONST_NAME: type = value;" },
                { label: "static", kind: monaco.languages.CompletionItemKind.Keyword, insertText: "static STATIC_VAR: type = value;" },
                { label: "struct", kind: monaco.languages.CompletionItemKind.Keyword, insertText: "struct StructName {\n\tfield: Type,\n}" },
                { label: "enum", kind: monaco.languages.CompletionItemKind.Keyword, insertText: "enum EnumName {\n\tVariant1,\n\tVariant2,\n}" },
                { label: "trait", kind: monaco.languages.CompletionItemKind.Keyword, insertText: "trait TraitName {\n\tfn method(&self);\n}" },
                { label: "impl", kind: monaco.languages.CompletionItemKind.Keyword, insertText: "impl StructName {\n\tfn method(&self) {\n\t\t// code\n\t}\n}" },
                { label: "use", kind: monaco.languages.CompletionItemKind.Keyword, insertText: "use module::item;" },
                { label: "mod", kind: monaco.languages.CompletionItemKind.Keyword, insertText: "mod module_name;" },
                { label: "extern", kind: monaco.languages.CompletionItemKind.Keyword, insertText: "extern crate crate_name;" },
                { label: "match", kind: monaco.languages.CompletionItemKind.Keyword, insertText: "match variable {\n\tvalue => {},\n\t_ => {},\n}" },

                // Control Flow
                { label: "if", kind: monaco.languages.CompletionItemKind.Keyword, insertText: "if condition {\n\t// code\n}" },
                { label: "else", kind: monaco.languages.CompletionItemKind.Keyword, insertText: "else {\n\t// code\n}" },
                { label: "for", kind: monaco.languages.CompletionItemKind.Keyword, insertText: "for item in collection {\n\t// code\n}" },
                { label: "while", kind: monaco.languages.CompletionItemKind.Keyword, insertText: "while condition {\n\t// code\n}" },
                { label: "loop", kind: monaco.languages.CompletionItemKind.Keyword, insertText: "loop {\n\t// code\n}" },
                { label: "break", kind: monaco.languages.CompletionItemKind.Keyword, insertText: "break;" },
                { label: "continue", kind: monaco.languages.CompletionItemKind.Keyword, insertText: "continue;" },
                { label: "return", kind: monaco.languages.CompletionItemKind.Keyword, insertText: "return value;" },

                // Data Types
                { label: "i32", kind: monaco.languages.CompletionItemKind.Type, insertText: "i32" },
                { label: "u32", kind: monaco.languages.CompletionItemKind.Type, insertText: "u32" },
                { label: "f64", kind: monaco.languages.CompletionItemKind.Type, insertText: "f64" },
                { label: "bool", kind: monaco.languages.CompletionItemKind.Type, insertText: "bool" },
                { label: "char", kind: monaco.languages.CompletionItemKind.Type, insertText: "char" },
                { label: "String", kind: monaco.languages.CompletionItemKind.Type, insertText: "String" },
                { label: "&str", kind: monaco.languages.CompletionItemKind.Type, insertText: "&str" },
                { label: "Vec", kind: monaco.languages.CompletionItemKind.Type, insertText: "Vec<Type>" },
                { label: "Option", kind: monaco.languages.CompletionItemKind.Type, insertText: "Option<Type>" },
                { label: "Result", kind: monaco.languages.CompletionItemKind.Type, insertText: "Result<Type, Error>" },

                // Built-in Functions
                { label: "println!", kind: monaco.languages.CompletionItemKind.Function, insertText: "println!(\"{}\", value);" },
                { label: "print!", kind: monaco.languages.CompletionItemKind.Function, insertText: "print!(\"{}\", value);" },
                { label: "dbg!", kind: monaco.languages.CompletionItemKind.Function, insertText: "dbg!(variable);" },
                { label: "format!", kind: monaco.languages.CompletionItemKind.Function, insertText: "format!(\"{}\", value);" },
                { label: "vec!", kind: monaco.languages.CompletionItemKind.Function, insertText: "vec![item1, item2, item3]" },
                { label: "String::new", kind: monaco.languages.CompletionItemKind.Function, insertText: "String::new()" },
                { label: "String::from", kind: monaco.languages.CompletionItemKind.Function, insertText: "String::from(\"text\")" },

                // Memory Management
                { label: "Box::new", kind: monaco.languages.CompletionItemKind.Function, insertText: "Box::new(value)" },
                { label: "Rc::new", kind: monaco.languages.CompletionItemKind.Function, insertText: "Rc::new(value)" },
                { label: "Arc::new", kind: monaco.languages.CompletionItemKind.Function, insertText: "Arc::new(value)" },
                { label: "RefCell::new", kind: monaco.languages.CompletionItemKind.Function, insertText: "RefCell::new(value)" },

                // Error Handling
                { label: "panic!", kind: monaco.languages.CompletionItemKind.Function, insertText: "panic!(\"error message\")" },
                { label: "unwrap", kind: monaco.languages.CompletionItemKind.Method, insertText: "variable.unwrap()" },
                { label: "expect", kind: monaco.languages.CompletionItemKind.Method, insertText: "variable.expect(\"error message\")" },
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

export default registerRustCompletions;
