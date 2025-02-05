import React, { useState, useEffect, useRef } from "react";
import MonacoEditor from "@monaco-editor/react";
import { ToastContainer, toast } from 'react-toastify';
import * as monaco from "monaco-editor";
import axios from "axios"
import aiimg from "../../assets/aiIMg.png"
import gsap from "gsap";

// Auto complete for languages
import registerCppCompletions from "../../languages/cpp/cpp";
import registerPythonCompletions from "../../languages/python/python";
import registerJavaCompletions from "../../languages/java/java";
import registerCustomSyntax from "../../syntax/syntax";
import registerCCompletions from "../../languages/c/c";
import registerRubyCompletions from "../../languages/Ruby/Ruby";
import registerPhpCompletions from "../../languages/php/php";
import registerShellCompletions from "../../languages/shell/shell";
import registerGoCompletions from "../../languages/go/go";
import registerRustCompletions from "../../languages/rust/rust";
import registerXmlCompletions from "../../languages/xml/xml";
import registerPerlCompletions from "../../languages/perl/perl";
import registerKotlinCompletions from "../../languages/kotlin/kotlin";
import registerSwiftCompletions from "../../languages/swift/swift";
import registerRCompletions from "../../languages/r/r";
import registerDartCompletions from "../../languages/dart/dart";
import registerHaskellCompletions from "../../languages/haskell/haskell";
import registerYamlCompletions from "../../languages/yaml/yaml";
import handelEditorThemes from "../../themes/theme";
import NavigationPanel from "./NavigationPanel";

import { io } from "socket.io-client";
import Navbar from "../../components/navbar/navbar";
import Livechat from "../../components/live chat/livechat";
import AiSupport from "../../components/aiSupport/AiSupport";
import AutoSaveModal from "./AutoSaveModal";


const CodeEditor = () => {
  const [input, setinput] = useState("")
  const [output, setoutput] = useState({ output: "Output will show here" })
  const [language, setLanguage] = useState("javascript");
  const [theme, setTheme] = useState("vs-dark");
  const [addedLinks, setAddedLinks] = useState({});
  const [selectedLink, setSelectedLink] = useState(null);
  const [newlyAddedLink, setnewlyAddedLink] = useState(null);
  const [isNavOpen, setIsNavOpen] = useState(true);
  const [alertMessage, setalertMessage] = useState("");
  const [code, setCode] = useState("// Start coding...");
  const [roomID, setroomID] = useState(window.location.href.split("?")[1]);
  const [socket, setSocket] = useState(null);
  const [initialCursors, setinitialCursors] = useState(null)
  const [userCursorsHoverEffect, setUserCursorsHoverEffect] = useState({}); // { userId: { decorationId, position } }
  const [isCollaboration, setisCollaboration] = useState(false)
  const [currentRemoteStatus, setcurrentRemoteStatus] = useState("")
  const [perviousCursor, setperviousCursor] = useState(null)
  const [loading, setloading] = useState(false)

  const mainRef = useRef(null);
  const editorRef = useRef(null);
  const monacoRef = useRef(null);
  const containerRef = useRef(null);

  // console.log(roomID, isCollaboration)

  //make sure the crolling of page
  document.body.style.overflowY = "auto";

  const handleCodeChange = (value) => {
    const newcode = addedLinks
    newcode[selectedLink.name].code = value.toString()
    // console.log(newcode)
    setAddedLinks(newcode)

    // if (autoSave) {
    //   localStorage.setItem("autoSavedCode", JSON.stringify(addedLinks))
    // } else {
    //   localStorage.removeItem("autoSavedCode")
    // }

    setCode(value); // Update the local code state
    socket.emit("codeChange", { roomID, code: value, name: localStorage.getItem("username") || "unknown" }); // Emit updated code to other users
  };

  const changeLanguage = (monaco) => {
    if (language === "cpp") {
      registerCppCompletions(monaco);
    }
    if (language === "python") {
      registerPythonCompletions(monaco);
    }
    if (language === "java") {
      registerJavaCompletions(monaco);
    }
    if (language === "c") {
      registerCCompletions(monaco);
    }
    if (language === "ruby") {
      registerRubyCompletions(monaco);
    }
    if (language === "php") {
      registerPhpCompletions(monaco);
    }
    if (language === "shell") {
      registerShellCompletions(monaco);
    }
    if (language === "go") {
      registerGoCompletions(monaco);
    }
    if (language === "rust") {
      registerRustCompletions(monaco);
    }
    if (language === "xml") {
      registerXmlCompletions(monaco);
    }
    if (language === "perl") {
      registerPerlCompletions(monaco);
    }
    if (language === "kotlin") {
      registerKotlinCompletions(monaco);
    }
    if (language === "swift") {
      registerSwiftCompletions(monaco);
    }
    if (language === "r") {
      registerRCompletions(monaco);
    }
    if (language === "dart") {
      registerDartCompletions(monaco);
    }
    if (language === "haskell") {
      registerHaskellCompletions(monaco);
    }
    if (language === "yaml") {
      registerYamlCompletions(monaco);
    }
  };

  const toggleNav = () => {
    setIsNavOpen(!isNavOpen);
  };

  //add a default file on select a language
  const addDefaultFileOnSelectLanguage = (languageParams) => {
    const getExtensionFromLanguage = (lang) => {
      switch (lang) {
        case "javascript":
          return "js";
        case "typescript":
          return "ts";
        case "python":
          return "py";
        case "java":
          return "java";
        case "c":
          return "c";
        case "cpp":
          return "cpp";
        case "ruby":
          return "rb";
        case "php":
          return "php";
        case "go":
          return "go";
        case "rust":
          return "rs";
        case "kotlin":
          return "kt";
        case "swift":
          return "swift";
        case "r":
          return "r";
        case "perl":
          return "pl";
        case "dart":
          return "dart";
        case "haskell":
          return "hs";
        case "xml":
          return "xml";
        case "yaml":
          return "yaml";
        case "html":
          return "html";
        case "shell":
          return "sh";
        default:
          return "txt";
      }
    };

    if (languageParams !== "") {
      const extension = getExtensionFromLanguage(languageParams);
      const linkName = `demo.${extension}`;

      if (!addedLinks[linkName]) {
        const newLink = {
          name: linkName,
          code: "// Start coding...",
          language: languageParams,
        };

        setAddedLinks((prevAddedLinks) => ({
          ...prevAddedLinks,
          [linkName]: newLink,
        }));
        setnewlyAddedLink(newLink.name);
        setSelectedLink(newLink);
      } else {
        setSelectedLink(addedLinks[linkName]);
      }
    }
  };

  // send current cursors 
  const handleCursorChange = () => {
    if (!editorRef.current) return;

    const position = editorRef.current.getPosition();
    // console.log("Cursor moved:", position); // Debug log

    if (position) {
      socket.emit("cursorMove", { roomID, cursor: position });
    }
  };

  //handel mount function 
  const handleEditorDidMount = (editor, monaco) => {
    editorRef.current = editor;
    monacoRef.current = monaco;

    // Initialize language and theme handlers
    handelEditorThemes(monaco);
    changeLanguage(monaco);
    registerCustomSyntax(monaco);

    //current cursor position
    editor.onDidChangeCursorPosition(() => {
      setperviousCursor(editor.getPosition())
      handleCursorChange();
    });

    //undo and redo 
    //ctlr + z
    editor.addCommand(monaco.KeyMod.CtrlCmd | monaco.KeyCode.KeyZ, () => {
      editor.trigger('source', 'undo');
    });
    //ctlr + Y
    editor.addCommand(monaco.KeyMod.CtrlCmd | monaco.KeyCode.KeyY, () => {
      editor.trigger('source', 'redo');
    });
    // undo button click 
    document.querySelector("#editor #undoBtn").addEventListener("click", () => {
      editor.trigger('source', 'undo');
    })
    // redo button click 
    document.querySelector("#editor #redoBtn").addEventListener("click", () => {
      editor.trigger('source', 'redo');
    })

    //// Register a hover provider to show user IDs on hover
    monaco.languages.registerHoverProvider('javascript', {
      provideHover: (model, position) => {
        for (const userId in userCursorsHoverEffect) {
          const cursorPosition = userCursorsHoverEffect[userId].cursor;
          if (
            cursorPosition.lineNumber === position.lineNumber &&
            cursorPosition.column === position.column
          ) {
            return {
              contents: [
                { value: `**User ID:** ${userId}` }, // Display the user ID in a tooltip
              ],
            };
          }
        }
        return null;
      },
    });
  };

  // Function to generate random colors for each user cursor
  const getRandomColor = () => {
    const hue = Math.floor(Math.random() * 360);
    // Pick high saturation and brightness for contrast
    return `hsl(${hue}, 100%, ${hue > 200 ? 40 : 60}%)`;
  }
  // Function to inject CSS to live cursor dynamically
  const injectCursorStyle = (userId, color) => {
    const style = document.createElement("style");
    style.innerHTML = `
    .cursor-${userId} {
      background-color: ${color} !important;
      border-left: 3px solid ${color};
      margin-left: 0px;
    }
  `;
    document.head.appendChild(style);
  }

  //function for execute code and get output
  const executeCode = async (code, input, language) => {

    try {
      toast.success("Code is being executed");
      const result = await axios.post(
        `${import.meta.env.VITE_REACT_BACKEND_URL}/api/haxplore/user/Executingcode`,
        {
          code,
          input,
          language,
        }
      );
      // console.log(result);
      if (result.data.error) {
        setalertMessage(result.data.error)
      } else {
        const formattedOutput = result.data.output
          .split("\n")
          .map((line, index) => (
            <React.Fragment key={index}>
              {line}
              <br />
            </React.Fragment>
          ));

        setoutput({
          status: result.data.statusCode,
          output: formattedOutput,
          memory: result.data.memory,
          executionTime: result.data.cpuTime
        });
        toast.success("Code executed succesfully");
        // console.log("Response updated:", result);
      }

    } catch (error) {
      console.error("Error executing code:", error);
      setoutput({
        status: error.status,
        output: error.message,
        memory: 0,
        executionTime: 0
      });
      setalertMessage(error.message)
    }
  };

  //read txt file
  const readTxtFile = (event) => {
    const file = event.target.files[0]; // Get the selected file

    if (file && file.type === "text/plain") { // Check if the file is a text file
      const reader = new FileReader(); // Create a FileReader object

      reader.onload = function (e) {
        const content = e.target.result; // Get the file content
        setinput(content)
        console.log(content); // Output the content to the console
      };

      reader.readAsText(file); // Read the file as text
    } else {
      console.log("Please select a valid .txt file.");
      setalertMessage("Please select a valid .txt file.")
    }
  }


  // useEffect 
  useEffect(() => {
    const socketIoServer = io(`${import.meta.env.VITE_REACT_BACKEND_URL}`);
    setSocket(socketIoServer)
  }, [])

  useEffect(() => {
    if (roomID && socket && roomID.length === 11) {
      console.log(socket.id);
      socket.emit("joinRoom", { roomID, name: localStorage.getItem("username") || "unknown" });

      socket.on("init", ({ code, cursors }) => {
        setCode(code);
        setinitialCursors(cursors)
        console.log("dvfrvr")
        setisCollaboration(true)
      });

      socket.on("userJoined", ({ id, name }) => {
        setisCollaboration(true)
        setcurrentRemoteStatus(name + " join ")
        console.log("user join " + id);
      });

      socket.on("errorMessage", (message) => {
        console.log(message);
        toast.error(message);
      });

      socket.on("codeChange", ({ newCode, name }) => {
        setcurrentRemoteStatus(name + " is typing ...")
        setCode(newCode)
      });

      return () => {
        socket.off("init");
        socket.off("codeChange");
        socket.off("cursorMove");
        socket.disconnect();
      };
    }
  }, [socket, roomID]);

  useEffect(() => {
    if (selectedLink) {
      setLanguage(selectedLink.language);
    }
  }, [selectedLink]);

  useEffect(() => {
    editorRef.current && perviousCursor && editorRef.current.setPosition(perviousCursor)
    if (selectedLink) {
      const obj = selectedLink;
      obj.code = code;
      setSelectedLink(obj);
    }
  }, [code]);

  useEffect(() => {
    addDefaultFileOnSelectLanguage(language);
  }, []);

  useEffect(() => {
    if (alertMessage !== "") {
      toast.error(alertMessage);
    }
  }, [alertMessage]);

  //update real time live cursor
  useEffect(() => {
    if (socket && editorRef.current) {

      const userCursors = new Map(); // Store cursor decorations per user
      const userColors = new Map();

      socket.on('cursorMove', ({ id, cursor }) => {
        console.log({ id, cursor })
        const editor = editorRef.current;
        if (!cursor || !cursor.lineNumber || !cursor.column) return;
        // Assign a unique color if not already assigned

        if (!userColors.has(id)) {
          const color = getRandomColor();
          userColors.set(id, color)
          injectCursorStyle(id, color); // Apply the color
        }

        // Remove previous decoration if it exists
        if (userCursors.has(id)) {
          editor.deltaDecorations(userCursors.get(id), []);
        }

        // Add new decoration for this user's cursor
        const newDecoration = editor.deltaDecorations([], [
          {
            range: new monaco.Range(cursor.lineNumber, cursor.column, cursor.lineNumber, cursor.column),
            options: {
              className: `remote-cursor cursor-${id}`, // Unique class per user
              stickiness: monaco.editor.TrackedRangeStickiness.NeverGrowsWhenTypingAtEdges,
            },
          },
        ]);

        // Store the new decoration for this user
        userCursors.set(id, newDecoration);

        // Update userCursors state
        setUserCursorsHoverEffect((prevCursors) => ({
          ...prevCursors,
          [id]: { decorationId: newDecoration[0], cursor },
        }));

      });

      socket.on('removeCursor', (userId) => {
        setcurrentRemoteStatus("Some one left")
        const editor = editorRef.current;

        // Remove the cursor decoration for the disconnected user
        if (userCursors.has(userId)) {
          editor.deltaDecorations(userCursors.get(userId), []);
        }

        // Update userCursors state by removing the disconnected user
        userCursors.delete(userId)
        userColors.delete(userId)

        // Update userCursors state by removing the disconnected user
        setUserCursorsHoverEffect((prevCursors) => {
          const newCursors = { ...prevCursors };
          delete newCursors[userId];
          return newCursors;
        });

      });

      return () => {
        socket.off('cursorMove');
        socket.off('removeCursor');
        socket.disconnect();
      };
    }

  }, [socket, editorRef.current]);

  //initial cursor positions
  useEffect(() => {
    if (editorRef.current && initialCursors && Object.keys(initialCursors).length !== 0) {

      const userCursors = new Map(); // Store cursor decorations per user
      const userColors = new Map();


      Object.keys(initialCursors).forEach((id) => {
        const editor = editorRef.current
        const cursor = initialCursors[id]

        if (!cursor || !cursor.lineNumber || !cursor.column) return;

        // Assign a unique color if not already assigned
        if (!userColors.has(id)) {
          const color = getRandomColor();
          userColors.set(id, color);
          injectCursorStyle(id, color); // Apply the color
        }

        // Remove previous decoration if it exists
        if (userCursors.has(id)) {
          editor.deltaDecorations(userCursors.get(id), []);
        }

        // Add new decoration for this user's cursor
        const newDecoration = editor.deltaDecorations([], [
          {
            range: new monaco.Range(cursor.lineNumber, cursor.column, cursor.lineNumber, cursor.column),
            options: {
              className: `remote-cursor cursor-${id}`, // Unique class per user
              stickiness: monaco.editor.TrackedRangeStickiness.NeverGrowsWhenTypingAtEdges,
            },
          },
        ]);

        // Store the new decoration for this user
        userCursors.set(id, newDecoration);
      })

    }
  }, [editorRef.current, initialCursors])

  // make navigation side panel remove on collaboration mode 
  useEffect(() => {
    if (isCollaboration) setIsNavOpen(false)
    else setIsNavOpen(true)
  }, [isCollaboration])

  // make current status empty after each changes 
  useEffect(() => {
    let interval
    if (currentRemoteStatus !== "") {
      console.log(currentRemoteStatus)
      interval = setTimeout(() => {
        setcurrentRemoteStatus("")
      }, 5000);
    } else {
      if (interval) clearInterval(interval)
    }
  }, [currentRemoteStatus])

  // useEffect(() => {
  //   if (autoSave) {
  //     localStorage.setItem("autoSavedCode", JSON.stringify(addedLinks))
  //   } else {
  //     localStorage.removeItem("autoSavedCode")
  //   }
  // }, [autoSave])

  useEffect(() => {
    if (selectedLink && addedLinks[selectedLink.name]) {
      // console.log(addedLinks[selectedLink.name].code)
      const newcode = addedLinks[selectedLink.name].code
      setCode(newcode)
    }
  }, [selectedLink])


  // console.log(addedLinks)
  // console.log(selectedLink)
  console.log(perviousCursor)

  return (
    <div
      id="editor"
      className="md:p-4 p-2 bg-black"
    >
      {/* toasify for notification alert  */}
      <ToastContainer />

      {/* navbar  */}
      <Navbar />

      {/* modal  */}
      <AutoSaveModal code={code} />

      <h2 className=" font-semibold p-4 mt-[80px] text-white text-2xl">AI-Assisted Code Editor</h2>

      {/* all buttons  */}
      <div className="controlers flex flex-wrap  w-full justify-between items-center px-2 py-4 ">
        <div className="controlBtns flex flex-wrap items-center justify-start gap-2">

          {/* open or close navigation panel  */}
          {!isCollaboration && window.innerWidth >= 768 && <button
            onClick={toggleNav}
            className=" cursor-pointer bg-purple-500 text-white px-4 py-2 rounded-lg shadow-lg"
          >
            {isNavOpen ? "Close Panel" : "Open Panel"}
          </button>}

          {/* all languages  */}
          <div className="language w-36 ">
            <select
              onChange={(e) => {
                addDefaultFileOnSelectLanguage(e.target.value);
                setLanguage(e.target.value);
              }}
              value={language}
              id="languages"
              className="cursor-pointer bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            >
              <option value="javascript">JavaScript</option>
              <option value="typescript">TypeScript</option>
              <option value="python">Python</option>
              <option value="java">Java</option>
              <option value="c">C</option>
              <option value="cpp">C++</option>
              <option value="ruby">Ruby</option>
              <option value="php">PHP</option>
              <option value="go">Go</option>
              <option value="rust">Rust</option>
              <option value="kotlin">Kotlin</option>
              <option value="swift">Swift</option>
              <option value="r">R</option>
              <option value="perl">Perl</option>
              <option value="dart">Dart</option>
              <option value="haskell">Haskell</option>
              <option value="xml">XML</option>
              <option value="yaml">YAML</option>
              <option value="html">HTML</option>
              <option value="shell">Shell</option>
            </select>
          </div>

          {/* all themes  */}
          <div className="theme w-36 ">
            <select
              onChange={(e) => {
                setTheme(e.target.value);
              }}
              value={theme}
              id="theme"
              className="cursor-pointer bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            >
              <option value="vs-dark">Dark</option>
              <option value="light">Light</option>
              <option value="hc-black">High Contrast Black</option>
              <option value="monokai">Monokai</option>
              <option value="solarized-dark">Solarized Dark</option>
              <option value="nord">Nord</option>
              <option value="dracula">Dracula</option>
              <option value="one-dark">One Dark</option>
              <option value="one-light">One Light</option>
              <option value="material-light">Material Light</option>
              <option value="paper-light">Paper Light</option>
              <option value="solarized-light">Solarized Light</option>
              <option value="github-light">GitHub Light</option>
              <option value="cyberpunk-neon">Cyberpunk Neon</option>
              <option value="forest-night">Forest Night</option>
              <option value="oceanic-blue">Oceanic Blue</option>
              <option value="deep-space">Deep Space</option>
              <option value="sunset-glow">Sunset Glow</option>
            </select>
          </div>

          {/* save code  */}
          <button
            disabled={loading}
            onClick={() => {
              console.log(document.querySelector("#saveCodeModal"))
              const elem = document.querySelector("#saveCodeModal")
              elem && elem.click()
            }} type="button" className="text-white cursor-pointer bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700">
            {loading ? "Saving" : "Save Code"}
          </button>

          {/* undo btn  */}
          <button id="undoBtn" className="w-10 h-8 bg-slate-700 rounded-xl px-2 cursor-pointer hover:bg-slate-800">
            <svg version="1.0" xmlns="http://www.w3.org/2000/svg"
              width="48.000000pt" height="48.000000pt" viewBox="0 0 48.000000 48.000000"
              preserveAspectRatio="xMidYMid meet"
              className="w-full h-full">

              <g transform="translate(0.000000,48.000000) scale(0.100000,-0.100000)"
                fill="#ffffff" stroke="none">
                <path d="M40 252 l0 -92 92 0 92 0 -39 40 -39 40 37 15 c75 31 151 9 196 -56
                  29 -43 31 -44 55 -26 17 12 16 16 -16 57 -44 58 -85 81 -156 87 -47 4 -65 0
                  -104 -19 l-47 -25 -35 36 -36 36 0 -93z"/>
              </g>
            </svg>
          </button>

          {/* redo btn  */}
          <button id="redoBtn" className="w-10 h-8 bg-slate-700 rounded-xl px-2 cursor-pointer hover:bg-slate-800">
            <svg version="1.0" xmlns="http://www.w3.org/2000/svg"
              width="96.000000pt" height="96.000000pt" viewBox="0 0 96.000000 96.000000"
              preserveAspectRatio="xMidYMid meet"
              className="w-full h-full">

              <g transform="translate(0.000000,96.000000) scale(0.100000,-0.100000)"
                fill="#ffffff" stroke="none">
                <path d="M803 609 l-71 -72 -35 27 c-86 65 -224 91 -337 62 -122 -31 -220
                  -110 -275 -219 -27 -54 -25 -58 25 -70 22 -5 28 -1 49 39 34 63 96 123 161
                  153 74 35 201 37 270 5 95 -46 95 -42 5 -133 l-80 -81 183 0 182 0 0 180 c0
                  99 -1 180 -3 180 -1 0 -34 -32 -74 -71z"/>
              </g>
            </svg>
          </button>
        </div>

        {/* ai suggestions  */}
        <div className="aiFeatureBtn flex flex-wrap justify-start py-2 items-center">
          {/* ai suggestion btn  */}
          <button
            onClick={() => {
              const elem = document.querySelector("#AiSupport")
              gsap.to(elem, { x: 0, duration: 0.5, ease: "power2.out" });
            }}
            type="button" className="aiSuggestions cursor-pointer text-white bg-[#24292F] hover:bg-[#24292F]/90 focus:ring-4 focus:outline-none focus:ring-[#24292F]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-gray-500 dark:hover:bg-[#050708]/30 me-2 mb-2">
            <span><img src={aiimg} alt="image" className="w-8 " /></span>
            <span className="playfair-display-font text-lg pe-2">AI </span>Suggetions
          </button>

          {/* error detectioon 
          <button onClick={() => {
            const elem = document.querySelector("#ErrorSuggetion")
            gsap.to(elem, { x: 0, duration: 0.5, ease: "power2.out" });
          }}
            type="button" className=" text-md errorDetect cursor-pointer text-white bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 shadow-lg shadow-red-500/50 dark:shadow-lg dark:shadow-red-800/80 font-medium rounded-lg px-5 py-2.5 text-center me-2 mb-2">
            Error Detection
          </button> */}
        </div>

      </div>

      {/* work space  */}
      <div className="workSpace">
        <div className="CurrentStatus text-white text-base font-normal text-end h-7 px-4">{currentRemoteStatus}</div>
        <div className="flex md:flex-row flex-col h-[70vh] my-2">
          {/* navigation panel  */}
          {!isCollaboration && <NavigationPanel
            selectedLink={selectedLink}
            setSelectedLink={setSelectedLink}
            isNavOpen={isNavOpen}
            addedLinks={addedLinks}
            setAddedLinks={setAddedLinks}
            newlyAddedLink={newlyAddedLink}
            setnewlyAddedLink={setnewlyAddedLink}
          />}
          {/* editor  */}
          <div
            ref={mainRef}
            className="h-full transition-all duration-150"
            style={{ width: window.innerWidth >= 768 ? isNavOpen ? "80%" : "100%" : "100%" }}
          >
            <div className="h-full">
              <div ref={containerRef} id="monacoEditor" className="h-full relative">
                {socket && <MonacoEditor
                  height="100%"
                  language={language}
                  theme={theme}
                  value={code}
                  onChange={handleCodeChange}
                  onMount={handleEditorDidMount}
                  options={{
                    readOnly: selectedLink ? false : true,
                    automaticLayout: true,
                    suggestOnTriggerCharacters: true,
                    quickSuggestions: {
                      other: true,
                      comments: true,
                      strings: true,
                    },
                    minimap: { enabled: true },
                    formatOnType: true,
                    lineNumbers: "on",
                    suggest: { snippetsPreventQuickSuggestions: false },
                    folding: true,
                    foldingHighlight: true,
                    foldingStrategy: "auto",
                    showFoldingControls: "always",
                  }}
                />}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* input field for code  */}
      <h2 className=" px-2 font-medium my-4">Input</h2>
      <div id="input" className=" m-1 md:m-2 min-h-[20vh]">
        <div className="w-full mb-4 border border-gray-200 rounded-lg bg-gray-50 dark:bg-gray-700 dark:border-gray-600">
          <div className="p-4 bg-white rounded-t-lg dark:bg-gray-800">
            <label htmlFor="comment" className="sr-only">
              Your comment
            </label>
            <textarea
              name="inputArea"
              id="inputArea"
              rows="4"
              className="w-full px-0 text-sm text-gray-900 outline-0 bg-white border-0 dark:bg-gray-800 focus:ring-0 dark:text-white dark:placeholder-gray-400 min-h-52"
              value={input}
              placeholder="Write Input..."
              onChange={(e) => {
                setinput(e.target.value)
              }}
              required
            ></textarea>
          </div>
          <div className="flex items-center justify-between px-3 py-2 border-t dark:border-gray-600 border-gray-200">
            <button
              onClick={() => {
                executeCode(code, input, language);
              }}
              type="submit"
              className="inline-flex items-center py-2.5 px-4 text-md font-medium text-center text-white bg-blue-700 rounded-lg focus:ring-4 focus:ring-blue-200 dark:focus:ring-blue-900 hover:bg-blue-800"
            >
              Execute
            </button>
            <div className="flex ps-0 space-x-1 rtl:space-x-reverse sm:ps-2">
              <label htmlFor="textFileInput" className=" cursor-pointer">
                <svg
                  className="w-8 h-8"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 12 20"
                >
                  <path
                    stroke="currentColor"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M1 6v8a5 5 0 1 0 10 0V4.5a3.5 3.5 0 1 0-7 0V13a2 2 0 0 0 4 0V6"
                  />
                </svg>
              </label>
              <input
                id="textFileInput"
                type="file"
                onChange={readTxtFile}
                accept=".txt"
                className=" hidden justify-center items-center p-2 text-gray-500 rounded-sm cursor-pointer hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600"
              />
            </div>
          </div>
        </div>
      </div>

      {/* output field for code  */}
      <h2 className=" px-2 font-medium my-4">Output</h2>
      <div className="OutputInfo flex justify-end px-4 gap-4 font-light text-sm ">
        {/* status Code  */}
        <div className={`statusCode ${output.status === 200 ? " text-green-600 " : " text-red-700 "} `}>Status: {output.status}</div>
        {/* execution time  */}
        <div className="executiontime text-white">Time: {output.executionTime || 0}s</div>
        {/* memory  */}
        <div className="memory text-white">Memory: {output.memory || 0}kb</div>
      </div>
      <div
        id="output"
        className=" min-h-32 bg-slate-500 p-4 md:m-2 m-1 mt-0 rounded-lg border-[1px] text-white border-gray-700"
      >{output.output}</div>

      {/* live chat  */}
      {isCollaboration && <Livechat />}

      {/* ai support panel  */}
      <AiSupport language={language} />

    </div>
  );
};

export default CodeEditor;