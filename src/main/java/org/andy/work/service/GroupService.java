package org.andy.work.service;

import org.andy.work.entity.Group;
import org.andy.work.entity.Image;

import java.util.List;

/**
 * 创建时间：2015-2-6 下午3:18:57
 * 
 * @author andy
 * @version 2.2
 *  userService接口
 */

public interface GroupService {
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
