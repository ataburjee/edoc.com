package com.edoc.service.export;

import com.edoc.model.Document;
import com.edoc.repository.UserRepository;
import com.edoc.service.Utility;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.nio.charset.StandardCharsets;

@Service("text")
public class TextGenerator implements FileGenerator {

    @Autowired
    private UserRepository userRepo;

    @Override
    public byte[] getFileData(Document document) throws Exception {
        StringBuilder textContent = new StringBuilder();
        // Title
        textContent.append("Title: ").append(document.getTitle()).append("\n\n");
        // Document Content
        textContent.append(document.getContent()).append("\n\n");
        // User Info
        textContent.append("User: ").append(userRepo.findById(document.getUserId()).orElseThrow().getName()).append("\n");
        textContent.append("Created At: ").append(Utility.getFormattedDateTime(document.getCt())).append("\n");

        // Convert to byte array
        return textContent.toString().getBytes(StandardCharsets.UTF_8);
    }

    @Override
    public String getFileName() {
        return "text";
    }

    @Override
    public String getContentType() {
        return "text/plain";
    }
}
