package com.tiendas.neto.reportes.excel;

import java.text.SimpleDateFormat;
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

import com.tiendas.neto.vo.TableroVo;

public class CreaExcelTablero {
	
	public HSSFWorkbook createWorkbook(List<TableroVo> listaMemorias) throws Exception {

        HSSFWorkbook wb = new HSSFWorkbook();
        HSSFSheet sheet = wb.createSheet("Tablero memorias");

        sheet.setColumnWidth(0, 4000);
        sheet.setColumnWidth(1, 6000);
        sheet.setColumnWidth(2, 6000);
        sheet.setColumnWidth(3, 8000);
        sheet.setColumnWidth(4, 12000);
        sheet.setColumnWidth(5, 12000);
        sheet.setColumnWidth(6, 12000);
        sheet.setColumnWidth(7, 6000);
        sheet.setColumnWidth(8, 6000);
        sheet.setColumnWidth(9, 6000);
        sheet.setColumnWidth(10, 5000);
        sheet.setColumnWidth(11, 6000);
        sheet.setColumnWidth(12, 6000);
        sheet.setColumnWidth(13, 6000);
        sheet.setColumnWidth(14, 6000);
        sheet.setColumnWidth(15, 8000);
        sheet.setColumnWidth(16, 6000);
        sheet.setColumnWidth(17, 8000);
        sheet.setColumnWidth(18, 6000);
        sheet.setColumnWidth(19, 6000);
        sheet.setColumnWidth(20, 6000);
        sheet.setColumnWidth(21, 6000);
        sheet.setColumnWidth(22, 6000);
        sheet.setColumnWidth(23, 6000);
        sheet.setColumnWidth(24, 6000);
        sheet.setColumnWidth(25, 6000);
        sheet.setColumnWidth(26, 6000);
        sheet.setColumnWidth(27, 6000);
        sheet.setColumnWidth(28, 6000);
        
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
        
        HSSFCellStyle datosCellStyleFecha = wb.createCellStyle();
        datosCellStyleFecha.setFont(fuenteMD);
        datosCellStyleFecha.setWrapText(true);
        datosCellStyleFecha.setDataFormat(wb.createDataFormat().getFormat("dd/MM/yyyy"));
        
        HSSFCellStyle datosCellStyleMoneda = wb.createCellStyle();
        datosCellStyleMoneda.setFont(fuenteMD);
        datosCellStyleMoneda.setWrapText(true);
        datosCellStyleMoneda.setDataFormat(wb.createDataFormat().getFormat("$###,##0"));
        
        
        HSSFRow row = sheet.createRow(0);
        row.setHeightInPoints(25);
        HSSFCell cell = row.createCell(0);
        cell.setCellStyle(headerCellStyle);
        cell.setCellValue(new HSSFRichTextString("MD ID"));
        cell = row.createCell(1);
        cell.setCellStyle(headerCellStyle);
        cell.setCellValue(new HSSFRichTextString("FECHA RECEPCION MD"));
        cell = row.createCell(2);
        cell.setCellStyle(headerCellStyle);
        cell.setCellValue(new HSSFRichTextString("FUENTE MD"));
        cell = row.createCell(3);
        cell.setCellStyle(headerCellStyle);
        cell.setCellValue(new HSSFRichTextString("NOMBRE DE LA TDA"));
        cell = row.createCell(4);
        cell.setCellStyle(headerCellStyle);
        cell.setCellValue(new HSSFRichTextString("JEFE DE EXPANSION"));
        cell = row.createCell(5);
        cell.setCellStyle(headerCellStyle);
        cell.setCellValue(new HSSFRichTextString("GERENTE DE EXPANSION"));
        cell = row.createCell(6);
        cell.setCellStyle(headerCellStyle);
        cell.setCellValue(new HSSFRichTextString("REGIONAL"));
        cell = row.createCell(7);
        cell.setCellStyle(headerCellStyle);
        cell.setCellValue(new HSSFRichTextString("CATEGORIA"));
        cell = row.createCell(8);
        cell.setCellStyle(headerCellStyle);
        cell.setCellValue(new HSSFRichTextString("PUNTUACION"));
        cell = row.createCell(9);
        cell.setCellStyle(headerCellStyle);
        cell.setCellValue(new HSSFRichTextString("VOBO INICIAL OPERACIONES"));
        cell = row.createCell(10);
        cell.setCellStyle(headerCellStyle);
        cell.setCellValue(new HSSFRichTextString("CONTEO AUDITOR"));
        cell = row.createCell(11);
        cell.setCellStyle(headerCellStyle);
        cell.setCellValue(new HSSFRichTextString("FECHA CONTEO AUDITOR"));
        cell = row.createCell(12);
        cell.setCellStyle(headerCellStyle);
        cell.setCellValue(new HSSFRichTextString("PREGESTORIA AUTORIZADA"));
        cell = row.createCell(13);
        cell.setCellStyle(headerCellStyle);
        cell.setCellValue(new HSSFRichTextString("LEVANTAMIENTO REALIZADO"));
        cell = row.createCell(14);
        cell.setCellStyle(headerCellStyle);
        cell.setCellValue(new HSSFRichTextString("VOBO LAYOUT POR OPERACIONES"));
        cell = row.createCell(15);
        cell.setCellStyle(headerCellStyle);
        cell.setCellValue(new HSSFRichTextString("PRESUPUESTO OBRA CONSTRUCCION"));
        cell = row.createCell(16);
        cell.setCellStyle(headerCellStyle);
        cell.setCellValue(new HSSFRichTextString("FECHA PPTO CONSTRUCCION"));
        cell = row.createCell(17);
        cell.setCellStyle(headerCellStyle);
        cell.setCellValue(new HSSFRichTextString("PRESUPUESTO AUDITORIA"));
        cell = row.createCell(18);
        cell.setCellStyle(headerCellStyle);
        cell.setCellValue(new HSSFRichTextString("FECHA PPTO AUDITORIA"));
        cell = row.createCell(19);
        cell.setCellStyle(headerCellStyle);
        cell.setCellValue(new HSSFRichTextString("VOBO FINAL DE OPERACIONES DEL SITIO"));
        cell = row.createCell(20);
        cell.setCellStyle(headerCellStyle);
        cell.setCellValue(new HSSFRichTextString("COMITE"));
        cell = row.createCell(21);
        cell.setCellStyle(headerCellStyle);
        cell.setCellValue(new HSSFRichTextString("CARGA DOCUMENTOS"));
        cell = row.createCell(22);
        cell.setCellStyle(headerCellStyle);
        cell.setCellValue(new HSSFRichTextString("CONTRATO FIRMADO ARRENDADOR"));
        cell = row.createCell(23);
        cell.setCellStyle(headerCellStyle);
        cell.setCellValue(new HSSFRichTextString("CECO"));
        cell = row.createCell(24);
        cell.setCellStyle(headerCellStyle);
        cell.setCellValue(new HSSFRichTextString("GESTORIA"));
        cell = row.createCell(25);
        cell.setCellStyle(headerCellStyle);
        cell.setCellValue(new HSSFRichTextString("INICIO OBRA"));
        cell = row.createCell(26);
        cell.setCellStyle(headerCellStyle);
        cell.setCellValue(new HSSFRichTextString("FIN OBRA"));
        cell = row.createCell(27);
        cell.setCellStyle(headerCellStyle);
        cell.setCellValue(new HSSFRichTextString("INAUGURACION"));
        cell = row.createCell(28);
        cell.setCellStyle(headerCellStyle);
        cell.setCellValue(new HSSFRichTextString("INAUGURACION OBJETIVO"));
        
        SimpleDateFormat formatter = new SimpleDateFormat("dd/MM/yyyy");
        
        for(int i = 0; i < listaMemorias.size(); i++) {
        	HSSFRow rowDatos = sheet.createRow(i + 1);
        	rowDatos.setHeightInPoints(20);
        	
            HSSFCell cellDatos = rowDatos.createCell(0);
            cellDatos.setCellStyle(datosCellStyleNormal);
            cellDatos.setCellValue(listaMemorias.get(i).getMdId());
            cellDatos = rowDatos.createCell(1);
            if(!listaMemorias.get(i).getFechaRecepcionMd().trim().equals("") && listaMemorias.get(i).getFechaRecepcionMd() != null) {
            	cellDatos.setCellStyle(datosCellStyleFecha);
                cellDatos.setCellValue(formatter.parse(listaMemorias.get(i).getFechaRecepcionMd()));
            } else {
            	cellDatos.setCellStyle(datosCellStyleNormal);
                cellDatos.setCellValue(new HSSFRichTextString(listaMemorias.get(i).getFechaRecepcionMd()));
            }
            cellDatos = rowDatos.createCell(2);
            cellDatos.setCellStyle(datosCellStyleNormal);
            cellDatos.setCellValue(new HSSFRichTextString(listaMemorias.get(i).getFuenteMd()));
            cellDatos = rowDatos.createCell(3);
            cellDatos.setCellStyle(datosCellStyleNormal);
            cellDatos.setCellValue(new HSSFRichTextString(listaMemorias.get(i).getNombreTda()));
            cellDatos = rowDatos.createCell(4);
            cellDatos.setCellStyle(datosCellStyleNormal);
            cellDatos.setCellValue(new HSSFRichTextString(listaMemorias.get(i).getJefeExpansion()));
            cellDatos = rowDatos.createCell(5);
            cellDatos.setCellStyle(datosCellStyleNormal);
            cellDatos.setCellValue(new HSSFRichTextString(listaMemorias.get(i).getGerenteExpansion()));
            cellDatos = rowDatos.createCell(6);
            cellDatos.setCellStyle(datosCellStyleNormal);
            cellDatos.setCellValue(new HSSFRichTextString(listaMemorias.get(i).getRegional()));
            cellDatos = rowDatos.createCell(7);
            cellDatos.setCellStyle(datosCellStyleNormal);
            cellDatos.setCellValue(new HSSFRichTextString(listaMemorias.get(i).getCategoria()));
            cellDatos = rowDatos.createCell(8);
            cellDatos.setCellStyle(datosCellStyleNormal);
            cellDatos.setCellValue(listaMemorias.get(i).getPuntuacion());
            cellDatos = rowDatos.createCell(9);
            if(!listaMemorias.get(i).getVoboInicialOperaciones().trim().equals("") && listaMemorias.get(i).getVoboInicialOperaciones() != null) {
            	cellDatos.setCellStyle(datosCellStyleFecha);
            	cellDatos.setCellValue(formatter.parse(listaMemorias.get(i).getVoboInicialOperaciones()));
            } else {
            	cellDatos.setCellStyle(datosCellStyleNormal);
            	cellDatos.setCellValue(new HSSFRichTextString(""));
            }
            cellDatos = rowDatos.createCell(10);
            cellDatos.setCellStyle(datosCellStyleNormal);
            cellDatos.setCellValue(listaMemorias.get(i).getConteoAuditor());
            cellDatos = rowDatos.createCell(11);
            if(!listaMemorias.get(i).getFechaPptoConstruccion().trim().equals("") && listaMemorias.get(i).getFechaPptoConstruccion() != null) {
            	cellDatos.setCellStyle(datosCellStyleFecha);
                cellDatos.setCellValue(formatter.parse(listaMemorias.get(i).getFechaPptoConstruccion()));
            } else {
            	cellDatos.setCellStyle(datosCellStyleNormal);
                cellDatos.setCellValue(new HSSFRichTextString(""));
            }
            cellDatos = rowDatos.createCell(12);
            if(!listaMemorias.get(i).getPregestoriaAutorizada().trim().equals("") && listaMemorias.get(i).getPregestoriaAutorizada() != null) {
            	cellDatos.setCellStyle(datosCellStyleFecha);
                cellDatos.setCellValue(formatter.parse(listaMemorias.get(i).getPregestoriaAutorizada()));
            } else {
            	cellDatos.setCellStyle(datosCellStyleNormal);
                cellDatos.setCellValue(new HSSFRichTextString(""));
            }
            cellDatos = rowDatos.createCell(13);
            if(!listaMemorias.get(i).getLevantamientoRealizado().trim().equals("") && listaMemorias.get(i).getLevantamientoRealizado() != null) {
            	cellDatos.setCellStyle(datosCellStyleFecha);
                cellDatos.setCellValue(formatter.parse(listaMemorias.get(i).getLevantamientoRealizado()));
            } else {
            	cellDatos.setCellStyle(datosCellStyleNormal);
                cellDatos.setCellValue(new HSSFRichTextString(""));
            }
            cellDatos = rowDatos.createCell(14);
            if(!listaMemorias.get(i).getVoboLayoutOperaciones().trim().equals("") && listaMemorias.get(i).getVoboLayoutOperaciones() != null) {
            	cellDatos.setCellStyle(datosCellStyleFecha);
                cellDatos.setCellValue(formatter.parse(listaMemorias.get(i).getVoboLayoutOperaciones()));
            } else {
            	cellDatos.setCellStyle(datosCellStyleNormal);
                cellDatos.setCellValue(new HSSFRichTextString(""));
            }
            cellDatos = rowDatos.createCell(15);
            cellDatos.setCellStyle(datosCellStyleMoneda);
            cellDatos.setCellValue(listaMemorias.get(i).getMontoConstruccion());
            cellDatos = rowDatos.createCell(16);
            if(!listaMemorias.get(i).getFechaPptoConstruccion().trim().equals("") && listaMemorias.get(i).getFechaPptoConstruccion() != null) {
            	cellDatos.setCellStyle(datosCellStyleFecha);
                cellDatos.setCellValue(formatter.parse(listaMemorias.get(i).getFechaPptoConstruccion()));
            } else {
            	cellDatos.setCellStyle(datosCellStyleNormal);
                cellDatos.setCellValue(new HSSFRichTextString(""));
            }
            cellDatos = rowDatos.createCell(17);
            cellDatos.setCellStyle(datosCellStyleMoneda);
            cellDatos.setCellValue(listaMemorias.get(i).getMontoAuditoria());
            cellDatos = rowDatos.createCell(18);
            if(!listaMemorias.get(i).getFechaPptoAuditoria().trim().equals("") && listaMemorias.get(i).getFechaPptoAuditoria() != null) {
            	cellDatos.setCellStyle(datosCellStyleFecha);
                cellDatos.setCellValue(formatter.parse(listaMemorias.get(i).getFechaPptoAuditoria()));
            } else {
            	cellDatos.setCellStyle(datosCellStyleNormal);
                cellDatos.setCellValue(new HSSFRichTextString(""));
            }
            cellDatos = rowDatos.createCell(19);
            if(!listaMemorias.get(i).getVoboFinalOperaciones().trim().equals("") && listaMemorias.get(i).getVoboFinalOperaciones() != null) {
            	cellDatos.setCellStyle(datosCellStyleFecha);
                cellDatos.setCellValue(formatter.parse(listaMemorias.get(i).getVoboFinalOperaciones()));
            } else {
            	cellDatos.setCellStyle(datosCellStyleNormal);
                cellDatos.setCellValue(new HSSFRichTextString(""));
            }
            cellDatos = rowDatos.createCell(20);
            if(!listaMemorias.get(i).getComite().trim().equals("") && listaMemorias.get(i).getComite() != null) {
            	cellDatos.setCellStyle(datosCellStyleFecha);
                cellDatos.setCellValue(formatter.parse(listaMemorias.get(i).getComite()));
            } else {
            	cellDatos.setCellStyle(datosCellStyleNormal);
                cellDatos.setCellValue(new HSSFRichTextString(""));
            }
            cellDatos = rowDatos.createCell(21);
            if(!listaMemorias.get(i).getDoctos().trim().equals("") && listaMemorias.get(i).getDoctos() != null) {
            	cellDatos.setCellStyle(datosCellStyleFecha);
                cellDatos.setCellValue(formatter.parse(listaMemorias.get(i).getDoctos()));
            } else {
            	cellDatos.setCellStyle(datosCellStyleNormal);
                cellDatos.setCellValue(new HSSFRichTextString(""));
            }
            cellDatos = rowDatos.createCell(22);
            if(!listaMemorias.get(i).getContratoFirmado().trim().equals("") && listaMemorias.get(i).getContratoFirmado() != null) {
            	cellDatos.setCellStyle(datosCellStyleFecha);
                cellDatos.setCellValue(formatter.parse(listaMemorias.get(i).getContratoFirmado()));
            } else {
            	cellDatos.setCellStyle(datosCellStyleNormal);
                cellDatos.setCellValue(new HSSFRichTextString(""));
            }
            cellDatos = rowDatos.createCell(23);
            if(!listaMemorias.get(i).getCeco().trim().equals("") && listaMemorias.get(i).getCeco() != null) {
            	cellDatos.setCellStyle(datosCellStyleFecha);
                cellDatos.setCellValue(formatter.parse(listaMemorias.get(i).getCeco()));
            } else {
            	cellDatos.setCellStyle(datosCellStyleNormal);
                cellDatos.setCellValue(new HSSFRichTextString(""));
            }
            cellDatos = rowDatos.createCell(24);
            if(!listaMemorias.get(i).getGestoria().trim().equals("") && listaMemorias.get(i).getGestoria() != null) {
            	cellDatos.setCellStyle(datosCellStyleFecha);
                cellDatos.setCellValue(formatter.parse(listaMemorias.get(i).getGestoria()));
            } else {
            	cellDatos.setCellStyle(datosCellStyleNormal);
                cellDatos.setCellValue(new HSSFRichTextString(""));
            }
            cellDatos = rowDatos.createCell(25);
            if(!listaMemorias.get(i).getInicioObra().trim().equals("") && listaMemorias.get(i).getInicioObra() != null) {
            	cellDatos.setCellStyle(datosCellStyleFecha);
                cellDatos.setCellValue(formatter.parse(listaMemorias.get(i).getInicioObra()));
            } else {
            	cellDatos.setCellStyle(datosCellStyleNormal);
                cellDatos.setCellValue(new HSSFRichTextString(""));
            }
            cellDatos = rowDatos.createCell(26);
            if(!listaMemorias.get(i).getFinObra().trim().equals("") && listaMemorias.get(i).getFinObra() != null) {
            	cellDatos.setCellStyle(datosCellStyleFecha);
                cellDatos.setCellValue(formatter.parse(listaMemorias.get(i).getFinObra()));
            } else {
            	cellDatos.setCellStyle(datosCellStyleNormal);
                cellDatos.setCellValue(new HSSFRichTextString(""));
            }
            cellDatos = rowDatos.createCell(27);
            if(!listaMemorias.get(i).getInauguracion().trim().equals("") && listaMemorias.get(i).getInauguracion() != null) {
            	cellDatos.setCellStyle(datosCellStyleFecha);
                cellDatos.setCellValue(formatter.parse(listaMemorias.get(i).getInauguracion()));
            } else {
            	cellDatos.setCellStyle(datosCellStyleNormal);
                cellDatos.setCellValue(new HSSFRichTextString(""));
            }
            cellDatos = rowDatos.createCell(28);
            if(!listaMemorias.get(i).getInauguracionObjetivo().trim().equals("") && listaMemorias.get(i).getInauguracionObjetivo() != null) {
            	cellDatos.setCellStyle(datosCellStyleFecha);
                cellDatos.setCellValue(formatter.parse(listaMemorias.get(i).getInauguracionObjetivo()));
            } else {
            	cellDatos.setCellStyle(datosCellStyleNormal);
                cellDatos.setCellValue(new HSSFRichTextString(""));
            }
        }

        return wb;
    }

}
