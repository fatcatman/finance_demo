package org.andy.work.service;

import org.andy.work.entity.Approvalitem;
import org.andy.work.entity.FormTemplate;
import org.andy.work.entity.Group;

import java.util.List;

/**
 * 创建时间：2015-2-6 下午3:18:57
 * 
 * @author andy
 * @version 2.2
 *  userService接口
 */

public interface FormtemplateService {
	FormTemplate load(int id);

	FormTemplate get(int id);

	List<FormTemplate> findAll();

	void persist(FormTemplate entity);

	Integer save(FormTemplate entity);

	void saveOrUpdate(FormTemplate entity);

	void delete(int id);

	void flush();

	List<FormTemplate> Search(int page,int size,String param,Group group);
	List<FormTemplate> searchAll(String param,Group group);
	List<FormTemplate> List(Approvalitem Approvalitem);
	List<FormTemplate> List(Approvalitem Approvalitem,int page,int size);

	List<FormTemplate> HotList(Group group);
	List<FormTemplate> GetByName(String Name);
}
