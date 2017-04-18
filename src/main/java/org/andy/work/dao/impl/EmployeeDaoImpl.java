package org.andy.work.dao.impl;

import org.andy.work.dao.EmployeeDao;
import org.andy.work.entity.Employee;
import org.hibernate.Criteria;
import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.hibernate.criterion.Order;
import org.hibernate.criterion.Restrictions;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * 创建时间：2015-2-6 下午2:45:14
 * 
 * @author andy
 * @version 2.2
 */
@Repository("EmployeeDao")
public class EmployeeDaoImpl implements EmployeeDao {

	@Autowired
	private SessionFactory sessionFactory;

	private Session getCurrentSession() {
		return this.sessionFactory.getCurrentSession();
	}

	@Override
	public Employee load(int id) {
		return (Employee) this.getCurrentSession().load(Employee.class, id);
	}
	
	@Override
	public Employee get(int id) {
		return (Employee) this.getCurrentSession().get(Employee.class, id);
	}

	@SuppressWarnings("unchecked")
	@Override
	public List<Employee> findAll() {
		List<Employee> Approvals = this.getCurrentSession().createQuery("from Employee").setCacheable(true).list();
		return Approvals;
	}

	@SuppressWarnings("unchecked")
	@Override
	public List<Employee> list(int page,int limit) {
		List<Employee> Approvals = this.getCurrentSession().createQuery("from Employee").setFirstResult((page-1)*limit).setMaxResults(limit).list();
		return Approvals;
	}
	@SuppressWarnings("unchecked")
	@Override
	public List<Employee> getByIdNumber(String idNumber) {
		Criteria crit = this.getCurrentSession().createCriteria(Employee.class);
		crit.addOrder(Order.desc("id"));
		crit.add(Restrictions.eq("idNumber", idNumber));
		List<Employee> list = crit.list();
		//List<Image> Approvals = this.getCurrentSession().createQuery("from Employee order by ID desc").setEntity("Type",type).list();
		return list;
	}
	
	@SuppressWarnings("unchecked")
	@Override
	public List<Employee> getByNameAndIdNumber(String name, String idNumber) {
		Criteria crit = this.getCurrentSession().createCriteria(Employee.class);
		crit.addOrder(Order.desc("id"));
		crit.add(Restrictions.eq("name", name));
		crit.add(Restrictions.eq("idNumber", idNumber));
		List<Employee> list = crit.list();
		//List<Image> Approvals = this.getCurrentSession().createQuery("from Employee order by ID desc").setEntity("Type",type).list();
		return list;
	}
	
	@Override
	public void persist(Employee entity) {
		this.getCurrentSession().persist(entity);

	}

	@Override
	public Integer save(Employee entity) {
		return (Integer) this.getCurrentSession().save(entity);
	}

	@Override
	public void saveOrUpdate(Employee entity) {
		this.getCurrentSession().saveOrUpdate(entity);
	}

	@Override
	public void delete(int id) {
		Employee entity = this.load(id);
		this.getCurrentSession().delete(entity);
	}

	@Override
	public void flush() {
		this.getCurrentSession().flush();
	}

}
