
const handelEditorThemes = ( monaco) => {
    // Dark Themes
    monaco.editor.defineTheme("dracula", {
        base: "vs-dark",
        inherit: true,
        rules: [
            { token: "comment", foreground: "6272a4" },
            { token: "keyword", foreground: "ff79c6" },
            { token: "number", foreground: "bd93f9" },
            { token: "string", foreground: "f1fa8c" },
        ],
        colors: {
            "editor.background": "#282a36",
            "editor.foreground": "#f8f8f2",
            "editorCursor.foreground": "#f8f8f0",
            "editor.lineHighlightBackground": "#44475a",
            "editorLineNumber.foreground": "#6272a4",
        },
    });

    monaco.editor.defineTheme("one-dark", {
        base: "vs-dark",
        inherit: true,
        rules: [
            { token: "comment", foreground: "5c6370" },
            { token: "keyword", foreground: "c678dd" },
            { token: "number", foreground: "d19a66" },
            { token: "string", foreground: "98c379" },
        ],
        colors: {
            "editor.background": "#282c34",
            "editor.foreground": "#abb2bf",
            "editorCursor.foreground": "#528bff",
            "editor.lineHighlightBackground": "#3e4451",
            "editorLineNumber.foreground": "#636d83",
        },
    });

    monaco.editor.defineTheme("monokai", {
        base: "vs-dark",
        inherit: true,
        rules: [
            { token: "comment", foreground: "75715e" },
            { token: "keyword", foreground: "f92672" },
            { token: "number", foreground: "ae81ff" },
            { token: "string", foreground: "e6db74" },
        ],
        colors: {
            "editor.background": "#272822",
            "editor.foreground": "#f8f8f2",
            "editorCursor.foreground": "#f8f8f0",
            "editor.lineHighlightBackground": "#3e3d32",
            "editorLineNumber.foreground": "#888888",
        },
    });

    monaco.editor.defineTheme("solarized-dark", {
        base: "vs-dark",
        inherit: true,
        rules: [
            { token: "comment", foreground: "586e75" },
            { token: "keyword", foreground: "cb4b16" },
            { token: "number", foreground: "d33682" },
            { token: "string", foreground: "2aa198" },
        ],
        colors: {
            "editor.background": "#002b36",
            "editor.foreground": "#839496",
            "editorCursor.foreground": "#93a1a1",
            "editor.lineHighlightBackground": "#073642",
            "editorLineNumber.foreground": "#586e75",
        },
    });

    monaco.editor.defineTheme("nord", {
        base: "vs-dark",
        inherit: true,
        rules: [
            { token: "comment", foreground: "616e88" },
            { token: "keyword", foreground: "81a1c1" },
            { token: "number", foreground: "b48ead" },
            { token: "string", foreground: "a3be8c" },
        ],
        colors: {
            "editor.background": "#2e3440",
            "editor.foreground": "#d8dee9",
            "editorCursor.foreground": "#d8dee9",
            "editor.lineHighlightBackground": "#3b4252",
            "editorLineNumber.foreground": "#4c566a",
        },
    });

    // Light Themes
    monaco.editor.defineTheme("solarized-light", {
        base: "vs",
        inherit: true,
        rules: [
            { token: "comment", foreground: "657b83" },
            { token: "keyword", foreground: "268bd2", fontStyle: "bold" },
            { token: "number", foreground: "dc322f" },
            { token: "string", foreground: "2aa198", fontStyle: "italic" },
        ],
        colors: {
            "editor.background": "#fdf6e3",
            "editor.foreground": "#073642",
            "editorCursor.foreground": "#d33682",
            "editor.lineHighlightBackground": "#eee8d5",
            "editorLineNumber.foreground": "#93a1a1",
        },
    });
    
    monaco.editor.defineTheme("github-light", {
        base: "vs",
        inherit: true,
        rules: [
            { token: "comment", foreground: "6a737d", fontStyle: "italic" },
            { token: "keyword", foreground: "d73a49", fontStyle: "bold" },
            { token: "number", foreground: "005cc5" },
            { token: "string", foreground: "22863a" },
        ],
        colors: {
            "editor.background": "#ffffff",
            "editor.foreground": "#24292e",
            "editorCursor.foreground": "#d73a49",
            "editor.lineHighlightBackground": "#eaeef2",
            "editorLineNumber.foreground": "#6a737d",
        },
    });
    
    monaco.editor.defineTheme("one-light", {
        base: "vs",
        inherit: true,
        rules: [
            { token: "comment", foreground: "989fb1", fontStyle: "italic" },
            { token: "keyword", foreground: "a626a4", fontStyle: "bold" },
            { token: "number", foreground: "da8548" },
            { token: "string", foreground: "50a14f" },
        ],
        colors: {
            "editor.background": "#fafafa",
            "editor.foreground": "#383a42",
            "editorCursor.foreground": "#4078f2",
            "editor.lineHighlightBackground": "#ececec",
            "editorLineNumber.foreground": "#989fb1",
        },
    });
    
    monaco.editor.defineTheme("material-light", {
        base: "vs",
        inherit: true,
        rules: [
            { token: "comment", foreground: "90a4ae", fontStyle: "italic" },
            { token: "keyword", foreground: "e53935", fontStyle: "bold" },
            { token: "number", foreground: "ffb300" },
            { token: "string", foreground: "388e3c" },
        ],
        colors: {
            "editor.background": "#ffffff",
            "editor.foreground": "#37474f",
            "editorCursor.foreground": "#e91e63",
            "editor.lineHighlightBackground": "#e3f2fd",
            "editorLineNumber.foreground": "#90a4ae",
        },
    });
    
    monaco.editor.defineTheme("paper-light", {
        base: "vs",
        inherit: true,
        rules: [
            { token: "comment", foreground: "777777" },
            { token: "keyword", foreground: "af00db", fontStyle: "bold" },
            { token: "number", foreground: "d73a49" },
            { token: "string", foreground: "0366d6", fontStyle: "italic" },
        ],
        colors: {
            "editor.background": "#fefefe",
            "editor.foreground": "#333333",
            "editorCursor.foreground": "#333333",
            "editor.lineHighlightBackground": "#f0f0f0",
            "editorLineNumber.foreground": "#777777",
        },
    });

    // other Themes
    monaco.editor.defineTheme("cyberpunk-neon", {
        base: "vs-dark",
        inherit: true,
        rules: [
            { token: "comment", foreground: "ff00ff" },
            { token: "keyword", foreground: "00ffff" },
            { token: "number", foreground: "ff9900" },
            { token: "string", foreground: "00ff00" },
        ],
        colors: {
            "editor.background": "#000000",
            "editor.foreground": "#ff00ff",
            "editorCursor.foreground": "#00ffff",
            "editor.lineHighlightBackground": "#220022",
            "editorLineNumber.foreground": "#ff0099",
        },
    });

    monaco.editor.defineTheme("forest-night", {
        base: "vs-dark",
        inherit: true,
        rules: [
            { token: "comment", foreground: "9bb67e" },
            { token: "keyword", foreground: "8fbcbb" },
            { token: "number", foreground: "b48ead" },
            { token: "string", foreground: "a3be8c" },
        ],
        colors: {
            "editor.background": "#2e3b30",
            "editor.foreground": "#e5f2db",
            "editorCursor.foreground": "#a3be8c",
            "editor.lineHighlightBackground": "#3b5242",
            "editorLineNumber.foreground": "#4c566a",
        },
    });

    monaco.editor.defineTheme("oceanic-blue", {
        base: "vs-dark",
        inherit: true,
        rules: [
            { token: "comment", foreground: "6699cc" },
            { token: "keyword", foreground: "ffcc66" },
            { token: "number", foreground: "ff9966" },
            { token: "string", foreground: "99cc99" },
        ],
        colors: {
            "editor.background": "#1b2b34",
            "editor.foreground": "#c0c5ce",
            "editorCursor.foreground": "#c0c5ce",
            "editor.lineHighlightBackground": "#34495e",
            "editorLineNumber.foreground": "#4c566a",
        },
    });

    monaco.editor.defineTheme("deep-space", {
        base: "vs-dark",
        inherit: true,
        rules: [
            { token: "comment", foreground: "aaaaaa" },
            { token: "keyword", foreground: "ffcc00" },
            { token: "number", foreground: "ff6600" },
            { token: "string", foreground: "00ffcc" },
        ],
        colors: {
            "editor.background": "#101020",
            "editor.foreground": "#f8f8f2",
            "editorCursor.foreground": "#f8f8f0",
            "editor.lineHighlightBackground": "#222244",
            "editorLineNumber.foreground": "#666688",
        },
    });

    monaco.editor.defineTheme("sunset-glow", {
        base: "vs-dark",
        inherit: true,
        rules: [
            { token: "comment", foreground: "ff99cc" },
            { token: "keyword", foreground: "ff6666" },
            { token: "number", foreground: "ffcc66" },
            { token: "string", foreground: "ff9966" },
        ],
        colors: {
            "editor.background": "#3c2f2f",
            "editor.foreground": "#ffcc99",
            "editorCursor.foreground": "#ffcc99",
            "editor.lineHighlightBackground": "#4e3b3b",
            "editorLineNumber.foreground": "#ff99cc",
        },
    });

};

export default handelEditorThemes
