package org.andy.work.service.impl;

import org.andy.work.dao.ApprovalitemDao;
import org.andy.work.entity.Approval;
import org.andy.work.entity.Approvalitem;
import org.andy.work.service.ApprovalitemService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * 创建时间：2015-2-6 下午3:24:16
 * 
 * @author andy
 * @version 2.2 UserService 的实现
 */
@Service("ApprovalitemService")
public class ApprovalitemServiceImpl implements ApprovalitemService {

	@Autowired
	private ApprovalitemDao approvalitemDao;

	@Override
	public Approvalitem load(int id) {
		return approvalitemDao.load(id);
	}

	@Override
	public Approvalitem get(int id) {
		return approvalitemDao.get(id);
	}

	@Override
	public List<Approvalitem> findAll() {
		return approvalitemDao.findAll();
	}

	@Override
	public void persist(Approvalitem entity) {
		approvalitemDao.persist(entity);
	}

	@Override
	public Integer save(Approvalitem entity) {
		return approvalitemDao.save(entity);
	}

	@Override
	public void saveOrUpdate(Approvalitem entity) {
		approvalitemDao.saveOrUpdate(entity);
	}

	@Override
	public void delete(int id) {
		approvalitemDao.delete(id);
	}

	@Override
	public void flush() {
		approvalitemDao.flush();
	}

	@Override
	public List<Approvalitem> List(Approval approval) {
		// TODO Auto-generated method stub
		return approvalitemDao.List(approval);
	}

	@Override
	public Approvalitem getApprovalItem(Approval approval) {
		return approvalitemDao.getApprovalItem(approval);
	}

	@Override
	public Approvalitem getGuide(Approval approval) {
		return approvalitemDao.getGuide(approval);
	}

}
