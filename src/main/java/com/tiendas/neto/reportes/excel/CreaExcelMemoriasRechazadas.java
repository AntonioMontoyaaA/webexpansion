package com.tiendas.neto.reportes.excel;

import java.util.List;

import org.apache.poi.hssf.usermodel.HSSFCell;
import org.apache.poi.hssf.usermodel.HSSFCellStyle;
import org.apache.poi.hssf.usermodel.HSSFFont;
import org.apache.poi.hssf.usermodel.HSSFPalette;
import org.apache.poi.hssf.usermodel.HSSFRichTextString;
import org.apache.poi.hssf.usermodel.HSSFRow;
import org.apache.poi.hssf.usermodel.HSSFSheet;
import org.apache.poi.hssf.usermodel.HSSFWorkbook;
import org.apache.poi.hssf.util.HSSFColor;

import com.tiendas.neto.vo.MemoriaAsignadaVO;
import com.tiendas.neto.vo.MemoriaVO;

public class CreaExcelMemoriasRechazadas {
	
	public HSSFWorkbook createWorkbook(List<MemoriaVO> listaMemorias) throws Exception {

        HSSFWorkbook wb = new HSSFWorkbook();
        HSSFSheet sheet = wb.createSheet("Memorias rechazadas");

        sheet.setColumnWidth(0, 4000);
        sheet.setColumnWidth(1, 8000);
        sheet.setColumnWidth(2, 4000);
        sheet.setColumnWidth(3, 4000);
        sheet.setColumnWidth(4, 8000);
        sheet.setColumnWidth(5, 6000);
        sheet.setColumnWidth(6, 9000);
        sheet.setColumnWidth(7, 6000);
        sheet.setColumnWidth(8, 6000);
        sheet.setColumnWidth(9, 4000);
        
        HSSFFont tituloHeader0 = wb.createFont();
        tituloHeader0.setBoldweight(HSSFFont.BOLDWEIGHT_BOLD);
        tituloHeader0.setFontHeightInPoints((short) 16);
        tituloHeader0.setFontName(HSSFFont.FONT_ARIAL);
        
        HSSFFont fuenteMD = wb.createFont();
        fuenteMD.setFontName(HSSFFont.FONT_ARIAL);
        
        HSSFFont fuenteMDVencidas = wb.createFont();
        fuenteMD.setFontName(HSSFFont.FONT_ARIAL);
        fuenteMDVencidas.setColor(HSSFFont.COLOR_RED);

        /**
         * Style for the header cells.
         */
        HSSFPalette palette1 = wb.getCustomPalette();
        palette1.setColorAtIndex(new Byte((byte)41), new Byte((byte)255), new Byte((byte)125), new Byte((byte)47));
        
        HSSFPalette palette2 = wb.getCustomPalette();
        palette2.setColorAtIndex(new Byte((byte)42), new Byte((byte)91), new Byte((byte)162), new Byte((byte)251));
      
        HSSFPalette palette3 = wb.getCustomPalette();
        palette3.setColorAtIndex(new Byte((byte)43), new Byte((byte)204), new Byte((byte)120), new Byte((byte)255));
      
        HSSFCellStyle headerCellStyle = wb.createCellStyle();
        headerCellStyle.setFont(fuenteMD);
        headerCellStyle.setAlignment(HSSFCellStyle.ALIGN_CENTER);
        headerCellStyle.setVerticalAlignment(HSSFCellStyle.VERTICAL_CENTER);
        headerCellStyle.setFillPattern(HSSFCellStyle.SOLID_FOREGROUND);
        headerCellStyle.setFillForegroundColor(HSSFColor.GREY_25_PERCENT.index);
        headerCellStyle.setWrapText(true);
        
        HSSFCellStyle datosCellStyleNormal = wb.createCellStyle();
        datosCellStyleNormal.setFont(fuenteMD);
        datosCellStyleNormal.setWrapText(true);
        datosCellStyleNormal.setDataFormat(wb.createDataFormat().getFormat("0"));
        
        HSSFCellStyle datosCellStyleVencidas = wb.createCellStyle();
        datosCellStyleVencidas.setFont(fuenteMD);
        datosCellStyleVencidas.setWrapText(true);
        datosCellStyleVencidas.setDataFormat(wb.createDataFormat().getFormat("0"));
        
        
        HSSFRow row = sheet.createRow(0);
        row.setHeightInPoints(25);
        HSSFCell cell = row.createCell(0);
        cell.setCellStyle(headerCellStyle);
        cell.setCellValue(new HSSFRichTextString("MD ID"));
        cell = row.createCell(1);
        cell.setCellStyle(headerCellStyle);
        cell.setCellValue(new HSSFRichTextString("NOMBRE MD"));
        cell = row.createCell(2);
        cell.setCellStyle(headerCellStyle);
        cell.setCellValue(new HSSFRichTextString("CATEGORIA"));
        cell = row.createCell(3);
        cell.setCellStyle(headerCellStyle);
        cell.setCellValue(new HSSFRichTextString("PUNTUACION"));
        cell = row.createCell(4);
        cell.setCellStyle(headerCellStyle);
        cell.setCellValue(new HSSFRichTextString("CREADOR"));
        cell = row.createCell(5);
        cell.setCellStyle(headerCellStyle);
        cell.setCellValue(new HSSFRichTextString("FECHA CREACION"));
        cell = row.createCell(6);
        cell.setCellStyle(headerCellStyle);
        cell.setCellValue(new HSSFRichTextString("RECHAZÓ"));
        cell = row.createCell(7);
        cell.setCellStyle(headerCellStyle);
        cell.setCellValue(new HSSFRichTextString("FECHA RECHAZO"));
        cell = row.createCell(8);
        cell.setCellStyle(headerCellStyle);
        cell.setCellValue(new HSSFRichTextString("MOTIVO"));
        cell = row.createCell(9);
        cell.setCellStyle(headerCellStyle);
        cell.setCellValue(new HSSFRichTextString("TIPO"));
        
        for(int i = 0; i < listaMemorias.size(); i++) {
        	HSSFCellStyle datosCellStyle = null;
        	HSSFRow rowDatos = sheet.createRow(i + 1);
        	rowDatos.setHeightInPoints(17);
        	
        		datosCellStyle = datosCellStyleNormal;       	
        	
            HSSFCell cellDatos = rowDatos.createCell(0);
            cellDatos.setCellStyle(datosCellStyle);
            cellDatos.setCellValue(listaMemorias.get(i).getMdId());
            cellDatos = rowDatos.createCell(1);
            cellDatos.setCellStyle(datosCellStyle);
            cellDatos.setCellValue(new HSSFRichTextString(listaMemorias.get(i).getNombreMd()));
            cellDatos = rowDatos.createCell(2);
            cellDatos.setCellStyle(datosCellStyle);
            cellDatos.setCellValue(new HSSFRichTextString(listaMemorias.get(i).getCategoria()));
            cellDatos = rowDatos.createCell(3);
            cellDatos.setCellStyle(datosCellStyle);
            cellDatos.setCellValue(listaMemorias.get(i).getPuntuacion());
            cellDatos = rowDatos.createCell(4);
            cellDatos.setCellStyle(datosCellStyle);
            cellDatos.setCellValue(new HSSFRichTextString(listaMemorias.get(i).getCreador()));
            cellDatos = rowDatos.createCell(5);
            cellDatos.setCellStyle(datosCellStyle);
            cellDatos.setCellValue(new HSSFRichTextString(listaMemorias.get(i).getFechaCreacion()));
            cellDatos = rowDatos.createCell(6);
            cellDatos.setCellStyle(datosCellStyle);
            cellDatos.setCellValue(new HSSFRichTextString(listaMemorias.get(i).getNombreRechazo()));
            cellDatos = rowDatos.createCell(7);
            cellDatos.setCellStyle(datosCellStyle);
            cellDatos.setCellValue(new HSSFRichTextString(listaMemorias.get(i).getFechaRechazo()));
            cellDatos = rowDatos.createCell(8);
            cellDatos.setCellStyle(datosCellStyle);
            cellDatos.setCellValue(new HSSFRichTextString(listaMemorias.get(i).getMotivoRechazo()));   
            cellDatos = rowDatos.createCell(9);
            cellDatos.setCellStyle(datosCellStyle);
            cellDatos.setCellValue(new HSSFRichTextString(listaMemorias.get(i).getTipoRechazo()));   
        }      
        return wb;
    }

}
