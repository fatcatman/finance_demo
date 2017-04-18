package org.andy.work.dao;

import org.andy.work.entity.Parameter;

import java.util.List;

/**
 * 创建时间：2015-2-6 下午2:43:50
 * 
 * @author andy
 * @version 2.2
 * 
 * 用户Dao接口
 */

public interface ParameterDao {
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
