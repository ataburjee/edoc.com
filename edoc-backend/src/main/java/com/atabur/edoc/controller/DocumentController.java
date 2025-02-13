package com.atabur.edoc.controller;

import com.atabur.edoc.model.Document;
import com.atabur.edoc.model.RemoveAccess;
import com.atabur.edoc.model.ShareDocument;
import com.atabur.edoc.service.DocumentService;
import com.atabur.edoc.service.Utility;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin(origins = "http://localhost:3000", allowCredentials = "true")
public class DocumentController {

    @Autowired
    private DocumentService documentService;

    //Create a document
    @PostMapping({"/documents", "/documents/"})
    public ResponseEntity<?> addDocument(@RequestBody Document document) throws Exception {
        return Utility.generateResponse(documentService.createDocument(document));
    }

    //Get all the documents
    @GetMapping({"/documents", "/documents/"})
    public ResponseEntity<?> getDocuments() throws Exception {
        return Utility.generateResponse(documentService.listDocuments());
    }

    //Get all the documents for a particular user
    @GetMapping("/{userId}/documents")
    public ResponseEntity<?> getDocuments(@PathVariable String userId) throws Exception {
        return Utility.generateResponse(documentService.listDocumentsOfUser(userId));
    }

    //Get a particular document for a user
    @GetMapping("{userId}/documents/{documentId}")
    public ResponseEntity<?> getDocumentOfAnUser(@PathVariable String userId, @PathVariable String documentId) throws Exception {
        return Utility.generateResponse(documentService.getDocumentOfUser(userId, documentId));
    }

    @PutMapping("/documents/{documentId}")
    public ResponseEntity<?> updateDocument(@PathVariable String documentId, @RequestBody Document documentToUpdate) throws Exception {
        return Utility.generateResponse(documentService.updateDocument(documentId, documentToUpdate));
    }

    //Share document with a person
    @PatchMapping("/documents/share")
    public ResponseEntity<?> shareDocument(@RequestBody ShareDocument document) throws Exception {
        return Utility.generateResponse(documentService.shareDocument(document));
    }

    @DeleteMapping("/documents/{documentId}")
    public ResponseEntity<?> deleteDocument(@PathVariable String documentId) throws Exception {
        return Utility.generateResponse(documentService.deleteDocument(documentId));
    }

    //Remove one/more access type from a user
    @PatchMapping("/documents/{documentId}")
    public ResponseEntity<?> removeDocumentAccess(@PathVariable String documentId, @RequestBody RemoveAccess accessorDetails) throws Exception {
        return Utility.generateResponse(documentService.removeDocumentAccessType(documentId, accessorDetails));
    }

}
