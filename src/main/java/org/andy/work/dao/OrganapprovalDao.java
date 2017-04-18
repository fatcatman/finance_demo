package org.andy.work.dao;

import org.andy.work.entity.Approval;
import org.andy.work.entity.Image;
import org.andy.work.entity.Organ;
import org.andy.work.entity.Organapproval;

import java.util.List;

/**
 * 创建时间：2015-2-6 下午2:43:50
 * 
 * @author andy
 * @version 2.2
 * 
 * 用户Dao接口
 */

public interface OrganapprovalDao {
	Organapproval load(int id);

	Organapproval get(int id);
	
	List<Organapproval> findAll();
	
	void persist(Organapproval entity);
	
	Integer save(Organapproval entity);
	
	void saveOrUpdate(Organapproval entity);
	
	void delete(int id);
	
	void flush();
	
	List<Organapproval> List(Approval type);
	Organapproval GetByOrg(Approval type, Organ org);
}
