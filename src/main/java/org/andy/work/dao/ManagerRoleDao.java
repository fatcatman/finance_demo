package org.andy.work.dao;

import org.andy.work.entity.Manager;
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

public interface ManagerRoleDao {
	Role load(int id);

	Role get(int id);

	List<Role> findAll();

	void persist(Role entity);

	Integer save(Role entity);

	void saveOrUpdate(Role entity);

	void delete(int id);

	void flush();

	List<Role> List(int page, int limit, String params);

	Role getByType(String type);
}
