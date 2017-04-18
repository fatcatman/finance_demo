package org.andy.work.service.impl;

import org.andy.work.dao.ApprovalDao;
import org.andy.work.dao.OrganDao;
import org.andy.work.dao.UserDao;
import org.andy.work.entity.*;
import org.andy.work.service.ApprovalService;
import org.andy.work.service.OrganService;
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
@Service("OrganService")
public class OrganServiceImpl implements OrganService {

	@Autowired
	private OrganDao organDao;

	@Override
	public Organ load(int id) {
		return organDao.load(id);
	}

	@Override
	public Organ get(int id) {
		return organDao.get(id);
	}

	@Override
	public List<Organ> findAll() {
		return organDao.findAll();
	}

	@Override
	public void persist(Organ entity) {
		organDao.persist(entity);
	}

	@Override
	public Integer save(Organ entity) {
		return organDao.save(entity);
	}

	@Override
	public void saveOrUpdate(Organ entity) {
		organDao.saveOrUpdate(entity);
	}

	@Override
	public void delete(int id) {
		organDao.delete(id);
	}

	@Override
	public void flush() {
		organDao.flush();
	}

	@Override
	public java.util.List<Organ> List(int page, int size) {
		// TODO Auto-generated method stub
		return organDao.List(page, size);
	}

	@Override
	public List<Organ> ListbyGroup(int page, int size, Group group) {
		return organDao.ListbyGroup(page,size,group);
	}

	@Override
	public List<Organ> ListAllbyGroup(Group group) {
		return organDao.ListAllbyGroup(group);
	}

	@Override
	public List<Organ> ListNotGroup(int page, int limit, Group group) {
		return organDao.ListNotGroup(page, limit, group);
	}

	@Override
	public Grouporgan getMapping(Organ org, Group group) {
		return organDao.getMapping(org, group);
	}

	@Override
	public List<Organ> ListAllNotGroup(Group group) {
		return organDao.ListAllNotGroup(group);
	}

	@Override
	public List<Organ> GetByName(String Name) {
		return organDao.GetByName(Name);
	}


}
