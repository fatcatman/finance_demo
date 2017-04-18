package org.andy.work.dao;

import org.andy.work.entity.Employee;
import org.andy.work.entity.ReportingData;

import java.util.List;

/**
 * 创建时间：2015-2-6 下午2:43:50
 * 
 * @author andy
 * @version 2.2
 * 
 * 用户Dao接口
 */

public interface ReportingDataDao {
	ReportingData load(int id);

	ReportingData get(int id);
	
	List<ReportingData> findAll();
	List<ReportingData> findAllForEmployee(Employee employee);
	
	void persist(ReportingData entity);

	Integer save(ReportingData entity);
	
	void saveOrUpdate(ReportingData entity);
	
	void delete(int id);
	
	void flush();
	
	List<ReportingData> list(int page, int size, Employee employee);
	List<ReportingData> list(int page, int size, String employeeName, String idNumber, String reportingMonth, String isHandled);
	List<ReportingData> listAll(String employeeName, String idNumber, String reportingMonth, String isHandled, String reportingResult);
	List<ReportingData> getByEmployeeAndReportingMonth(Employee employee, String reportingMonth);
}
