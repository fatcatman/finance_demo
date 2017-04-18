package org.andy.work.service.impl;

import org.andy.work.dao.FormtemplateDao;
import org.andy.work.entity.Approvalitem;
import org.andy.work.entity.FormTemplate;
import org.andy.work.entity.Group;
import org.andy.work.service.FormtemplateService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * 创建时间：2015-2-6 下午3:24:16
 * 
 * @author andy
 * @version 2.2 UserService 的实现
 */
@Service("FormtemplateService")
public class FormtemplateServiceImpl implements FormtemplateService {

	@Autowired
	private FormtemplateDao formtemplateDao;

	@Override
	public FormTemplate load(int id) {
		return formtemplateDao.load(id);
	}

	@Override
	public FormTemplate get(int id) {
		return formtemplateDao.get(id);
	}

	@Override
	public List<FormTemplate> findAll() {
		return formtemplateDao.findAll();
	}

	@Override
	public void persist(FormTemplate entity) {
		formtemplateDao.persist(entity);
	}

	@Override
	public Integer save(FormTemplate entity) {
		return formtemplateDao.save(entity);
	}

	@Override
	public void saveOrUpdate(FormTemplate entity) {
		formtemplateDao.saveOrUpdate(entity);
	}

	@Override
	public void delete(int id) {
		formtemplateDao.delete(id);
	}

	@Override
	public void flush() {
		formtemplateDao.flush();
	}

	@Override
	public List<FormTemplate> Search(int page,int size,String param,Group group) {
		return formtemplateDao.search(page,size,param,group);
	}

	@Override
	public List<FormTemplate> searchAll(String param, Group group) {
		return formtemplateDao.searchAll(param,group);
	}

	@Override
	public List<FormTemplate> List(Approvalitem Approvalitem) {
		return formtemplateDao.List(Approvalitem);
	}
	@Override
	public List<FormTemplate> List(Approvalitem Approvalitem,int page,int size) {
		return formtemplateDao.List(Approvalitem,page,size);
	}
	@Override
	public List<FormTemplate> HotList(Group group) {
		return formtemplateDao.HotList(group);
	}

	@Override
	public List<FormTemplate> GetByName(String Name) {
		return formtemplateDao.GetByName(Name);
	}


}
