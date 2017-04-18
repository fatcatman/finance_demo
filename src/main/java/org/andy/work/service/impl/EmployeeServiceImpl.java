package org.andy.work.service.impl;

import java.util.List;

import org.andy.work.dao.EmployeeDao;
import org.andy.work.entity.Employee;
import org.andy.work.service.EmployeeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

/**
 * 
 * @author hexiao
 * @version 1.0
 */
@Service("EmployeeService")
public class EmployeeServiceImpl implements EmployeeService {

	@Autowired
	private EmployeeDao employeeDao;

	@Override
	public Employee load(int id) {
		return employeeDao.load(id);
	}

	@Override
	public Employee get(int id) {
		return employeeDao.get(id);
	}

	@Override
	public List<Employee> findAll() {
		return employeeDao.findAll();
	}

	@Override
	public void persist(Employee entity) {
		employeeDao.persist(entity);
	}

	@Override
	public Integer save(Employee entity) {
		return employeeDao.save(entity);
	}

	@Override
	public void saveOrUpdate(Employee entity) {
		employeeDao.saveOrUpdate(entity);
	}

	@Override
	public void delete(int id) {
		employeeDao.delete(id);
	}

	@Override
	public void flush() {
		employeeDao.flush();
	}

	@Override
	public List<Employee> list(int page, int limit) {
		return employeeDao.list(page,limit);
	}

	@Override
	public List<Employee> getByIdNumber(String name) {
		return employeeDao.getByIdNumber(name);
	}
	
	@Override
	public List<Employee> getByNameAndIdNumber(String name, String idNumber) {
		return employeeDao.getByNameAndIdNumber(name, idNumber);
	}

}
