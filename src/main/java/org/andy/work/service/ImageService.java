package org.andy.work.service;

import org.andy.work.entity.Approval;
import org.andy.work.entity.Image;
import org.andy.work.entity.Organ;

import java.util.List;

/**
 * 创建时间：2015-2-6 下午3:18:57
 * 
 * @author andy
 * @version 2.2
 *  userService接口
 */

public interface ImageService {
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
