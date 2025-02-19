import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../styles/Home.css";

export default function Home() {
  const { userId } = useParams();
  const [token, setToken] = useState("");
  const [content, setContent] = useState("Select a document to start editing \nOr \nCreate a new document by clicking the + CREATE NEW button");
  const [documents, setDocuments] = useState([]);
  const [selectedDocument, setSelectedDocument] = useState(null);
  const [title, setTitle] = useState("No Document Selected!");
  // const [userName, setUserName] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [showDownloadOptions, setShowDownloadOptions] = useState(false);

  useEffect(() => {
    const storedUserDetails = localStorage.getItem("userDetails");
    if (!storedUserDetails) {
      window.location.href = "/";
    }
    const parsedUserDetails = JSON.parse(storedUserDetails);
    console.log("token from storage:", parsedUserDetails.token);
    // setUserName(parsedUserDetails.user.name || "Unknown User");
    setToken(parsedUserDetails.token || "");
  }, []);

  useEffect(() => {
    if (!token) return;

    const fetchDocuments = async () => {
      try {
        console.log("Token being used:", token);
        const response = await fetch(`http://localhost:8080/${userId}/documents`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) throw new Error("Failed to fetch documents");
        const data = await response.json();
        setDocuments(data.documents || []);
      } catch (error) {
        console.error("Error fetching documents:", error);
        window.location.href = "/";
      }
    };

    fetchDocuments();
  }, [token, userId]); // Runs when token is set


  const handleDocumentClick = (document) => {
    setSelectedDocument(document);
    setContent(document.content);
    setTitle(document.title);
  };

  const getErrorMessage = (error) => {
    toast.error(error, {
      position: "bottom-right",
      autoClose: 2000, // 1 second
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: true,
      theme: "danger",
    });
  }

  const getSuccessMessage = (message) => {
    toast.success(message, {
      position: "bottom-right",
      autoClose: 2000, // 1 second
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: true,
      theme: "dark",
    });
  }

  const handleUpdateDocument = async () => {
    if (!selectedDocument) {
      alert("Please select a document first");
      return;
    }

    try {
      const response = await fetch(
        `http://localhost:8080/documents/${selectedDocument.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ title, content, lub: userId }),
        }
      );

      if (!response.ok) throw new Error("Failed to save document");
      const data = await response.json();
      // alert(data.message);
      getSuccessMessage(data.message);
      setTimeout(() => {
        window.location.reload();
      }, 1500);

    } catch (error) {
      console.error("Error saving document:", error);
      getErrorMessage(error.message);
    }
  };

  const handleTitleChange = (e) => {
    if (selectedDocument) {
      setTitle(e.target.value);
    }
  };

  const handleContentChange = (e) => {
    if (selectedDocument) {
      setContent(e.target.value);
    }
  };

  const shareDocument = async () => { };

  const handleCreateNewButton = async () => {
    setShowModal(true);
  };

  const handleCreateDocument = async () => {
    const requestBody = {
      title: title ? title : "Untitled",
      content: content ? content : "Start editing...",
      userId,

    }

    const response = await fetch(`http://localhost:8080/documents/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(requestBody),
    });

    if (!response.ok) throw new Error("Failed to create document");
    console.log("response: ", response);
    const data = await response.json();
    console.log("data: ", data);
    window.location.reload();
  };

  const handleDownload = async (format) => {
    if (!selectedDocument) {
      alert("Please select a document first");
      return;
    }
    try {
      console.log("download will start..." + format)
      const response = await fetch(`http://localhost:8080/documents/download?format=${format}&documentId=${selectedDocument.id}&userId=${userId}`, {
        method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
      });

      if (!response.ok) {
        getErrorMessage("Download failed!");
      }

      const blob = await response.blob(); // Convert response to a Blob
      const link = document.createElement("a");
      link.href = window.URL.createObjectURL(blob);
      link.download = `document.${format}`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error("Download failed:", error);
      getErrorMessage(error.message);
    }
  }

  return (
    <>
      <ToastContainer />
      <div style={showModal ? { filter: "blur(10px)" } : {}} className="home-container">
        <div className="main-layout">
          <aside className="sidebar">
            <h3>Documents</h3>
            <ul>
              {/* {console.log("documents: " + documents[0][0])} */}
              {documents.length > 0 && documents[0].length > 0 ? (
                documents[0].map((doc, index) => (
                  <li key={index} onClick={() => handleDocumentClick(doc)}>
                    {doc.title}
                  </li>
                ))
              ) : (
                <li>No documents available!</li>
              )}
            </ul>
          </aside>
          <div className="temp">
            <div className="document-header">
              <div>
                <input
                  type="text"
                  className="title-change-area"
                  value={title}
                  onChange={handleTitleChange}
                  disabled={!selectedDocument}
                />
              </div>
              <div style={{ position: "relative", display: "inline-block" }}>
                <button
                  type="button"
                  className="btn-area"
                  onMouseEnter={() => setShowDownloadOptions(true)}
                  onMouseLeave={() => setShowDownloadOptions(false)}
                >
                  DOWNLOAD ▼
                </button>
                {showDownloadOptions && (
                  <div
                    className="download-options"
                    onMouseEnter={() => setShowDownloadOptions(true)}
                    onMouseLeave={() => setShowDownloadOptions(false)}
                  >
                    <ul>
                      <li onClick={() => handleDownload("pdf")}>Download as PDF</li>
                      <li onClick={() => handleDownload("doc")}>Download as Doc</li>
                      <li onClick={() => handleDownload("text")}>Download as Text</li>
                    </ul>
                  </div>
                )}
                <button
                style={{ margin: "0 10px" }}
                  type="button"
                  className="btn-area"
                  onClick={shareDocument}
                >
                  SHARE
                </button>
                <button
                  type="button"
                  className="btn-area"
                  onClick={handleCreateNewButton}
                >
                  + CREATE NEW
                </button>
              </div>
            </div>

            <textarea
              className="document-textarea"
              value={content}
              onChange={handleContentChange}
              disabled={!selectedDocument}
            />
            <button className="save-button" onClick={handleUpdateDocument}>Save</button>
          </div>
        </div>
      </div>
      {showModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h2>Create New Document</h2>
            <form onSubmit={handleCreateDocument}>
              <label>Document Title:</label>
              <input
                type="text"
                placeholder="Enter document title..."
                // value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />
              <label>Content:</label>
              <input
                type="text"
                placeholder="Initial content..."
                // value={content}
                onChange={(e) => setContent(e.target.value)}
              />
              <div className="modal-buttons">
                <button type="submit" className="btn create-btn">Create</button>
                <button type="button" className="btn cancel-btn" onClick={() => setShowModal(false)}>Cancel</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
