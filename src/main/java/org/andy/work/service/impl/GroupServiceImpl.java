package org.andy.work.service.impl;

import org.andy.work.dao.GroupDao;
import org.andy.work.dao.ImageDao;
import org.andy.work.entity.Group;
import org.andy.work.entity.Image;
import org.andy.work.service.GroupService;
import org.andy.work.service.ImageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * 创建时间：2015-2-6 下午3:24:16
 * 
 * @author andy
 * @version 2.2 UserService 的实现
 */
@Service("GroupService")
public class GroupServiceImpl implements GroupService {

	@Autowired
	private GroupDao groupDao;

	@Override
	public Group load(int id) {
		return groupDao.load(id);
	}

	@Override
	public Group get(int id) {
		return groupDao.get(id);
	}

	@Override
	public List<Group> findAll() {
		return groupDao.findAll();
	}

	@Override
	public void persist(Group entity) {
		groupDao.persist(entity);
	}

	@Override
	public Integer save(Group entity) {
		return groupDao.save(entity);
	}

	@Override
	public void saveOrUpdate(Group entity) {
		groupDao.saveOrUpdate(entity);
	}

	@Override
	public void delete(int id) {
		groupDao.delete(id);
	}

	@Override
	public void flush() {
		groupDao.flush();
	}

	@Override
	public List<Group> List(int page, int limit) {
		return groupDao.List(page,limit);
	}

	@Override
	public List<Group> GetByName(String Name) {
		return groupDao.GetByName(Name);
	}

}
