const registerXmlCompletions = (monaco) => {
    monaco.languages.registerCompletionItemProvider("xml", {
        triggerCharacters: ["<", " ", "/"],
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
                // Common XML Tags
                { label: "<?xml", kind: monaco.languages.CompletionItemKind.Snippet, insertText: "<?xml version=\"1.0\" encoding=\"UTF-8\"?>" },
                { label: "<!DOCTYPE>", kind: monaco.languages.CompletionItemKind.Snippet, insertText: "<!DOCTYPE root_element>" },
                { label: "<html>", kind: monaco.languages.CompletionItemKind.Snippet, insertText: "<html>\n\t<head>\n\t\t<title>Title</title>\n\t</head>\n\t<body>\n\t</body>\n</html>" },
                { label: "<head>", kind: monaco.languages.CompletionItemKind.Snippet, insertText: "<head>\n\t<title>Title</title>\n</head>" },
                { label: "<body>", kind: monaco.languages.CompletionItemKind.Snippet, insertText: "<body>\n\t<!-- Content here -->\n</body>" },
                { label: "<title>", kind: monaco.languages.CompletionItemKind.Snippet, insertText: "<title>Title</title>" },
                { label: "<script>", kind: monaco.languages.CompletionItemKind.Snippet, insertText: "<script>\n\t// JavaScript Code\n</script>" },
                { label: "<style>", kind: monaco.languages.CompletionItemKind.Snippet, insertText: "<style>\n\t/* CSS Code */\n</style>" },
                { label: "<link>", kind: monaco.languages.CompletionItemKind.Snippet, insertText: "<link rel=\"stylesheet\" href=\"styles.css\">" },
                { label: "<meta>", kind: monaco.languages.CompletionItemKind.Snippet, insertText: "<meta charset=\"UTF-8\">" },

                // Common HTML Tags in XML
                { label: "<div>", kind: monaco.languages.CompletionItemKind.Snippet, insertText: "<div>\n\t<!-- Content -->\n</div>" },
                { label: "<span>", kind: monaco.languages.CompletionItemKind.Snippet, insertText: "<span>\n\t<!-- Inline Content -->\n</span>" },
                { label: "<p>", kind: monaco.languages.CompletionItemKind.Snippet, insertText: "<p>\n\tText content\n</p>" },
                { label: "<a>", kind: monaco.languages.CompletionItemKind.Snippet, insertText: "<a href=\"#\">Link</a>" },
                { label: "<img>", kind: monaco.languages.CompletionItemKind.Snippet, insertText: "<img src=\"image.jpg\" alt=\"Description\">" },

                // Table Tags
                { label: "<table>", kind: monaco.languages.CompletionItemKind.Snippet, insertText: "<table>\n\t<tr>\n\t\t<th>Header</th>\n\t</tr>\n\t<tr>\n\t\t<td>Data</td>\n\t</tr>\n</table>" },
                { label: "<tr>", kind: monaco.languages.CompletionItemKind.Snippet, insertText: "<tr>\n\t<td>Row Data</td>\n</tr>" },
                { label: "<td>", kind: monaco.languages.CompletionItemKind.Snippet, insertText: "<td>Cell Data</td>" },
                { label: "<th>", kind: monaco.languages.CompletionItemKind.Snippet, insertText: "<th>Header</th>" },

                // Form Elements
                { label: "<form>", kind: monaco.languages.CompletionItemKind.Snippet, insertText: "<form action=\"#\" method=\"POST\">\n\t<!-- Form Elements -->\n</form>" },
                { label: "<input>", kind: monaco.languages.CompletionItemKind.Snippet, insertText: "<input type=\"text\" name=\"field\" placeholder=\"Enter text\">" },
                { label: "<button>", kind: monaco.languages.CompletionItemKind.Snippet, insertText: "<button type=\"submit\">Submit</button>" },
                { label: "<label>", kind: monaco.languages.CompletionItemKind.Snippet, insertText: "<label for=\"id\">Label</label>" },
                { label: "<select>", kind: monaco.languages.CompletionItemKind.Snippet, insertText: "<select>\n\t<option value=\"1\">Option 1</option>\n</select>" },
                { label: "<option>", kind: monaco.languages.CompletionItemKind.Snippet, insertText: "<option value=\"1\">Option</option>" },

                // Attributes
                { label: "id", kind: monaco.languages.CompletionItemKind.Property, insertText: "id=\"\"" },
                { label: "class", kind: monaco.languages.CompletionItemKind.Property, insertText: "class=\"\"" },
                { label: "src", kind: monaco.languages.CompletionItemKind.Property, insertText: "src=\"\"" },
                { label: "href", kind: monaco.languages.CompletionItemKind.Property, insertText: "href=\"\"" },
                { label: "alt", kind: monaco.languages.CompletionItemKind.Property, insertText: "alt=\"\"" },
                { label: "title", kind: monaco.languages.CompletionItemKind.Property, insertText: "title=\"\"" },
                { label: "rel", kind: monaco.languages.CompletionItemKind.Property, insertText: "rel=\"stylesheet\"" },
                { label: "type", kind: monaco.languages.CompletionItemKind.Property, insertText: "type=\"\"" },
                { label: "name", kind: monaco.languages.CompletionItemKind.Property, insertText: "name=\"\"" },
                { label: "content", kind: monaco.languages.CompletionItemKind.Property, insertText: "content=\"\"" },
                { label: "charset", kind: monaco.languages.CompletionItemKind.Property, insertText: "charset=\"UTF-8\"" },

                // Special XML Entities
                { label: "&lt;", kind: monaco.languages.CompletionItemKind.Text, insertText: "&lt;" },
                { label: "&gt;", kind: monaco.languages.CompletionItemKind.Text, insertText: "&gt;" },
                { label: "&amp;", kind: monaco.languages.CompletionItemKind.Text, insertText: "&amp;" },
                { label: "&quot;", kind: monaco.languages.CompletionItemKind.Text, insertText: "&quot;" },
                { label: "&apos;", kind: monaco.languages.CompletionItemKind.Text, insertText: "&apos;" },
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

export default registerXmlCompletions;
