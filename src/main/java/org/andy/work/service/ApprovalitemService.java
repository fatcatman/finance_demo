package org.andy.work.service;

import org.andy.work.entity.Approval;
import org.andy.work.entity.Approvalitem;

import java.util.List;

/**
 * 创建时间：2015-2-6 下午3:18:57
 * 
 * @author andy
 * @version 2.2
 *  userService接口
 */

public interface ApprovalitemService {
	Approvalitem load(int id);

	Approvalitem get(int id);

	List<Approvalitem> findAll();

	void persist(Approvalitem entity);

	Integer save(Approvalitem entity);

	void saveOrUpdate(Approvalitem entity);

	void delete(int id);

	void flush();
	
	List<Approvalitem> List(Approval approval);

	Approvalitem getApprovalItem(Approval approval);
	Approvalitem getGuide(Approval approval);
}
