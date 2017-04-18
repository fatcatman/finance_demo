package org.andy.work.dao;

import org.andy.work.entity.Employee;

import java.util.List;

/**
 * 
 * @author hexiao
 * @version 1.0
 * 
 * 员工Dao接口
 */

public interface EmployeeDao {
	Employee load(int id);

	Employee get(int id);
	
	List<Employee> findAll();
	
	void persist(Employee entity);

	Integer save(Employee entity);
	
	void saveOrUpdate(Employee entity);
	
	void delete(int id);
	
	void flush();
	List<Employee> list(int page,int limit);
	List<Employee> getByIdNumber(String name);
	List<Employee> getByNameAndIdNumber(String name, String idNumber);
}
