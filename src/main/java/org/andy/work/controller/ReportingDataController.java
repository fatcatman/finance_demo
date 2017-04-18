package org.andy.work.controller;

import java.util.Calendar;
import java.util.List;

import javax.servlet.http.HttpSession;

import org.andy.work.entity.Employee;
import org.andy.work.entity.ExtResult;
import org.andy.work.entity.GridDataResult;
import org.andy.work.entity.ReportingData;
import org.andy.work.service.EmployeeService;
import org.andy.work.service.ReportingDataService;
import org.apache.log4j.Logger;
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
@RequestMapping("/ReportingData")
public class ReportingDataController {

	@SuppressWarnings("unused")
	private static final Logger LOGGER = Logger.getLogger(ReportingDataController.class);

	@Autowired
	private ReportingDataService reportingDataService;
	
	@Autowired
	private EmployeeService employeeService;
	
	@RequestMapping("/List")
	public @ResponseBody GridDataResult<ReportingData> list(int page, int limit, int employeeId, HttpSession session){
		GridDataResult<ReportingData> result = new GridDataResult<ReportingData>();

		try{
			Employee employee = employeeService.get(employeeId);
			
			List<ReportingData> tList = reportingDataService.list(page, limit, employee);
			result.setItems(tList);
			result.setTotal(reportingDataService.findAllForEmployee(employee).size());
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
	public @ResponseBody ExtResult<ReportingData> doReport(int reportingDataId, HttpSession session) {
		ExtResult<ReportingData> result = new ExtResult<ReportingData>();

		try
		{
			ReportingData reportingData = reportingDataService.get(reportingDataId);
			if(reportingData==null)
			{
				result.setSuccess(false);
				result.setMsg("要申报的数据不存在，请联系管理员");
				return result;
			}
			
			reportingData.setIsHandled("已申报");

			reportingDataService.saveOrUpdate(reportingData);
			result.setSuccess(true);
		}catch (Exception ex)
		{
			result.setSuccess(false);
			result.setMsg("未知错误，请联系管理员");
		}
		return result;
	}
	
	@RequestMapping("GetReportResult")
	public @ResponseBody ExtResult<ReportingData> getReportResult(int reportingDataId, HttpSession session) {
		ExtResult<ReportingData> result = new ExtResult<ReportingData>();
		int randResult = 1 + (int)(Math.random()*3);

		try
		{
			ReportingData reportingData = reportingDataService.get(reportingDataId);
			if(reportingData==null)
			{
				result.setSuccess(false);
				result.setMsg("该申报数据不存在，请联系管理员");
				return result;
			}
			
			if(randResult == 1) {
				reportingData.setReportingResult("失败");
				reportingData.setReportingResultDetail("因为系统停机处理失败，请稍后再试");
			} else {
				reportingData.setReportingResult("成功");
				int year=Integer.parseInt(reportingData.getReportingMonth().substring(0, 3));
				int month=Integer.parseInt(reportingData.getReportingMonth().substring(4, 5));
				if(month==12) {
					reportingData.setReportingResultDetail("费用产生月份：" + String.valueOf(year+1).concat("01"));
				} else {
					reportingData.setReportingResultDetail("费用产生月份：" + String.valueOf(Integer.parseInt(reportingData.getReportingMonth())+1));
				}
			}
			
			reportingDataService.saveOrUpdate(reportingData);
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

}
