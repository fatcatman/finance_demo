package org.andy.work.service;

import org.andy.work.entity.AcctUser;
import org.andy.work.entity.Approval;
import org.andy.work.entity.Organ;

import java.util.List;

/**
 * 创建时间：2015-2-6 下午3:18:57
 * 
 * @author andy
 * @version 2.2
 *  userService接口
 */

public interface ApprovalService {
	Approval load(int id);

	Approval get(int id);

	List<Approval> findAll();

	void persist(Approval entity);

	Integer save(Approval entity);

	void saveOrUpdate(Approval entity);

	void delete(int id);

	void flush();
	
	List<Approval> List(int page,int size,String params);
	
	List<Approval> ListForOrg(int page,int size,Organ org);
	
	List<Approval> ListAllForOrg(Organ org);

	List<Approval> ListAllNotInOrg(Organ org,int page,int size,String params);
	List<Approval> GetByName(String Name);
	List<Approval> ListAllNotInOrgCount(Organ org,String params);
}
