package org.andy.work.service.impl;

import org.andy.work.dao.ApprovalDao;
import org.andy.work.dao.ManagerDao;
import org.andy.work.entity.Approval;
import org.andy.work.entity.Manager;
import org.andy.work.entity.Organ;
import org.andy.work.entity.Role;
import org.andy.work.service.ApprovalService;
import org.andy.work.service.ManagerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * 创建时间：2015-2-6 下午3:24:16
 * 
 * @author andy
 * @version 2.2 UserService 的实现
 */
@Service("ManagerService")
public class ManagerServiceImpl implements ManagerService {

	@Autowired
	private ManagerDao managerDao;

	@Override
	public Manager load(int id) {
		return managerDao.load(id);
	}

	@Override
	public Manager get(int id) {
		return managerDao.get(id);
	}

	@Override
	public List<Manager> findAll() {
		return managerDao.findAll();
	}

	@Override
	public void persist(Manager entity) {
		managerDao.persist(entity);
	}

	@Override
	public Integer save(Manager entity) {
		return managerDao.save(entity);
	}

	@Override
	public void saveOrUpdate(Manager entity) {
		managerDao.saveOrUpdate(entity);
	}

	@Override
	public void delete(int id) {
		managerDao.delete(id);
	}

	@Override
	public void flush() {
		managerDao.flush();
	}

	@Override
	public List<Manager> List(int page, int size,Role role) {
		// TODO Auto-generated method stub
		return managerDao.List(page, size,role);
	}

	@Override
	public List<Manager> ListAll(Role role) {
		return managerDao.ListAll(role);
	}

	@Override
	public Manager getByAccount(String Accout) {
		return managerDao.getByAccount(Accout);
	}

	@Override
	public List<Manager> GetByName(String Name) {
		return managerDao.GetByName(Name);
	}

}
