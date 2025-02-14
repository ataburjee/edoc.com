package com.edoc.service.export;

import com.edoc.model.Document;
import org.springframework.stereotype.Service;

import java.nio.charset.StandardCharsets;

@Service("text")
public class TextGenerator implements FileGenerator {
    @Override
    public byte[] getFileData(Document document) throws Exception {
        String content = "This is a sample text file.";
        return content.getBytes(StandardCharsets.UTF_8);
    }

    @Override
    public String getFileName() {
        return "text/plain";
    }

    @Override
    public String getContentType() {
        return "text/plain";
    }
}
