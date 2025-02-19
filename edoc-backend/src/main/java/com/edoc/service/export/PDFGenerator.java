package com.edoc.service.export;

import com.edoc.repository.UserRepository;
import com.edoc.service.UserService;
import com.edoc.service.Utility;
import com.itextpdf.text.*;
import com.itextpdf.text.pdf.PdfContentByte;
import com.itextpdf.text.pdf.PdfPCell;
import com.itextpdf.text.pdf.PdfPTable;
import com.itextpdf.text.pdf.PdfWriter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.io.ByteArrayOutputStream;
import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.IOException;
import java.text.SimpleDateFormat;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.Date;

@Service("pdf")
public class PDFGenerator implements FileGenerator {

    @Autowired
    private UserRepository userRepo;

    private String fileName;

    @Override
    public byte[] getFileData(com.edoc.model.Document document) throws DocumentException, IOException {
        Document doc = new Document(PageSize.A4, 50, 50, 50, 50); // Margins
        ByteArrayOutputStream out = new ByteArrayOutputStream();
        PdfWriter writer = PdfWriter.getInstance(doc, out); // Get PdfWriter instance
        doc.open();

        // Load logo image (Top-Left)
        Image logo = Image.getInstance("src/main/resources/edoc_logo.gif");
        logo.scaleAbsolute(100, 50);
        logo.setAlignment(Image.ALIGN_LEFT);
        doc.add(logo);

        // Fonts
        Font titleFont = new Font(Font.FontFamily.HELVETICA, 18, Font.BOLD, BaseColor.DARK_GRAY);
        Font contentFont = new Font(Font.FontFamily.HELVETICA, 12, Font.NORMAL, BaseColor.BLACK);
        Font userFont = new Font(Font.FontFamily.HELVETICA, 12, Font.ITALIC, BaseColor.GRAY);

        // Title (Centered)
        String documentTitle = document.getTitle();
        this.fileName = Utility.getFormattedFileName(documentTitle, ".pdf");
        Paragraph title = new Paragraph(documentTitle, titleFont);
        title.setAlignment(Element.ALIGN_CENTER);
        title.setSpacingAfter(10f);
        doc.add(title);

        // Convert timestamp to readable format

        // Document Content (Auto-Adjust)
        Paragraph content = new Paragraph(document.getContent(), contentFont);
        content.setAlignment(Element.ALIGN_JUSTIFIED);
        content.setSpacingAfter(20f);
        doc.add(content);

        // User info (Bottom-Left) using PdfPTable
        PdfPTable table = new PdfPTable(1);
        table.setTotalWidth(200);
        table.setLockedWidth(true); // Ensure fixed width

        PdfPCell cell = new PdfPCell(new Phrase("User: " + userRepo.findById(document.getUserId()).orElseThrow().getName(), userFont));
        cell.setBorder(Rectangle.NO_BORDER);
        table.addCell(cell);

        cell = new PdfPCell(new Phrase("Created At: " + Utility.getFormattedDateTime(document.getCt()), userFont));
        cell.setBorder(Rectangle.NO_BORDER);
        table.addCell(cell);

        // Add User Info at Bottom-Left using writer.getDirectContent()
        PdfContentByte canvas = writer.getDirectContent();
        table.writeSelectedRows(0, -1, doc.left(), doc.bottom() + 50, canvas);

        doc.close();
        return out.toByteArray();

    }

    @Override
    public String getFileName() {
        return fileName;
    }

    @Override
    public String getContentType() {
        return "application/pdf";
    }

}
