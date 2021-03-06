package org.andy.work.dao;

import org.andy.work.entity.Image;

import java.util.List;

/**
 * 创建时间：2015-2-6 下午2:43:50
 * 
 * @author andy
 * @version 2.2
 * 
 * 用户Dao接口
 */

public interface ImageDao {
	Image load(int id);

	Image get(int id);
	
	List<Image> findAll();
	
	void persist(Image entity);
	
	Integer save(Image entity);
	
	void saveOrUpdate(Image entity);
	
	void delete(int id);
	
	void flush();
	
	List<Image> List(String type);

	List<Image> ListPage(int page,int limit);
	List<Image> GetByName(String Name);
}
