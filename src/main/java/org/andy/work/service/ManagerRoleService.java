package org.andy.work.service;

import org.andy.work.entity.Manager;
import org.andy.work.entity.Role;

import java.util.List;

/**
 * 创建时间：2015-2-6 下午3:18:57
 * 
 * @author andy
 * @version 2.2
 *  userService接口
 */

public interface ManagerRoleService {
	Role load(int id);

	Role get(int id);

	List<Role> findAll();

	void persist(Role entity);

	Integer save(Role entity);

	void saveOrUpdate(Role entity);

	void delete(int id);

	void flush();
	
	List<Role> List(int page, int size, String params);

	Role getByType(String type);

}
