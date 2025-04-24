import React, { useState, useRef, useEffect } from 'react';
import {
  FaJs, FaPython, FaJava,  FaHtml5, FaFile, FaRProject, FaSwift, FaPhp, FaRust, FaTerminal
} from 'react-icons/fa';
import { SiTypescript, SiCplusplus, SiRuby, SiGo, SiKotlin, SiPerl, SiDart, SiHaskell, SiYaml, SiXml } from 'react-icons/si';

const NavigationPanel = (props) => {
  const [links, setLinks] = useState([]);
  const [newLinkText, setNewLinkText] = useState('');
  const [isAddingLink, setIsAddingLink] = useState(false);
  const [contextMenu, setContextMenu] = useState({ visible: false, x: 0, y: 0, selectedIndex: null });
  const navRef = useRef(null);
  const inputRef = useRef(null);

  const handleAddLinkClick = () => {
    setIsAddingLink(true);
    setTimeout(() => inputRef.current.focus(), 0);
  };

  const handleInputChange = (e) => {
    setNewLinkText(e.target.value);
  };

  const handleInputKeyPress = (newLink) => {

    // Check for duplicate names with the same extension
    const isDuplicate = links.some((link) => link.toLowerCase() === newLink.toLowerCase());
    if (isDuplicate) {
      alert('A link with this name already exists!');
      return;
    }

    // Add the new link to the links state
    setLinks([...links, newLink]);

    // Determine the language based on the file extension
    const language = getLanguageFromExtension(newLink);

    // Add the new link to the addedLinks state with name, code, and language properties
    props.setAddedLinks((prevAddedLinks) => ({
      ...prevAddedLinks,
      [newLink]: {
        name: newLink,
        code: "// Start coding...", // Initialize code as an empty string
        language: language, // Add the language property
      },
    }));

    // Reset the input field
    setNewLinkText('');
    setIsAddingLink(false);

  };

  const handleRightClick = (e, index) => {
    e.preventDefault();
    setContextMenu({ visible: true, x: e.clientX, y: e.clientY, selectedIndex: index });
  };

  const handleDeleteLink = () => {
    const deletedLink = links[contextMenu.selectedIndex]; // Get the link to be deleted
    const updatedLinks = links.filter((_, index) => index !== contextMenu.selectedIndex);
    setLinks(updatedLinks);

    const updatedAddedLinks = Object.fromEntries(
      Object.entries(props.addedLinks).filter((_, index) => index !== contextMenu.selectedIndex)
    );
    props.setAddedLinks(updatedAddedLinks)

    // If the deleted link is the currently selected one, clear the selectedLink
    if (props.selectedLink?.name === deletedLink) {
      props.setSelectedLink(null); // Clear the selected link
    }

    setContextMenu({ ...contextMenu, visible: false });
  };

  const handleClickOutside = (e) => {
    if (navRef.current && !navRef.current.contains(e.target)) {
      // If the click is outside the input area, close the input field
      if (isAddingLink) {
        setIsAddingLink(false);
        setNewLinkText('');
      }
      // Close the context menu if it's open
      setContextMenu({ ...contextMenu, visible: false });
    }
  };



  const getFileIcon = (fileName) => {
    const extension = fileName.split('.').pop().toLowerCase();
    switch (extension) {
      case 'js':
        return <FaJs className="inline-block mr-2" />;
      case 'ts':
        return <SiTypescript className="inline-block mr-2" />;
      case 'py':
        return <FaPython className="inline-block mr-2" />;
      case 'java':
        return <FaJava className="inline-block mr-2" />;
      case 'c':
        return <FaFile className="inline-block mr-2" />;
      case 'cpp':
        return <SiCplusplus className="inline-block mr-2" />;
      case 'rb':
        return <SiRuby className="inline-block mr-2" />;
      case 'php':
        return <FaPhp className="inline-block mr-2" />;
      case 'go':
        return <SiGo className="inline-block mr-2" />;
      case 'rs':
        return <FaRust className="inline-block mr-2" />;
      case 'kt':
        return <SiKotlin className="inline-block mr-2" />;
      case 'swift':
        return <FaSwift className="inline-block mr-2" />;
      case 'r':
        return <FaRProject className="inline-block mr-2" />;
      case 'pl':
        return <SiPerl className="inline-block mr-2" />;
      case 'dart':
        return <SiDart className="inline-block mr-2" />;
      case 'hs':
        return <SiHaskell className="inline-block mr-2" />;
      case 'xml':
        return <SiXml className="inline-block mr-2" />;
      case 'yaml':
      case 'yml':
        return <SiYaml className="inline-block mr-2" />;
      case 'html':
        return <FaHtml5 className="inline-block mr-2" />;
      case 'sh':
        return <FaTerminal className="inline-block mr-2" />;
      default:
        return <FaFile className="inline-block mr-2" />;
    }
  };

  const getLanguageFromExtension = (fileName) => {
    const extension = fileName.split('.').pop().toLowerCase();
    switch (extension) {
      case 'js':
        return 'javascript';
      case 'ts':
        return 'typescript';
      case 'py':
        return 'python';
      case 'java':
        return 'java';
      case 'c':
        return 'c';
      case 'cpp':
        return 'cpp';
      case 'rb':
        return 'ruby';
      case 'php':
        return 'php';
      case 'go':
        return 'go';
      case 'rs':
        return 'rust';
      case 'kt':
        return 'kotlin';
      case 'swift':
        return 'swift';
      case 'r':
        return 'r';
      case 'pl':
        return 'perl';
      case 'dart':
        return 'dart';
      case 'hs':
        return 'haskell';
      case 'xml':
        return 'xml';
      case 'yaml':
      case 'yml':
        return 'yaml';
      case 'html':
        return 'html';
      case 'sh':
        return 'shell';
      default:
        return 'Unknown';
    }
  };

  const handleLinkClick = (link) => {
    // Set the selected link as an object with name, code, and language properties
    const selectedLinkObject = {
      name: link,
      code: props.addedLinks[link]?.code || "", // Use the code from addedLinks or default to empty string
      language: props.addedLinks[link]?.language || "Unknown", // Use the language from addedLinks or default to "Unknown"
    };
    props.setSelectedLink(selectedLinkObject);
  };

  useEffect(() => {
    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [isAddingLink]); // Re-attach the event listener when isAddingLink changes

  useEffect(() => {
    if (props.newlyAddedLink) {
      handleInputKeyPress(props.newlyAddedLink)
    }
  }, [props.newlyAddedLink])


  return (
    <div
      ref={navRef}
      className="h-full bg-slate-600 transition-all duration-150 md:my-0 my-4"
      style={{ width: window.innerWidth >= 768 ? props.isNavOpen ? "20%" : "0%" : "100%" }}
    >
      <div className="p-4 transition-all duration-50 overflow-y-auto h-full " style={{ opacity: props.isNavOpen ? "1" : "0" }}>
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-bold text-white">File System</h2>
          <button onClick={handleAddLinkClick} className="px-2 py-1.5 bg-slate-800 text-white rounded hover:bg-slate-900 cursor-pointer">
            +
          </button>
        </div>
        <ul className="my-4 space-y-2 text-white">
          {links.map((link, index) => (
            <li
              key={index}
              onContextMenu={(e) => handleRightClick(e, index)}
              onClick={() => handleLinkClick(link)}
              className={` cursor-pointer ${props.selectedLink?.name === link ? 'bg-slate-800' : 'hover:bg-slate-700'}`}
            >
              <a href="#" className="block p-2 rounded">
                {getFileIcon(link)}
                {link}
              </a>
            </li>
          ))}
          {isAddingLink && (
            <li>
              <input
                ref={inputRef}
                type="text"
                value={newLinkText}
                onChange={handleInputChange}
                onKeyPress={(e) => {
                  if (e.key === 'Enter' && newLinkText.trim()) {
                    const newLink = newLinkText.trim();
                    handleInputKeyPress(newLink)
                  }
                }}
                className=" mb-3 w-full text-white bg-slate-800 p-2 rounded border border-blue-300"
                placeholder="Type link name and press Enter"
              />
            </li>
          )}
        </ul>
      </div>

      {contextMenu.visible && (
        <div
          style={{ top: contextMenu.y, left: contextMenu.x }}
          className="fixed bg-white shadow-lg rounded p-2"
        >
          <button onClick={handleDeleteLink} className=" z-50 block w-full text-left p-2 hover:bg-gray-100">
            Delete
          </button>
        </div>
      )}
    </div>
  );
};

export default NavigationPanel;