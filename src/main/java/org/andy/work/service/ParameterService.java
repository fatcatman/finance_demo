package org.andy.work.service;

import org.andy.work.entity.Parameter;

import java.util.List;

/**
 * 创建时间：2015-2-6 下午3:18:57
 * 
 * @author andy
 * @version 2.2
 *  userService接口
 */

public interface ParameterService {
	Parameter load(int id);

	Parameter get(int id);

	List<Parameter> findAll();

	void persist(Parameter entity);

	Integer save(Parameter entity);

	void saveOrUpdate(Parameter entity);

	void delete(int id);

	void flush();

	List<Parameter> list(int page,int limit);
	List<Parameter> getByName(String name);
	List<Parameter> getByNameAndType(String name, String type);
}
