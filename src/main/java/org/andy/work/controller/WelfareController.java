package org.andy.work.controller;

import java.awt.Color;
import java.io.BufferedInputStream;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.OutputStream;
import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.Date;
import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.andy.work.entity.Employee;
import org.andy.work.entity.ExtResult;
import org.andy.work.entity.GridDataResult;
import org.andy.work.entity.ReportingData;
import org.andy.work.service.EmployeeService;
import org.andy.work.service.ReportingDataService;
import org.apache.log4j.Logger;
import org.apache.poi.ss.usermodel.Cell;
import org.apache.poi.ss.usermodel.CellType;
import org.apache.poi.ss.usermodel.Row;
import org.apache.poi.ss.usermodel.Sheet;
import org.apache.poi.ss.usermodel.Workbook;
import org.apache.poi.xssf.streaming.SXSSFSheet;
import org.apache.poi.xssf.streaming.SXSSFWorkbook;
import org.apache.poi.xssf.usermodel.XSSFCellStyle;
import org.apache.poi.xssf.usermodel.XSSFColor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

/**  
 * 
 * @author hexiao  
 * @version 1.0
 * 
 */
@Controller
@RequestMapping("/Welfare")
public class WelfareController {

	private static final Logger LOGGER = Logger.getLogger(WelfareController.class);

	@Autowired
	private ReportingDataService reportingDataService;
	
	@Autowired
	private EmployeeService employeeService;
	
	@RequestMapping("/List")
	public @ResponseBody GridDataResult<ReportingData> list(int page, int limit, String employeeName, String idNumber, String reportingMonth, String isHandled, HttpSession session){
		GridDataResult<ReportingData> result = new GridDataResult<ReportingData>();

		try{
			List<ReportingData> tList = reportingDataService.list(page, limit, employeeName, idNumber, reportingMonth, isHandled);
			result.setItems(tList);
			result.setTotal(reportingDataService.findAll().size());
			result.setPage(page);
			result.setLimit(limit);
			result.setTotalPage(result.getTotal() % limit == 0 ? result.getTotal() / limit : result.getTotal() / limit + 1);
		}catch (Exception ex){
			
		}

		return result;
	}

	@RequestMapping("Save")
	public @ResponseBody ExtResult<ReportingData> save(int id, String reportingMonth, String fundsBase,
			String servicePayment, int employeeId, String isHandled, String reportingResult,
			String reportingResultDetail, HttpSession session) {
		ExtResult<ReportingData> result = new ExtResult<ReportingData>();
//		Manager manager1 =(Manager)session.getAttribute("CurrentManager");
//		if(manager1==null)
//		{
//			result.setTimeout(true);
//			return result;
//		}
		try
		{
			Employee employee = employeeService.get(employeeId);
			
			List<ReportingData> app_list = reportingDataService.getByEmployeeAndReportingMonth(employee, reportingMonth);
			for (ReportingData tmp:app_list) {
				if(tmp.getID()!=id)
				{
					result.setSuccess(false);
					result.setMsg("申报月份不能重复！");
					return result;
				}
			}
			ReportingData reportingData = reportingDataService.get(id);
			if(reportingData==null)
			{

				reportingData=new ReportingData();
				reportingData.setCreateTime(Calendar.getInstance().getTime());
			}
			reportingData.setReportingMonth(reportingMonth);
			reportingData.setFundsBase(fundsBase);
			reportingData.setServicePayment(servicePayment);
			reportingData.setEmployee(employee);
			reportingData.setIsHandled(isHandled);
			reportingData.setReportingResult(reportingResult);
			reportingData.setReportingResultDetail(reportingResultDetail);

			reportingDataService.saveOrUpdate(reportingData);
			result.setSuccess(true);
		}catch (Exception ex)
		{
			result.setSuccess(false);
			result.setMsg("未知错误，请联系管理员");
		}
		return result;
	}
	
	@RequestMapping("DoReport")
	public @ResponseBody ExtResult<ReportingData> doReport(String employeeName, String idNumber, String reportingMonth, HttpSession session) {
		ExtResult<ReportingData> result = new ExtResult<ReportingData>();

		try
		{
			List<ReportingData> tList = reportingDataService.listAll(employeeName, idNumber, reportingMonth, "未申报", null);
			if(tList==null || tList.isEmpty())
			{
				result.setSuccess(false);
				result.setMsg("要申报的数据不存在，请联系管理员");
				return result;
			}
			
			for(ReportingData reportingData:tList) {
				reportingData.setIsHandled("已申报");
				reportingDataService.saveOrUpdate(reportingData);
			}
			
			
			result.setSuccess(true);
		}catch (Exception ex)
		{
			result.setSuccess(false);
			result.setMsg("未知错误，请联系管理员");
		}
		return result;
	}
	
	@RequestMapping("GetReportResult")
	public @ResponseBody ExtResult<ReportingData> getReportResult(String employeeName, String idNumber, String reportingMonth, HttpSession session) {
		ExtResult<ReportingData> result = new ExtResult<ReportingData>();
		int randResult = 0;

		try
		{
			List<ReportingData> tList = reportingDataService.listAll(employeeName, idNumber, reportingMonth, "已申报", "无");
			if(tList==null || tList.isEmpty())
			{
				result.setSuccess(false);
				result.setMsg("该申报数据不存在，请联系管理员");
				return result;
			}
			
			for (ReportingData reportingData : tList) {
				randResult = 1 + (int)(Math.random()*3);

				if (randResult == 1) {
					reportingData.setReportingResult("失败");
					reportingData.setReportingResultDetail("因为系统停机处理失败，请稍后再试");
				} else {
					reportingData.setReportingResult("成功");
					int year = Integer.parseInt(reportingData.getReportingMonth().substring(0, 3));
					int month = Integer.parseInt(reportingData.getReportingMonth().substring(4, 5));
					if (month == 12) {
						reportingData.setReportingResultDetail("费用产生月份：" + String.valueOf(year + 1).concat("01"));
					} else {
						reportingData.setReportingResultDetail(
								"费用产生月份：" + String.valueOf(Integer.parseInt(reportingData.getReportingMonth()) + 1));
					}
				}

				reportingDataService.saveOrUpdate(reportingData);
			}
			
			result.setSuccess(true);
		}catch (Exception ex)
		{
			result.setSuccess(false);
			result.setMsg("未知错误，请联系管理员");
		}
		return result;
	}
	
	@RequestMapping("Delete")
	public @ResponseBody ExtResult<ReportingData> delete(int id, HttpSession session)
	{
		ExtResult<ReportingData> result = new ExtResult<ReportingData>();
//		Manager manager1 =(Manager)session.getAttribute("CurrentManager");
//		if(manager1==null)
//		{
//			result.setTimeout(true);
//			return result;
//		}
		try
		{
			ReportingData reportingData = reportingDataService.get(id);
			if(reportingData==null)
			{
				result.setSuccess(false);
				result.setMsg("未知错误，请联系管理员");
				return result;
			}

			reportingDataService.delete(id);
			result.setSuccess(true);
		}catch (Exception ex)
		{
			result.setSuccess(false);
			result.setMsg("未知错误，请联系管理员");
		}
		return result;
	}
	
	@SuppressWarnings("deprecation")
	@RequestMapping("/ExcelDownload")
	public String excelDownload(String employeeName, String idNumber, String reportingMonth, String isHandled, HttpServletRequest request, HttpServletResponse response){
		String result=null;
		
		Date date = new Date();
		SimpleDateFormat sd1 = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
		SimpleDateFormat sd2 = new SimpleDateFormat("yyyyMMddHHmmss");
		String nowTime = sd2.format(date);
		
		try{
			
			Workbook workbook = new SXSSFWorkbook();
			Sheet sheet = workbook.createSheet("月度福保数据");
			
			int rowIndex=0;
			
			Row headRow = sheet.createRow(rowIndex);
			
			XSSFCellStyle styleHead = (XSSFCellStyle) workbook.createCellStyle();
			styleHead.setFillForegroundColor(new XSSFColor(Color.CYAN));
			styleHead.setFillBackgroundColor(new XSSFColor(Color.CYAN));
			styleHead.setFillPattern(XSSFCellStyle.SOLID_FOREGROUND);
			styleHead.setBorderBottom(XSSFCellStyle.BORDER_THIN);
			styleHead.setBorderLeft(XSSFCellStyle.BORDER_THIN);
			styleHead.setBorderRight(XSSFCellStyle.BORDER_THIN);
			styleHead.setBorderTop(XSSFCellStyle.BORDER_THIN);
			
			
			Cell cell0 = headRow.createCell(0, CellType.STRING);
			cell0.setCellValue("姓名");
			cell0.setCellStyle(styleHead);
			
			Cell cell1 = headRow.createCell(1, CellType.STRING);
			cell1.setCellValue("身份证号");
			cell1.setCellStyle(styleHead);
			
			Cell cell2 = headRow.createCell(2, CellType.STRING);
			cell2.setCellValue("申报月份");
			cell2.setCellStyle(styleHead);
			
			Cell cell3 = headRow.createCell(3, CellType.STRING);
			cell3.setCellValue("社保公积金基数");
			cell3.setCellStyle(styleHead);
			
			Cell cell4 = headRow.createCell(4, CellType.STRING);
			cell4.setCellValue("服务费");
			cell4.setCellStyle(styleHead);
			
			Cell cell5 = headRow.createCell(5, CellType.STRING);
			cell5.setCellValue("申报状态");
			cell5.setCellStyle(styleHead);
			
			Cell cell6 = headRow.createCell(6, CellType.STRING);
			cell6.setCellValue("回盘结果");
			cell6.setCellStyle(styleHead);
			
			Cell cell7 = headRow.createCell(7, CellType.STRING);
			cell7.setCellValue("回盘结果详细");
			cell7.setCellStyle(styleHead);
			
			Cell cell8 = headRow.createCell(8, CellType.STRING);
			cell8.setCellValue("创建时间");
			cell8.setCellStyle(styleHead);

			
			String fileName = new String(("月度福保数据_" + nowTime + ".xlsx").getBytes("UTF-8"),"iso-8859-1");

			List<ReportingData> tList = reportingDataService.listAll(employeeName, idNumber, reportingMonth, isHandled, null);
			
			XSSFCellStyle styleDetail = (XSSFCellStyle) workbook.createCellStyle();
			styleDetail.setBorderBottom(XSSFCellStyle.BORDER_THIN);
			styleDetail.setBorderLeft(XSSFCellStyle.BORDER_THIN);
			styleDetail.setBorderRight(XSSFCellStyle.BORDER_THIN);
			styleDetail.setBorderTop(XSSFCellStyle.BORDER_THIN);
			
			for(ReportingData reportingData:tList) {
				rowIndex=rowIndex+1;
				Row row = sheet.createRow(rowIndex);
				
				Cell cellDetail0 = row.createCell(0, CellType.STRING);
				cellDetail0.setCellValue(reportingData.getEmployee().getName());
				cellDetail0.setCellStyle(styleDetail);
				
				Cell cellDetail1 = row.createCell(1, CellType.STRING);
				cellDetail1.setCellValue(reportingData.getEmployee().getIdNumber());
				cellDetail1.setCellStyle(styleDetail);
				
				Cell cellDetail2 = row.createCell(2, CellType.STRING);
				cellDetail2.setCellValue(reportingData.getReportingMonth());
				cellDetail2.setCellStyle(styleDetail);
				
				Cell cellDetail3 = row.createCell(3, CellType.STRING);
				cellDetail3.setCellValue(reportingData.getFundsBase());
				cellDetail3.setCellStyle(styleDetail);
				
				Cell cellDetail4 = row.createCell(4, CellType.STRING);
				cellDetail4.setCellValue(reportingData.getServicePayment());
				cellDetail4.setCellStyle(styleDetail);
				
				Cell cellDetail5 = row.createCell(5, CellType.STRING);
				cellDetail5.setCellValue(reportingData.getIsHandled());
				cellDetail5.setCellStyle(styleDetail);
				
				Cell cellDetail6 = row.createCell(6, CellType.STRING);
				cellDetail6.setCellValue(reportingData.getReportingResult());
				cellDetail6.setCellStyle(styleDetail);
				
				Cell cellDetail7 = row.createCell(7, CellType.STRING);
				cellDetail7.setCellValue(reportingData.getReportingResultDetail());
				cellDetail7.setCellStyle(styleDetail);
				
				Cell cellDetail8 = row.createCell(8, CellType.STRING);
				cellDetail8.setCellValue(sd1.format(reportingData.getCreateTime()));
				cellDetail8.setCellStyle(styleDetail);
				
			}
			
			((SXSSFSheet)sheet).trackAllColumnsForAutoSizing();
			
			sheet.autoSizeColumn(0, true);
			sheet.autoSizeColumn(1, true);
			sheet.autoSizeColumn(2, true);
			sheet.autoSizeColumn(3, true);
			sheet.autoSizeColumn(4, true);
			sheet.autoSizeColumn(5, true);
			sheet.autoSizeColumn(6, true);
			sheet.autoSizeColumn(7, true);
			sheet.autoSizeColumn(8, true);
			
			sheet.setColumnWidth(0, sheet.getColumnWidth(0)*2);
			sheet.setColumnWidth(2, sheet.getColumnWidth(2)*2);
			sheet.setColumnWidth(3, sheet.getColumnWidth(3)*2);
			sheet.setColumnWidth(4, sheet.getColumnWidth(4)*2);
			sheet.setColumnWidth(5, sheet.getColumnWidth(5)*2);
			sheet.setColumnWidth(6, sheet.getColumnWidth(6)*2);
			sheet.setColumnWidth(7, sheet.getColumnWidth(7)*2);
			
			FileOutputStream fos = new FileOutputStream(fileName);
			workbook.write(fos);
			workbook.close();
			fos.close();
		    
			File file = new File(fileName);
			
			response.setContentType("application/force-download");
			response.addHeader("Content-Disposition", "attachment;fileName=" + fileName);
			
			byte[] buffer = new byte[1024];
			FileInputStream fis = null;
			BufferedInputStream bis = null;
		    fis = new FileInputStream(file);
		    bis = new BufferedInputStream(fis);
		    OutputStream os = response.getOutputStream();
		    int i = bis.read(buffer);
		    while (i != -1) {
		        os.write(buffer, 0, i);
		        i = bis.read(buffer);
		    }
		    
		    bis.close();

			return result;
		     
		}catch (Exception ex){
			LOGGER.error(ex);
			return result;
		}
	}

}
