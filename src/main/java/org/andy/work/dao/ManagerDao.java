package org.andy.work.dao;

import org.andy.work.entity.Approval;
import org.andy.work.entity.Manager;
import org.andy.work.entity.Organ;
import org.andy.work.entity.Role;

import java.util.List;

/**
 * 创建时间：2015-2-6 下午2:43:50
 * 
 * @author andy
 * @version 2.2
 * 
 * 用户Dao接口
 */

public interface ManagerDao {
	Manager load(int id);

	Manager get(int id);
	
	List<Manager> findAll();
	
	void persist(Manager entity);

	Integer save(Manager entity);
	
	void saveOrUpdate(Manager entity);
	
	void delete(int id);
	
	void flush();
	
	List<Manager> List(int page, int limit,Role role);

	List<Manager> ListAll(Role role);

	Manager getByAccount(String Accout);
	List<Manager> GetByName(String Name);
}
