package org.andy.work.service.impl;

import org.andy.work.dao.ManagerDao;
import org.andy.work.dao.ManagerRoleDao;
import org.andy.work.entity.Manager;
import org.andy.work.entity.Role;
import org.andy.work.service.ManagerRoleService;
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
@Service("ManagerRoleService")
public class ManagerRoleServiceImpl implements ManagerRoleService {

	@Autowired
	private ManagerRoleDao managerRoleDao;

	@Override
	public Role load(int id) {
		return managerRoleDao.load(id);
	}

	@Override
	public Role get(int id) {
		return managerRoleDao.get(id);
	}

	@Override
	public List<Role> findAll() {
		return managerRoleDao.findAll();
	}

	@Override
	public void persist(Role entity) {
		managerRoleDao.persist(entity);
	}

	@Override
	public Integer save(Role entity) {
		return managerRoleDao.save(entity);
	}

	@Override
	public void saveOrUpdate(Role entity) {
		managerRoleDao.saveOrUpdate(entity);
	}

	@Override
	public void delete(int id) {
		managerRoleDao.delete(id);
	}

	@Override
	public void flush() {
		managerRoleDao.flush();
	}

	@Override
	public List<Role> List(int page, int size,String params) {
		// TODO Auto-generated method stub
		return managerRoleDao.List(page, size,params);
	}

	@Override
	public Role getByType(String type) {
		return managerRoleDao.getByType(type);
	}
}
