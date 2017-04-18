package org.andy.work.dao.impl;

import org.andy.work.dao.ReportingDataDao;
import org.andy.work.entity.Employee;
import org.andy.work.entity.ReportingData;
import org.hibernate.Criteria;
import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.hibernate.criterion.Order;
import org.hibernate.criterion.Restrictions;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;
import org.springframework.util.StringUtils;

import java.util.List;

/**
 * 
 * @author hexiao
 * @version 1.0
 */
@Repository("employeeitemDao")
public class ReportingDataDaoImpl implements ReportingDataDao {

	@Autowired
	private SessionFactory sessionFactory;

	private Session getCurrentSession() {
		return this.sessionFactory.getCurrentSession();
	}

	@Override
	public ReportingData load(int id) {
		return (ReportingData) this.getCurrentSession().load(ReportingData.class, id);
	}
	
	@Override
	public ReportingData get(int id) {
		return (ReportingData) this.getCurrentSession().get(ReportingData.class, id);
	}

	@SuppressWarnings("unchecked")
	@Override
	public List<ReportingData> findAll() {
		List<ReportingData> Employees = this.getCurrentSession().createQuery("from ReportingData").setCacheable(true).list();
		return Employees;
	}
	
	@SuppressWarnings("unchecked")
	@Override
	public List<ReportingData> findAllForEmployee(Employee employee) {
		Criteria crit = this.getCurrentSession().createCriteria(ReportingData.class);
		crit.add(Restrictions.eq("employee", employee));
		List<ReportingData> list = crit.setCacheable(true).list();
		return list;
	}
	
	@SuppressWarnings("unchecked")
	@Override
	public List<ReportingData> list(int page, int size, Employee employee) {
		Criteria crit = this.getCurrentSession().createCriteria(ReportingData.class);
		crit.add(Restrictions.eq("employee", employee));
		crit.addOrder(Order.desc("reportingMonth"));
		List<ReportingData> list = crit.setFirstResult((page-1)*size).setMaxResults(size).list();
		//List<Image> Employees = this.getCurrentSession().createQuery("from Image order by ID desc").setEntity("Type",type).list();
		return list;
	}
	
	@SuppressWarnings("unchecked")
	@Override
	public List<ReportingData> getByEmployeeAndReportingMonth(Employee employee, String reportingMonth) {
		Criteria crit = this.getCurrentSession().createCriteria(ReportingData.class);
		crit.addOrder(Order.desc("id"));
		crit.add(Restrictions.eq("employee", employee));
		crit.add(Restrictions.eq("reportingMonth", reportingMonth));
		List<ReportingData> list = crit.list();
		//List<Image> Employees = this.getCurrentSession().createQuery("from Image order by ID desc").setEntity("Type",type).list();
		return list;
	}
	
	@SuppressWarnings("unchecked")
	@Override
	public List<ReportingData> list(int page, int size, String employeeName, String idNumber,
			String reportingMonth, String isHandled) {
		String queryString = "SELECT p FROM " + ReportingData.class.getName() + " p WHERE 1=1 ";
		
		if(!StringUtils.isEmpty(employeeName)) {
			queryString = queryString + " AND p.employee.name like :employeeName ";
		}
		
		if(!StringUtils.isEmpty(idNumber)) {
			queryString = queryString + " AND p.employee.idNumber like :idNumber ";
		}
		
		if(!StringUtils.isEmpty(reportingMonth)) {
			queryString = queryString + " AND p.reportingMonth=:reportingMonth ";
		}
		
		if(!StringUtils.isEmpty(isHandled)) {
			queryString = queryString + " AND p.isHandled=:isHandled ";
		}
		
		queryString = queryString + " ORDER BY p.employee.name, p.reportingMonth desc";

		org.hibernate.Query query = this.getCurrentSession().createQuery(queryString);
		
		if(!StringUtils.isEmpty(employeeName)) {
			query.setParameter("employeeName", "%" + employeeName + "%");
		}
		
		if(!StringUtils.isEmpty(idNumber)) {
			query.setParameter("idNumber", "%" + idNumber + "%");
		}
		
		if(!StringUtils.isEmpty(reportingMonth)) {
			query.setParameter("reportingMonth", reportingMonth);
		}
		
		if(!StringUtils.isEmpty(isHandled)) {
			query.setParameter("isHandled", isHandled);
		}
		
		List<ReportingData> reprotingDataList = query.setFirstResult((page-1)*size).setMaxResults(size).list();
		return reprotingDataList;
	}
	
	@SuppressWarnings("unchecked")
	@Override
	public List<ReportingData> listAll(String employeeName, String idNumber,
			String reportingMonth, String isHandled, String reportingResult) {
		String queryString = "SELECT p FROM " + ReportingData.class.getName() + " p WHERE 1=1 ";
		
		if(!StringUtils.isEmpty(employeeName)) {
			queryString = queryString + " AND p.employee.name like :employeeName ";
		}
		
		if(!StringUtils.isEmpty(idNumber)) {
			queryString = queryString + " AND p.employee.idNumber like :idNumber ";
		}
		
		if(!StringUtils.isEmpty(reportingMonth)) {
			queryString = queryString + " AND p.reportingMonth=:reportingMonth ";
		}
		
		if(!StringUtils.isEmpty(isHandled)) {
			queryString = queryString + " AND p.isHandled=:isHandled ";
		}
		
		if(!StringUtils.isEmpty(reportingResult)) {
			queryString = queryString + " AND p.reportingResult=:reportingResult ";
		}
		
		queryString = queryString + " ORDER BY p.employee.name, p.reportingMonth desc";

		org.hibernate.Query query = this.getCurrentSession().createQuery(queryString);
		
		if(!StringUtils.isEmpty(employeeName)) {
			query.setParameter("employeeName", "%" + employeeName + "%");
		}
		
		if(!StringUtils.isEmpty(idNumber)) {
			query.setParameter("idNumber", "%" + idNumber + "%");
		}
		
		if(!StringUtils.isEmpty(reportingMonth)) {
			query.setParameter("reportingMonth", reportingMonth);
		}
		
		if(!StringUtils.isEmpty(isHandled)) {
			query.setParameter("isHandled", isHandled);
		}
		
		if(!StringUtils.isEmpty(reportingResult)) {
			query.setParameter("reportingResult", reportingResult);
		}
		
		List<ReportingData> reprotingDataList = query.list();
		return reprotingDataList;
	}
	
	@Override
	public void persist(ReportingData entity) {
		this.getCurrentSession().persist(entity);

	}

	@Override
	public Integer save(ReportingData entity) {
		return (Integer) this.getCurrentSession().save(entity);
	}

	@Override
	public void saveOrUpdate(ReportingData entity) {
		this.getCurrentSession().saveOrUpdate(entity);
	}

	@Override
	public void delete(int id) {
		ReportingData entity = this.load(id);
		this.getCurrentSession().delete(entity);
	}

	@Override
	public void flush() {
		this.getCurrentSession().flush();
	}

}
