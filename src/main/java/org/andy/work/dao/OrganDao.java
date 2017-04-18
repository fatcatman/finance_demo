package org.andy.work.dao;

import java.util.List;

import org.andy.work.entity.Approval;
import org.andy.work.entity.Group;
import org.andy.work.entity.Grouporgan;
import org.andy.work.entity.Organ;

/**
 * 创建时间：2015-2-6 下午2:43:50
 * 
 * @author andy
 * @version 2.2
 * 
 * 用户Dao接口
 */

public interface OrganDao {
	Organ load(int id);
	
	Organ get(int id);
	
	List<Organ> findAll();
	
	void persist(Organ entity);

	Integer save(Organ entity);
	
	void saveOrUpdate(Organ entity);
	
	void delete(int id);
	
	void flush();
	
	List<Organ> List(int page,int size);

	List<Organ> ListbyGroup(int page,int size,Group group);

	List<Organ> ListAllbyGroup(Group group);

	List<Organ> ListNotGroup(int page,int limit,Group group);

	Grouporgan getMapping(Organ org, Group group);

	List<Organ> ListAllNotGroup(Group group);
	List<Organ> GetByName(String Name);

}
