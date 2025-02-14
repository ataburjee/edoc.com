package com.edoc.service.export;

import com.itextpdf.text.Document;
import com.itextpdf.text.DocumentException;
import com.itextpdf.text.Paragraph;
import com.itextpdf.text.pdf.PdfWriter;
import org.springframework.stereotype.Service;

import java.io.ByteArrayOutputStream;

@Service("pdf")
public class PDFGenerator implements FileGenerator {
    @Override
    public byte[] getFileData(com.edoc.model.Document document) throws DocumentException {
        ByteArrayOutputStream out = new ByteArrayOutputStream();
        Document doc = new Document();
        PdfWriter.getInstance(doc, out);
        doc.open();
        String content = document.getContent(); //TODO: Need test and improvements like optimization...
        doc.add(new Paragraph(content));        //TODO: ...For all the implemented generators
        doc.close();
        return out.toByteArray();
    }

    @Override
    public String getFileName() {
        return "document.pdf";
    }

    @Override
    public String getContentType() {
        return "application/pdf";
    }

}
