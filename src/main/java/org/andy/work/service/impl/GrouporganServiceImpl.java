package org.andy.work.service.impl;

import org.andy.work.dao.GrouporganDao;
import org.andy.work.dao.OrganDao;
import org.andy.work.entity.Group;
import org.andy.work.entity.Grouporgan;
import org.andy.work.entity.Organ;
import org.andy.work.service.GrouporganService;
import org.andy.work.service.OrganService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * 创建时间：2015-2-6 下午3:24:16
 * 
 * @author andy
 * @version 2.2 UserService 的实现
 */
@Service("GrouporganService")
public class GrouporganServiceImpl implements GrouporganService {

	@Autowired
	private GrouporganDao grouporganDao;

	@Override
	public Grouporgan load(int id) {
		return grouporganDao.load(id);
	}

	@Override
	public Grouporgan get(int id) {
		return grouporganDao.get(id);
	}

	@Override
	public List<Grouporgan> findAll() {
		return grouporganDao.findAll();
	}

	@Override
	public void persist(Grouporgan entity) {
		grouporganDao.persist(entity);
	}

	@Override
	public Integer save(Grouporgan entity) {
		return grouporganDao.save(entity);
	}

	@Override
	public void saveOrUpdate(Grouporgan entity) {
		grouporganDao.saveOrUpdate(entity);
	}

	@Override
	public void delete(int id) {
		grouporganDao.delete(id);
	}

	@Override
	public void flush() {
		grouporganDao.flush();
	}

	@Override
	public Grouporgan getMapping(Organ org, Group group) {
		return grouporganDao.getMapping(org, group);
	}

	@Override
	public List<Grouporgan> getByOrg(Organ org) {
		return grouporganDao.getByOrg(org);
	}


}
