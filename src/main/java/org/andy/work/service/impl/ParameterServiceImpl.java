package org.andy.work.service.impl;

import java.util.List;

import org.andy.work.dao.ParameterDao;
import org.andy.work.entity.Parameter;
import org.andy.work.service.ParameterService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

/**
 * 创建时间：2015-2-6 下午3:24:16
 * 
 * @author andy
 * @version 2.2 UserService 的实现
 */
@Service("ParameterService")
public class ParameterServiceImpl implements ParameterService {

	@Autowired
	private ParameterDao parameterDao;

	@Override
	public Parameter load(int id) {
		return parameterDao.load(id);
	}

	@Override
	public Parameter get(int id) {
		return parameterDao.get(id);
	}

	@Override
	public List<Parameter> findAll() {
		return parameterDao.findAll();
	}

	@Override
	public void persist(Parameter entity) {
		parameterDao.persist(entity);
	}

	@Override
	public Integer save(Parameter entity) {
		return parameterDao.save(entity);
	}

	@Override
	public void saveOrUpdate(Parameter entity) {
		parameterDao.saveOrUpdate(entity);
	}

	@Override
	public void delete(int id) {
		parameterDao.delete(id);
	}

	@Override
	public void flush() {
		parameterDao.flush();
	}

	@Override
	public List<Parameter> list(int page, int limit) {
		return parameterDao.list(page,limit);
	}

	@Override
	public List<Parameter> getByName(String name) {
		return parameterDao.getByName(name);
	}
	
	@Override
	public List<Parameter> getByNameAndType(String name, String type) {
		return parameterDao.getByNameAndType(name, type);
	}

}
