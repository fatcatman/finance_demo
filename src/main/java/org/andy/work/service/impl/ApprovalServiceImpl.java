package org.andy.work.service.impl;

import org.andy.work.dao.ApprovalDao;
import org.andy.work.dao.UserDao;
import org.andy.work.entity.AcctUser;
import org.andy.work.entity.Approval;
import org.andy.work.entity.Organ;
import org.andy.work.service.ApprovalService;
import org.andy.work.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * 创建时间：2015-2-6 下午3:24:16
 * 
 * @author andy
 * @version 2.2 UserService 的实现
 */
@Service("ApprovalService")
public class ApprovalServiceImpl implements ApprovalService {

	@Autowired
	private ApprovalDao approvalDao;

	@Override
	public Approval load(int id) {
		return approvalDao.load(id);
	}

	@Override
	public Approval get(int id) {
		return approvalDao.get(id);
	}

	@Override
	public List<Approval> findAll() {
		return approvalDao.findAll();
	}

	@Override
	public void persist(Approval entity) {
		approvalDao.persist(entity);
	}

	@Override
	public Integer save(Approval entity) {
		return approvalDao.save(entity);
	}

	@Override
	public void saveOrUpdate(Approval entity) {
		approvalDao.saveOrUpdate(entity);
	}

	@Override
	public void delete(int id) {
		approvalDao.delete(id);
	}

	@Override
	public void flush() {
		approvalDao.flush();
	}

	@Override
	public java.util.List<Approval> List(int page, int size,String params) {
		// TODO Auto-generated method stub
		return approvalDao.List(page, size,params);
	}

	@Override
	public java.util.List<Approval> ListForOrg(int page, int size, Organ org) {
		// TODO Auto-generated method stub
		return approvalDao.ListForOrg( page, size, org);
	}

	@Override
	public java.util.List<Approval> ListAllForOrg(Organ org) {
		// TODO Auto-generated method stub
		return approvalDao.ListAllForOrg(org);
	}

	@Override
	public List<Approval> ListAllNotInOrg(Organ org,int page,int size,String params) {
		return approvalDao.ListAllNotInOrg(org, page, size, params);
	}

	@Override
	public List<Approval> GetByName(String Name) {
		return approvalDao.GetByName(Name);
	}

    @Override
    public List<Approval> ListAllNotInOrgCount(Organ org, String params) {
        return approvalDao.ListAllNotInOrgCount(org,params);
    }

}
