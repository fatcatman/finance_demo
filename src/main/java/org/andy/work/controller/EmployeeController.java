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
@RequestMapping("/Employee")
public class EmployeeController {

	private static final Logger LOGGER = Logger.getLogger(EmployeeController.class);

	@Autowired
	private EmployeeService employeeService;
	
	@Autowired
	private ReportingDataService reportingDataService;
	
	@RequestMapping("/List")
	public @ResponseBody GridDataResult<Employee> list(int page,int limit, HttpSession session){
		GridDataResult<Employee> result = new GridDataResult<Employee>();

		try{

			List<Employee> tList = employeeService.list(page, limit);
			result.setItems(tList);
			result.setTotal(employeeService.findAll().size());
			result.setPage(page);
			result.setLimit(limit);
			result.setTotalPage(result.getTotal() % limit == 0 ? result.getTotal() / limit : result.getTotal() / limit + 1);
		}catch (Exception ex){

		}

		return result;
	}
	
	@SuppressWarnings("deprecation")
	@RequestMapping("/ExcelDownload")
	public String excelDownload(HttpServletRequest request, HttpServletResponse response){
		String result=null;
		
		Date date = new Date();
		SimpleDateFormat sd1 = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
		SimpleDateFormat sd2 = new SimpleDateFormat("yyyyMMddHHmmss");
		String nowTime = sd2.format(date);
		
		try{
			
			Workbook workbook = new SXSSFWorkbook();
			Sheet sheet = workbook.createSheet("员工信息");
			
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
			cell2.setCellValue("单位名称");
			cell2.setCellStyle(styleHead);
			
			Cell cell3 = headRow.createCell(3, CellType.STRING);
			cell3.setCellValue("业务类型");
			cell3.setCellStyle(styleHead);
			
			Cell cell4 = headRow.createCell(4, CellType.STRING);
			cell4.setCellValue("创建时间");
			cell4.setCellStyle(styleHead);

			
			String fileName = new String(("员工信息_" + nowTime + ".xlsx").getBytes("UTF-8"),"iso-8859-1");

			List<Employee> tList = employeeService.findAll();
			
			XSSFCellStyle styleDetail = (XSSFCellStyle) workbook.createCellStyle();
			styleDetail.setBorderBottom(XSSFCellStyle.BORDER_THIN);
			styleDetail.setBorderLeft(XSSFCellStyle.BORDER_THIN);
			styleDetail.setBorderRight(XSSFCellStyle.BORDER_THIN);
			styleDetail.setBorderTop(XSSFCellStyle.BORDER_THIN);
			
			for(Employee employee:tList) {
				rowIndex=rowIndex+1;
				Row row = sheet.createRow(rowIndex);
				
				Cell cellDetail0 = row.createCell(0, CellType.STRING);
				cellDetail0.setCellValue(employee.getName());
				cellDetail0.setCellStyle(styleDetail);
				
				Cell cellDetail1 = row.createCell(1, CellType.STRING);
				cellDetail1.setCellValue(employee.getIdNumber());
				cellDetail1.setCellStyle(styleDetail);
				
				Cell cellDetail2 = row.createCell(2, CellType.STRING);
				cellDetail2.setCellValue(employee.getCompanyName());
				cellDetail2.setCellStyle(styleDetail);
				
				Cell cellDetail3 = row.createCell(3, CellType.STRING);
				cellDetail3.setCellValue(employee.getBusinessType());
				cellDetail3.setCellStyle(styleDetail);
				
				Cell cellDetail4 = row.createCell(4, CellType.STRING);
				cellDetail4.setCellValue(sd1.format(employee.getCreateTime()));
				cellDetail4.setCellStyle(styleDetail);
				
			}
			
			((SXSSFSheet)sheet).trackAllColumnsForAutoSizing();
			
			sheet.autoSizeColumn(0, true);
			sheet.autoSizeColumn(1, true);
			sheet.autoSizeColumn(2, true);
			sheet.autoSizeColumn(3, true);
			sheet.autoSizeColumn(4, true);
			
			sheet.setColumnWidth(0, sheet.getColumnWidth(0)*2);
			sheet.setColumnWidth(2, sheet.getColumnWidth(2)*2);
			sheet.setColumnWidth(3, sheet.getColumnWidth(3)*2);
			
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

	@RequestMapping("Save")
	public @ResponseBody ExtResult<Employee> Save(int id,String name, String idNumber, String companyName, String businessType, HttpSession session)
	{
		ExtResult<Employee> result = new ExtResult<Employee>();
//		Manager manager1 =(Manager)session.getAttribute("CurrentManager");
//		if(manager1==null)
//		{
//			result.setTimeout(true);
//			return result;
//		}
		try
		{
			List<Employee> app_list = employeeService.getByIdNumber(idNumber);
			for (Employee tmp:app_list) {
				if(tmp.getID()!=id)
				{
					result.setSuccess(false);
					result.setMsg("身份证号不能重复！");
					return result;
				}
			}
			Employee employee = employeeService.get(id);
			if(employee==null)
			{

				employee=new Employee();
				employee.setCreateTime(Calendar.getInstance().getTime());
			}
			employee.setName(name);
			employee.setIdNumber(idNumber);
			employee.setCompanyName(companyName);
			employee.setBusinessType(businessType);

			employeeService.saveOrUpdate(employee);
			result.setSuccess(true);
		}catch (Exception ex)
		{
			result.setSuccess(false);
			result.setMsg("未知错误，请联系管理员");
		}
		return result;
	}
	@RequestMapping("Delete")
	public @ResponseBody ExtResult<Employee> Delete(int id, HttpSession session)
	{
		ExtResult<Employee> result = new ExtResult<Employee>();
//		Manager manager1 =(Manager)session.getAttribute("CurrentManager");
//		if(manager1==null)
//		{
//			result.setTimeout(true);
//			return result;
//		}
		try
		{
			Employee employee = employeeService.get(id);
			if(employee==null)
			{
				result.setSuccess(false);
				result.setMsg("未知错误，请联系管理员");
				return result;
			}
			List<ReportingData> reportingDataList = reportingDataService.list(0, 10, employee);
			if(reportingDataList.size()>0)
			{
				result.setSuccess(false);
				result.setMsg("该员工以含有福保申报数据，请先删除下属福保申报数据！");
				return result;
			}
			employeeService.delete(id);
			result.setSuccess(true);
		}catch (Exception ex)
		{
			result.setSuccess(false);
			result.setMsg("未知错误，请联系管理员");
		}
		return result;
	}

}
