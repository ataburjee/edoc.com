package com.edoc.service.export;

import com.edoc.model.Document;
import org.springframework.stereotype.Service;

public interface FileGenerator {

    public byte[] getFileData(Document document) throws Exception;
    public String getFileName();
    public String getContentType();

}

