package org.andy.work.service.impl;

import org.andy.work.dao.ImageDao;
import org.andy.work.dao.OrganapprovalDao;
import org.andy.work.entity.Approval;
import org.andy.work.entity.Image;
import org.andy.work.entity.Organ;
import org.andy.work.entity.Organapproval;
import org.andy.work.service.ImageService;
import org.andy.work.service.OrganapprovalService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * 创建时间：2015-2-6 下午3:24:16
 * 
 * @author andy
 * @version 2.2 UserService 的实现
 */
@Service("OrganapprovalService")
public class OrganapprovalServiceImpl implements OrganapprovalService {

	@Autowired
	private OrganapprovalDao organapprovalDao;

	@Override
	public Organapproval load(int id) {
		return organapprovalDao.load(id);
	}

	@Override
	public Organapproval get(int id) {
		return organapprovalDao.get(id);
	}

	@Override
	public List<Organapproval> findAll() {
		return organapprovalDao.findAll();
	}

	@Override
	public void persist(Organapproval entity) {
		organapprovalDao.persist(entity);
	}

	@Override
	public Integer save(Organapproval entity) {
		return organapprovalDao.save(entity);
	}

	@Override
	public void saveOrUpdate(Organapproval entity) {
		organapprovalDao.saveOrUpdate(entity);
	}

	@Override
	public void delete(int id) {
		organapprovalDao.delete(id);
	}

	@Override
	public void flush() {
		organapprovalDao.flush();
	}

	@Override
	public List<Organapproval> List(Approval type) {
		// TODO Auto-generated method stub
		return organapprovalDao.List(type);
	}

	@Override
	public Organapproval GetByOrg(Approval type, Organ org) {
		return organapprovalDao.GetByOrg(type, org);
	}

}
