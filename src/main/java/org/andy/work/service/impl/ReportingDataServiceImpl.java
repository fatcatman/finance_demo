package org.andy.work.service.impl;

import java.util.List;

import org.andy.work.dao.ReportingDataDao;
import org.andy.work.entity.Employee;
import org.andy.work.entity.ReportingData;
import org.andy.work.service.ReportingDataService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

/**
 * 
 * @author hexiao
 * @version 1.0
 */
@Service("ReportingDataService")
public class ReportingDataServiceImpl implements ReportingDataService {

	@Autowired
	private ReportingDataDao reportingDataDao;

	@Override
	public ReportingData load(int id) {
		return reportingDataDao.load(id);
	}

	@Override
	public ReportingData get(int id) {
		return reportingDataDao.get(id);
	}

	@Override
	public List<ReportingData> findAll() {
		return reportingDataDao.findAll();
	}
	
	@Override
	public List<ReportingData> findAllForEmployee(Employee employee) {
		return reportingDataDao.findAllForEmployee(employee);
	}

	@Override
	public void persist(ReportingData entity) {
		reportingDataDao.persist(entity);
	}

	@Override
	public Integer save(ReportingData entity) {
		return reportingDataDao.save(entity);
	}

	@Override
	public void saveOrUpdate(ReportingData entity) {
		reportingDataDao.saveOrUpdate(entity);
	}

	@Override
	public void delete(int id) {
		reportingDataDao.delete(id);
	}

	@Override
	public void flush() {
		reportingDataDao.flush();
	}

	@Override
	public List<ReportingData> list(int page, int size, Employee employee) {
		return reportingDataDao.list(page, size, employee);
	}

	@Override
	public List<ReportingData> getByEmployeeAndReportingMonth(Employee employee, String reportingMonth) {
		return reportingDataDao.getByEmployeeAndReportingMonth(employee, reportingMonth);
	}

	@Override
	public List<ReportingData> list(int page, int size,  String employeeName, String idNumber,
			String reportingMonth, String isHandled) {
		return reportingDataDao.list(page, size, employeeName, idNumber, reportingMonth, isHandled);
	}
	
	@Override
	public List<ReportingData> listAll(String employeeName, String idNumber,
			String reportingMonth, String isHandled, String reportingResult) {
		return reportingDataDao.listAll(employeeName, idNumber, reportingMonth, isHandled, reportingResult);
	}
}
