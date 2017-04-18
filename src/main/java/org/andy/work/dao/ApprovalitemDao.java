package org.andy.work.dao;

import org.andy.work.entity.Approval;
import org.andy.work.entity.Approvalitem;

import java.util.List;

/**
 * 创建时间：2015-2-6 下午2:43:50
 * 
 * @author andy
 * @version 2.2
 * 
 * 用户Dao接口
 */

public interface ApprovalitemDao {
	Approvalitem load(int id);

	Approvalitem get(int id);
	
	List<Approvalitem> findAll();
	
	void persist(Approvalitem entity);

	Integer save(Approvalitem entity);
	
	void saveOrUpdate(Approvalitem entity);
	
	void delete(int id);
	
	void flush();
	
	List<Approvalitem> List(Approval approval);

	Approvalitem getGuide(Approval approval);

	Approvalitem getApprovalItem(Approval approval);
}
