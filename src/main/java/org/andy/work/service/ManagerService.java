package org.andy.work.service;

import org.andy.work.entity.Approval;
import org.andy.work.entity.Manager;
import org.andy.work.entity.Organ;
import org.andy.work.entity.Role;

import java.util.List;

/**
 * 创建时间：2015-2-6 下午3:18:57
 * 
 * @author andy
 * @version 2.2
 *  userService接口
 */

public interface ManagerService {
	Manager load(int id);

	Manager get(int id);

	List<Manager> findAll();

	void persist(Manager entity);

	Integer save(Manager entity);

	void saveOrUpdate(Manager entity);

	void delete(int id);

	void flush();
	
	List<Manager> List(int page, int size,Role role);

	List<Manager> ListAll(Role role);

	Manager getByAccount(String Accout);
	List<Manager> GetByName(String Name);
}
