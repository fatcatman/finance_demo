package org.andy.work.dao;

import org.andy.work.entity.FormTemplate;
import org.andy.work.entity.Group;

import java.util.List;

/**
 * 创建时间：2015-2-6 下午2:43:50
 * 
 * @author andy
 * @version 2.2
 * 
 * 用户Dao接口
 */

public interface GroupDao {
	Group load(int id);

	Group get(int id);
	
	List<Group> findAll();
	
	void persist(Group entity);

	Integer save(Group entity);
	
	void saveOrUpdate(Group entity);
	
	void delete(int id);
	
	void flush();
	List<Group> List(int page,int limit);
	List<Group> GetByName(String Name);
}
