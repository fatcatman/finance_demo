package org.andy.work.service;

import org.andy.work.entity.Group;
import org.andy.work.entity.Grouporgan;
import org.andy.work.entity.Organ;

import java.util.List;

/**
 * 创建时间：2015-2-6 下午3:18:57
 * 
 * @author andy
 * @version 2.2
 *  userService接口
 */

public interface GrouporganService {
	Grouporgan load(int id);

	Grouporgan get(int id);

	List<Grouporgan> findAll();

	void persist(Grouporgan entity);

	Integer save(Grouporgan entity);

	void saveOrUpdate(Grouporgan entity);

	void delete(int id);

	void flush();

	Grouporgan getMapping(Organ org, Group group);
	List<Grouporgan> getByOrg(Organ org);
}
